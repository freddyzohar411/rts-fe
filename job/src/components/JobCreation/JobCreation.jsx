import React, { useState, useEffect, useCallback } from "react";
import { Container, Button, Card, CardBody } from "reactstrap";
import { Form } from "@workspace/common";
import { JOB_FORM_NAME } from "./constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobFormSubmission,
  createJob,
  fetchJobForm,
  fetchJobFormSubmission,
} from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import JobDocument from "./JobDocument";
import { useRef } from "react";

const JobCreation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();
  const { jobId, type } = useParams();
  // const isView = type === "view";
  const location = useLocation();
  const linkState = location.state;
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [randomId, setRandomId] = useState(jobId ? jobId : -99);

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchJobForm(JOB_FORM_NAME));
  }, []);

  /**
   * Fetch form template based on step
   * Can make changes to form template here before loading to form
   */
  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  useEffect(() => {
    dispatch(clearJobFormSubmission());
    if (jobId) {
      dispatch(fetchJobFormSubmission(jobId));
    }
  }, [jobId]);

  /**
   * Get Form field data from Form component
   */
  const handleFormFieldChange = useCallback((formFields) => {
    setFormFieldsData(formFields);
  }, []);

  const checkReadEditPermission = () => {
    return checkAllPermission([Permission.JOB_EDIT, Permission.JOB_READ]);
  };

  const toggleFormViewState = () => {
    setView(!view);
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
    // Check files array is empty or not
    const payload = {
      id: jobId,
      title: values?.jobTitle,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      tempDocId: randomId,
    };
    dispatch(createJob({ payload, navigate }));
  };

  document.title = "Job Creation | RTS";
  return (
    <div className="">
      {/* <Container> */}
      {/* <Card>
          <CardBody> */}
      <Form
        template={formTemplate}
        userDetails={getAllUserGroups()}
        country={"India"}
        editData={formSubmissionData}
        onSubmit={handleFormSubmit}
        onFormFieldsChange={handleFormFieldChange}
        errorMessage={null}
        view={view}
        ref={formikRef}
      />
      <JobDocument jobId={randomId} view={view} />
      {/* <div className="d-flex flex-row-reverse gap-3 mb-2"> */}
      <div
        className={`d-flex ${
          jobId && checkReadEditPermission()
            ? "justify-content-between"
            : "justify-content-end"
        } align-items-center mb-2`}
      >
        {jobId && checkReadEditPermission() && (
          <Button
            onClick={toggleFormViewState}
            className="btn btn-custom-primary"
          >
            {view ? "Edit" : "View"}
          </Button>
        )}
        <div className="d-flex gap-2">
          <Button type="button" onClick={() => navigate("/jobs")}>
            Cancel
          </Button>
          <Button
            className="btn btn-success"
            type="button"
            disabled={view}
            onClick={() => {
              formikRef.current.formik.submitForm();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
      {/* </CardBody>
        </Card> */}
      {/* </Container> */}
    </div>
  );
};

export default JobCreation;
