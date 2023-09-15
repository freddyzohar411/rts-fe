import {
  FETCH_COUNTRYCURRENCY,
  FETCH_COUNTRYCURRENCY_SUCCESS,
  FETCH_COUNTRYCURRENCY_FAILURE,
} from "./actionTypes";

const initialState = {
  countryCurrency: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const CountryCurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRYCURRENCY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_COUNTRYCURRENCY_SUCCESS:
      return {
        ...state,
        loading: false,
        countryCurrency: action.payload,
      };
    case FETCH_COUNTRYCURRENCY_FAILURE:
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

export default CountryCurrencyReducer;
