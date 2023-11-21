import {
  SET_CANDIDATE_ID,
  SET_CANDIDATE_COUNTRY,
  DELETE_CANDIDATE_ID,
  DELETE_CANDIDATE_COUNTRY,
  FETCH_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE_FAILURE,
  DELETE_DRAFT_CANDIDATE_SUCCESS,
  CANDIDATE_REGISTRAION_RESET_META_DATA,
} from "./actionTypes";

export const fetchDraftCandidate = () => ({
  type: FETCH_DRAFT_CANDIDATE,
});

export const setCandidateId = (accountId) => ({
  type: SET_CANDIDATE_ID,
  payload: accountId,
});

export const setCandidateCountry = (accountCountry) => ({
  type: SET_CANDIDATE_COUNTRY,
  payload: accountCountry,
});

export const deleteCandidateId = () => ({
  type: DELETE_CANDIDATE_ID,
});

export const deleteCandidateCountry = () => ({
  type: DELETE_CANDIDATE_COUNTRY,
});

export const deleteDraftCandidate = (deleteDraftRequest) => ({
  type: DELETE_DRAFT_CANDIDATE,
  payload: deleteDraftRequest,
});

export const deleteDraftCandidateSuccess = () => ({
  type: DELETE_DRAFT_CANDIDATE_SUCCESS,
});

export const deleteDraftCandidateFailure = (error) => ({
  type: DELETE_DRAFT_CANDIDATE_FAILURE,
  payload: error,
});

export const resetMetaDataCandidateRegistration = () => ({
  type: CANDIDATE_REGISTRAION_RESET_META_DATA,
});

