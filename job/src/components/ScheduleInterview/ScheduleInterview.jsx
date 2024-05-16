import { AuditConstant } from "@workspace/common";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tagJobAttachment } from "../../store/actions";
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
  EmailTemplateSelect,
  TemplateDisplayV4,
  UseTemplateModuleDataHook,
} from "@workspace/common";
import { TemplateHelper, ExportHelper, ObjectHelper } from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { Actions } from "@workspace/common";
import EmailDateTime from "@workspace/common/src/Components/EmailV2/EmailDateTime";
import EmailReminder from "@workspace/common/src/Components/EmailV2/EmailReminder";
import EmailLocation from "@workspace/common/src/Components/EmailV2/EmailLocation";
import EmailTitle from "@workspace/common/src/Components/EmailV2/EmailTitle";
import { toast } from "react-toastify";
import { jobTimelineType } from "../JobOverview/JobOverviewConstants";

const ScheduleInterview = forwardRef(
  (
    {
      closeOffcanvas,
      setIsViewTemplate,
      setTemplatePreviewInfo,
      setTemplatePreviewAction,
      jobTimeLineData,
    },
    ref
  ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [emailTemplateData, setEmailTemplateData] = useState(null);
    const [tableTemplateData, setTableTemplateData] = useState(null);
    const [CVTemplateData, setCVTemplateData] = useState(null);

    const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: jobTimeLineData?.candidate?.id,
      jobId: jobTimeLineData?.job?.id,
    });

    const [attachments, setAttachments] = useState([]);
    const [attachmentLoading, setAttachmentLoading] = useState(false);
    const [virtualMeetingOpen, setVirtualMeetingOpen] = useState(false);
    const [selectedVirtualMeeting, setSelectedVirtualMeeting] = useState(
      "Select Virtual Meeting"
    );

    const emailSuccess = useSelector(
      (state) => state.EmailCommonReducer.success
    );

    const [disableVirtualMeeting, setDisableVirtualMeeting] = useState(true);
    const [disableEmailLocation, setDisableEmailLocation] = useState(false);
    const handleSwitchChange = () => {
      setDisableVirtualMeeting(!disableVirtualMeeting);
      setDisableEmailLocation(!disableEmailLocation);
    };

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
      // const newFormData =
      //   ObjectHelper.convertObjectToFormDataWithArray(newValues);
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

      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.FIRST_INTERVIEW_SCHEDULED,
        status: JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: null,
        formId: null,
        jobType: jobTimelineType.FIRST_INTERVIEW_SCHEDULED,
        emailRequest: {
          ...newValues,
        },
      };
      const formData = ObjectHelper.convertToFormDataNested(payload);
      dispatch(
        tagJobAttachment({
          formData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
              Audit: JSON.stringify({
                module: AuditConstant.moduleConstant.JOB_TIMELINE,
                moduleId: jobTimeLineData?.id,
                subModule:
                  AuditConstant.subModuleConstant.FIRST_INTERVIEW_SCHEDULED,
                jobId: jobTimeLineData?.job?.id,
                candidateId: jobTimeLineData?.candidate?.id,
                recruiterId: jobTimeLineData?.createdBy,
                salesId: jobTimeLineData?.job?.createdBy,
              }),
            },
          },
          jobType: jobTimelineType.FIRST_INTERVIEW_SCHEDULED,
          navigate,
        })
      );
      closeOffcanvas();
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
      initialValues: initialValues,
      validationSchema: schema,
      validateOnBlur: true,
      onSubmit: handleFormSubmit,
    });

    // Expose the submitForm method to the parent via ref
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        if (formik.isValid) {
          formik.handleSubmit();
        } else {
          toastErrors();
        }
      },
    }));

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

    return (
      <React.Fragment>
        <div className="p-3">
          {/* Title */}
          <Row>
            <Col>
              <EmailTitle
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
                <EmailDateTime formik={formik} period="From" />
                <EmailDateTime formik={formik} period="To" />
                <EmailReminder formik={formik} />
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
                  <EmailLocation
                    formik={formik}
                    disabled={disableEmailLocation}
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
                        type="switch"
                        role="switch"
                        onChange={handleSwitchChange}
                        checked={!disableVirtualMeeting}
                      />
                    </FormGroup>
                    <span className="fw-semibold">Virtual Meeting</span>
                  </div>
                  <div className="w-100">
                    <Dropdown
                      isOpen={virtualMeetingOpen}
                      toggle={() => setVirtualMeetingOpen(!virtualMeetingOpen)}
                      disabled={disableVirtualMeeting}
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
                          onClick={() =>
                            setSelectedVirtualMeeting("Google Meet")
                          }
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
        </div>
      </React.Fragment>
    );
  }
);
export default ScheduleInterview;
