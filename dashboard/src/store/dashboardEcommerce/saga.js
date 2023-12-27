import { call, put, takeEvery, all, fork } from "redux-saga/effects";
import { toast } from "react-toastify";

// Crypto Redux States
import { FETCH_JOB_COUNTS, GET_REVENUE_CHARTS_DATA } from "./actionType";
import {
  dashboardEcommerceApiSuccess,
  dashboardEcommerceApiError,
  fetchJobCountsSuccess,
  fetchJobCountsFailure,
} from "./action";

//Include Both Helper File with needed methods
import {
  getAllRevenueData,
  getMonthRevenueData,
  getHalfYearRevenueData,
  getYearRevenueData,
  getJobCounts,
} from "../../helpers/backend_helper";

function* getRevenueChartsData({ payload: data }) {
  try {
    var response;
    if (data === "all") {
      response = [];
    }
    if (data === "month") {
      response = yield call(getMonthRevenueData, data);
    }
    if (data === "halfyear") {
      response = yield call(getHalfYearRevenueData, data);
    }
    if (data === "year") {
      response = yield call(getYearRevenueData, data);
    }
    yield put(dashboardEcommerceApiSuccess(GET_REVENUE_CHARTS_DATA, response));
  } catch (error) {
    yield put(dashboardEcommerceApiError(GET_REVENUE_CHARTS_DATA, error));
  }
}

// Fetch accounts fields
function* workFetchJobCounts() {
  try {
    const response = yield call(getJobCounts);
    yield put(fetchJobCountsSuccess(response.data));
  } catch (error) {
    toast.error("Error while fetching job counts.");
    yield put(fetchJobCountsFailure(error));
  }
}

export function* watchGetRevenueChartsData() {
  yield takeEvery(GET_REVENUE_CHARTS_DATA, getRevenueChartsData);
  yield takeEvery(FETCH_JOB_COUNTS, workFetchJobCounts);
}

function* dashboardEcommerceSaga() {
  yield all([fork(watchGetRevenueChartsData)]);
}

export default dashboardEcommerceSaga;
