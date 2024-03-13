import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_SUCCESS,
  FETCH_JOB_LIST_FAILURE,
  FETCH_JOB_LISTS,
  FETCH_JOB_LISTS_SUCCESS,
  FETCH_JOB_LISTS_FAILURE,
  CREATE_JOB_LIST,
  CREATE_JOB_LIST_SUCCESS,
  CREATE_JOB_LIST_FAILURE,
  POST_JOB_LIST,
  POST_JOB_LIST_SUCCESS,
  POST_JOB_LIST_FAILURE,
  PUT_JOB_LIST,
  PUT_JOB_LIST_SUCCESS,
  PUT_JOB_LIST_FAILURE,
  DELETE_JOB_LIST,
  DELETE_JOB_LIST_SUCCESS,
  DELETE_JOB_LIST_FAILURE,
  FETCH_JOB_LISTS_FIELDS,
  FETCH_JOB_LISTS_FIELDS_SUCCESS,
  FETCH_JOB_LISTS_FIELDS_FAILURE,
  FETCH_USER_GROUP_BY_NAME,
  FETCH_USER_GROUP_BY_NAME_SUCCESS,
  FETCH_USER_GROUP_BY_NAME_FAILURE,
  CREATE_JOB_FOD,
  CREATE_JOB_FOD_SUCCESS,
  CREATE_JOB_FOD_FAILURE,
  FETCH_JOBS_ADMIN,
  FETCH_JOBS_ADMIN_SUCCESS,
  FETCH_JOBS_ADMIN_FAILURE,
  DELETE_FOD,
  DELETE_FOD_SUCCESS,
  DELETE_FOD_FAILURE,
  DELETE_FOD_RESET,
  CREATE_JOB_FOD_RESET,
} from "./actionTypes";

// Fetch User Group by name
export const fetchUserGroupByName = (groupName) => ({
  type: FETCH_USER_GROUP_BY_NAME,
  payload: groupName,
});

export const fetchUserGroupByNameSuccess = (group) => ({
  type: FETCH_USER_GROUP_BY_NAME_SUCCESS,
  payload: group,
});

export const fetchUserGroupByNameFailure = (error) => ({
  type: FETCH_USER_GROUP_BY_NAME_FAILURE,
  payload: error,
});

// Fetch JobList
export const fetchJobList = (accountId) => ({
  type: FETCH_JOB_LIST,
  payload: accountId,
});

export const fetchJobListSuccess = (account) => ({
  type: FETCH_JOB_LIST_SUCCESS,
  payload: account,
});

export const fetchJobListFailure = (error) => ({
  type: FETCH_JOB_LIST_FAILURE,
  payload: error,
});

// Fetch JobLists
export const fetchJobLists = (params) => ({
  type: FETCH_JOB_LISTS,
  payload: params,
});

export const fetchJobListsSuccess = (accounts) => ({
  type: FETCH_JOB_LISTS_SUCCESS,
  payload: accounts,
});

export const fetchJobListsFailure = (error) => ({
  type: FETCH_JOB_LISTS_FAILURE,
  payload: error,
});

// Create an JobList
export const createJobList = (accountRequest) => ({
  type: CREATE_JOB_LIST,
  payload: accountRequest,
});

export const createJobListSuccess = (account) => ({
  type: CREATE_JOB_LIST_SUCCESS,
  payload: account,
});

export const createJobListFailure = (error) => ({
  type: CREATE_JOB_LIST_FAILURE,
  payload: error,
});

// Post an account
export const postJobList = (accountRequest) => ({
  type: POST_JOB_LIST,
  payload: accountRequest,
});

export const postJobListSuccess = (account) => ({
  type: POST_JOB_LIST_SUCCESS,
  payload: account,
});

export const postJobListFailure = (error) => ({
  type: POST_JOB_LIST_FAILURE,
  payload: error,
});

// Put an account
export const putJobList = (accountRequest) => ({
  type: PUT_JOB_LIST,
  payload: accountRequest,
});

export const putJobListSuccess = (account) => ({
  type: PUT_JOB_LIST_SUCCESS,
  payload: account,
});

export const putJobListFailure = (error) => ({
  type: PUT_JOB_LIST_FAILURE,
  payload: error,
});

export const deleteJobList = (accountId) => ({
  type: DELETE_JOB_LIST,
  payload: accountId,
});

export const deleteJobListSuccess = (accountId) => ({
  type: DELETE_JOB_LIST_SUCCESS,
  payload: accountId,
});

export const deleteJobListFailure = (error) => ({
  type: DELETE_JOB_LIST_FAILURE,
  payload: error,
});

// Fetch JobLists Fields
export const fetchJobListsFields = () => ({
  type: FETCH_JOB_LISTS_FIELDS,
});

export const fetchJobListsFieldsSuccess = (accountsFields) => ({
  type: FETCH_JOB_LISTS_FIELDS_SUCCESS,
  payload: accountsFields,
});

export const fetchJobListsFieldsFailure = (error) => ({
  type: FETCH_JOB_LISTS_FIELDS_FAILURE,
  payload: error,
});

// Create JobFOD
export const createJobFOD = (request) => ({
  type: CREATE_JOB_FOD,
  payload: request,
});

export const createJobFODReset = () => ({
  type: CREATE_JOB_FOD_RESET,
});

export const createJobFODSuccess = (job) => ({
  type: CREATE_JOB_FOD_SUCCESS,
  payload: job,
});

export const createJobFODFailure = (error) => ({
  type: CREATE_JOB_FOD_FAILURE,
  payload: error,
});

// Fetch job admin
export const fetchJobsAdmin = (params) => ({
  type: FETCH_JOBS_ADMIN,
  payload: params,
});

export const fetchJobsAdminSuccess = (jobs) => ({
  type: FETCH_JOBS_ADMIN_SUCCESS,
  payload: jobs,
});

export const fetchJobsAdminFailure = (error) => ({
  type: FETCH_JOBS_ADMIN_FAILURE,
  payload: error,
});

export const deleteFOD = (jobId) => ({
  type: DELETE_FOD,
  payload: jobId,
});

export const deleteFODReset = () => ({
  type: DELETE_FOD_RESET,
});

export const deleteFODSuccess = (jobId) => ({
  type: DELETE_FOD_SUCCESS,
  payload: jobId,
});

export const deleteFODFailure = (error) => ({
  type: DELETE_FOD_FAILURE,
  payload: error,
});
