import { TAG_JOB, TAG_JOB_SUCCESS, TAG_JOB_FAILURE } from "./actionTypes";

// Create an Account
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
