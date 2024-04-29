import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import {
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  EmailTemplateSelect,
  TemplateDisplayV4,
  UseTemplateModuleDataHook,
  setIsViewTemplate,
  FileHelper
} from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { toast } from "react-toastify";
import { TemplateHelper, ExportHelper } from "@workspace/common";
import { useNavigate } from "react-router-dom";

const SubmitToSales = ({
  candidateId,
  jobId,
  setIsViewTemplate,
  setTemplatePreviewInfo,
  setTemplatePreviewAction,
}) => {
  const navigate = useNavigate();
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formSchema, setFormSchema] = useState(schema);
  const [emailTemplateData, setEmailTemplateData] = useState(null);
  const [tableTemplateData, setTableTemplateData] = useState(null);
  const [CVTemplateData, setCVTemplateData] = useState(null);
  const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData({
    candidateId: candidateId,
    jobId: jobId,
  });
  const [attachments, setAttachments] = useState([]);
  const [attachmentLoading, setAttachmentLoading] = useState(false);

  console.log("Attachment Data", attachments);

  // console.log("emailTemplateData", emailTemplateData?.content);

  /**
   * Handle form submit event (Formik)
   * @param {*} values
   */
  const handleFormSubmit = async (values) => {
    const newValues = { ...values };
    newValues.to = newValues.to.map((item) => item.value);
    newValues.cc = newValues.cc.map((item) => item.value);
    newValues.bcc = newValues.bcc.map((item) => item.value);
    console.log("newValues", newValues);
    const newFormData =
      ObjectHelper.convertObjectToFormDataWithArray(newValues);
    // dispatch(
    //   Actions.sendEmail({
    //     newFormData,
    //     config: {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   })
    // );
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

  // Toast errors upn submit
  const toastErrors = () => {
    if (formik.errors) {
      Object.keys(formik.errors).forEach((key) => {
        toast.error(formik.errors[key]);
      });
    }
  };

  useEffect(() => {
    const setContentInFormik = async () => {
      const processedContent = await TemplateHelper.runEffects(
        emailTemplateData.content,
        null,
        allModuleData,
        true
      );
      formik.setFieldValue("content", processedContent);
    };

    if (emailTemplateData) {
      setContentInFormik();
    }
  }, [emailTemplateData, allModuleData]);

  const setTableDataWithEffect = async (data) => {
    const processedContent = await TemplateHelper.runEffects(
      data.content,
      null,
      allModuleData,
      true
    );
    setTableTemplateData({ ...data, content: processedContent });
  };

  useEffect(() => {
    if (tableTemplateData) {
      setTableTemplateData(null);
    }
  }, [tableTemplateData]);

  const attachmentTemplate = async (filterTemplate) => {
    console.log("filterTemplate", filterTemplate);
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

  return (
    <div>
      <Row>
        <Col>
          <EmailTo formik={formik} />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <EmailCCBCC formik={formik} />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <EmailSubject formik={formik} name="subject" />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row className="d-flex">
        <Col>
          {/* Main Template Select */}
          <EmailTemplateSelect
            icon={<i className=" ri-file-list-2-line fs-5"></i>}
            category="Email Templates"
            setTemplateData={setEmailTemplateData}
            addMoreOptions={{
              addMore: true,
              addMoreLabel: "Add New Template",
              render: (
                <Button
                  className="btn btn-custom-primary header-btn w-100"
                  style={{
                    height: "40px",
                    backgroundColor: "#0A65CC",
                  }}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault(); // Prevents the menu from closing
                    event.stopPropagation(); // Stops selection
                    navigate("/settings/templates/create");
                  }}
                >
                  + New Email Template
                </Button>
              ),
            }}
          />
          <hr className="mt-2" />
        </Col>
        <Col>
          <EmailTemplateSelect
            icon={<i className=" ri-table-2 fs-5"></i>}
            setTemplateData={setTableDataWithEffect}
            value={tableTemplateData}
            category="Table Templates"
            selectRender={(data) => {
              return (
                <>
                  <div className="d-flex align-items-center justify-content-between">
                    <span>{data?.label}</span>
                    <i
                      className="ri-eye-line cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault(); // Prevents the menu from closing
                        event.stopPropagation(); // Stops selection
                        setIsViewTemplate(true);
                        setTemplatePreviewInfo(data?.data);
                      }}
                    ></i>
                  </div>
                </>
              );
            }}
            addMoreOptions={{
              addMore: true,
              addMoreLabel: "Add New Template",
              render: (
                <Button
                  type="button"
                  className="btn btn-custom-primary header-btn w-100"
                  style={{
                    height: "40px",
                    backgroundColor: "#0A65CC",
                  }}
                  onClick={(event) => {
                    event.preventDefault(); // Prevents the menu from closing
                    event.stopPropagation(); // Stops selection
                    navigate("/settings/templates/create");
                  }}
                >
                  + New Table Template
                </Button>
              ),
            }}
          />
          <hr className="mt-2" />
        </Col>
      </Row>
      <Row className="">
        <Col
          style={{
            maxWidth: "50%",
          }}
        >
          <EmailTemplateSelect
            icon={<i className=" ri-file-list-2-line fs-5"></i>}
            value={CVTemplateData}
            setTemplateData={setCVTemplateData}
            category="CV"
            selectRender={(data) => {
              return (
                <>
                  <div className="d-flex align-items-center">
                    <span
                    className="flex-grow-1"
                      onClick={(event) => {
                        attachmentTemplate(data?.data);
                      }}
                    >
                      {data?.label}
                    </span>
                    <i
                      className="ri-eye-line cursor-pointer"
                      onClick={(event) => {
                        event.preventDefault(); // Prevents the menu from closing
                        event.stopPropagation(); // Stops selection
                        setIsViewTemplate(true);
                        setTemplatePreviewInfo(data?.data);
                        setTemplatePreviewAction({
                          type: "ATTACH_TEMPLATE",
                          label: "Attach Template",
                          action: (data) => {
                            setAttachments((prev) => [...prev, data]);
                            setIsViewTemplate(false);
                          },
                        });
                      }}
                    ></i>
                  </div>
                </>
              );
            }}
          />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <TemplateDisplayV4
            injectData={tableTemplateData?.content ?? null}
            isAllLoading={false}
            content={emailTemplateData?.content ?? null}
            allData={"null"}
            isView={false}
            // handleOutputContent={setEmailContent}
            autoResize={false}
            height={280}
            onChange={(content) => {
              formik.setFieldValue("content", content);
            }}
            value={formik?.values?.["content"]}
            showLoading={false}
          />
        </Col>
      </Row>

      {/* <hr className="mt-2" /> */}
      <Button
        onClick={() => {
          if (!formik.isValid) {
            toastErrors();
            return;
          }
          formik.handleSubmit();
        }}
      >
        Submit
      </Button>
      <span className="text-muted">
        {attachments.length > 0 &&
          attachments.map((attachment, i) => {
            return (
              <div className="d-flex gap-3">
                <span
                  className="text-danger cursor-pointer"
                  onClick={() => {
                    setAttachments(
                      attachments.filter((item, index) => index !== i)
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
                      ({FileHelper.displayFileSize(attachment.size)})
                    </strong>
                  </span>
                </div>
              </div>
            );
          })}
      </span>
    </div>
    
  );
};

export default SubmitToSales;
