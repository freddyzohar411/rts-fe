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
  FETCH_CANDIDATES_FIELDS_ALL,
  FETCH_CANDIDATES_FIELDS_ALL_SUCCESS,
  FETCH_CANDIDATES_FIELDS_ALL_FAILURE,
  IMPORT_CANDIDATE,
  IMPORT_CANDIDATE_SUCCESS,
  IMPORT_CANDIDATE_FAILURE,
  IMPORT_CANDIDATE_MULTI,
  IMPORT_CANDIDATE_MULTI_SUCCESS,
  IMPORT_CANDIDATE_MULTI_FAILURE,
  SET_PARSE_AND_IMPORT_LOADING,
  UPDATE_CANIDATE_EMBEDDINGS,
  UPDATE_CANIDATE_EMBEDDINGS_SUCCESS,
  UPDATE_CANIDATE_EMBEDDINGS_FAILURE,
  CANDIDATE_RECOMMENDATION_LIST,
  CANDIDATE_RECOMMENDATION_LIST_SUCCESS,
  CANDIDATE_RECOMMENDATION_LIST_FAILURE,
  RESET_CANDIDATE_RECOMMENDATION_LIST,
  CREATE_CANDIDATE_CUSTOM_VIEW,
  CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  FETCH_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
  SELECT_CANDIDATE_CUSTOM_VIEW,
  SELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  SELECT_CANDIDATE_CUSTOM_VIEW_FAILURE,
  DELETE_CANDIDATE_CUSTOM_VIEW,
  DELETE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  DELETE_CANDIDATE_CUSTOM_VIEW_FAILURE
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

// Fetch Candidates Fields All
export const fetchCandidatesFieldsAll = () => ({
  type: FETCH_CANDIDATES_FIELDS_ALL,
});

export const fetchCandidatesFieldsAllSuccess = (candidatesFields) => ({
  type: FETCH_CANDIDATES_FIELDS_ALL_SUCCESS,
  payload: candidatesFields,
});

export const fetchCandidatesFieldsAllFailure = (error) => ({
  type: FETCH_CANDIDATES_FIELDS_ALL_FAILURE,
  payload: error,
});

// Import Candidate
export const importCandidate = (candidateRequest) => ({
  type: IMPORT_CANDIDATE,
  payload: candidateRequest,
});

export const importCandidateSuccess = (candidate) => ({
  type: IMPORT_CANDIDATE_SUCCESS,
  payload: candidate,
});

export const importCandidateFailure = (error) => ({
  type: IMPORT_CANDIDATE_FAILURE,
  payload: error,
});

export const importCandidateMulti = (candidateRequestAll) => ({
  type: IMPORT_CANDIDATE_MULTI,
  payload: candidateRequestAll,
});

export const importCandidateMultiSuccess = () => ({
  type: IMPORT_CANDIDATE_MULTI_SUCCESS,
});

export const importCandidateMultiFailure = (error) => ({
  type: IMPORT_CANDIDATE_MULTI_FAILURE,
  payload: error,
});

export const setParseAndImportLoading = (loading) => ({
  type: SET_PARSE_AND_IMPORT_LOADING,
  payload: loading,
});

// Update Candidate Embeddings
export const updateCandidateEmbeddings = (candidateId) => ({
  type: UPDATE_CANIDATE_EMBEDDINGS,
  payload: candidateId,
});

export const updateCandidateEmbeddingsSuccess = (candidate) => ({
  type: UPDATE_CANIDATE_EMBEDDINGS_SUCCESS,
  payload: candidate,
});

export const updateCandidateEmbeddingsFailure = (error) => ({
  type: UPDATE_CANIDATE_EMBEDDINGS_FAILURE,
  payload: error,
});

// Candidate Recommendation List
export const candidateRecommendationList = (params, signal) => ({
  type: CANDIDATE_RECOMMENDATION_LIST,
  payload: { params, signal },
});

export const candidateRecommendationListSuccess = (candidates) => ({
  type: CANDIDATE_RECOMMENDATION_LIST_SUCCESS,
  payload: candidates,
});

export const candidateRecommendationListFailure = (error) => ({
  type: CANDIDATE_RECOMMENDATION_LIST_FAILURE,
  payload: error,
});

export const resetCandidateRecommendationList = () => ({
  type: RESET_CANDIDATE_RECOMMENDATION_LIST,
});

// Create Candidate Custom View
export const createCandidateCustomView = (candidateCustomViewRequest) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW,
  payload: candidateCustomViewRequest,
});

export const createCandidateCustomViewSuccess = (candidateCustomView) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: candidateCustomView,
});

export const createCandidateCustomViewFailure = (error) => ({
  type: CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Fetch Candidate Custom Views
export const fetchCandidateCustomView = () => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW,
});

export const fetchCandidateCustomViewSuccess = (candidateCustomViews) => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: candidateCustomViews,
});

export const fetchCandidateCustomViewFailure = (error) => ({
  type: FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Select Candidate Custom View
export const selectCandidateCustomView = (candidateCustomViewRequest) => ({
  type: SELECT_CANDIDATE_CUSTOM_VIEW,
  payload: candidateCustomViewRequest,
});

export const selectCandidateCustomViewSuccess = (candidateCustomView) => ({
  type: SELECT_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: candidateCustomView,
});

export const selectCandidateCustomViewFailure = (error) => ({
  type: SELECT_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Delete Candidate Custom View
export const deleteCandidateCustomView = (candidateCustomViewId) => ({
  type: DELETE_CANDIDATE_CUSTOM_VIEW,
  payload: candidateCustomViewId,
});

export const deleteCandidateCustomViewSuccess = (candidateCustomViewId) => ({
  type: DELETE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  payload: candidateCustomViewId,
});

export const deleteCandidateCustomViewFailure = (error) => ({
  type: DELETE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  payload: error,
});
