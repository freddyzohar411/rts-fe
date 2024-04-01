import React, { useEffect, useState, useRef } from "react";
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

function CulturalFitTest({ closeOffcanvas, jobId, candidateId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formikRef = useRef(null);

  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  useEffect(() => {
    dispatch(fetchJobForm("cultural_fit_test"));
  }, []);

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
    const payload = {
      jobId: jobId,
      jobStageId: JOB_STAGE_IDS?.CULTURAL_FIT_TEST,
      status:
        values?.culturalFitTestResults === "true"
          ? JOB_STAGE_STATUS?.COMPLETED
          : JOB_STAGE_STATUS?.REJECTED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: "cultural_fit_test",
    };
    dispatch(tagJob({ payload, navigate }));
    closeOffcanvas();
  };

  const handleCancel = () => {
    closeOffcanvas();
  };
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
                editData={null}
                onSubmit={handleFormSubmit}
                onFormFieldsChange={null}
                errorMessage={null}
                view={view}
                ref={formikRef}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex justify-content-end gap-2">
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn btn-custom-primary"
                onClick={() => {
                  formikRef?.current?.formik?.submitForm();
                }}
              >
                Update
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default CulturalFitTest;
