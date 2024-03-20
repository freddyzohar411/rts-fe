import {
  errorMetaData,
  pendingMetaData,
  resetMetaData,
  successMetaData,
} from "@workspace/common";
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
  DELETE_FOD,
  DELETE_FOD_SUCCESS,
  DELETE_FOD_FAILURE,
  DELETE_FOD_RESET,
  CREATE_JOB_FOD_RESET,
} from "./actionTypes";

const initialState = {
  job: {},
  jobFOD: {},
  jobFODMeta: {},
  jobs: [],
  jobsMeta: {},
  jobsFields: [],
  recruiterGroup: null,
  errorMsg: "",
  loading: false,
  error: false,
  success: false,
  deleteFOD: {},
  deleteFODMeta: {},
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
        jobsMeta: pendingMetaData(),
      };
    case FETCH_JOB_LISTS_SUCCESS:
      return {
        ...state,
        jobsMeta: successMetaData(action.payload),
        jobs: action.payload,
      };
    case FETCH_JOB_LISTS_FAILURE:
      return {
        ...state,
        jobs: [],
        jobsMeta: errorMetaData(action.payload),
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
        jobFODMeta: pendingMetaData(),
      };
    case CREATE_JOB_FOD_RESET:
      return {
        ...state,
        jobFODMeta: resetMetaData(),
      };
    case CREATE_JOB_FOD_SUCCESS:
      return {
        ...state,
        jobFODMeta: successMetaData(action.payload),
        jobFOD: action.payload,
      };
    case CREATE_JOB_FOD_FAILURE:
      return {
        ...state,
        jobFODMeta: errorMetaData(action.payload),
        jobFOD: action.payload,
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

    // Delete FOD
    case DELETE_FOD:
      return {
        ...state,
        deleteFODMeta: pendingMetaData(),
      };
    case DELETE_FOD_RESET:
      return {
        ...state,
        deleteFODMeta: resetMetaData(),
      };
    case DELETE_FOD_SUCCESS:
      return {
        ...state,
        deleteFODMeta: successMetaData(action.payload),
        deleteFOD: action.payload,
      };
    case DELETE_FOD_FAILURE:
      return {
        ...state,
        deleteFODMeta: errorMetaData(action.payload),
        deleteFOD: {},
      };
    default:
      return state;
  }
};

export default JobListReducer;
