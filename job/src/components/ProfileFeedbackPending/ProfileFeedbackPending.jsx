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

const ProfileFeedbackPending = forwardRef(
  ({ closeOffcanvas, jobId, candidateId, handleIconClick }, ref) => {
    const formikRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const linkState = location.state;
    const { getAllUserGroups } = useUserAuth();

    const [view] = useState(
      linkState?.view !== null && linkState?.view !== undefined
        ? linkState?.view
        : false
    );

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    useEffect(() => {
      dispatch(fetchJobForm(PROFILE_FEEDBACK_PENDING));
    }, []);

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
            editData={null}
            onSubmit={handleFormSubmit}
            errorMessage={null}
            view={view}
            ref={formikRef}
          />
        </div>
      </React.Fragment>
    );
  }
);

export default ProfileFeedbackPending;
