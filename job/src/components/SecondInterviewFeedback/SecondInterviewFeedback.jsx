import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SECOND_INTERVIEW_FEEDBACK_PENDING } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Button } from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

function SecondInterviewFeedbackPending({
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

  const formikRef = useRef();
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  useEffect(() => {
    dispatch(fetchJobForm(SECOND_INTERVIEW_FEEDBACK_PENDING));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  const onFormikChange = (formik) => {
    if (formik?.values?.profileFeedbackStatus === "COMPLETED") {
      handleIconClick(candidateId, jobId, 9, true);
    } else if (formik?.values?.profileFeedbackStatus === "SECOND_INTERVIEW") {
      handleIconClick(candidateId, jobId, 7, true);
    }
  };

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
      jobStageId: JOB_STAGE_IDS?.SECOND_INTERVIEW_SCHEDULED,
      status: values?.profileFeedbackStatus ?? JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: "second_interview_feedback_pending",
    };
    dispatch(tagJob({ payload, navigate }));
    closeOffcanvas();
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
              onFormikChange={onFormikChange}
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

export default SecondInterviewFeedbackPending;
