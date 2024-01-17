import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import {
  TemplateDisplayV3,
  TemplateSelectByCategoryElement,
} from "@workspace/common";
import { useEffect } from "react";
import { useFormik } from "formik";
import { initialValues, schema, populateForm } from "./formikConfig";

function EmailComponent({ isOpen, toggle }) {
  const [modal, setModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [emailContent, setEmailContent] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formSchema, setFormSchema] = useState(schema);
  const [templateData, setTemplateData] = useState(null);

  /**
   * Handle form submit event (Formik)
   * @param {*} values
   */
  const handleFormSubmit = async (values) => {
    console.log("values", values);
    // await onSubmit(values, deletedMediaURL);
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
  }, [isOpen]);

  const minimizeModal = () => {
    setIsMinimized(true);
  };

  useEffect(() => {
    if (templateData && formik) {
      // Set Formik content value
      formik.setFieldValue("content", templateData?.content);
    }
  }, [templateData]);

  return (
    <React.Fragment>
      <div>
        {!isMinimized && (
          <Modal
            isOpen={isOpen}
            toggle={toggle}
            backdrop="false"
            style={{ position: "fixed", bottom: 0, right: 0, minWidth: "50%" }}
            fullscreen={isFullscreen}
          >
            <div className="modal-header py-2 d-flex flex-row justify-content-between align-items-center">
              <span className="modal-title h5">New Message</span>
              <div className="d-flex flex-row gap-2" onClick={toggle}>
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
                  <i className="ri-fullscreen-line fs-5"></i>
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    formik.resetForm();
                    setTemplateData(null);
                    toggle();
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
                    {/* // Need to change to multiple email input */}
                    <Input
                      type="text"
                      aria-label="To"
                      aria-describedby="to-input"
                      className="form-control email-compose-input"
                      defaultValue="support@themesbrand.com"
                      name="to"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.["to"]}
                      placeholder="Enter email address"
                    />
                  </div>
                  <TemplateSelectByCategoryElement
                    categoryName="Email Templates"
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
                  <div className="input-group mb-3 text-center">
                    <span
                      className="input-group-text"
                      id="cc-input"
                      style={{ width: "50px" }}
                    >
                      Cc
                    </span>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="CC"
                      aria-label="CC"
                      aria-describedby="cc-input"
                      name="cc"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.["cc"]}
                    ></Input>
                  </div>
                </div>
                <div>
                  <div className="input-group mb-3 text-center">
                    <span
                      className="input-group-text"
                      id="bcc-input"
                      style={{ width: "50px" }}
                    >
                      Bcc
                    </span>
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="BCC"
                      aria-label="BCC"
                      aria-describedby="bcc-input"
                      name="bcc"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik?.values?.["bcc"]}
                    ></Input>
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
                content={templateData?.content ?? null}
                allData={null}
                isView={false}
                handleOutputContent={setEmailContent}
                autoResize={false}
                height={350}
                onChange={(content) => {
                  formik.setFieldValue("content", content);
                }}
                value={formik?.values?.["content"]}
              />
              <ModalFooter className="p-0 mt-3">
                <div className="d-flex flex-row gap-3 justify-content-end">
                  <Button
                    type="button"
                    className="btn btn-ghost-danger"
                    onClick={() => {
                      formik.resetForm();
                      setTemplateData(null);
                      setModal(false);
                    }}
                  >
                    Discard
                  </Button>

                  <UncontrolledDropdown className="btn-group">
                    <Button
                      type="submit"
                      className="btn btn-success"
                      onClick={() => {
                        formik.handleSubmit();
                        setModal(false);
                      }}
                    >
                      Send
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
              </ModalFooter>
            </ModalBody>
          </Modal>
        )}
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
                    setIsMinimized(false);
                    toggle();
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
