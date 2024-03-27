import {
  CREATE_JOB_CUSTOM_VIEW,
  CREATE_JOB_CUSTOM_VIEW_SUCCESS,
  CREATE_JOB_CUSTOM_VIEW_FAILURE,
  FETCH_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW_SUCCESS,
  FETCH_JOB_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

const initialState = {
  customView: {},
  customViews: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const JobCustomViewReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Job Custom View
    case CREATE_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_JOB_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        customView: action.payload,
      };
    case CREATE_JOB_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Fetch Job Custom View
    case FETCH_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        customViews: action.payload,
      };
    case FETCH_JOB_CUSTOM_VIEW_FAILURE:
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

export default JobCustomViewReducer;
