import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
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

const CodingTest = forwardRef(
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

    const linkState = location.state;
    const { getAllUserGroups } = useUserAuth();
    const formSubmissionData = useSelector(
      (state) => state.JobStageReducer.jobTimelineFormSubmission
    );

    useEffect(() => {
      dispatch(fetchJobForm("coding_test"));
    }, []);

    useEffect(() => {
      if (jobTimeLineData && jobTimeLineData?.timeline?.["Coding Test"]) {
        if (jobTimeLineData?.timeline?.["Coding Test"]?.status === "REJECTED") {
          dispatch(
            fetchJobTimelineFormSubmission({
              jobId: jobTimeLineData?.job?.id,
              jobStageId: JOB_STAGE_IDS?.CODING_TEST,
              candidateId: jobTimeLineData?.candidate?.id,
            })
          );
        }
        if (
          jobTimeLineData?.timeline?.["Coding Test"]?.status === "COMPLETED"
        ) {
          dispatch(
            fetchJobTimelineFormSubmission({
              jobId: jobTimeLineData?.job?.id,
              jobStageId: JOB_STAGE_IDS?.TECHNICAL_INTERVIEW,
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
      if (values?.codingTestResults === "false") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.CODING_TEST,
          status: JOB_STAGE_STATUS?.REJECTED,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "coding_test",
        };
        dispatch(tagJob({ payload, navigate }));
      } else if (values?.codingTestResults === "true") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.TECHNICAL_INTERVIEW,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "technical_interview",
        };
        dispatch(tagJob({ payload, navigate }));
        if (values?.scheduleForTechnicalInterview === "true") {
          window.open(OdinURLs.TECHNICAL_INTERVIEW_ASSESSMENT, "_blank");
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
                  editData={formSubmissionData ? formSubmissionData : null}
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

export default CodingTest;
