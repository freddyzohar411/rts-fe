import {
  CREATE_CANDIDATE_CUSTOM_VIEW,
  CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  FETCH_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

// Create Candidate Custom View
export const createCandidateCustomView = (customViewRequest) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW,
  payload: customViewRequest,
});

export const createCandidateCustomViewSuccess = (customView) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: customView,
});

export const createCandidateCustomViewFailure = (error) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Fetch Candidate Custom View
export const fetchCandidateCustomView = (customViewRequest) => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW,
  payload: customViewRequest,
});

export const fetchCandidateCustomViewSuccess = (customView) => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: customView,
});

export const fetchCandidateCustomViewFailure = (error) => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});
