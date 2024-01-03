import {
  FETCH_CANDIDATE,
  FETCH_CANDIDATE_SUCCESS,
  FETCH_CANDIDATE_FAILURE,
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_SUCCESS,
  FETCH_CANDIDATES_FAILURE,
  CREATE_CANDIDATE,
  CREATE_CANDIDATE_SUCCESS,
  CREATE_CANDIDATE_FAILURE,
  POST_CANDIDATE,
  POST_CANDIDATE_SUCCESS,
  POST_CANDIDATE_FAILURE,
  PUT_CANDIDATE,
  PUT_CANDIDATE_SUCCESS,
  PUT_CANDIDATE_FAILURE,
  DELETE_CANDIDATE,
  DELETE_CANDIDATE_SUCCESS,
  DELETE_CANDIDATE_FAILURE,
  FETCH_CANDIDATES_FIELDS,
  FETCH_CANDIDATES_FIELDS_SUCCESS,
  FETCH_CANDIDATES_FIELDS_FAILURE,
  PUT_CANDIDATE_DRAFT_STATUS,
  PUT_CANDIDATE_DRAFT_STATUS_SUCCESS,
  PUT_CANDIDATE_DRAFT_STATUS_FAILURE,
  RESET_META_DATA,
  FETCH_CANDIDATE_DATA,
  FETCH_CANDIDATE_DATA_SUCCESS,
  FETCH_CANDIDATE_DATA_FAILURE,
} from "./actionTypes";

// Fetch Candidate
export const fetchCandidate = (candidateId) => ({
  type: FETCH_CANDIDATE,
  payload: candidateId,
});

export const fetchCandidateSuccess = (candidate) => ({
  type: FETCH_CANDIDATE_SUCCESS,
  payload: candidate,
});

export const fetchCandidateFailure = (error) => ({
  type: FETCH_CANDIDATE_FAILURE,
  payload: error,
});

// Fetch Candidates
export const fetchCandidates = (params) => ({
  type: FETCH_CANDIDATES,
  payload: params,
});

export const fetchCandidatesSuccess = (candidates) => ({
  type: FETCH_CANDIDATES_SUCCESS,
  payload: candidates,
});

export const fetchCandidatesFailure = (error) => ({
  type: FETCH_CANDIDATES_FAILURE,
  payload: error,
});

// Create an Candidate
export const createCandidate = (candidateRequest) => ({
  type: CREATE_CANDIDATE,
  payload: candidateRequest,
});

export const createCandidateSuccess = (candidate) => ({
  type: CREATE_CANDIDATE_SUCCESS,
  payload: candidate,
});

export const createCandidateFailure = (error) => ({
  type: CREATE_CANDIDATE_FAILURE,
  payload: error,
});

// Post an account
export const postCandidate = (candidateRequest) => ({
  type: POST_CANDIDATE,
  payload: candidateRequest,
});

export const postCandidateSuccess = (candidate) => ({
  type: POST_CANDIDATE_SUCCESS,
  payload: candidate,
});

export const postCandidateFailure = (error) => ({
  type: POST_CANDIDATE_FAILURE,
  payload: error,
});

// Put an account
export const putCandidate = (candidateRequest) => ({
  type: PUT_CANDIDATE,
  payload: candidateRequest,
});

export const putCandidateSuccess = (candidate) => ({
  type: PUT_CANDIDATE_SUCCESS,
  payload: candidate,
});

export const putCandidateFailure = (error) => ({
  type: PUT_CANDIDATE_FAILURE,
  payload: error,
});

export const deleteCandidate = (candidateId) => ({
  type: DELETE_CANDIDATE,
  payload: candidateId,
});

export const deleteCandidateSuccess = (candidateId) => ({
  type: DELETE_CANDIDATE_SUCCESS,
  payload: candidateId,
});

export const deleteCandidateFailure = (error) => ({
  type: DELETE_CANDIDATE_FAILURE,
  payload: error,
});

// Fetch Candidates Fields
export const fetchCandidatesFields = () => ({
  type: FETCH_CANDIDATES_FIELDS,
});

export const fetchCandidatesFieldsSuccess = (candidatesFields) => ({
  type: FETCH_CANDIDATES_FIELDS_SUCCESS,
  payload: candidatesFields,
});

export const fetchCandidatesFieldsFailure = (error) => ({
  type: FETCH_CANDIDATES_FIELDS_FAILURE,
  payload: error,
});

// Put Candidate Draft Status
export const putCandidateDraftStatus = (candidateId) => ({
  type: PUT_CANDIDATE_DRAFT_STATUS,
  payload: candidateId,
});

export const putCandidateDraftStatusSuccess = (candidate) => ({
  type: PUT_CANDIDATE_DRAFT_STATUS_SUCCESS,
  payload: candidate,
});

export const putCandidateDraftStatusFailure = (error) => ({
  type: PUT_CANDIDATE_DRAFT_STATUS_FAILURE,
  payload: error,
});

export const resetMetaData = () => ({
  type: RESET_META_DATA,
});

// Fetch Candidate Data
export const fetchCandidateData = (candidateId) => ({
  type: FETCH_CANDIDATE_DATA,
  payload: candidateId,
});

export const fetchCandidateDataSuccess = (candidateData) => ({
  type: FETCH_CANDIDATE_DATA_SUCCESS,
  payload: candidateData,
});

export const fetchCandidateDataFailure = (error) => ({
  type: FETCH_CANDIDATE_DATA_FAILURE,
  payload: error,
});


