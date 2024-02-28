import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { toast } from "react-toastify";

// Crypto Redux States
import {
  ACTIVE_JOBS_COUNT,
  ALL_JOBS_COUNT,
  ASSIGNED_JOBS_COUNT,
  CLOSED_JOBS_COUNT,
  FOD_COUNT,
  INACTIVE_JOBS_COUNT,
  NEW_JOBS_COUNT,
  TOTAL_ASSIGNED_JOBS_COUNT,
  TOTAL_FOD_JOBS_COUNT,
} from "./actionType";
import {
  fetchNewJobsCountSuccess,
  fetchNewJobsCountFailure,
  fetchActiveJobsCountSuccess,
  fetchActiveJobsCountFailure,
  fetchInactiveJobsCountSuccess,
  fetchInactiveJobsCountFailure,
  fetchClosedJobsCountSuccess,
  fetchClosedJobsCountFailure,
  fetchAssignedJobsCountSuccess,
  fetchAssignedJobsCountFailure,
  fetchFODCountSuccess,
  fetchFODCountFailure,
  fetchAllJobsCountSuccess,
  fetchAllJobsCountFailure,
  fetchTotalAssignedJobsCountSuccess,
  fetchTotalAssignedJobsCountFailure,
  fetchTotalFODSuccess,
  fetchTotalFODFailure,
} from "./action";

//Include Both Helper File with needed methods
import {
  activeJobsCount,
  allJobsCount,
  assignedJobsCount,
  closedJobsCount,
  fodJobsCount,
  inactiveJobsCount,
  newJobsCount,
  totalAssignedJobsCount,
  totalFODJobsCount,
} from "../../helpers/backend_helper";

// Fetch new jobs count
function* workNewJobsCount({ payload }) {
  try {
    const response = yield call(newJobsCount, payload.isGetAll);
    yield put(fetchNewJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchNewJobsCountFailure(error));
  }
}

// Fetch active jobs count
function* workActiveJobsCount({ payload }) {
  try {
    const response = yield call(activeJobsCount, payload.isGetAll);
    yield put(fetchActiveJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchActiveJobsCountFailure(error));
  }
}

// Fetch inactive jobs count
function* workInactiveJobsCount() {
  try {
    const response = yield call(inactiveJobsCount);
    yield put(fetchInactiveJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchInactiveJobsCountFailure(error));
  }
}

// Fetch closed jobs count
function* workClosedJobsCount() {
  try {
    const response = yield call(closedJobsCount);
    yield put(fetchClosedJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchClosedJobsCountFailure(error));
  }
}

// Fetch assigned jobs count
function* workAssignedJobsCount() {
  try {
    const response = yield call(assignedJobsCount);
    yield put(fetchAssignedJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchAssignedJobsCountFailure(error));
  }
}

// Fetch fod jobs count
function* workFODJobsCount({ payload }) {
  try {
    const response = yield call(fodJobsCount, payload.isGetAll);
    yield put(fetchFODCountSuccess(response.data));
  } catch (error) {
    yield put(fetchFODCountFailure(error));
  }
}

// Fetch all jobs count
function* workAllJobsCount() {
  try {
    const response = yield call(allJobsCount);
    yield put(fetchAllJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchAllJobsCountFailure(error));
  }
}

// Fetch new jobs count
function* workTotalAssignedJobsCount() {
  try {
    const response = yield call(totalAssignedJobsCount);
    yield put(fetchTotalAssignedJobsCountSuccess(response.data));
  } catch (error) {
    yield put(fetchTotalAssignedJobsCountFailure(error));
  }
}

// Fetch new jobs count
function* workTotalFODJobsCount() {
  try {
    const response = yield call(totalFODJobsCount);
    yield put(fetchTotalFODSuccess(response.data));
  } catch (error) {
    yield put(fetchTotalFODFailure(error));
  }
}

export function* watchGetRevenueChartsData() {
  yield takeEvery(NEW_JOBS_COUNT, workNewJobsCount);
  yield takeEvery(ACTIVE_JOBS_COUNT, workActiveJobsCount);
  yield takeEvery(INACTIVE_JOBS_COUNT, workInactiveJobsCount);
  yield takeEvery(CLOSED_JOBS_COUNT, workClosedJobsCount);
  yield takeEvery(ASSIGNED_JOBS_COUNT, workAssignedJobsCount);
  yield takeEvery(FOD_COUNT, workFODJobsCount);
  yield takeEvery(ALL_JOBS_COUNT, workAllJobsCount);
  yield takeEvery(TOTAL_ASSIGNED_JOBS_COUNT, workTotalAssignedJobsCount);
  yield takeEvery(TOTAL_FOD_JOBS_COUNT, workTotalFODJobsCount);
}

function* jobsCountSaga() {
  yield all([fork(watchGetRevenueChartsData)]);
}

export default jobsCountSaga;
