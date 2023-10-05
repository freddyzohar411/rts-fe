import {
  FETCH_FORMS,
  FETCH_FORMS_SUCCESS,
  FETCH_FORMS_FAILURE,
  DELETE_FORM,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,
  CLEAR_FORM
} from "./actionTypes";

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

export const clearForm = () => ({
  type: CLEAR_FORM,
});

