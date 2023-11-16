import {
  SET_CANDIDATE_ID,
  SET_CANDIDATE_COUNTRY,
  DELETE_CANDIDATE_ID,
  DELETE_CANDIDATE_COUNTRY,
  FETCH_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE,
  DELETE_DRAFT_CANDIDATE_SUCCESS,
  DELETE_DRAFT_CANDIDATE_FAILURE,
} from "./actionTypes";

const initialState = {
  candidateId: null,
  candidateCountry:null,
  loading: false,
  error: false,
  success: false,
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
      };
    case DELETE_DRAFT_CANDIDATE:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRAFT_CANDIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_DRAFT_CANDIDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default CandidateRegistrationReducer;
