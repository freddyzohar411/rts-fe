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
  FETCH_CANDIDATES_ADMIN,
  FETCH_CANDIDATES_ADMIN_SUCCESS,
  FETCH_CANDIDATES_ADMIN_FAILURE,
  IMPORT_CANDIDATE,
  IMPORT_CANDIDATE_SUCCESS,
  IMPORT_CANDIDATE_FAILURE,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  candidate: {},
  candidateMeta: {},
  candidates: [],
  candidateData: null,
  candidatesFields: [],
  candidatesFieldsAll: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
  tableMeta: {},
  importLoading: false,
};

const CandidateReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Account
    case FETCH_CANDIDATE:
      return {
        ...state,
        candidateMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATE_SUCCESS:
      return {
        ...state,
        candidateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case FETCH_CANDIDATE_FAILURE:
      return {
        ...state,
        candidate: {},
        candidateMeta: errorMetaData(action.payload),
      };

    // Fetch all accounts
    case FETCH_CANDIDATES:
      return {
        ...state,
        candidateMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATES_SUCCESS:
      return {
        ...state,
        candidateMeta: successMetaData(action.payload),
        candidates: action.payload,
      };
    case FETCH_CANDIDATES_FAILURE:
      return {
        ...state,
        candidates: [],
        candidateMeta: errorMetaData(action.payload),
      };

    // Create an Account
    case CREATE_CANDIDATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_CANDIDATE_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case CREATE_CANDIDATE_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Post an Account
    case POST_CANDIDATE:
      return {
        ...state,
        createMeta: pendingMetaData(),
      };
    case POST_CANDIDATE_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case POST_CANDIDATE_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Put an Account
    case PUT_CANDIDATE:
      return {
        ...state,
        updateMeta: pendingMetaData(),
      };
    case PUT_CANDIDATE_SUCCESS:
      return {
        ...state,
        updateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case PUT_CANDIDATE_FAILURE:
      return {
        ...state,
        updateMeta: errorMetaData(action.payload),
      };

    // Delete an Account
    case DELETE_CANDIDATE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case DELETE_CANDIDATE_SUCCESS:
      const newCandidates = JSON.parse(JSON.stringify(state.candidates));
      const filteredCandidates = newCandidates.candidates.filter(
        (candidate) => candidate.id !== action.payload
      );
      newCandidates.candidates = filteredCandidates;
      return {
        ...state,
        candidates: newCandidates,
        loading: false,
        success: true,
      };
    case DELETE_CANDIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };

    // Fetch all accounts fields
    case FETCH_CANDIDATES_FIELDS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_CANDIDATES_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesFields: action.payload,
      };

    case FETCH_CANDIDATES_FIELDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case PUT_CANDIDATE_DRAFT_STATUS:
      return {
        ...state,
        updateMeta: pendingMetaData(),
      };
    case PUT_CANDIDATE_DRAFT_STATUS_SUCCESS:
      return {
        ...state,
        updateMeta: successMetaData(action.payload),
        candidate: action.payload,
      };
    case PUT_CANDIDATE_DRAFT_STATUS_FAILURE:
      return {
        ...state,
        updateMeta: errorMetaData(action.payload),
      };
    case RESET_META_DATA:
      return {
        ...state,
        meta: resetAllMetaData(),
        createMeta: resetAllMetaData(),
        updateMeta: resetAllMetaData(),
        deleteMeta: resetAllMetaData(),
      };
    case FETCH_CANDIDATE_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        candidateData: action.payload,
      };
    case FETCH_CANDIDATE_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_CANDIDATES_FIELDS_ALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATES_FIELDS_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        candidatesFieldsAll: action.payload,
      };
    case FETCH_CANDIDATES_FIELDS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Admin
    case FETCH_CANDIDATES_ADMIN:
      return {
        ...state,
        candidateMeta: pendingMetaData(),
      };
    case FETCH_CANDIDATES_ADMIN_SUCCESS:
      return {
        ...state,
        candidateMeta: successMetaData(action.payload),
        candidates: action.payload,
      };
    case FETCH_CANDIDATES_ADMIN_FAILURE:
      return {
        ...state,
        candidates: {},
        candidateMeta: errorMetaData(action.payload),
      };
    case IMPORT_CANDIDATE:
      return {
        ...state,
        importLoading: true,
      };
    case IMPORT_CANDIDATE_SUCCESS:
      return {
        ...state,
        importLoading: false,
      };
    case IMPORT_CANDIDATE_FAILURE:
      return {
        ...state,
        importLoading: false,
      };
    default:
      return state;
  }
};

export default CandidateReducer;
