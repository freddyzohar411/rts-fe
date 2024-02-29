import {
  FETCH_STATE,
  FETCH_STATE_SUCCESS,
  FETCH_STATE_FAILURE,
} from "./actionTypes";

const initialState = {
  state: [],
  billingState: [],
  countryId: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const StateReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_STATE_SUCCESS:
      return {
        ...state,
        loading: false,
        city: action.payload,
      };
    case FETCH_STATE_FAILURE:
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

export default StateReducer;
