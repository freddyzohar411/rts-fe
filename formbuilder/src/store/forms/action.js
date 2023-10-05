import {
  FETCH_FORMS,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  FETCH_FORM,
  FETCH_FORM_SUCCESS,
  FETCH_FORM_FAILURE,
  DELETE_FORM,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,
  CREATE_FORM,
  CREATE_FORM_SUCCESS,
  CREATE_FORM_FAILURE,
  UPDATE_FORM,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,
  CLEAR_FORM,
} from "./actionTypes";

// Fetch forms
export const fetchForms = () => ({
  type: FETCH_FORMS,
});

export const fetchFormsSuccess = (forms) => ({
  type: FETCH_FORMS_SUCCESS,
  payload: forms,
});

export const fetchFormsFailure = (error) => ({
  type: FETCH_FORMS_FAILURE,
  payload: error,
});

// Fetch form by id
export const fetchForm = (id) => ({
  type: FETCH_FORM,
  payload: id,
});

export const fetchFormSuccess = (form) => ({
  type: FETCH_FORM_SUCCESS,
  payload: form,
});

export const fetchFormFailure = (error) => ({
  type: FETCH_FORM_FAILURE,
  payload: error,
});

// Delete Forms
export const deleteForm = (id) => ({
  type: DELETE_FORM,
  payload: id,
});

export const deleteFormSuccess = (id) => ({
  type: DELETE_FORM_SUCCESS,
  payload: id,
});

export const deleteFormFailure = (error) => ({
  type: DELETE_FORM_FAILURE,
  payload: error,
});

// Create Form
export const createForm = (formRequest) => ({
  type: CREATE_FORM,
  payload: formRequest,
});

export const createFormSuccess = (form) => ({
  type: CREATE_FORM_SUCCESS,
  payload: form,
});

export const createFormFailure = (error) => ({
  type: CREATE_FORM_FAILURE,
  payload: error,
});

// Update Form
export const updateForm = (formRequest) => ({
  type: UPDATE_FORM,
  payload: formRequest,
});

export const updateFormSuccess = (form) => ({
  type: UPDATE_FORM_SUCCESS,
  payload: form,
});

export const updateFormFailure = (error) => ({
  type: UPDATE_FORM_FAILURE,
  payload: error,
});

// Clear Form
export const clearForm = () => ({
  type: CLEAR_FORM,
});



