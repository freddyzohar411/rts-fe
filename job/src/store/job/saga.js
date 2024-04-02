import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  FETCH_JOBS,
  CREATE_JOB,
  FETCH_JOB,
  CREATE_JOB_DOCUMENTS,
  FETCH_JOB_DATA,
  FETCH_JOBS_FIELDS_ALL,
  UPDATE_JOB_EMBEDDINGS,
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
  fetchJobDataSuccess,
  fetchJobDataFailure,
  fetchJobsFieldsAllSuccess,
  fetchJobsFieldsAllFailure,
  updateJobEmbeddingsSuccess,
  updateJobEmbeddingsFailure,
} from "./action";
import {
  getJobs,
  createJob,
  getJobById,
  createJobDocument,
  updateJobDocument,
  updateJob,
  getJobDataById,
  getJobsFieldsAll,
  updateJobEmbedding,
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
      // yield call(updateJobEmbedding, payload?.id);
    } else {
      jobResponse = yield call(createJob, payload);
      // yield call(updateJobEmbedding, jobResponse?.data?.id);
    }
    yield put(createJobSuccess(jobResponse.data));
    if (!payload?.isDraft) {
      toast.success(jobResponse?.message);
    }
    navigate("/jobs");
    if (payload?.id) {
      yield call(updateJobEmbedding, payload?.id);
    } else {
      yield call(updateJobEmbedding, jobResponse?.data?.id);
    }
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
    yield put(createJobDocumentsFailure(error));
  }
}

function* workFetchJobData(action) {
  try {
    const response = yield call(getJobDataById, action.payload);
    yield put(fetchJobDataSuccess(response.data));
  } catch (error) {
    yield put(fetchJobDataFailure(error));
  }
}

function* workFetchJobsFieldsAll(action) {
  try {
    const response = yield call(getJobsFieldsAll, action.payload);
    yield put(fetchJobsFieldsAllSuccess(response.data));
  } catch (error) {
    yield put(fetchJobsFieldsAllFailure(error));
  }
}

function* workUpdateJobEmbeddings(action) {
  try {
    const response = yield call(updateJobEmbedding, action.payload);
  } catch (error) {
    console.log("Error updating job embeddings: ", error);
  }
}

export default function* watchFetchJobSaga() {
  yield takeEvery(FETCH_JOB, workFetchJob);
  yield takeEvery(FETCH_JOBS, workFetchJobs);
  yield takeEvery(CREATE_JOB, workCreateJob);
  yield takeEvery(CREATE_JOB_DOCUMENTS, workCreateJobDocuments);
  yield takeEvery(FETCH_JOB_DATA, workFetchJobData);
  yield takeEvery(FETCH_JOBS_FIELDS_ALL, workFetchJobsFieldsAll);
  yield takeEvery(UPDATE_JOB_EMBEDDINGS, workUpdateJobEmbeddings);
}
