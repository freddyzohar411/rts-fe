import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import { Actions, Form } from "@workspace/common";
import { JOB_FORM_NAME } from "./constants";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearJobFormSubmission,
  createJob,
  fetchDraftJob,
  fetchJobForm,
  fetchJobFormSubmission,
  updateJobEmbeddings,
  createJobReset,
} from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import JobDocument from "./JobDocument";
import { useRef } from "react";
import DeleteDraftModal from "./DeleteDraftModal";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { generateId } from "@workspace/common/src/helpers/generate_id_helper";

const JobCreation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();
  const { jobId } = useParams();

  const location = useLocation();
  const linkState = location.state;
  const [view, setView] = useState(
    linkState?.view !== null ? linkState?.view : true
  );

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const formSubmissionData = useSelector(
    (state) => state.JobFormReducer.formSubmission
  );

  const editId = useSelector((state) => state.JobFormReducer.editId);
  const accountById = useSelector(
    (state) => state.AccountNamesReducer.accountById
  );
  const accountByIdMeta = useSelector(
    (state) => state.AccountNamesReducer.accountByIdMeta
  );
  const businessCountries = useSelector(
    (state) => state.CountryCurrencyReducer.businessCountries
  );
  const jobLoading = useSelector((state) => state.JobReducer.loading);
  const jobSuccess = useSelector((state) => state.JobReducer.success);
  const jobError = useSelector((state) => state.JobReducer.error);
  const isDraftLoading = useSelector(
    (state) => state.JobReducer.isDraftLoading
  );

  const [formTemplate, setFormTemplate] = useState(null);
  const [randomId, setRandomId] = useState();
  const [deleteDraftModal, setDeleteDraftModal] = useState(false);
  const [formikValues, setFormikValues] = useState(null);

  // UseEffect for job loading
  useEffect(() => {
    if (jobSuccess) {
      dispatch(createJobReset());
    }
    if (jobError) {
      dispatch(createJobReset());
    }
  }, [jobSuccess, jobError]);

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(Actions.fetchBusinessCountries());
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
      setFormTemplate(form);
    }
  }, [form, view]);

  useEffect(() => {
    if (
      !jobId &&
      formikValues?.values?.accountName?.length > 0 &&
      accountById &&
      !accountByIdMeta?.isLoading
    ) {
      const cntry = businessCountries?.find(
        (bcountry) => bcountry?.name === accountById?.accountCountry
      );
      generateId("J", cntry?.iso3, "job")
        .then((id) => {
          formikRef.current.formik.setFieldValue("jobId", id);
        })
        .catch((e) => {});
    }
  }, [formikValues?.values?.accountName, accountById]);

  const onFormikChange = (formikValues) => {
    setFormikValues(formikValues);
  };

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

  const checkReadEditPermission = () => {
    return checkAllPermission([Permission.JOB_EDIT, Permission.JOB_READ]);
  };

  const toggleFormViewState = () => {
    setView((prevState) => !prevState);
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
      title: newValues?.jobTitle,
      formData: JSON.stringify(newValues),
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
      {formTemplate ? (
        <Form
          template={formTemplate}
          userDetails={getAllUserGroups()}
          country={null}
          editData={formSubmissionData}
          onSubmit={handleFormSubmit}
          onFormikChange={onFormikChange}
          onFormFieldsChange={null}
          errorMessage={null}
          view={view}
          ref={formikRef}
        />
      ) : (
        <Skeleton count={3} />
      )}

      {randomId ? (
        <JobDocument jobId={randomId} view={view} />
      ) : (
        <Skeleton count={3} />
      )}

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
            {isDraftLoading ? <Spinner size="sm" /> : "Cancel"}
          </Button>
          <Button
            className="btn btn-success"
            type="button"
            disabled={view}
            onClick={() => {
              formikRef.current.formik.submitForm();
            }}
          >
            {jobLoading ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobCreation;
