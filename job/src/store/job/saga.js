import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_JOBS, CREATE_JOB } from "./actionTypes";
import {
  fetchJobsSuccess,
  fetchJobsFailure,
  createJobSuccess,
  createJobFailure,
} from "./action";
import {
  getJobs,
  createJob,
  createDocument,
} from "../../helpers/backend_helper";

// Fetch Accounts
function* workFetchJobs(action) {
  try {
    const response = yield call(getJobs, action.payload);
    yield put(fetchJobsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFailure(error));
  }
}

function* workCreateJobAndDocuments(action) {
  const { payload } = action;
  try {
    // Create a job
    const jobResponse = yield call(createJob, payload);
    yield put(createJobSuccess(jobResponse.data));
    // navigate("/jobs");
  } catch (error) {
    yield put(createJobFailure(error));
  }
}

export default function* watchFetchJobSaga() {
  yield takeEvery(FETCH_JOBS, workFetchJobs);
  yield takeEvery(CREATE_JOB, workCreateJobAndDocuments);
}
