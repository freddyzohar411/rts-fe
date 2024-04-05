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
  UPDATE_JOB_EMBEDDINGS,
  UPDATE_JOB_EMBEDDINGS_FAILURE,
  UPDATE_JOB_EMBEDDINGS_SUCCESS,
  CLONE_JOB, 
  CLONE_JOB_SUCCESS, 
  CLONE_JOB_FAILURE,
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

export const updateJobEmbeddings = (jobId) => ({
  type: UPDATE_JOB_EMBEDDINGS,
  payload: jobId,
});

export const updateJobEmbeddingsSuccess = (job) => ({
  type: UPDATE_JOB_EMBEDDINGS_SUCCESS,
  payload: job,
});

export const updateJobEmbeddingsFailure = (error) => ({
  type: UPDATE_JOB_EMBEDDINGS_FAILURE,
  payload: error,
});


