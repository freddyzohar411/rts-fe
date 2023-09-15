import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
} from "./actionTypes";

const initialState = {
  job: {},
  jobs: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch all jobs
    case FETCH_JOBS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };
    case FETCH_JOBS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create a job
    case CREATE_JOB:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case CREATE_JOB_FAILURE:
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

export default JobReducer;
