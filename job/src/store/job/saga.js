import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_JOBS, CREATE_JOB } from "./actionTypes";
import {
  fetchJobsSuccess,
  fetchJobsFailure,
  createJobSuccess,
  createJobFailure,
} from "./action";
import { getJobs} from "../../helpers/backend_helper";

// Fetch Accounts
function* workFetchJobs(action) {
  try {
    const response = yield call(getJobs, action.payload);
    yield put(fetchJobsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFailure(error));
  }
}

function* workCreateJob(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:9200/jobs",
      action.payload
    );
    yield put(createJobSuccess(response.data));
  } catch (error) {
    yield put(createJobFailure(error));
  }
}

export default function* watchFetchJobSaga() {
  yield takeEvery(FETCH_JOBS, workFetchJobs);
  yield takeEvery(CREATE_JOB, workCreateJob);
}
