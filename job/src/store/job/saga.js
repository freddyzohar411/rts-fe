import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  FETCH_JOBS,
  CREATE_JOB,
  FETCH_JOB,
  CREATE_JOB_DOCUMENTS,
} from "./actionTypes";
import {
  fetchJobsSuccess,
  fetchJobsFailure,
  createJobSuccess,
  createJobFailure,
  fetchJobSuccess,
  fetchJobFailure,
  createJobDocumentsSuccess,
  createJobDocumentsFailure,
} from "./action";
import {
  getJobs,
  createJob,
  getJobById,
  createJobDocument,
  updateJobDocument,
  updateJob,
} from "../../helpers/backend_helper";

// Fetch Accounts
function* workFetchJob(action) {
  try {
    const response = yield call(getJobById, action.payload);
    yield put(fetchJobSuccess(response.data));
  } catch (error) {
    yield put(fetchJobFailure(error));
  }
}

function* workFetchJobs(action) {
  try {
    const response = yield call(getJobs, action.payload);
    yield put(fetchJobsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFailure(error));
  }
}

function* workCreateJob(action) {
  const { payload, navigate } = action.payload;
  try {
    // Create a job
    let jobResponse = null;
    if (payload?.id) {
      jobResponse = yield call(updateJob, payload?.id, payload);
    } else {
      jobResponse = yield call(createJob, payload);
    }
    yield put(createJobSuccess(jobResponse.data));
    if (!payload?.isDraft) {
      toast.success(jobResponse?.message);
    }
    navigate("/jobs");
  } catch (error) {
    toast.error(error?.message);
    yield put(createJobFailure(error));
  }
}

function* workCreateJobDocuments(action) {
  const { entity, newData, config, rerenderTable, id, resetForm } =
    action.payload;
  try {
    // Create a job
    if (id) {
      const jobResponse = yield call(updateJobDocument, id, newData, config);
      yield put(createJobDocumentsSuccess(jobResponse.data));
    } else {
      const jobResponse = yield call(createJobDocument, newData, config);
      yield put(createJobDocumentsSuccess(jobResponse.data));
    }
    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
  } catch (error) {
    toast.error(error?.message);
    yield put(createJobDocumentsFailure(error));
  }
}

export default function* watchFetchJobSaga() {
  yield takeEvery(FETCH_JOB, workFetchJob);
  yield takeEvery(FETCH_JOBS, workFetchJobs);
  yield takeEvery(CREATE_JOB, workCreateJob);
  yield takeEvery(CREATE_JOB_DOCUMENTS, workCreateJobDocuments);
}
