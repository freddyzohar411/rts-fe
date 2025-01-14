import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_DRAFT_JOB,
  FETCH_JOB_DOCUMENT_FORM,
  FETCH_JOB_FORM,
  FETCH_JOB_FORM_SUBMISSION,
} from "./actionTypes";
import {
  fetchJobFormSuccess,
  fetchJobFormFailure,
  fetchJobFormSubmissionSuccess,
  fetchJobFormSubmissionFailure,
  fetchJobDocumentFormSuccess,
  fetchJobDocumentFormFailure,
} from "./action";
import {
  draftJob,
  getFormByFormName,
  getJobById,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

function* workFetchDraftJob() {
  try {
    const response = yield call(draftJob);
    if (response?.data) {
      yield put(fetchJobFormSubmissionSuccess(response?.data));
    }
  } catch (error) {
    throw error;
  }
}

function* workFetchJobForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchJobFormSuccess(response.data));
  } catch (error) {
    yield put(fetchJobFormFailure(error));
  }
}

function* workFetchJobDocumentForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchJobDocumentFormSuccess(response.data));
  } catch (error) {
    yield put(fetchJobDocumentFormFailure(error));
  }
}

function* workFetchJobFormSubmission(action) {
  const { jobId } = action.payload;
  try {
    const response = yield call(getJobById, jobId);
    yield put(fetchJobFormSubmissionSuccess(response?.data));
  } catch (error) {
    yield put(fetchJobFormSubmissionFailure(error));
  }
}

export default function* watchFetchJobFormsSaga() {
  yield takeEvery(FETCH_DRAFT_JOB, workFetchDraftJob);
  yield takeEvery(FETCH_JOB_FORM, workFetchJobForm);
  yield takeEvery(FETCH_JOB_DOCUMENT_FORM, workFetchJobDocumentForm);
  yield takeEvery(FETCH_JOB_FORM_SUBMISSION, workFetchJobFormSubmission);
}
