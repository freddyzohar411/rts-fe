import { call, put, takeEvery } from "redux-saga/effects";

import { FETCH_JOB_FORM, FETCH_JOB_FORM_SUBMISSION } from "./actionTypes";
import {
  fetchJobFormSuccess,
  fetchJobFormFailure,
  fetchJobFormSubmissionSuccess,
  fetchJobFormSubmissionFailure,
} from "./action";
import { getFormByFormName, getJobById } from "../../helpers/backend_helper";
import { toast } from "react-toastify";

function* workFetchJobForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchJobFormSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching job form");
    yield put(fetchJobFormFailure(error));
  }
}

function* workFetchJobFormSubmission(action) {
  const { jobId } = action.payload;
  try {
    const response = yield call(getJobById, jobId);
    yield put(fetchJobFormSubmissionSuccess(response.data));
  } catch (error) {
    yield put(fetchJobFormSubmissionFailure(error));
  }
}

export default function* watchFetchJobFormsSaga() {
  yield takeEvery(FETCH_JOB_FORM, workFetchJobForm);
  yield takeEvery(FETCH_JOB_FORM_SUBMISSION, workFetchJobFormSubmission);
}
