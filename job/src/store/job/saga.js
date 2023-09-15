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

const JOB_ENTITY_TYPE = "job";

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
    const response = yield call();
    yield put(createJobSuccess(response.data));
  } catch (error) {
    yield put(createJobFailure(error));
  }
}

function* workCreateJobAndDocuments(action) {
  const { newJob, newDocuments, navigate } = action.payload;
  try {
    // Create a job
    const jobResponse = yield call(createJob, newJob);
    yield put(createJobSuccess(jobResponse.data));

    // Create documents
    const jobId = jobResponse.data.id;
    for (let i = 0; i < newDocuments.length; i++) {
      const document = newDocuments[i];
      // Create a document
      const documentData = new FormData();
      documentData.append("file", document.file);
      documentData.append("entityType", JOB_ENTITY_TYPE);
      documentData.append("entityId", +jobId);
      yield call(createDocument, documentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
    navigate("/jobs");
  } catch (error) {
    yield put(createJobFailure(error));
  }
}

export default function* watchFetchJobSaga() {
  yield takeEvery(FETCH_JOBS, workFetchJobs);
  yield takeEvery(CREATE_JOB, workCreateJobAndDocuments);
}
