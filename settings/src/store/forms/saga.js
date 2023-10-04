import { call, put, takeEvery } from "redux-saga/effects";

import { FETCH_FORMS, DELETE_FORM } from "./actionTypes";
import {
  fetchFormsSuccess,
  fetchFormsFailure,
  deleteFormFailure,
  deleteFormSuccess,
} from "./action";
import { getForms } from "../../helpers/backend_helper";
import { deleteFormById } from "../../helpers/backend_helper";

function* workFetchForms() {
  try {
    const response = yield call(getForms);
    yield put(fetchFormsSuccess(response.data));
  } catch (error) {
    yield put(fetchFormsFailure(error));
  }
}

function* workDeleteForm(action) {
  try {
    const response = yield call(deleteFormById, action.payload);
    yield put(deleteFormSuccess(action.payload));
  } catch (error) {
    yield put(deleteFormFailure(error));
  }
}

export default function* watchFetchFormsSaga() {
  yield takeEvery(FETCH_FORMS, workFetchForms);
  yield takeEvery(DELETE_FORM, workDeleteForm);
}
