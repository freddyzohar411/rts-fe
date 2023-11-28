import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
  CLEAR_JOB,
} from "./actionTypes";

// Fetch Account
export const clearJob = () => ({
  type: CLEAR_JOB,
});

export const fetchJob = (params) => ({
  type: FETCH_JOB,
  payload: params,
});

export const fetchJobSuccess = (job) => ({
  type: FETCH_JOB_SUCCESS,
  payload: job,
});

export const fetchJobFailure = (error) => ({
  type: FETCH_JOB_FAILURE,
  payload: error,
});

// Fetch Accounts
export const fetchJobs = (params) => ({
  type: FETCH_JOBS,
  payload: params,
});

export const fetchJobsSuccess = (jobs) => ({
  type: FETCH_JOBS_SUCCESS,
  payload: jobs,
});

export const fetchJobsFailure = (error) => ({
  type: FETCH_JOBS_FAILURE,
  payload: error,
});

// Create an Account
export const createJob = (jobRequest) => ({
  type: CREATE_JOB,
  payload: jobRequest,
});

export const createJobSuccess = (job) => ({
  type: CREATE_JOB_SUCCESS,
  payload: job,
});

export const createJobFailure = (error) => ({
  type: CREATE_JOB_FAILURE,
  payload: error,
});
