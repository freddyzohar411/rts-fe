import {
  GET_CANDIDATE_MAPPING,
  GET_CANDIDATE_MAPPING_SUCCESS,
  GET_CANDIDATE_MAPPING_FAILURE,
  POST_CANDIDATE_MAPPING,
  POST_CANDIDATE_MAPPING_SUCCESS,
  POST_CANDIDATE_MAPPING_FAILURE,
} from "./actionTypes";

const initialState = {
  loading: false,
  error: false,
  errorMsg: "",
  candidateMapping: null,
};

const CandidateMappingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CANDIDATE_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case GET_CANDIDATE_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        candidateMapping: action.payload,
      };
    case GET_CANDIDATE_MAPPING_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case POST_CANDIDATE_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case POST_CANDIDATE_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        errorMsg: "",
        candidateMapping: action.payload,
      };
    case POST_CANDIDATE_MAPPING_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default CandidateMappingReducer;
