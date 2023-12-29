import React, { useState, useEffect, useCallback } from "react";
import { Button } from "reactstrap";
import { Form } from "@workspace/common";
import { JOB_FORM_NAME } from "./constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobFormSubmission,
  createJob,
  fetchDraftJob,
  fetchJobForm,
  fetchJobFormSubmission,
} from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import JobDocument from "./JobDocument";
import { useRef } from "react";
import DeleteDraftModal from "./DeleteDraftModal";

const JobCreation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();
  const { jobId } = useParams();

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
  const editId = useSelector((state) => state.JobFormReducer.editId);
  const [formFieldsData, setFormFieldsData] = useState([]);
  const [formTemplate, setFormTemplate] = useState(null);
  const [randomId, setRandomId] = useState();
  const [deleteDraftModal, setDeleteDraftModal] = useState(false);

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchJobForm(JOB_FORM_NAME));
    if (!jobId) {
      dispatch(fetchDraftJob());
    }
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
    if (jobId) {
      setRandomId(jobId);
    } else if (editId && formSubmissionData) {
      setRandomId(editId);
    } else {
      setRandomId(-99);
    }
  }, [jobId, editId]);

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
      id: (jobId || editId) ?? null,
      title: values?.jobTitle,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      tempDocId: randomId,
      isDraft: false,
    };
    dispatch(createJob({ payload, navigate }));
  };

  const handleCancel = () => {
    if (!jobId) {
      const values = formikRef?.current?.formik?.values;
      if (values?.jobTitle) {
        const payload = {
          id: editId,
          title: values?.jobTitle,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          tempDocId: editId ? editId : -99,
          isDraft: true,
        };
        dispatch(createJob({ payload, navigate }));
      } else {
        navigate("/jobs");
      }
    } else {
      navigate("/jobs");
    }
  };

  document.title = "Job Creation | RTS";
  return (
    <div>
      <DeleteDraftModal
        modal={deleteDraftModal}
        setModal={setDeleteDraftModal}
        deleteId={randomId}
      />
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
      <div className={`d-flex justify-content-between align-items-center mb-2`}>
        <div className="d-flex gap-2">
          {jobId && checkReadEditPermission() && (
            <Button
              onClick={toggleFormViewState}
              className="btn btn-custom-primary"
            >
              {view ? "Edit" : "View"}
            </Button>
          )}
          {!jobId && editId && (
            <Button
              type="button"
              className="btn btn-danger"
              onClick={() => setDeleteDraftModal(true)}
            >
              Reset
            </Button>
          )}
        </div>
        <div className="d-flex gap-2">
          <Button type="button" onClick={() => handleCancel()}>
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
    </div>
  );
};

export default JobCreation;