import {
  TAG_JOB,
  TAG_JOB_SUCCESS,
  TAG_JOB_FAILURE,
  TAG_JOB_ALL,
  TAG_JOB_ALL_SUCCESS,
  TAG_JOB_ALL_FAILURE,
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
