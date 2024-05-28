import { Form } from "@workspace/common";
import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_FEEDBACK_PENDING } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import {
  fetchJobTimelineFormSubmission,
  fetchJobTimelineFormSubmissionReset,
} from "../../store/jobStage/action";

const ProfileFeedbackPending = forwardRef(
  (
    {
      closeOffcanvas,
      jobId,
      candidateId,
      handleIconClick,
      jobTimeLineData,
      readOnly = false,
    },
    ref
  ) => {
    const formikRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { getAllUserGroups } = useUserAuth();

    const formSubmissionData = useSelector(
      (state) => state.JobStageReducer.jobTimelineFormSubmission
    );

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    useEffect(() => {
      dispatch(fetchJobForm(PROFILE_FEEDBACK_PENDING));
    }, []);

    // Set candidate salaries on associate page
    useEffect(() => {
      if (
        jobTimeLineData &&
        jobTimeLineData?.timeline?.["Profile Feedback Pending"]
      ) {
        dispatch(
          fetchJobTimelineFormSubmission({
            jobId: jobTimeLineData?.job?.id,
            jobStageId: JOB_STAGE_IDS?.PROFILE_FEEDBACK_PENDING,
            candidateId: jobTimeLineData?.candidate?.id,
          })
        );
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

    useImperativeHandle(ref, () => ({
      submitForm: () => {
        formikRef?.current?.formik?.submitForm();
      },
    }));

    // Handle form submit
    const handleFormSubmit = async (
      event,
      values,
      newValues,
      buttonNameHook,
      formStateHook,
      rerenderTable
    ) => {
      const payload = {
        jobId: jobId,
        jobStageId: JOB_STAGE_IDS?.PROFILE_FEEDBACK_PENDING,
        status: values?.profileFeedbackStatus ?? JOB_STAGE_STATUS?.COMPLETED,
        candidateId,
        formData: JSON.stringify(values),
        formId: parseInt(form.formId),
        jobType: "profile_feedback_pending",
        stepName: "Profile",
        subStepName: "Profile Status",
      };
      dispatch(tagJob({ payload, navigate }));
      closeOffcanvas();
    };

    return (
      <React.Fragment>
        <div style={{ marginTop: 10 }}>
          <Form
            template={formTemplate}
            userDetails={getAllUserGroups()}
            country={null}
            editData={formSubmissionData || null}
            onSubmit={handleFormSubmit}
            errorMessage={null}
            view={readOnly}
            ref={formikRef}
          />
        </div>
      </React.Fragment>
    );
  }
);

export default ProfileFeedbackPending;
