import {
  TAG_JOB,
  TAG_JOB_SUCCESS,
  TAG_JOB_FAILURE,
  TAG_JOB_ALL,
  TAG_JOB_ALL_SUCCESS,
  TAG_JOB_ALL_FAILURE,
  FETCH_JOB_TIMELINE_LIST,
  FETCH_JOB_TIMELINE_LIST_SUCCESS,
  FETCH_JOB_TIMELINE_LIST_FAILURE,
  JOB_TIMELINE_COUNT,
  JOB_TIMELINE_COUNT_SUCCESS,
  JOB_TIMELINE_COUNT_FAILURE,
  TAG_JOB_RESET,
} from "./actionTypes";

// tag a job
export const tagJob = (job) => ({
  type: TAG_JOB,
  payload: job,
});

export const tagJobSuccess = (job) => ({
  type: TAG_JOB_SUCCESS,
  payload: job,
});

export const tagJobFailure = (error) => ({
  type: TAG_JOB_FAILURE,
  payload: error,
});

export const tagReset = () => ({
  type: TAG_JOB_RESET,
});

// tag all job
export const tagJobAll = (job) => ({
  type: TAG_JOB_ALL,
  payload: job,
});

export const tagJobAllSuccess = (job) => ({
  type: TAG_JOB_ALL_SUCCESS,
  payload: job,
});

export const tagJobAllFailure = (error) => ({
  type: TAG_JOB_ALL_FAILURE,
  payload: error,
});

// Fetch JobLists
export const fetchJobTimelineList = (params) => ({
  type: FETCH_JOB_TIMELINE_LIST,
  payload: params,
});

export const fetchJobTimelineListSuccess = (accounts) => ({
  type: FETCH_JOB_TIMELINE_LIST_SUCCESS,
  payload: accounts,
});

export const fetchJobTimelineListFailure = (error) => ({
  type: FETCH_JOB_TIMELINE_LIST_FAILURE,
  payload: error,
});

// Fetch Job timeline count
export const fetchJobtimeineCount = (params) => ({
  type: JOB_TIMELINE_COUNT,
  payload: params,
});

export const fetchJobtimeineCountSuccess = (count) => ({
  type: JOB_TIMELINE_COUNT_SUCCESS,
  payload: count,
});

export const fetchJobtimeineCountFailure = (error) => ({
  type: JOB_TIMELINE_COUNT_FAILURE,
  payload: error,
});