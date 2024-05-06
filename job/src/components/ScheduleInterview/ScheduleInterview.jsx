import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SCHEDULE_INTERVIEW } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { useFormik } from "formik";

import {
  Row,
  Col,
  Button,
  Input,
  FormGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import "./ScheduleInterview.scss";
import {
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  EmailTemplateSelect,
  TemplateDisplayV4,
  UseTemplateModuleDataHook,
  setIsViewTemplate,
  FileHelper,
} from "@workspace/common";
import { TemplateHelper, ExportHelper, ObjectHelper } from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { Actions } from "@workspace/common";

function ScheduleInterview(
  {
    candidateId,
    jobId,
    setIsViewTemplate,
    setTemplatePreviewInfo,
    setTemplatePreviewAction,
    setOffcanvasForm,
  },
  ref
) {
  const dispatch = useDispatch();
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
  const emailSuccess = useSelector((state) => state.EmailCommonReducer.success);
  const [virtualMeetingOpen, setVirtualMeetingOpen] = useState(false);
  const [selectedVirtualMeeting, setSelectedVirtualMeeting] = useState(
    "Select Virtual Meeting"
  );

  useEffect(() => {
    if (emailSuccess) {
      dispatch(Actions.resetSendEmail());
      toast.success("Email sent successfully");
      setOffcanvasForm(false);
    }
  }, [emailSuccess]);

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

  // Set formik when attachments change
  useEffect(() => {
    formik.setFieldValue("attachments", attachments);
  }, [attachments]);

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

  // Expose the submitForm method to the parent via ref
  // useImperativeHandle(ref, () => ({
  //   submitForm: () => {
  //     if (formik.isValid) {
  //       formik.handleSubmit();
  //     } else {
  //       toastErrors();
  //     }
  //   },
  // }));

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

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const linkState = location.state;
  // const { getAllUserGroups } = useUserAuth();
  // const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData({
  //   candidateId: candidateId,
  //   jobId: jobId,
  // });
  // const [attachments, setAttachments] = useState([]);
  // const [attachmentLoading, setAttachmentLoading] = useState(false);
  // const emailSuccess = useSelector((state) => state.EmailCommonReducer.success);


  // const [formInitialValues, setFormInitialValues] = useState(initialValues);
  // const [formSchema, setFormSchema] = useState(schema);

  // const handleFormSubmit = async (values) => {
  //   const newValues = { ...values };
  //   newValues.to = newValues.to.map((item) => item.value);
  //   newValues.cc = newValues.cc.map((item) => item.value);
  //   newValues.bcc = newValues.bcc.map((item) => item.value);
  //   const newFormData =
  //     ObjectHelper.convertObjectToFormDataWithArray(newValues);
  //   dispatch(
  //     Actions.sendEmail({
  //       newFormData,
  //       config: {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       },
  //     })
  //   );
  // };

  // const formik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: formInitialValues,
  //   validationSchema: formSchema,
  //   validateOnBlur: true,
  //   onSubmit: handleFormSubmit,
  // });

  // const [emailTemplateData, setEmailTemplateData] = useState(null);
  // const [tableTemplateData, setTableTemplateData] = useState(null);
  // const [CVTemplateData, setCVTemplateData] = useState(null);

  // const [view] = useState(
  //   linkState?.view !== null && linkState?.view !== undefined
  //     ? linkState?.view
  //     : false
  // );

  // const formikRef = useRef(null);
  // const form = useSelector((state) => state.JobFormReducer.form);
  // const [formTemplate, setFormTemplate] = useState(null);

  // useEffect(() => {
  //   dispatch(fetchJobForm(SCHEDULE_INTERVIEW));
  // }, []);

  // useEffect(() => {
  //   if (form) {
  //     setFormTemplate(form);
  //   }
  // }, [form]);

  // const setTableDataWithEffect = async (data) => {
  //   const processedContent = await TemplateHelper.runEffects(
  //     data.content,
  //     null,
  //     allModuleData,
  //     true
  //   );
  //   setTableTemplateData({ ...data, content: processedContent });
  // };

  // useEffect(() => {
  //   if (tableTemplateData) {
  //     setTableTemplateData(null);
  //   }
  // }, [tableTemplateData]);

  // const attachmentTemplate = async (filterTemplate) => {
  //   if (!filterTemplate) return;
  //   setAttachmentLoading(true);
  //   try {
  //     const processedTemplate =
  //       await TemplateHelper.setSelectedContentAndProcessed(
  //         filterTemplate.content,
  //         allModuleData
  //       );

  //     if (processedTemplate) {
  //       const file = await ExportHelper.exportBackendHtml2PdfFile(
  //         processedTemplate.html,
  //         {
  //           unit: "in",
  //           pageType: "A4",
  //           pageOrientation: "portrait",
  //           marginTop: 0,
  //           marginBottom: 0,
  //           marginLeft: 0,
  //           marginRight: 0,
  //           exportType: "pdf",
  //           fileName: `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}`,
  //         },
  //         processedTemplate.styleTag
  //       );
  //       setAttachments([...attachments, file]);
  //     }
  //   } catch (error) {
  //   } finally {
  //     setAttachmentLoading(false);
  //   }
  // };

  // const downloadAttachment = (attachment) => {
  //   // Assuming attachment.file is a Blob or File object
  //   const url = window.URL.createObjectURL(attachment);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = attachment.name;
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   a.remove();
  // };

  // Handle form submit
  // const handleFormSubmit = async (
  //   event,
  //   values,
  //   newValues,
  //   buttonNameHook,
  //   formStateHook,
  //   rerenderTable
  // ) => {
  //   let stageId = JOB_STAGE_IDS?.FIRST_INTERVIEW_SCHEDULED;
  //   let type = "first_interview_scheduled";

  //   if (activeStep === 12) {
  //     stageId = JOB_STAGE_IDS?.SECOND_INTERVIEW_SCHEDULED;
  //     type = "second_interview_scheduled";
  //   }

  //   if (activeStep === 14) {
  //     stageId = JOB_STAGE_IDS?.THIRD_INTERVIEW_SCHEDULED;
  //     type = "third_interview_scheduled";
  //   }

  //   const payload = {
  //     jobId: jobId,
  //     jobStageId: stageId,
  //     status: values?.profileFeedbackStatus ?? JOB_STAGE_STATUS?.COMPLETED,
  //     candidateId,
  //     formData: JSON.stringify(values),
  //     formId: parseInt(form.formId),
  //     jobType: type,
  //   };
  //   dispatch(tagJob({ payload, navigate }));
  //   closeOffcanvas();
  // };

  return (
    <React.Fragment>
      <div>
        {/* Title */}
        <Row>
          <Col>
            <EmailSubject
              formik={formik}
              name="subject"
              icon={<i className="mdi mdi-format-text fs-5"></i>}
            />
            <hr className="mt-2" />
          </Col>
        </Row>
        {/* Invite Attendees */}
        <Row>
          <Col>
            <EmailTo
              formik={formik}
              ToIcon={
                <i className="mdi mdi-account-multiple-plus-outline fs-5"></i>
              }
            />
            <hr className="mt-2" />
          </Col>
        </Row>

        <Row className="mb-3">
          {/* Timing */}
          <div className="d-flex flex-row align-items-center justify-content-start gap-3">
            <div
              className="rounded d-flex justify-content-center align-items-center"
              style={{
                height: "28px",
                width: "28px",
                backgroundColor: "#F5F5F5",
                border: "1px solid #A8A8A8",
                color: "#7A7A7A",
              }}
            >
              <i className="mdi mdi-calendar-plus fs-5"></i>
            </div>
            <div className="d-flex flex-row justify-content-between gap-2 w-100">
              <div className="d-flex flex-row justify-content-center align-items-center gap-2 3 w-100">
                <span
                  style={{
                    color: "#7A7A7A",
                    fontWeight: "100",
                  }}
                >
                  From
                </span>
                <Input type="date" className="input-custom" />
                <Input type="time" className="input-custom" />
              </div>

              <div className="d-flex flex-row justify-content-center align-items-center gap-2 w-100">
                <span
                  style={{
                    color: "#7A7A7A",
                    fontWeight: "100",
                  }}
                >
                  To
                </span>
                <Input className="input-custom" type="date" />
                <Input className="input-custom" type="time" />
              </div>

              <div className="w-100">
                <Input type="select" className="input-custom">
                  <option value="">Reminder</option>
                  <option value="Does not repeat">Does not repeat</option>
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </Input>
              </div>
            </div>
          </div>
        </Row>
        <Row className="mt-2 mb-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            {/* Location */}
            <Col lg={6}>
              <div className="d-flex flex-row">
                <div
                  className="rounded d-flex justify-content-center align-items-center"
                  style={{
                    height: "28px",
                    width: "28px",
                    backgroundColor: "#F5F5F5",
                    border: "1px solid #A8A8A8",
                    color: "#7A7A7A",
                  }}
                >
                  <i className="mdi mdi-map-marker-plus fs-5"></i>
                </div>

                {/* Use Bootstrap's form-control class to make the input 100% width */}
                <Input
                  type="text"
                  className="form-control"
                  style={{ border: "none" }}
                  placeholder="Enter Location"
                />
              </div>
              <hr className="m-0 p-0" />
            </Col>
            <Col lg={6}>
              <div className="d-flex flex-row align-items-center justify-content-start w-100">
                <div className="d-flex flex-row align-items-center justify-content-center gap-3 w-100">
                  <span>Or</span>
                  <FormGroup switch>
                    <Input
                      className="input-custom"
                      type="switch"
                      role="switch"
                    />
                  </FormGroup>
                  <span className="fw-semibold">Virtual Meeting</span>
                </div>
                <div className="w-100">
                  <Dropdown
                    isOpen={virtualMeetingOpen}
                    toggle={() => {
                      setVirtualMeetingOpen(!virtualMeetingOpen);
                    }}
                  >
                    <DropdownToggle
                      className="input-custom"
                      style={{
                        color: "#7A7A7A",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          width: "100%",
                          fontWeight: "200",
                        }}
                      >
                        <span>{selectedVirtualMeeting}</span>
                        <span className="mdi mdi-chevron-down"></span>
                      </div>
                    </DropdownToggle>
                    <DropdownMenu style={{ width: "100%" }}>
                      <DropdownItem
                        onClick={() => setSelectedVirtualMeeting("Google Meet")}
                        className="fw-light d-flex flex-row align-items-center justify-content-start gap-2"
                      >
                        <i className="mdi mdi-google-chrome"></i>
                        <span>Google Meet</span>
                      </DropdownItem>
                      <DropdownItem
                        onClick={() =>
                          setSelectedVirtualMeeting("Microsoft Teams")
                        }
                        className="fw-light d-flex flex-row align-items-center justify-content-start gap-2"
                      >
                        <i className="mdi mdi-microsoft-teams"></i>
                        <span>Microsoft Teams</span>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </div>
        </Row>
        {/* Template and CV */}
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
                          setTemplatePreviewAction({
                            type: "VIEW",
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
          <Col>
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
                              attachmentTemplate(data);
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

        {/* <Row className="mt-2 mb-3">
          <Col lg={6}>
            <div className="d-flex flex-row justify-content-start align-items-center gap-2">
              <div
                className="rounded d-flex justify-content-center align-items-center"
                style={{
                  height: "28px",
                  width: "28px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #A8A8A8",
                  color: "#7A7A7A",
                }}
              >
                <i className="mdi mdi-text-box-outline fs-5"></i>
              </div>
              <div className="w-100">
                <Input className="input-custom" type="select">
                  <option value="">Select Body Template</option>
                </Input>
              </div>
            </div>
          </Col>
          <Col lg={6}>
            <div className="d-flex flex-row justify-content-start align-items-center gap-2">
              <div
                className="rounded d-flex justify-content-center align-items-center"
                style={{
                  height: "28px",
                  width: "28px",
                  backgroundColor: "#F5F5F5",
                  border: "1px solid #A8A8A8",
                  color: "#7A7A7A",
                }}
              >
                <i className="mdi mdi-text-box-outline fs-5"></i>
              </div>
              <div className="w-100">
                <Input className="input-custom" type="select">
                  <option value="">Select CV Template</option>
                </Input>
              </div>
            </div>
          </Col>
        </Row> */}
        <Row>
          <Col>
            <TemplateDisplayV4
              injectData={tableTemplateData?.content ?? null}
              isAllLoading={false}
              content={emailTemplateData?.content ?? null}
              allData={"null"}
              isView={false}
              autoResize={false}
              height={385}
              onChange={(content) => {
                formik.setFieldValue("content", content);
              }}
              value={formik?.values?.["content"]}
              showLoading={false}
            />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <Form
              template={formTemplate}
              userDetails={getAllUserGroups()}
              country={null}
              editData={null}
              onSubmit={handleFormSubmit}
              onFormFieldsChange={null}
              errorMessage={null}
              view={view}
              ref={formikRef}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-row justify-content-end gap-4 m-2">
              <div className="d-flex flex-row gap-2 flex-nowrap">
                <Button
                  type="submit"
                  className="btn btn-custom-primary"
                  onClick={() => {
                    formikRef?.current?.formik?.submitForm();
                  }}
                >
                  Send Invite
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Col>
        </Row> */}
      </div>
    </React.Fragment>
  );
}

export default ScheduleInterview;
