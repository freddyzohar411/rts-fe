import {
  FETCH_ACCOUNTFORM,
  FETCH_ACCOUNTFORM_SUCCESS,
  FETCH_ACCOUNTFORM_FAILURE,
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



