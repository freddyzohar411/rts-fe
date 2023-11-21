import {
  SET_CANDIDATE_ID,
  SET_CANDIDATE_COUNTRY,
  DELETE_CANDIDATE_ID,
  DELETE_CANDIDATE_COUNTRY,
  FETCH_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE_SUCCESS,
  DELETE_DRAFT_CANDIDATE_FAILURE,
  CANDIDATE_REGISTRAION_RESET_META_DATA,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  candidateId: null,
  candidateCountry:null,
  // loading: false,
  // error: false,
  // success: false,
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
};

const CandidateRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CANDIDATE_ID:
      return {
        ...state,
        candidateId: action.payload,
      };
    case SET_CANDIDATE_COUNTRY:
      return {
        ...state,
        candidateCountry: action.payload,
      };
    case DELETE_CANDIDATE_ID:
      return {
        ...state,
        candidateId: null,
      };
    case DELETE_CANDIDATE_COUNTRY:
      return {
        ...state,
        candidateCountry: null,
      };
    case FETCH_DRAFT_CANDIDATE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRAFT_CANDIDATE:
      return {
        ...state,
        // loading: true,
        deleteMeta: pendingMetaData(),
      };
    case DELETE_DRAFT_CANDIDATE_SUCCESS:
      // return {
      //   ...state,
      //   // loading: false,
      //   // success: true,
      //   deleteMeta: successMetaData(),
      // };
      // state.deleteMeta = successMetaData();
      // state.candidateId = null;
      // state.candidateCountry = null;
      // return state;
      return {
        ...state,
        candidateId: null,
        candidateCountry: null,
        deleteMeta: successMetaData(),
      }
    case DELETE_DRAFT_CANDIDATE_FAILURE:
      return {
        ...state,
        // loading: false,
        // error: true,
        deleteMeta: errorMetaData(action.payload),
      };
    case CANDIDATE_REGISTRAION_RESET_META_DATA:
      return {
        ...state,
        meta: resetAllMetaData(),
        createMeta: resetAllMetaData(),
        updateMeta: resetAllMetaData(),
        deleteMeta: resetAllMetaData(),
      };
    default:
      return state;
  }
};

export default CandidateRegistrationReducer;
