import {
  NEW_JOBS_COUNT,
  NEW_JOBS_COUNT_SUCCESS,
  NEW_JOBS_COUNT_FAILURE,
  ACTIVE_JOBS_COUNT,
  ACTIVE_JOBS_COUNT_SUCCESS,
  ACTIVE_JOBS_COUNT_FAILURE,
  INACTIVE_JOBS_COUNT,
  INACTIVE_JOBS_COUNT_SUCCESS,
  INACTIVE_JOBS_COUNT_FAILURE,
  CLOSED_JOBS_COUNT,
  CLOSED_JOBS_COUNT_SUCCESS,
  CLOSED_JOBS_COUNT_FAILURE,
  ASSIGNED_JOBS_COUNT,
  ASSIGNED_JOBS_COUNT_SUCCESS,
  ASSIGNED_JOBS_COUNT_FAILURE,
  FOD_COUNT,
  FOD_COUNT_SUCCESS,
  FOD_COUNT_FAILURE,
  ALL_JOBS_COUNT,
  ALL_JOBS_COUNT_SUCCESS,
  ALL_JOBS_COUNT_FAILURE,
} from "./actionType";

import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "@workspace/common";

const INIT_STATE = {
  newJobs: null,
  newJobsMeta: {},
  activeJobs: null,
  activeJobsMeta: {},
  inactiveJobs: null,
  inactiveJobsMeta: {},
  closedJobs: null,
  closedJobsMeta: {},
  assignedJobs: null,
  assignedJobsMeta: {},
  fodJobs: null,
  fodJobsMeta: {},
  allJobs: null,
  allJobsMeta: {},
};

const JobsCount = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Fetch New Job count
    case NEW_JOBS_COUNT:
      return {
        ...state,
        newJobsMeta: pendingMetaData(),
      };
    case NEW_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        newJobsMeta: successMetaData(action.payload),
        newJobs: action.payload,
      };
    case NEW_JOBS_COUNT_FAILURE:
      return {
        ...state,
        newJobsMeta: errorMetaData(action.payload),
        newJobs: 0,
      };

    // Fetch Active Job count
    case ACTIVE_JOBS_COUNT:
      return {
        ...state,
        activeJobsMeta: pendingMetaData(),
      };
    case ACTIVE_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        activeJobsMeta: successMetaData(action.payload),
        activeJobs: action.payload,
      };
    case ACTIVE_JOBS_COUNT_FAILURE:
      return {
        ...state,
        activeJobsMeta: errorMetaData(action.payload),
        activeJobs: 0,
      };

    // Fetch Inactive Job count
    case INACTIVE_JOBS_COUNT:
      return {
        ...state,
        inactiveJobsMeta: pendingMetaData(),
      };
    case INACTIVE_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        inactiveJobsMeta: successMetaData(action.payload),
        inactiveJobs: action.payload,
      };
    case INACTIVE_JOBS_COUNT_FAILURE:
      return {
        ...state,
        inactiveJobsMeta: errorMetaData(action.payload),
        inactiveJobs: 0,
      };

    // Fetch Closed Job count
    case CLOSED_JOBS_COUNT:
      return {
        ...state,
        closedJobsMeta: pendingMetaData(),
      };
    case CLOSED_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        closedJobsMeta: successMetaData(action.payload),
        closedJobs: action.payload,
      };
    case CLOSED_JOBS_COUNT_FAILURE:
      return {
        ...state,
        closedJobsMeta: errorMetaData(action.payload),
        closedJobs: 0,
      };

    // Fetch Assigned Job count
    case ASSIGNED_JOBS_COUNT:
      return {
        ...state,
        assignedJobsMeta: pendingMetaData(),
      };
    case ASSIGNED_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        assignedJobsMeta: successMetaData(action.payload),
        assignedJobs: action.payload,
      };
    case ASSIGNED_JOBS_COUNT_FAILURE:
      return {
        ...state,
        assignedJobsMeta: errorMetaData(action.payload),
        assignedJobs: 0,
      };

    // Fetch FOD Job count
    case FOD_COUNT:
      return {
        ...state,
        fodJobsMeta: pendingMetaData(),
      };
    case FOD_COUNT_SUCCESS:
      return {
        ...state,
        fodJobsMeta: successMetaData(action.payload),
        fodJobs: action.payload,
      };
    case FOD_COUNT_FAILURE:
      return {
        ...state,
        fodJobsMeta: errorMetaData(action.payload),
        fodJobs: 0,
      };

    // Fetch All Job count
    case ALL_JOBS_COUNT:
      return {
        ...state,
        allJobsMeta: pendingMetaData(),
      };
    case ALL_JOBS_COUNT_SUCCESS:
      return {
        ...state,
        allJobsMeta: successMetaData(action.payload),
        allJobs: action.payload,
      };
    case ALL_JOBS_COUNT_FAILURE:
      return {
        ...state,
        allJobsMeta: errorMetaData(action.payload),
        allJobs: 0,
      };

    default:
      return state;
  }
};
export default JobsCount;
