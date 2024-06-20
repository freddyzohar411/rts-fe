import {
  FETCH_JOBS,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_FAILURE,
  FETCH_JOB,
  FETCH_JOB_SUCCESS,
  FETCH_JOB_FAILURE,
  CLEAR_JOB,
  CREATE_JOB_DOCUMENTS,
  CREATE_JOB_DOCUMENTS_SUCCESS,
  CREATE_JOB_DOCUMENTS_FAILURE,
  FETCH_JOB_DATA,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAILURE,
  FETCH_JOBS_FIELDS_ALL,
  FETCH_JOBS_FIELDS_ALL_SUCCESS,
  FETCH_JOBS_FIELDS_ALL_FAILURE,
  UPDATE_JOB_EMBEDDINGS,
  UPDATE_JOB_EMBEDDINGS_SUCCESS,
  UPDATE_JOB_EMBEDDINGS_FAILURE,
  CREATE_JOB_CUSTOM_VIEW,
  CREATE_JOB_CUSTOM_VIEW_SUCCESS,
  CREATE_JOB_CUSTOM_VIEW_FAILURE,
  CLONE_JOB,
  CLONE_JOB_SUCCESS,
  CLONE_JOB_FAILURE,
  FETCH_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW_SUCCESS,
  FETCH_JOB_CUSTOM_VIEW_FAILURE,
  SELECT_JOB_CUSTOM_VIEW,
  SELECT_JOB_CUSTOM_VIEW_SUCCESS,
  SELECT_JOB_CUSTOM_VIEW_FAILURE,
  DELETE_JOB_CUSTOM_VIEW,
  DELETE_JOB_CUSTOM_VIEW_SUCCESS,
  DELETE_JOB_CUSTOM_VIEW_FAILURE,
  CREATE_JOB_RESET,
  RESET_JOB_CUSTOM_VIEW,
  FETCH_JOB_CUSTOM_VIEW_BY_ID,
  FETCH_JOB_CUSTOM_VIEW_BY_ID_SUCCESS,
  FETCH_JOB_CUSTOM_VIEW_BY_ID_FAILURE,
  EDIT_JOB_CUSTOM_VIEW_BY_ID,
  EDIT_JOB_CUSTOM_VIEW_BY_ID_SUCCESS,
  EDIT_JOB_CUSTOM_VIEW_BY_ID_FAILURE,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  job: {},
  jobDocuments: {},
  jobData: null,
  jobs: [],
  jobsFieldsAll: [],
  errorMsg: "",
  loading: false,
  isDraftLoading: false,
  error: false,
  jobCustomView: {},
  jobCustomViews: null,
};

const JobReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch job
    case CLEAR_JOB:
      return {
        ...state,
        loading: false,
        job: null,
      };
    case FETCH_JOB:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case FETCH_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

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
        jobs: action.payload,
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
      const { payload } = action.payload;
      return {
        ...state,
        loading: payload.isDraft ? false : true,
        isDraftLoading: payload.isDraft ? true : false,
        error: false,
      };
    case CREATE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        isDraftLoading: false,
        job: action.payload,
      };
    case CREATE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        isDraftLoading: false,
        errorMsg: action.payload,
      };
    case CREATE_JOB_RESET:
      return {
        ...state,
        loading: false,
        isDraftLoading: false,
        job: null,
      };

    // Clone a job
    case CLONE_JOB:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CLONE_JOB_SUCCESS:
      return {
        ...state,
        loading: false,
        job: action.payload,
      };
    case CLONE_JOB_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create a job documents
    case CREATE_JOB_DOCUMENTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_JOB_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobDocuments: action.payload,
      };
    case CREATE_JOB_DOCUMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_JOB_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        jobData: action.payload,
      };
    case FETCH_JOB_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_JOBS_FIELDS_ALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOBS_FIELDS_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        jobsFieldsAll: action.payload,
      };
    case FETCH_JOBS_FIELDS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    case UPDATE_JOB_EMBEDDINGS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case UPDATE_JOB_EMBEDDINGS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_JOB_EMBEDDINGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create Job Custom View
    case CREATE_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_JOB_CUSTOM_VIEW_SUCCESS:
      return {
        loading: false,
        jobCustomView: action.payload,
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
        jobCustomViews: action.payload,
      };
    case FETCH_JOB_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Select Job Custom View
    case SELECT_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SELECT_JOB_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCustomView: action.payload,
      };
    case SELECT_JOB_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Delete Job Custom View
    case DELETE_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_JOB_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCustomView: action.payload,
      };
    case DELETE_JOB_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_JOB_CUSTOM_VIEW:
      return {
        ...state,
        loading: false,
        jobCustomViews: null,
      };
    case FETCH_JOB_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_JOB_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCustomView: action.payload,
      };
    case FETCH_JOB_CUSTOM_VIEW_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case EDIT_JOB_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_JOB_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCustomView: action.payload,
      };
    case EDIT_JOB_CUSTOM_VIEW_BY_ID_FAILURE:
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
