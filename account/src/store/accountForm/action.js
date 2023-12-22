import {
  FETCH_ACCOUNTFORM,
  FETCH_ACCOUNTFORM_SUCCESS,
  FETCH_ACCOUNTFORM_FAILURE,
  FETCH_ACCOUNTFORM_SUBMISSION,
  FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS,
  FETCH_ACCOUNTFORM_SUBMISSION_FAILURE,
  CLEAR_ACCOUNTFORM_SUBMISSION,
  SET_FORM_SUBMISSION
} from "./actionTypes";

// Fetch form by id
export const fetchAccountForm = (formName) => ({
  type: FETCH_ACCOUNTFORM,
  payload: formName,
});

export const fetchAccountFormSuccess = (form) => ({
  type: FETCH_ACCOUNTFORM_SUCCESS,
  payload: form,
});

export const fetchAccountFormFailure = (error) => ({
  type: FETCH_ACCOUNTFORM_FAILURE,
  payload: error,
});

// Fetch form submission
export const fetchAccountFormSubmission = (formName, accountId) => ({
  type: FETCH_ACCOUNTFORM_SUBMISSION,
  payload: { formName, accountId },
});

export const fetchAccountFormSubmissionSuccess = (form) => ({
  type: FETCH_ACCOUNTFORM_SUBMISSION_SUCCESS,
  payload: form,
});

export const fetchAccountFormSubmissionFailure = (error) => ({
  type: FETCH_ACCOUNTFORM_SUBMISSION_FAILURE,
  payload: error,
});

export const clearAccountFormSubmission = () => ({
  type: CLEAR_ACCOUNTFORM_SUBMISSION,
});

export const setFormSubmission = (form) => ({
  type: SET_FORM_SUBMISSION,
  payload: form,
});






