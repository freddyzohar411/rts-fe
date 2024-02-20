import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SCHEDULE_INTERVIEW } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Button } from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

function ScheduleInterview({ closeOffcanvas, jobId, candidateId, activeStep }) {
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

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  useEffect(() => {
    dispatch(fetchJobForm(SCHEDULE_INTERVIEW));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
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
    let stageId = JOB_STAGE_IDS?.FIRST_INTERVIEW_SCHEDULED;
    let type = "first_interview_scheduled";

    if (activeStep === 7) {
      stageId = JOB_STAGE_IDS?.SECOND_INTERVIEW_SCHEDULED;
      type = "second_interview_scheduled";
    }

    if (activeStep === 9) {
      stageId = JOB_STAGE_IDS?.THIRD_INTERVIEW_SCHEDULED;
      type = "third_interview_scheduled";
    }

    const payload = {
      jobId: jobId,
      jobStageId: stageId,
      status: values?.profileFeedbackStatus ?? JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: type,
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
                  Send Invite
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

export default ScheduleInterview;
