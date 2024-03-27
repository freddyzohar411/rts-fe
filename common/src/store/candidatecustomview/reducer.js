import {
  CREATE_CANDIDATE_CUSTOM_VIEW,
  CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE,
  FETCH_CANDIDATE_CUSTOM_VIEW,
  FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS,
  FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

const initialState = {
  customView: {},
  customViews: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const CandidateCustomViewReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Candidate Custom View
    case CREATE_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        customView: action.payload,
      };
    case CREATE_CANDIDATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Fetch Candidate Custom View
    case FETCH_CANDIDATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        customViews: action.payload,
      };
    case FETCH_CANDIDATE_CUSTOM_VIEW_FAILURE:
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

export default CandidateCustomViewReducer;
