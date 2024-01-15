import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "@workspace/common";
import { TAG_JOB, TAG_JOB_SUCCESS, TAG_JOB_FAILURE } from "./actionTypes";

const initialState = {
  jobTag: {},
  jobTagMeta: {},
};

const JobStageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create a job
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
    default:
      return state;
  }
};

export default JobStageReducer;
