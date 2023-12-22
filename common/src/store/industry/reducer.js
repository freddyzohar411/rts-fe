import {
  FETCH_INDUSTRY,
  FETCH_INDUSTRY_SUCCESS,
  FETCH_INDUSTRY_FAILURE,
  FETCH_SUBINDUSTRY,
  FETCH_SUBINDUSTRY_FAILURE,
  FETCH_SUBINDUSTRY_SUCCESS,
  RESET_META_DATA,
} from "./actionTypes";

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "../../metadata/utilities";

const initialState = {
  city: null,
  industry: null,
  subIndustry: null,
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
};

const IndustryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INDUSTRY:
      return {
        ...state,
        meta: pendingMetaData(),
      };
    case FETCH_INDUSTRY_SUCCESS:
      return {
        ...state,
        meta: successMetaData(),
        industry: action.payload,
      };
    case FETCH_INDUSTRY_FAILURE:
      return {
        ...state,
        meta: errorMetaData(action.payload),
      };
    case FETCH_SUBINDUSTRY:
      return {
        ...state,
        meta: pendingMetaData(),
        industryId: action.payload,
      };
    case FETCH_SUBINDUSTRY_SUCCESS:
      return {
        ...state,
        meta: successMetaData(),
        subIndustry: action.payload,
      };
    case FETCH_SUBINDUSTRY_FAILURE:
      return {
        ...state,
        meta: errorMetaData(action.payload),
      };
    case RESET_META_DATA:
      return {
        ...state,
        meta: resetAllMetaData(),
        createMeta: resetAllMetaData(),
        updateMeta: resetAllMetaData(),
        deleteMeta: resetAllMetaData(),
      };
    default:
      return state;
  }
};

export default IndustryReducer;
