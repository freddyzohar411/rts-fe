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
  CREATE_JOB_DOCUMENTS,
  CREATE_JOB_DOCUMENTS_FAILURE,
  CREATE_JOB_DOCUMENTS_SUCCESS,
  FETCH_JOB_DATA,
  FETCH_JOB_DATA_FAILURE,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOBS_FIELDS_ALL,
  FETCH_JOBS_FIELDS_ALL_FAILURE,
  FETCH_JOBS_FIELDS_ALL_SUCCESS,
  CREATE_JOB_CUSTOM_VIEW,
  CREATE_JOB_CUSTOM_VIEW_SUCCESS,
  CREATE_JOB_CUSTOM_VIEW_FAILURE,
  CLONE_JOB, 
  CLONE_JOB_SUCCESS, 
  CLONE_JOB_FAILURE,
  FETCH_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW_SUCCESS,
  FETCH_JOB_CUSTOM_VIEW_FAILURE,
  SELECT_JOB_CUSTOM_VIEW,
  SELECT_JOB_CUSTOM_VIEW_SUCCESS,
  SELECT_JOB_CUSTOM_VIEW_FAILURE,
  DELETE_JOB_CUSTOM_VIEW,
  DELETE_JOB_CUSTOM_VIEW_SUCCESS,
  DELETE_JOB_CUSTOM_VIEW_FAILURE
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

// Clone Job
export const cloneJob = (jobRequest) => ({
  type: CLONE_JOB,
  payload: jobRequest,
});

export const cloneJobSuccess = (job) => ({
  type: CLONE_JOB_SUCCESS,
  payload: job,
});

export const cloneJobFailure = (error) => ({
  type: CLONE_JOB_FAILURE,
  payload: error,
});

// Create an Account
export const createJobDocuments = (jobRequest) => ({
  type: CREATE_JOB_DOCUMENTS,
  payload: jobRequest,
});

export const createJobDocumentsSuccess = (job) => ({
  type: CREATE_JOB_DOCUMENTS_SUCCESS,
  payload: job,
});

export const createJobDocumentsFailure = (error) => ({
  type: CREATE_JOB_DOCUMENTS_FAILURE,
  payload: error,
});

// Fetch Job Data
export const fetchJobData = (params) => ({
  type: FETCH_JOB_DATA,
  payload: params,
});

export const fetchJobDataSuccess = (job) => ({
  type: FETCH_JOB_DATA_SUCCESS,
  payload: job,
});

export const fetchJobDataFailure = (error) => ({
  type: FETCH_JOB_DATA_FAILURE,
  payload: error,
});

export const fetchJobsFieldsAll = () => ({
  type: FETCH_JOBS_FIELDS_ALL,
});

export const fetchJobsFieldsAllSuccess = (fields) => ({
  type: FETCH_JOBS_FIELDS_ALL_SUCCESS,
  payload: fields,
});

export const fetchJobsFieldsAllFailure = (error) => ({
  type: FETCH_JOBS_FIELDS_ALL_FAILURE,
  payload: error,
});

export const createJobCustomView = (jobCustomViewRequest) => ({
  type: CREATE_JOB_CUSTOM_VIEW,
  payload: jobCustomViewRequest,
})

export const createJobCustomViewSuccess = (jobCustomView) => ({
  type: CREATE_JOB_CUSTOM_VIEW_SUCCESS,
  payload: jobCustomView,
});

export const createJobCustomViewFailure = (error) => ({
  type: CREATE_JOB_CUSTOM_VIEW_FAILURE,
  payload: error,
});

export const fetchJobCustomView = () => ({
  type: FETCH_JOB_CUSTOM_VIEW,
});

export const fetchJobCustomViewSuccess = (jobCustomViews) => ({
  type: FETCH_JOB_CUSTOM_VIEW_SUCCESS,
  payload: jobCustomViews,
});

export const fetchJobCustomViewFailure = (error) => ({
  type: FETCH_JOB_CUSTOM_VIEW_FAILURE,
  payload: error,
});

export const selectJobCustomView = (jobCustomViewRequest) => ({
  type: SELECT_JOB_CUSTOM_VIEW,
  payload: jobCustomViewRequest,
});

export const selectJobCustomViewSuccess = (jobCustomView) => ({
  type: SELECT_JOB_CUSTOM_VIEW_SUCCESS,
  payload: jobCustomView,
});

export const selectJobCustomViewFailure = (error) => ({
  type: SELECT_JOB_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Delete Job Custom View
export const deleteJobCustomView = (jobCustomViewRequest) => ({
  type: DELETE_JOB_CUSTOM_VIEW,
  payload: jobCustomViewRequest,
});

export const deleteJobCustomViewSuccess = (jobCustomView) => ({
  type: DELETE_JOB_CUSTOM_VIEW_SUCCESS,
  payload: jobCustomView,
});

export const deleteJobCustomViewFailure = (error) => ({
  type: DELETE_JOB_CUSTOM_VIEW_FAILURE,
  payload: error,
});
