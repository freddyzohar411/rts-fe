import { call, put, takeEvery, takeLatest, delay } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  FETCH_JOBS,
  CREATE_JOB,
  FETCH_JOB,
  CREATE_JOB_DOCUMENTS,
  FETCH_JOB_DATA,
  FETCH_JOBS_FIELDS_ALL,
  UPDATE_JOB_EMBEDDINGS,
  CLONE_JOB,
  CREATE_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW,
  SELECT_JOB_CUSTOM_VIEW,
  DELETE_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW_BY_ID,
  EDIT_JOB_CUSTOM_VIEW_BY_ID,
  UNSELECT_JOB_CUSTOM_VIEW,
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
  cloneJobSuccess,
  cloneJobFailure,
  createJobCustomViewSuccess,
  createJobCustomViewFailure,
  fetchJobCustomViewSuccess,
  fetchJobCustomViewFailure,
  selectJobCustomViewSuccess,
  selectJobCustomViewFailure,
  fetchJobCustomView,
  deleteJobCustomViewSuccess,
  deleteJobCustomViewFailure,
  fetchJobCustomViewByIdFailure,
  fetchJobCustomViewByIdSuccess,
  editJobCustomViewByIdSuccess,
  editJobCustomViewByIdFailure,
  unselectJobCustomViewFailure,
  unselectJobCustomViewSuccess,
} from "./action";
import {
  getJobs,
  createJob,
  cloneJob,
  getJobById,
  createJobDocument,
  updateJobDocument,
  updateJob,
  getJobDataById,
  getJobsFieldsAll,
  updateJobEmbedding,
  createJobCustomView,
  getJobCustomViews,
  selectJobCustomView,
  deleteJobCustomView,
  getJobCustomViewById,
  editJobCustomViewById,
  unSelectAllJobCustomView
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
    // Embedding
    // if (payload?.id) {
    //   yield call(updateJobEmbedding, payload?.id);
    // } else {
    //   yield call(updateJobEmbedding, jobResponse?.data?.id);
    // }
  } catch (error) {
    toast.error(error?.message);
    yield put(createJobFailure(error));
  }
}

function* workCloneJob(action) {
  const { payload, navigate } = action.payload;
  try {
    const response = yield call(cloneJob, payload);
    yield put(cloneJobSuccess(response.data));
    toast.success(response.message);
    const jobId = response.data.id;
    navigate(`/jobs/${jobId}/snapshot`);
  } catch (error) {
    yield put(cloneJobFailure(error));
    toast.error(error.message);
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
    yield put(updateJobEmbeddingsFailure(error));
  }
}

function* workFetchJobCustomViews() {
  try {
    const response = yield call(getJobCustomViews);
    yield put(fetchJobCustomViewSuccess(response.data));
  } catch (error) {
    yield put(fetchJobCustomViewFailure(error));
  }
}

function* workCreateJobCustomView(action) {
  const { payload, navigate } = action.payload;
  try {
    const jobCustomViewResponse = yield call(createJobCustomView, payload);
    yield delay(500);
    yield put(createJobCustomViewSuccess(jobCustomViewResponse));
    toast.success("Job custom view created successfully!");
    navigate("/jobs");
  } catch (error) {
    yield put(createJobCustomViewFailure(error));
    if (error?.code === 409) {
      toast.error("Job custom view name already exists.");
    } else {
      toast.error("Error updating job custom view!");
    }
  }
}

function* workSelectJobCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(selectJobCustomView, id);
    yield put(selectJobCustomViewSuccess(response.data));
    yield put(fetchJobCustomView());
    toast.success("Job custom view selected successfully!");
  } catch (error) {
    yield put(selectJobCustomViewFailure(error));
    if (error.response && error.response.status === 409) {
      toast.error("Job custom view name already exists.");
    } else {
      toast.error("Error creating job custom view!");
    }
  }
}

function* workDeleteJobCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(deleteJobCustomView, id);
    yield put(deleteJobCustomViewSuccess(response.data));
    yield put(fetchJobCustomView());
    toast.success("Job default custom view selected");
  } catch (error) {
    yield put(deleteJobCustomViewFailure(error));
    toast.error("Error deleting job custom view!");
  }
}

function* workFetchJobCustomViewById(action) {
  try {
    const response = yield call(getJobCustomViewById, action.payload);
    yield put(fetchJobCustomViewByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchJobCustomViewByIdFailure(error));
  }
}

function* workEditJobCustomViewById(action) {
  const { editId, payload, navigate } = action.payload;
  try {
    const response = yield call(editJobCustomViewById, editId, payload);
    yield delay(500);
    yield put(editJobCustomViewByIdSuccess(response.data));
    toast.success("Job custom view updated successfully!");
    navigate("/jobs");
  } catch (error) {
    yield put(editJobCustomViewByIdFailure(error));
    if (error?.code === 409) {
      toast.error("Job custom view name already exists.");
    } else {
      toast.error("Error updating job custom view!");
    }
  }
}

function* workUnselectJobCustomView() {
  try {
    yield call(unSelectAllJobCustomView);
    yield put(unselectJobCustomViewSuccess());
    toast.success("Job custom view unselected successfully!");
  } catch (error) {
    yield put(unselectJobCustomViewFailure(error));
    toast.error("Error unselecting job custom view!");
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
  yield takeEvery(CLONE_JOB, workCloneJob);
  yield takeEvery(CREATE_JOB_CUSTOM_VIEW, workCreateJobCustomView);
  yield takeEvery(FETCH_JOB_CUSTOM_VIEW, workFetchJobCustomViews);
  yield takeEvery(SELECT_JOB_CUSTOM_VIEW, workSelectJobCustomView);
  yield takeEvery(DELETE_JOB_CUSTOM_VIEW, workDeleteJobCustomView);
  yield takeEvery(FETCH_JOB_CUSTOM_VIEW_BY_ID, workFetchJobCustomViewById);
  yield takeEvery(EDIT_JOB_CUSTOM_VIEW_BY_ID, workEditJobCustomViewById);
  yield takeEvery(UNSELECT_JOB_CUSTOM_VIEW, workUnselectJobCustomView);
}
