import {
  FETCH_JOB_LIST,
  FETCH_JOB_LIST_SUCCESS,
  FETCH_JOB_LIST_FAILURE,
  FETCH_JOB_LISTS,
  FETCH_JOB_LISTS_SUCCESS,
  FETCH_JOB_LISTS_FAILURE,
  CREATE_JOB_LIST,
  CREATE_JOB_LIST_SUCCESS,
  CREATE_JOB_LIST_FAILURE,
  POST_JOB_LIST,
  POST_JOB_LIST_SUCCESS,
  POST_JOB_LIST_FAILURE,
  PUT_JOB_LIST,
  PUT_JOB_LIST_SUCCESS,
  PUT_JOB_LIST_FAILURE,
  DELETE_JOB_LIST,
  DELETE_JOB_LIST_SUCCESS,
  DELETE_JOB_LIST_FAILURE,
  FETCH_JOB_LISTS_FIELDS,
  FETCH_JOB_LISTS_FIELDS_SUCCESS,
  FETCH_JOB_LISTS_FIELDS_FAILURE,
  FETCH_USER_GROUP_BY_NAME,
  FETCH_USER_GROUP_BY_NAME_SUCCESS,
  FETCH_USER_GROUP_BY_NAME_FAILURE,
  CREATE_JOB_FOD,
  CREATE_JOB_FOD_SUCCESS,
  CREATE_JOB_FOD_FAILURE,
} from "./actionTypes";

const initialState = {
  job: {},
  jobFOD: {},
  jobs: [],
  jobsFields: [],
  recruiterGroup: null,
  errorMsg: "",
  loading: false,
  error: false,
  success: false,
};

const JobListReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Recruiter Group
    case FETCH_USER_GROUP_BY_NAME:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_USER_GROUP_BY_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        recruiterGroup: action.payload,
      };
    case FETCH_USER_GROUP_BY_NAME_FAILURE:
      return {
        ...state,
        loading: false,
        recruiterGroup: null,
        error: true,
        errorMsg: action.payload,
      };

    // Fetch JobList
    case FETCH_JOB_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case FETCH_JOB_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Fetch all jobs
    case FETCH_JOB_LISTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_LISTS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobs: action.payload,
      };
    case FETCH_JOB_LISTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create an JobList
    case CREATE_JOB_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_JOB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case CREATE_JOB_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create JobFOD
    case CREATE_JOB_FOD:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_JOB_FOD_SUCCESS:
      return {
        ...state,
        loading: false,
        jobFOD: action.payload,
      };
    case CREATE_JOB_FOD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Post an JobList
    case POST_JOB_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_JOB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
        success: true,
      };
    case POST_JOB_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: true,
      };

    // Put an JobList
    case PUT_JOB_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PUT_JOB_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
        success: true,
      };
    case PUT_JOB_LIST_FAILURE:

    // Delete an JobList
    case DELETE_JOB_LIST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_JOB_LIST_SUCCESS:
      const newJobLists = JSON.parse(JSON.stringify(state.jobs));
      const filteredJobLists = newJobLists.jobs.filter(
        (job) => job.id !== action.payload
      );
      newJobLists.jobs = filteredJobLists;
      return {
        ...state,
        jobs: newJobLists,
        loading: false,
        success: true,
      };
    case DELETE_JOB_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };

    // Fetch all jobs fields
    case FETCH_JOB_LISTS_FIELDS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_JOB_LISTS_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobsFields: action.payload,
      };

    case FETCH_JOB_LISTS_FIELDS_FAILURE:
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

export default JobListReducer;
