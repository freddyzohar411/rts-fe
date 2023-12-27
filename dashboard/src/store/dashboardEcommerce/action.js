import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_REVENUE_CHARTS_DATA,
  FETCH_JOB_COUNTS,
  FETCH_JOB_COUNTS_SUCCESS,
  FETCH_JOB_COUNTS_FAILURE,
} from "./actionType";

// common success
export const dashboardEcommerceApiSuccess = (actionType, data) => ({
  type: API_RESPONSE_SUCCESS,
  payload: { actionType, data },
});

// common error
export const dashboardEcommerceApiError = (actionType, error) => ({
  type: API_RESPONSE_ERROR,
  payload: { actionType, error },
});

// revenue
export const getRevenueChartsData = (revenueData) => ({
  type: GET_REVENUE_CHARTS_DATA,
  payload: revenueData,
});

// Fetch Job counts
export const fetchJobCounts = () => ({
  type: FETCH_JOB_COUNTS,
});

export const fetchJobCountsSuccess = (jobCounts) => ({
  type: FETCH_JOB_COUNTS_SUCCESS,
  payload: jobCounts,
});

export const fetchJobCountsFailure = (error) => ({
  type: FETCH_JOB_COUNTS_FAILURE,
  payload: error,
});
