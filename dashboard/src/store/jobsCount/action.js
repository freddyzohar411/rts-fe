import {
  NEW_JOBS_COUNT,
  NEW_JOBS_COUNT_SUCCESS,
  NEW_JOBS_COUNT_FAILURE,
  ACTIVE_JOBS_COUNT,
  ACTIVE_JOBS_COUNT_SUCCESS,
  ACTIVE_JOBS_COUNT_FAILURE,
  INACTIVE_JOBS_COUNT,
  INACTIVE_JOBS_COUNT_SUCCESS,
  INACTIVE_JOBS_COUNT_FAILURE,
  CLOSED_JOBS_COUNT,
  CLOSED_JOBS_COUNT_SUCCESS,
  CLOSED_JOBS_COUNT_FAILURE,
  ASSIGNED_JOBS_COUNT,
  ASSIGNED_JOBS_COUNT_SUCCESS,
  ASSIGNED_JOBS_COUNT_FAILURE,
  FOD_COUNT,
  FOD_COUNT_SUCCESS,
  FOD_COUNT_FAILURE,
  ALL_JOBS_COUNT,
  ALL_JOBS_COUNT_SUCCESS,
  ALL_JOBS_COUNT_FAILURE,
  TOTAL_ASSIGNED_JOBS_COUNT,
  TOTAL_ASSIGNED_JOBS_COUNT_SUCCESS,
  TOTAL_ASSIGNED_JOBS_COUNT_FAILURE,
  TOTAL_FOD_JOBS_COUNT,
  TOTAL_FOD_JOBS_COUNT_SUCCESS,
  TOTAL_FOD_JOBS_COUNT_FAILURE,
} from "./actionType";

// Fetch New Jobs count
export const fetchNewJobsCount = () => ({
  type: NEW_JOBS_COUNT,
});

export const fetchNewJobsCountSuccess = (jobCounts) => ({
  type: NEW_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchNewJobsCountFailure = (error) => ({
  type: NEW_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Active Jobs count
export const fetchActiveJobsCount = () => ({
  type: ACTIVE_JOBS_COUNT,
});

export const fetchActiveJobsCountSuccess = (jobCounts) => ({
  type: ACTIVE_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchActiveJobsCountFailure = (error) => ({
  type: ACTIVE_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Inactive Jobs count
export const fetchInactiveJobsCount = () => ({
  type: INACTIVE_JOBS_COUNT,
});

export const fetchInactiveJobsCountSuccess = (jobCounts) => ({
  type: INACTIVE_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchInactiveJobsCountFailure = (error) => ({
  type: INACTIVE_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Closed Jobs count
export const fetchClosedJobsCount = () => ({
  type: CLOSED_JOBS_COUNT,
});

export const fetchClosedJobsCountSuccess = (jobCounts) => ({
  type: CLOSED_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchClosedJobsCountFailure = (error) => ({
  type: CLOSED_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Assigned Jobs count
export const fetchAssignedJobsCount = () => ({
  type: ASSIGNED_JOBS_COUNT,
});

export const fetchAssignedJobsCountSuccess = (jobCounts) => ({
  type: ASSIGNED_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchAssignedJobsCountFailure = (error) => ({
  type: ASSIGNED_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch FOD count
export const fetchFODCount = () => ({
  type: FOD_COUNT,
});

export const fetchFODCountSuccess = (jobCounts) => ({
  type: FOD_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchFODCountFailure = (error) => ({
  type: FOD_COUNT_FAILURE,
  payload: error,
});

// Fetch All Jobs count
export const fetchAllJobsCount = () => ({
  type: ALL_JOBS_COUNT,
});

export const fetchAllJobsCountSuccess = (jobCounts) => ({
  type: ALL_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchAllJobsCountFailure = (error) => ({
  type: ALL_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Total Assigned Jobs count
export const fetchTotalAssignedJobsCount = () => ({
  type: TOTAL_ASSIGNED_JOBS_COUNT,
});

export const fetchTotalAssignedJobsCountSuccess = (jobCounts) => ({
  type: TOTAL_ASSIGNED_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchTotalAssignedJobsCountFailure = (error) => ({
  type: TOTAL_ASSIGNED_JOBS_COUNT_FAILURE,
  payload: error,
});

// Fetch Total FOD count
export const fetchTotalFODCount = () => ({
  type: TOTAL_FOD_JOBS_COUNT,
});

export const fetchTotalFODSuccess = (jobCounts) => ({
  type: TOTAL_FOD_JOBS_COUNT_SUCCESS,
  payload: jobCounts,
});

export const fetchTotalFODFailure = (error) => ({
  type: TOTAL_FOD_JOBS_COUNT_FAILURE,
  payload: error,
});
