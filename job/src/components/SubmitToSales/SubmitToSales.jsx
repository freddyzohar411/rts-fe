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
import { Actions, AuditConstant } from "@workspace/common";

const SubmitToSales = forwardRef(
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
    const emailSuccess = useSelector(
      (state) => state.EmailCommonReducer.success
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
              Audit: JSON.stringify({
                module: AuditConstant.moduleConstant.JOB_TIMELINE,
                moduleId: jobTimeLineData?.id,
                subModule: AuditConstant.subModuleConstant.SUBMIT_TO_SALES,
                jobId: jobTimeLineData?.job?.id,
                candidateId: jobTimeLineData?.candidate?.id,
                recruiterId: jobTimeLineData?.createdBy,
                salesId: jobTimeLineData?.job?.createdBy,
              }),
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
          let fileName = "candidate_cv";
          if (
            allModuleData?.Candidates?.basicInfo?.firstName &&
            allModuleData?.Candidates?.basicInfo?.lastName
          ) {
            fileName = `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}`;
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

    return (
      <div>
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
                          setTemplatePreviewAction({
                            type: "VIEW",
                          });
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
              isLoading={attachmentLoading}
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
              height={350}
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
      </div>
    );
  }
);

export default SubmitToSales;
