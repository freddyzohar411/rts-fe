import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_JOB_LIST,
  POST_JOB_LIST,
  PUT_JOB_LIST,
  DELETE_JOB_LIST,
  FETCH_JOB_LISTS,
  FETCH_JOB_LISTS_FIELDS,
} from "./actionTypes";
import {
  fetchJobListSuccess,
  fetchJobListFailure,
  postJobListSuccess,
  postJobListFailure,
  putJobListSuccess,
  putJobListFailure,
  deleteJobListSuccess,
  deleteJobListFailure,
  fetchJobListsSuccess,
  fetchJobListsFailure,
  fetchJobListsFieldsSuccess,
  fetchJobListsFieldsFailure,
} from "./action";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobFields,
  getJobById,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

// Post account
function* workPostJobList(action) {
  const {
    entity,
    newData,
    config,
    rerenderTable,
    resetForm,
    id,
    navigate,
    link,
    handleNext,
  } = action.payload;
  try {
    const response = yield call(createJob, entity, id, newData, config);
    yield put(postJobListSuccess(response.data));
    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
    if (typeof navigate === "function") {
      navigate(link);
    }

    // if (entity === JobListEntityConstant.JOB_LIST_JOB_LIST) {
    //   handleNext();
    //   yield put(setJobListId(response.data.id));
    //   yield put(setJobListCountry(response.data.accountCountry));
    //   return;
    // }
    // if (entity === JobListEntityConstant.JOB_LIST_COMMERCIAL) {
    //   yield put(deleteJobListId());
    //   yield put(deleteJobListCountry());
    //   toast.success("JobList created successfully");
    //   return;
    // }
    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
    toast.error("Error creating account");
    yield put(postJobListFailure(error));
  }
}

// Put JobList
function* workPutJobList(action) {
  const {
    entity,
    id,
    newData,
    config,
    rerenderTable,
    resetForm,
    navigate,
    link,
    handleNext,
  } = action.payload;
  try {
    const response = yield call(updateJob, entity, id, newData, config);
    yield put(putJobListSuccess(response.data));
    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
    if (typeof navigate === "function") {
      navigate(link);
    }
    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
    toast.error("Error updating account");
    yield put(putJobListFailure(error));
  }
}

// Fetch accounts listing
function* workFetchJobLists(action) {
  try {
    const response = yield call(getJobs, action.payload);
    yield put(fetchJobListsSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts");
    yield put(fetchJobListsFailure(error));
  }
}

// Delete JobList
function* workDeleteJobList(action) {
  try {
    const response = yield call(deleteJob, action.payload);
    yield put(deleteJobListSuccess(action.payload));
    toast.success(response?.message);
  } catch (error) {
    yield put(deleteJobListFailure(error));
    toast.error("Error deleting account");
  }
}

// Fetch accounts fields
function* workFetchJobListsFields() {
  try {
    const response = yield call(getJobFields);
    yield put(fetchJobListsFieldsSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts fields");
    yield put(fetchJobListsFieldsFailure(error));
  }
}

// Fetch account by id
function* workFetchJobList(action) {
  try {
    const response = yield call(getJobById, action.payload);
    yield put(fetchJobListSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching account");
    yield put(fetchJobListFailure(error));
  }
}

export default function* watchFetchJobListSaga() {
  yield takeEvery(POST_JOB_LIST, workPostJobList);
  yield takeEvery(PUT_JOB_LIST, workPutJobList);
  yield takeEvery(FETCH_JOB_LISTS, workFetchJobLists);
  yield takeEvery(DELETE_JOB_LIST, workDeleteJobList);
  yield takeEvery(FETCH_JOB_LISTS_FIELDS, workFetchJobListsFields);
  yield takeEvery(FETCH_JOB_LIST, workFetchJobList);
}
