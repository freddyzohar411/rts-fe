import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
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

const SkillAssessment = forwardRef(
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
      dispatch(fetchJobForm("skill_assessment"));
    }, []);

    useEffect(() => {
      if (jobTimeLineData && jobTimeLineData?.timeline?.["Skills Assessment"]) {
        if (
          jobTimeLineData?.timeline?.["Skills Assessment"]?.status ===
          "REJECTED"
        ) {
          dispatch(
            fetchJobTimelineFormSubmission({
              jobId: jobTimeLineData?.job?.id,
              jobStageId: JOB_STAGE_IDS?.SKILLS_ASSESSMENT,
              candidateId: jobTimeLineData?.candidate?.id,
            })
          );
        }
        if (
          jobTimeLineData?.timeline?.["Skills Assessment"]?.status ===
          "COMPLETED"
        ) {
          dispatch(
            fetchJobTimelineFormSubmission({
              jobId: jobTimeLineData?.job?.id,
              jobStageId: JOB_STAGE_IDS?.CODING_TEST,
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
      if (values?.skillAssessmentResults === "false") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.SKILLS_ASSESSMENT,
          status: JOB_STAGE_STATUS?.REJECTED,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "skills_assessment",
          stepName: "Odin",
          subStepName: "Skills Assessment",
        };
        dispatch(tagJob({ payload, navigate }));
      } else if (values?.skillAssessmentResults === "true") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.CODING_TEST,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "coding_test",
          stepName: "Odin",
          subStepName: "Skills Assessment",
        };
        dispatch(tagJob({ payload, navigate }));

        if (values?.scheduleForCodingTest === "true") {
          window.open(OdinURLs.CODING_TEST_ASSESSMENT, "_blank");
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

export default SkillAssessment;
