import {
  FETCH_JOB_FORM,
  FETCH_JOB_FORM_SUCCESS,
  FETCH_JOB_FORM_FAILURE,
  FETCH_JOB_FORM_SUBMISSION,
  FETCH_JOB_FORM_SUBMISSION_SUCCESS,
  FETCH_JOB_FORM_SUBMISSION_FAILURE,
  CLEAR_JOB_FORM_SUBMISSION,
  SET_FORM_SUBMISSION,
  FETCH_JOB_DOCUMENT_FORM,
  FETCH_JOB_DOCUMENT_FORM_SUCCESS,
} from "./actionTypes";

// Fetch form by id
export const fetchJobForm = (formName) => ({
  type: FETCH_JOB_FORM,
  payload: formName,
});

export const fetchJobFormSuccess = (form) => ({
  type: FETCH_JOB_FORM_SUCCESS,
  payload: form,
});

export const fetchJobFormFailure = (error) => ({
  type: FETCH_JOB_FORM_FAILURE,
  payload: error,
});

// Fetch form by id
export const fetchJobDocumentForm = (formName) => ({
  type: FETCH_JOB_DOCUMENT_FORM,
  payload: formName,
});

export const fetchJobDocumentFormSuccess = (form) => ({
  type: FETCH_JOB_DOCUMENT_FORM_SUCCESS,
  payload: form,
});

export const fetchJobDocumentFormFailure = (error) => ({
  type: FETCH_JOB_FORM_FAILURE,
  payload: error,
});

// Fetch form submission
export const fetchJobFormSubmission = (jobId) => ({
  type: FETCH_JOB_FORM_SUBMISSION,
  payload: { jobId },
});

export const fetchJobFormSubmissionSuccess = (form) => ({
  type: FETCH_JOB_FORM_SUBMISSION_SUCCESS,
  payload: form,
});

export const fetchJobFormSubmissionFailure = (error) => ({
  type: FETCH_JOB_FORM_SUBMISSION_FAILURE,
  payload: error,
});

export const clearJobFormSubmission = () => ({
  type: CLEAR_JOB_FORM_SUBMISSION,
});

export const setFormSubmission = (form) => ({
  type: SET_FORM_SUBMISSION,
  payload: form,
});
