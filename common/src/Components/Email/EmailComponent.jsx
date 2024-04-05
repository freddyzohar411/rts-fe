import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Spinner,
} from "reactstrap";
import {
  TemplateDisplayV3,
  TemplateSelectByCategoryElement,
} from "@workspace/common";
import { useEffect } from "react";
import { useFormik } from "formik";
import { initialValues, schema } from "./formikConfig";
import { UseTemplateModuleDataHook } from "@workspace/common";
import { TemplateHelper } from "@workspace/common";
import { MultiInputFormik } from "@workspace/common";
import { Actions } from "@workspace/common";
import { toast } from "react-toastify";
import { ObjectHelper } from "@workspace/common";
import { FileHelper } from "@workspace/common";
import { setEmailClose, resetSendEmail } from "../../store/email/action";
import * as ExportHelper from "../../helpers/export_helper";
import TemplatePreviewModal from "../TemplateDisplay/TemplatePreviewModal/TemplatePreviewModal";
import { generateOptions } from "./pdfOption";
import TemplateAdvanceExportModal from "../TemplateDisplay/TemplateAdvanceExportModal/TemplateAdvanceExportModal";
import * as BackendHelper from "../../helpers/backend_helper";
import "./EmailComponent.scss";

function EmailComponent() {
  const dispatch = useDispatch();
  const attachmentRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formSchema, setFormSchema] = useState(schema);
  const [templateData, setTemplateData] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [attachmentTemplateSelected, setAttachmentTemplateSelected] =
    useState(null);
  const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData();
  const [templateAttachmentModalShow, setTemplateAttachmentModalShow] =
    useState(false);
  const [attachmentTemplates, setAttachmentTemplates] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);

  const {
    loading,
    isEmailOpen,
    category,
    subCategory,
    success,
    attachmentCategory,
    attachmentSubcategory,
  } = useSelector((state) => state.EmailCommonReducer);

  useEffect(() => {
    if (attachmentCategory && attachmentSubcategory) {
      BackendHelper.getTemplatesByCategoryAndSubCategory(
        attachmentCategory,
        attachmentSubcategory
      )
        .then((res) => setAttachmentTemplates(res.data))
        .catch((err) => {});
      return;
    }
    if (attachmentCategory) {
      BackendHelper.getTemplatesByCategory(attachmentCategory)
        .then((res) => setAttachmentTemplates(res.data))
        .catch((err) => {});
    }
  }, [attachmentCategory, attachmentSubcategory]);

  /**
   * Handle form submit event (Formik)
   * @param {*} values
   */
  const handleFormSubmit = async (values) => {
    const newValues = { ...values };
    newValues.to = newValues.to.map((item) => item.value);
    newValues.cc = newValues.cc.map((item) => item.value);
    newValues.bcc = newValues.bcc.map((item) => item.value);
    const newFormData =
      ObjectHelper.convertObjectToFormDataWithArray(newValues);
    dispatch(
      Actions.sendEmail({
        newFormData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      })
    );
  };

  /**
   * Initialize Formik (useFormik Hook)
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInitialValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setIsFullscreen(false);
      }, 300);
    };
  }, [isEmailOpen]);

  const minimizeModal = () => {
    setIsMinimized(true);
  };

  useEffect(() => {
    const setContentInFormik = async () => {
      const processedContent = await TemplateHelper.runEffects(
        templateData.content,
        null,
        allModuleData,
        true
      );
      formik.setFieldValue("content", processedContent);
    };

    if (templateData) {
      setContentInFormik();
    }
  }, [templateData, allModuleData]);

  const supportedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/*",
    "video/*",
    "application/pdf",
    "application/msword",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // for docx
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // for xlsx
    "application/vnd.ms-powerpoint",
    "text/*",
  ];

  // Handle attachment change
  const handleAttachmentChange = (e) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = [];
    for (let i = 0; i < files.length; i++) {
      // Check file type
      if (!FileHelper.checkFileWithMimeType(files[i], supportedMimeTypes)) {
        toast.error(`${files[i].name}: File type not supported`);
        continue;
      }
      if (!FileHelper.checkFileSizeLimit(files[i], 10000000)) {
        toast.error(`${files[i].name}: File size should be less than 10 MB`);
        continue;
      }
      fileArray.push(files[i]);
    }
    setAttachments((prev) => [...prev, ...fileArray]);
    // Reset the input
    e.target.value = null;
  };

  // Set formik when attachments change
  useEffect(() => {
    formik.setFieldValue("attachments", attachments);
  }, [attachments]);

  // Toast errors upn submit
  const toastErrors = () => {
    if (formik.errors) {
      Object.keys(formik.errors).forEach((key) => {
        toast.error(formik.errors[key]);
      });
    }
  };

  // Upon successfully sent email, reset form and close modal
  useEffect(() => {
    if (success) {
      formik.resetForm();
      setTemplateData(null);
      setAttachments([]);
      dispatch(resetSendEmail());
      dispatch(setEmailClose());
    }
  }, [success]);

  const downloadAttachment = (attachment) => {
    // Assuming attachment.file is a Blob or File object
    const url = window.URL.createObjectURL(attachment);
    const a = document.createElement("a");
    a.href = url;
    a.download = attachment.name;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const attachmentTemplate = async (id) => {
    const filterTemplate = attachmentTemplates.find(
      (template) => template.id === id
    );
    if (!filterTemplate) return;
    setAttachmentLoading(true);
    try {
      const processedTemplate =
        await TemplateHelper.setSelectedContentAndProcessed(
          filterTemplate.content,
          allModuleData
        );

      if (processedTemplate) {
        const file = await ExportHelper.exportBackendHtml2PdfFile(
          processedTemplate.html,
          {
            unit: "in",
            pageType: "A4",
            pageOrientation: "portrait",
            marginTop: 0,
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            exportType: "pdf",
            fileName: `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}`,
          },
          processedTemplate.styleTag
        );
        setAttachments([...attachments, file]);
      }
    } catch (error) {
    } finally {
      setAttachmentLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div>
        {!isMinimized && (
          <Modal
            isOpen={isEmailOpen}
            toggle={() => dispatch(setEmailClose())}
            backdrop={false}
            style={{ position: "fixed", top: 0, right: 0, minWidth: "50%" }}
            fullscreen={isFullscreen}
            scrollable
          >
            <div
              className="modal-header d-flex flex-row justify-content-between align-items-center"
              style={{ paddingTop: 0, paddingBottom: 0 }}
            >
              <span className="modal-title h5">New Message</span>
              <div className="d-flex flex-row gap-2">
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeModal();
                  }}
                >
                  <i className="ri-subtract-line fs-4"></i>
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(!isFullscreen);
                  }}
                >
                  {isFullscreen ? (
                    <i className="bx bx-window fs-5"></i>
                  ) : (
                    <i className="bx bx-windows fs-5"></i>
                  )}
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    formik.resetForm();
                    setTemplateData(null);
                    setAttachments([]);
                    dispatch(setEmailClose());
                  }}
                >
                  <i className="ri-close-line fs-4"></i>
                </button>
              </div>
            </div>
            <ModalBody>
              <div>
                <div className="d-flex gap-3">
                  <div className="mb-3 input-group text-center d-flex flex-nowrap">
                    <span
                      className="input-group-text"
                      id="to-input"
                      style={{ width: "50px" }}
                    >
                      To
                    </span>
                    <MultiInputFormik
                      name="to"
                      formik={formik}
                      placeholder="Enter email addresses"
                      containerWidth="100%"
                      placeholderAlign="left"
                    />
                  </div>
                  <TemplateSelectByCategoryElement
                    categoryName={category ?? null}
                    subCategoryName={subCategory ?? null}
                    placeholder="Select a template"
                    onChange={(value) => {
                      setTemplateData(value);
                    }}
                    width="280px"
                    end
                    value={templateData}
                  />
                </div>

                <div>
                  <div className="input-group mb-3 text-center d-flex flex-nowrap">
                    <span
                      className="input-group-text"
                      id="cc-input"
                      style={{ width: "50px" }}
                    >
                      Cc
                    </span>
                    <MultiInputFormik
                      name="cc"
                      formik={formik}
                      placeholder="Enter cc"
                      containerWidth="100%"
                      placeholderAlign="left"
                    />
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3 text-center d-flex flex-nowrap">
                    <span
                      className="input-group-text"
                      id="bcc-input"
                      style={{ width: "50px" }}
                    >
                      Bcc
                    </span>
                    <MultiInputFormik
                      name="bcc"
                      formik={formik}
                      placeholder="Enter Bcc"
                      containerWidth="100%"
                      placeholderAlign="left"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik?.values?.["subject"]}
                  />
                </div>
              </div>
              <TemplateDisplayV3
                isAllLoading={false}
                content={templateData?.content ?? null}
                allData={allModuleData}
                isView={false}
                handleOutputContent={setEmailContent}
                autoResize={false}
                height={280}
                // minHeight={100}
                // maxHeight={300}
                onChange={(content) => {
                  formik.setFieldValue("content", content);
                }}
                value={formik?.values?.["content"]}
                showLoading={false}
              />
              {/* File attachment */}
              <ModalFooter className="p-0 mt-3">
                <div className="w-100 d-flex flex-row gap-3 justify-content-between align-items-center">
                  <div
                    style={{
                      height: "65px",
                      width: isFullscreen ? "30%" : "50%",
                      overflow: "auto",
                    }}
                    className="pe-3"
                  >
                    <span className="text-muted">
                      {attachments.length > 0 &&
                        attachments.map((attachment, i) => {
                          return (
                            <div className="d-flex gap-3">
                              <span
                                className="text-danger cursor-pointer"
                                onClick={() => {
                                  setAttachments(
                                    attachments.filter(
                                      (item, index) => index !== i
                                    )
                                  );
                                }}
                              >
                                <i className="ri-close-fill"></i>
                              </span>
                              <div className="d-flex gap-2">
                                <span
                                  onClick={() => downloadAttachment(attachment)}
                                  className="cursor-pointer"
                                >
                                  <strong>{attachment.name}</strong>
                                </span>
                                <span>
                                  <strong>
                                    (
                                    {FileHelper.displayFileSize(
                                      attachment.size
                                    )}
                                    )
                                  </strong>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                    </span>
                  </div>
                  <div className="d-flex gap-3">
                    <Button
                      type="button"
                      className="btn btn-ghost-danger"
                      onClick={() => {
                        formik.resetForm();
                        setTemplateData(null);
                        setAttachments([]);
                        setModal(false);
                        dispatch(setEmailClose());
                      }}
                    >
                      Discard
                    </Button>
                    <input
                      type="file"
                      ref={attachmentRef}
                      className="d-none"
                      multiple
                      onChange={handleAttachmentChange}
                    />
                    <UncontrolledDropdown className="btn-group">
                      <Button
                        type="submit"
                        className="btn btn-custom-primary"
                        onClick={() => {
                          attachmentRef.current.click();
                        }}
                      >
                        {attachmentLoading ? (
                          <Spinner
                            style={{
                              width: "20px",
                              height: "20px",
                            }}
                          />
                        ) : (
                          <i
                            style={{ fontSize: "1rem" }}
                            className="ri-attachment-2"
                          />
                        )}
                      </Button>
                      <DropdownToggle
                        tag="button"
                        type="button"
                        className="btn btn-custom-primary"
                        split
                      >
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        {/* Start here */}
                        {attachmentTemplates.map((template) => {
                          return (
                            <li key={template.id}>
                              <DropdownItem>
                                <div
                                  className="d-flex justify-content-between align-items-center"
                                  style={{ width: "175px" }}
                                >
                                  <span
                                    onClick={async () => {
                                      attachmentTemplate(template.id);
                                    }}
                                    className="cursor-pointer template-name flex-grow-1"
                                  >
                                    {template.name}
                                  </span>
                                  <div className="d-flex gap-1 align-items-center">
                                    <span style={{ color: "#D3D3D3" }}>|</span>
                                    <i
                                      className="ri-more-line fs-5 more-icon cursor-pointer"
                                      onClick={() => {
                                        setAttachmentTemplateSelected(
                                          template.content
                                        );
                                        setTemplateAttachmentModalShow(true);
                                      }}
                                    ></i>
                                  </div>
                                </div>
                              </DropdownItem>
                            </li>
                          );
                        })}
                        <hr style={{ margin: 0 }} />
                        <li>
                          <DropdownItem
                            onClick={() => {
                              setTemplateAttachmentModalShow(true);
                            }}
                          >
                            Attach Template
                          </DropdownItem>
                        </li>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown className="btn-group">
                      <Button
                        type="submit"
                        className="btn btn-success"
                        onClick={() => {
                          if (!formik.isValid) {
                            toastErrors();
                            return;
                          }
                          formik.handleSubmit();
                          setModal(false);
                        }}
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send"}
                      </Button>
                      <DropdownToggle
                        tag="button"
                        type="button"
                        className="btn btn-success"
                        split
                      >
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </DropdownToggle>
                      <DropdownMenu className="dropdown-menu-end">
                        <li>
                          <DropdownItem href="#">
                            <i className="ri-timer-line text-muted me-1 align-bottom"></i>{" "}
                            Schedule Send
                          </DropdownItem>
                        </li>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </ModalFooter>
            </ModalBody>
          </Modal>
        )}
        <TemplateAdvanceExportModal
          content={attachmentTemplateSelected}
          showInsertModal={templateAttachmentModalShow}
          setShowInsertModal={setTemplateAttachmentModalShow}
          toExport={false}
          attachmentCallback={(file) => {
            if (!file) return;
            setAttachments([...attachments, file]);
          }}
          allData={allModuleData}
          closeModalCallback={() => {
            setAttachmentTemplateSelected("");
          }}
        />
        {isMinimized && (
          <div
            style={{
              position: "fixed",
              bottom: 0,
              right: 0,
              padding: "6px 20px 6px 20px",
              fontWeight: "bolder",
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              width: "250px",
              backgroundColor: "#fff",
              borderRadius: "4px 0 0 0",
              fontSize: "1rem",
              zIndex: 9999999,
            }}
          >
            <div className="d-flex justify-content-between">
              <span> {formik?.values?.["subject"] || "New Message"}</span>
              <span className="d-flex gap-3">
                <i
                  className=" ri-fullscreen-fill cursor-pointer"
                  onClick={() => {
                    setIsMinimized(false);
                  }}
                ></i>
                <i
                  className=" ri-close-fill cursor-pointer"
                  onClick={() => {
                    formik.resetForm();
                    setTemplateData(null);
                    setAttachments([]);
                    setIsMinimized(false);
                    dispatch(setEmailClose());
                  }}
                ></i>
              </span>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default EmailComponent;
