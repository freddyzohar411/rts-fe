import {
  FETCH_CANDIDATEFORM,
  FETCH_CANDIDATEFORM_SUCCESS,
  FETCH_CANDIDATEFORM_FAILURE,
  FETCH_CANDIDATEFORM_SUBMISSION,
  FETCH_CANDIDATEFORM_SUBMISSION_SUCCESS,
  FETCH_CANDIDATEFORM_SUBMISSION_FAILURE,
  CLEAR_CANDIDATEFORM_SUBMISSION,
  SET_FORM_SUBMISSION
} from "./actionTypes";

// Fetch form by id
export const fetchCandidateForm = (formName) => ({
  type: FETCH_CANDIDATEFORM,
  payload: formName,
});

export const fetchCandidateFormSuccess = (form) => ({
  type: FETCH_CANDIDATEFORM_SUCCESS,
  payload: form,
});

export const fetchCandidateFormFailure = (error) => ({
  type: FETCH_CANDIDATEFORM_FAILURE,
  payload: error,
});

// Fetch form submission
export const fetchCandidateFormSubmission = (formName, accountId) => ({
  type: FETCH_CANDIDATEFORM_SUBMISSION,
  payload: { formName, accountId },
});

export const fetchCandidateFormSubmissionSuccess = (form) => ({
  type: FETCH_CANDIDATEFORM_SUBMISSION_SUCCESS,
  payload: form,
});

export const fetchCandidateFormSubmissionFailure = (error) => ({
  type: FETCH_CANDIDATEFORM_SUBMISSION_FAILURE,
  payload: error,
});

export const clearCandidateFormSubmission = () => ({
  type: CLEAR_CANDIDATEFORM_SUBMISSION,
});

export const setFormSubmission = (form) => ({
  type: SET_FORM_SUBMISSION,
  payload: form,
});






