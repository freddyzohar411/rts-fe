import {
  FETCH_INDUSTRY,
  FETCH_INDUSTRY_SUCCESS,
  FETCH_INDUSTRY_FAILURE,
  FETCH_SUBINDUSTRY,
  FETCH_SUBINDUSTRY_FAILURE,
  FETCH_SUBINDUSTRY_SUCCESS
} from "./actionTypes";

const initialState = {
  city: [],
  industry: [],
  subIndustry: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const IndustryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INDUSTRY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_INDUSTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        industry: action.payload,
      };
    case FETCH_INDUSTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    case FETCH_SUBINDUSTRY:
      return {
        ...state,
        loading: true,
        error: false,
        industryId: action.payload,
      };
    case FETCH_SUBINDUSTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        subIndustry: action.payload,
      };
    case FETCH_SUBINDUSTRY_FAILURE:
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

export default IndustryReducer;
