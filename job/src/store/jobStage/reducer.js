import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "@workspace/common";
import {
  TAG_JOB,
  TAG_JOB_SUCCESS,
  TAG_JOB_FAILURE,
  TAG_JOB_ALL,
  TAG_JOB_ALL_SUCCESS,
  TAG_JOB_ALL_FAILURE,
} from "./actionTypes";

const initialState = {
  jobTag: {},
  jobTagMeta: {},
  jobAllTag: {},
  jobAllTagMeta: {},
};

const JobStageReducer = (state = initialState, action) => {
  switch (action.type) {
    // tag a job
    case TAG_JOB:
      return {
        ...state,
        jobTagMeta: pendingMetaData(),
      };
    case TAG_JOB_SUCCESS:
      return {
        ...state,
        jobTagMeta: successMetaData(action.payload),
        jobTag: action.payload,
      };
    case TAG_JOB_FAILURE:
      return {
        ...state,
        jobTagMeta: errorMetaData(action.payload),
      };

    // tag all job
    case TAG_JOB_ALL:
      return {
        ...state,
        jobAllTagMeta: pendingMetaData(),
      };
    case TAG_JOB_ALL_SUCCESS:
      return {
        ...state,
        jobAllTagMeta: successMetaData(action.payload),
        jobAllTag: action.payload,
      };
    case TAG_JOB_ALL_FAILURE:
      return {
        ...state,
        jobAllTagMeta: errorMetaData(action.payload),
      };
    default:
      return state;
  }
};

export default JobStageReducer;
