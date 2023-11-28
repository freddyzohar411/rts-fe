import React, { useState, useEffect, useCallback } from "react";
import { Container, Button } from "reactstrap";
import { Form } from "@workspace/common";
import { JOB_FORM_NAME } from "./constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobFormSubmission,
  createJob,
  fetchJobForm,
} from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import JobDocument from "./JobDocument";

function JobCreation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();
  const jobId = null;

  const form = useSelector((state) => state.JobFormReducer.form);
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const [formFormik, setFormFormik] = useState(null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formTemplate, setFormTemplate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setEditData(null);
    if (jobId) {
      dispatch(
        fetchAccountFormSubmission(
          AccountEntityConstant.ACCOUNT_ACCOUNT,
          accountId
        )
      );
    }
  }, [jobId]);

  /**
   * Get Formik hook from Form component
   */
  const handleFormikChange = useCallback((formik) => {
    // Handle formik change here
    setFormFormik(formik);
  }, []);

  /**
   * Get Form field data from Form component
   */
  const handleFormFieldChange = useCallback((formFields) => {
    setFormFieldsData(formFields);
  }, []);

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
      title: values?.jobTitle,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
    };
    dispatch(createJob(payload));
  };

  document.title = "Job Creation | RTS";

  return (
    <Container className="page-content">
      <Form
        template={formTemplate}
        userDetails={getAllUserGroups()}
        country={"India"}
        editData={formSubmissionData}
        onFormikChange={handleFormikChange}
        onSubmit={handleFormSubmit}
        onFormFieldsChange={handleFormFieldChange}
        errorMessage={errorMessage}
        view={false}
      />
      {/* <JobDocument /> */}
      <div className="d-flex flex-row-reverse gap-3 mb-2">
        <Button
          className="btn btn-success"
          type="button"
          onClick={() => {
            formFormik.submitForm();
          }}
        >
          Submit
        </Button>
        <Button type="button" onClick={() => {}}>
          Cancel
        </Button>
      </div>
    </Container>
  );
}

export default JobCreation;
