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
  FETCH_JOB_TIMELINE_LIST,
  FETCH_JOB_TIMELINE_LIST_SUCCESS,
  FETCH_JOB_TIMELINE_LIST_FAILURE,
  JOB_TIMELINE_COUNT,
  JOB_TIMELINE_COUNT_SUCCESS,
  JOB_TIMELINE_COUNT_FAILURE,
  TAG_JOB_RESET,
  TAG_JOB_ATTACHMENT,
  TAG_JOB_ATTACHMENT_SUCCESS,
  TAG_JOB_ATTACHMENT_FAILURE,
  TAG_JOB_ATTACHMENT_RESET,
} from "./actionTypes";

const initialState = {
  jobTag: {},
  jobTagMeta: {},
  jobAllTag: {},
  jobAllTagMeta: {},
  jobTimeline: {},
  jobTimelineMeta: {},
  jobTimelineCount: {},
  jobTimelineCountMeta: {},
};

const JobStageReducer = (state = initialState, action) => {
  switch (action.type) {
    // tag a job
    case TAG_JOB:
      console.log("ACTION", action.payload);
      return {
        ...state,
        jobTagMeta: { ...pendingMetaData(), jobType: action.payload.jobType },
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
    case TAG_JOB_RESET:
      return {
        ...state,
        jobTagMeta: {},
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

    // Fetch job timeline
    case FETCH_JOB_TIMELINE_LIST:
      return {
        ...state,
        jobTimelineMeta: pendingMetaData(),
      };
    case FETCH_JOB_TIMELINE_LIST_SUCCESS:
      return {
        ...state,
        jobTimelineMeta: successMetaData(action.payload),
        jobTimeline: action.payload,
      };
    case FETCH_JOB_TIMELINE_LIST_FAILURE:
      return {
        ...state,
        jobTimeline: {},
        jobTimelineMeta: errorMetaData(action.payload),
      };

    // Fetch job timeline count
    case JOB_TIMELINE_COUNT:
      return {
        ...state,
        jobTimelineCountMeta: pendingMetaData(),
      };
    case JOB_TIMELINE_COUNT_SUCCESS:
      return {
        ...state,
        jobTimelineCountMeta: successMetaData(action.payload),
        jobTimelineCount: action.payload,
      };
    case JOB_TIMELINE_COUNT_FAILURE:
      return {
        ...state,
        jobTimelineCount: {},
        jobTimelineCountMeta: errorMetaData(action.payload),
      };
    case TAG_JOB_ATTACHMENT:
      return {
        ...state,
        jobTagMeta: pendingMetaData(),
      };
    case TAG_JOB_ATTACHMENT_SUCCESS:
      return {
        ...state,
        jobTagMeta: successMetaData(action.payload),
        jobTag: action.payload,
      };
    case TAG_JOB_ATTACHMENT_FAILURE:
      return {
        ...state,
        jobTagMeta: errorMetaData(action.payload),
      };
    case TAG_JOB_ATTACHMENT_RESET:
      return {
        ...state,
        jobTagMeta: {},
      };
    default:
      return state;
  }
};

export default JobStageReducer;
