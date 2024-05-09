import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import {
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  EmailTemplateSelect,
  TemplateDisplayV4,
  UseTemplateModuleDataHook,
  EmailAttachments,
} from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { toast } from "react-toastify";
import { TemplateHelper, ExportHelper, ObjectHelper } from "@workspace/common";
import { useNavigate } from "react-router-dom";
import { AuditConstant } from "@workspace/common";
import { getUsersByIds } from "../../helpers/backend_helper";
import { DeleteCustomModal2 } from "@workspace/common";
import { tagJobAttachment } from "../../store/jobStage/action";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { jobTimelineType } from "../JobOverview/JobOverviewConstants";
import { getJobCandidateStage } from "../../helpers/backend_helper";

const ConditionalOfferRelease = forwardRef(
  (
    {
      candidateId,
      jobId,
      setIsViewTemplate,
      setTemplatePreviewInfo,
      setTemplatePreviewAction,
      setOffcanvasForm,
      jobTimeLineData,
    },
    ref
  ) => {
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
    const [confirmCVNotAttachedModal, setConfirmCVNotAttachedModal] =
      useState(false);
    const [preparedConditionalOffer, setPreparedConditionalOffer] =
      useState(null);

    useEffect(() => {
      if (
        jobTimeLineData?.timeline?.["Conditional Offer Sent"]?.status ===
        "COMPLETED"
      ) {
        // setEditContentLoading(true);
        getJobCandidateStage({
          jobId: jobId,
          candidateId: jobTimeLineData?.candidate?.id,
          jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER,
        })
          .then((res) => {
            if (res?.data) {
              setPreparedConditionalOffer(res?.data?.submissionData);
              attachmentTemplate(res?.data?.submissionData);
            }
          })
          .finally(() => {
            // setEditContentLoading(false);
          });
      }
    }, []);

    /**
     * Handle form submit event (Formik)
     * @param {*} values
     */
    const handleFormSubmit = async (values) => {
      const newValues = { ...values };
      newValues.to = newValues.to.map((item) => item.value);
      newValues.cc = newValues.cc.map((item) => item.value);
      newValues.bcc = newValues.bcc.map((item) => item.value);
      const payload = {
        jobId: jobId,
        jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER,
        status: JOB_STAGE_STATUS?.RELEASED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: null,
        formId: null,
        jobType: jobTimelineType.CONDITIONAL_OFFER_RELEASED,
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
                subModule: AuditConstant.subModuleConstant.CONDITIONAL_OFFER,
                jobId: jobTimeLineData?.job?.id,
                candidateId: jobTimeLineData?.candidate?.id,
                recruiterId: jobTimeLineData?.createdBy,
                salesId: jobTimeLineData?.job?.createdBy,
              }),
            },
          },
          jobType: jobTimelineType.CONDITIONAL_OFFER_RELEASED,
          navigate,
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
    useImperativeHandle(ref, () => ({
      submitForm: () => {
        if (formik.isValid) {
          if (attachments.length === 0) {
            setConfirmCVNotAttachedModal(true);
            return;
          }
          formik.handleSubmit();
        } else {
          toastErrors();
        }
      },
    }));

    // PrePopulate Emails
    useEffect(() => {
      const prePopulateEmails = async (data) => {
        const response = await getUsersByIds({
          userIds: [data?.recruiterId],
        });
        const userData = response?.data;
        if (userData) {
          const cc = userData.filter((item) => item.id === data.recruiterId);
          if (data?.candidateEmail) {
            formik.setFieldValue("to", [
              {
                value: data?.candidateEmail,
                label: data?.candidateEmail,
              },
            ]);
          }
          if (cc && cc.length > 0) {
            formik.setFieldValue("cc", [
              {
                value: cc[0]?.email,
                label: cc[0]?.email,
              },
            ]);
          }
        }
      };
      console.log(jobTimeLineData, formik, "jobTimeLineData");
      // Get Sales Email
      if (
        jobTimeLineData?.job?.createdBy &&
        jobTimeLineData?.candidate &&
        formik
      ) {
        const candidateEmail =
          jobTimeLineData?.candidate?.candidateSubmissionData?.email;
        const recruiterId = jobTimeLineData?.candidate?.createdBy;
        prePopulateEmails({
          candidateEmail,
          recruiterId,
        });
      }
    }, []);

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

      try {
        const processedTemplate =
          await TemplateHelper.setSelectedContentAndProcessed(
            filterTemplate.content,
            allModuleData
          );

        if (processedTemplate) {
          let fileName = "Conditional Offer";
          if (
            allModuleData?.Candidates?.basicInfo?.firstName &&
            allModuleData?.Candidates?.basicInfo?.lastName
          ) {
            fileName = `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}_Conditional_Offer.pdf`;
          }
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
              fileName: fileName,
            },
            processedTemplate.styleTag
          );
          setAttachments([...attachments, file]);
        }
      } catch (error) {
      } finally {
      }
    };

    const confirmSendEmail = () => {
      setConfirmCVNotAttachedModal(false);
      formik.handleSubmit();
    };

    return (
      <div className="p-3">
        <Row>
          <Col>
            <EmailTo
              formik={formik}
              ToIcon={<i className="ri-mail-fill fs-5"></i>}
            />
            <hr className="mt-2" />
          </Col>
        </Row>

        <Row>
          <Col>
            <EmailCCBCC formik={formik} CCicon={<span>Cc</span>} BCC />
            <hr className="mt-2" />
          </Col>
        </Row>

        <Row>
          <Col>
            <EmailSubject
              formik={formik}
              name="subject"
              icon={<i className="ri-text fs-5"></i>}
            />
            <hr className="mt-2" />
          </Col>
        </Row>

        <Row className="d-flex">
          <Col>
            {/* Main Template Select */}
            <EmailTemplateSelect
              icon={<i className=" ri-file-list-2-line fs-5"></i>}
              category="Email Templates"
              placeholder="Select Email Template"
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
              isLoading={attachmentLoading}
              placeholder="Attach Condition Offer"
              icon={<i className=" ri-file-list-2-line fs-5"></i>}
              value={CVTemplateData}
              setTemplateData={setCVTemplateData}
              category="Conditional Offer"
              selectRender={(data) => {
                return (
                  <>
                    <div className="d-flex align-items-center">
                      <span
                        className="flex-grow-1"
                        onClick={async (event) => {
                          try {
                            setAttachmentLoading(true);
                            await attachmentTemplate(data?.data);
                          } catch (error) {
                          } finally {
                            setAttachmentLoading(false);
                          }
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
                            action: async (data) => {
                              await attachmentTemplate(data);
                              setIsViewTemplate(false);
                            },
                          });
                        }}
                      ></i>
                    </div>
                  </>
                );
              }}
              addMoreOptions={{
                addMoreStart: true,
                addMore: true,
                addMoreLabel: "Add New Template",
                render: (
                  <>
                    <div className="d-flex align-items-center">
                      <span
                        className="flex-grow-1 fw-semibold cursor-pointer"
                        onClick={async (event) => {
                          try {
                            setAttachmentLoading(true);
                            await attachmentTemplate(null);
                          } catch (error) {
                          } finally {
                            setAttachmentLoading(false);
                          }
                        }}
                      >
                        {"Prepared Conditional Offer"}
                      </span>
                      <i
                        className="ri-eye-line cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault(); // Prevents the menu from closing
                          event.stopPropagation(); // Stops selection
                          setIsViewTemplate(true);
                          setTemplatePreviewInfo(preparedConditionalOffer);
                          setTemplatePreviewAction({
                            type: "ATTACH_TEMPLATE",
                            label: "Attach Template",
                            action: async (data) => {
                              await attachmentTemplate(data);
                              setIsViewTemplate(false);
                            },
                          });
                        }}
                      ></i>
                    </div>
                  </>
                ),
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
              height={405}
              onChange={(content) => {
                formik.setFieldValue("content", content);
              }}
              value={formik?.values?.["content"]}
              showLoading={false}
            />
          </Col>
        </Row>
        <div className="mt-2">
          <EmailAttachments
            attachments={attachments}
            setAttachments={setAttachments}
            num={4}
          />
        </div>
        <DeleteCustomModal2
          confirmButtonText="Send"
          isOpen={confirmCVNotAttachedModal}
          setIsOpen={setConfirmCVNotAttachedModal}
          confirmDelete={confirmSendEmail}
          header="Confirmation"
          deleteText={
            "Conditional offer attachment not found. Would you like to proceed with sending the email to sales anyway?"
          }
          toggle
          width="350px"
        />
      </div>
    );
  }
);

export default ConditionalOfferRelease;
