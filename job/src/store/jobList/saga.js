import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_JOB_LIST,
  POST_JOB_LIST,
  PUT_JOB_LIST,
  DELETE_JOB_LIST,
  FETCH_JOB_LISTS,
  FETCH_JOB_LISTS_FIELDS,
  FETCH_USER_GROUP_BY_NAME,
  CREATE_JOB_FOD,
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
  fetchUserGroupByNameSuccess,
  fetchUserGroupByNameFailure,
  createJobFOD,
  createJobFODSuccess,
} from "./action";
import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
  getJobFields,
  getJobById,
  getUserGroupByName,
  postJobFOD,
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

    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
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
    yield put(putJobListFailure(error));
  }
}

// Fetch accounts listing
function* workFetchJobLists(action) {
  try {
    const response = yield call(getJobs, action.payload);
    yield put(fetchJobListsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobListsFailure(error));
  }
}

// Create JobFOD
function* workJobFOD(action) {
  try {
    const response = yield call(postJobFOD, action.payload);
    yield put(createJobFODSuccess(response?.data));
    toast.success(response?.message);
  } catch (error) {
    yield put(deleteJobListFailure(error));
  }
}

// Delete JobList
function* workDeleteJobList(action) {
  try {
    const { deleteId, isDraft } = action.payload;
    const response = yield call(deleteJob, deleteId);
    yield put(deleteJobListSuccess(deleteId));
    if (!isDraft) {
      toast.success(response?.message);
    }
  } catch (error) {
    yield put(deleteJobListFailure(error));
  }
}

// Fetch accounts fields
function* workFetchJobListsFields() {
  try {
    const response = yield call(getJobFields);
    yield put(fetchJobListsFieldsSuccess(response.data));
  } catch (error) {
    yield put(fetchJobListsFieldsFailure(error));
  }
}

// Fetch account by id
function* workFetchJobList(action) {
  try {
    const response = yield call(getJobById, action.payload);
    yield put(fetchJobListSuccess(response.data));
  } catch (error) {
    yield put(fetchJobListFailure(error));
  }
}

// Fetch user group by name
function* workFetchUserGroupByName(action) {
  try {
    const response = yield call(getUserGroupByName, action.payload);
    yield put(fetchUserGroupByNameSuccess(response.data));
  } catch (error) {
    yield put(fetchUserGroupByNameFailure(error));
  }
}

export default function* watchFetchJobListSaga() {
  yield takeEvery(POST_JOB_LIST, workPostJobList);
  yield takeEvery(PUT_JOB_LIST, workPutJobList);
  yield takeEvery(FETCH_JOB_LISTS, workFetchJobLists);
  yield takeEvery(DELETE_JOB_LIST, workDeleteJobList);
  yield takeEvery(FETCH_JOB_LISTS_FIELDS, workFetchJobListsFields);
  yield takeEvery(FETCH_JOB_LIST, workFetchJobList);
  yield takeEvery(FETCH_USER_GROUP_BY_NAME, workFetchUserGroupByName);
  yield takeEvery(CREATE_JOB_FOD, workJobFOD);
}
