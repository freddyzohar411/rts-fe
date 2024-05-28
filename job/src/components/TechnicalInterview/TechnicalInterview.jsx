import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { fetchJobForm, tagJob } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { OdinURLs } from "../JobOverview/JobOverviewConstants";
import {
  fetchJobTimelineFormSubmission,
  fetchJobTimelineFormSubmissionReset,
} from "../../store/jobStage/action";

const TechnicalInterview = forwardRef(
  (
    { closeOffcanvas, jobId, candidateId, readOnly = false, jobTimeLineData },
    parentRef
  ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);
    const formSubmissionData = useSelector(
      (state) => state.JobStageReducer.jobTimelineFormSubmission
    );
    const [rejectedData, setRejectedData] = useState(null);

    const { getAllUserGroups } = useUserAuth();

    useEffect(() => {
      dispatch(fetchJobForm("technical_interview"));
    }, []);

    useEffect(() => {
      if (
        jobTimeLineData &&
        jobTimeLineData?.timeline?.["Technical Interview"]
      ) {
        if (
          jobTimeLineData?.timeline?.["Technical Interview"]?.status ===
          "REJECTED"
        ) {
          setRejectedData({
            technicalInterviewResults: false,
          });
        }
        if (
          jobTimeLineData?.timeline?.["Technical Interview"]?.status ===
          "COMPLETED"
        ) {
          dispatch(
            fetchJobTimelineFormSubmission({
              jobId: jobTimeLineData?.job?.id,
              jobStageId: JOB_STAGE_IDS?.CULTURAL_FIT_TEST,
              candidateId: jobTimeLineData?.candidate?.id,
            })
          );
        }
      }
      return () => {
        dispatch(fetchJobTimelineFormSubmissionReset());
      };
    }, [jobTimeLineData]);

    useEffect(() => {
      if (form) {
        setFormTemplate(form);
      }
    }, [form]);

    const handleFormSubmit = async (
      event,
      values,
      newValues,
      buttonNameHook,
      formStateHook,
      rerenderTable
    ) => {
      if (values?.technicalInterviewResults === "false") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.TECHNICAL_INTERVIEW,
          status: JOB_STAGE_STATUS?.REJECTED,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "technical_interview",
          stepName: "Interview",
          subStepName: "Technical Interview",
        };
        dispatch(tagJob({ payload, navigate }));
      } else if (values?.technicalInterviewResults === "true") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.CULTURAL_FIT_TEST,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "cultural_fit_test",
          stepName: "Odin",
          subStepName: "Technical Interview",
        };
        dispatch(tagJob({ payload, navigate }));
        if (values?.scheduleForCulturalFitTest === "true") {
          window.open(OdinURLs.CULTURAL_FIT_TEST, "_blank");
        }
      }
      closeOffcanvas();
    };

    useImperativeHandle(parentRef, () => ({
      submitForm: () => {
        formikRef?.current?.formik?.submitForm();
      },
    }));

    return (
      <React.Fragment>
        <div
          className="d-flex flex-column justiy-content-between h-100"
          style={{ height: "500px" }}
        >
          <Row>
            <Col>
              <div>
                <Form
                  template={formTemplate}
                  userDetails={getAllUserGroups()}
                  country={null}
                  editData={
                    formSubmissionData ? formSubmissionData : rejectedData
                  }
                  onSubmit={handleFormSubmit}
                  onFormFieldsChange={null}
                  errorMessage={null}
                  view={readOnly}
                  ref={formikRef}
                />
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
);

export default TechnicalInterview;
