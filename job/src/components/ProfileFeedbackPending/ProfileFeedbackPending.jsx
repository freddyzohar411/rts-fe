import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_FEEDBACK_PENDING } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Button } from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

function ProfileFeedbackPending({
  closeOffcanvas,
  jobId,
  candidateId,
  handleIconClick,
}) {
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

  const formikRef = useCallback((node) => {
    if (node?.formik?.values?.profileFeedbackStatus === "COMPLETED") {
      handleIconClick(candidateId, jobId, 5, true);
    }
  }, []);

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
    };
    dispatch(tagJob({ payload, navigate }));
  };

  const handleCancel = () => {
    closeOffcanvas();
  };

  return (
    <React.Fragment>
      <div>
        <Row>
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
                  Update
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
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ProfileFeedbackPending;
