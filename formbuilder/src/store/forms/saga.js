import { call, put, takeEvery } from "redux-saga/effects";

import { FETCH_FORMS, DELETE_FORM, CREATE_FORM, UPDATE_FORM, FETCH_FORM } from "./actionTypes";
import {
  fetchFormsSuccess,
  fetchFormsFailure,
  fetchFormSuccess,
  fetchFormFailure,
  deleteFormFailure,
  deleteFormSuccess,
  createFormFailure,
  createFormSuccess,
  updateFormFailure,
  updateFormSuccess,
} from "./action";
import { getForms , createForm, deleteFormById, updateFormById, getFormById } from "../../helpers/backend_helper";


function* workFetchForms(action) {
  try {
    const response = yield call(getForms, action.payload);
    yield put(fetchFormsSuccess(response.data));
  } catch (error) {
    yield put(fetchFormsFailure(error));
  }
}

function* workDeleteForm(action) {
  try {
    const response = yield call(deleteFormById, action.payload);
    console.log("Deleting... This: ", action.payload)
    yield put(deleteFormSuccess(action.payload));
  } catch (error) {
    yield put(deleteFormFailure(error));
  }
}

function* workCreateForm(action) {
  const { newForm, navigate, path } = action.payload;
  try {
    const response = yield call(createForm, newForm);
    yield put(createFormSuccess(response.data));
    navigate(path);
  } catch (error) {
    yield put(createFormFailure(error));
  }
}

function* workUpdateForm(action) {
  const { formId, updatedForm, navigate, path } = action.payload;
  try {
    const response = yield call(updateFormById, updatedForm, formId);
    yield put(updateFormSuccess(response.data));
    navigate(path);
  } catch (error) {
    yield put(updateFormFailure(error));
  }
}

function* workFetchForm(action) {
  try {
    const response = yield call(getFormById, action.payload);
    yield put(fetchFormSuccess(response.data));
  } catch (error) {
    yield put(fetchFormFailure(error));
  }
}

export default function* watchFetchFormsSaga() {
  yield takeEvery(FETCH_FORMS, workFetchForms);
  yield takeEvery(DELETE_FORM, workDeleteForm);
  yield takeEvery(CREATE_FORM, workCreateForm);
  yield takeEvery(UPDATE_FORM, workUpdateForm);
  yield takeEvery(FETCH_FORM, workFetchForm);
}
