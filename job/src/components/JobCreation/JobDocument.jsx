import React, { useState, useEffect, useCallback } from "react";
import { Form } from "@workspace/common";
import { JOB_DOCUMENT_NAME } from "./constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobFormSubmission,
  fetchJobDocumentForm,
} from "../../store/actions";
import { useUserAuth } from "@workspace/login";

const JobDocument = () => {
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();
  const { jobId, type } = useParams();

  const documentForm = useSelector(
    (state) => state.JobFormReducer.documentForm
  );
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const [formFormik, setFormFormik] = useState(null);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [editData, setEditData] = useState(formSubmissionData || null);
  const [formTemplate, setFormTemplate] = useState(null);

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchJobDocumentForm(JOB_DOCUMENT_NAME));
  }, []);

  /**
   * Fetch form template based on step
   * Can make changes to form template here before loading to form
   */
  useEffect(() => {
    if (documentForm) {
      setFormTemplate(JSON.parse(JSON.stringify(documentForm)));
    }
  }, [documentForm]);

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
  };

  document.title = "Job Creation | RTS";

  return (
    <Form
      template={formTemplate}
      userDetails={getAllUserGroups()}
      country={"India"}
      editData={formSubmissionData}
      onFormikChange={handleFormikChange}
      onSubmit={handleFormSubmit}
      onFormFieldsChange={handleFormFieldChange}
      errorMessage={null}
      view={false}
    />
  );
};

export default JobDocument;
