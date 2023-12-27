import {
  API_RESPONSE_SUCCESS,
  API_RESPONSE_ERROR,
  GET_REVENUE_CHARTS_DATA,
  FETCH_JOB_COUNTS,
  FETCH_JOB_COUNTS_SUCCESS,
  FETCH_JOB_COUNTS_FAILURE,
} from "./actionType";

const INIT_STATE = {
  revenueData: [],
  error: {},
  jobCounts: {},
  loading: false,
};

const DashboardEcommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case API_RESPONSE_SUCCESS:
      switch (action.payload.actionType) {
        case GET_REVENUE_CHARTS_DATA:
          return {
            ...state,
            revenueData: action.payload.data,
          };
        default:
          return state;
      }
    case API_RESPONSE_ERROR:
      switch (action.payload.actionType) {
        case GET_REVENUE_CHARTS_DATA:
          return {
            ...state,
            error: action.payload.error,
          };
        default:
          return state;
      }

    // Fetch Job counts
    case FETCH_JOB_COUNTS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_JOB_COUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        jobCounts: action.payload,
      };
    case FETCH_JOB_COUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        jobCounts: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default DashboardEcommerce;
