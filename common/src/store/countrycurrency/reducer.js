import {
  FETCH_COUNTRYCURRENCY,
  FETCH_COUNTRYCURRENCY_SUCCESS,
  FETCH_COUNTRYCURRENCY_FAILURE,
  FETCH_BUSINESS_COUNTRIES,
  FETCH_BUSINESS_COUNTRIES_SUCCESS,
  FETCH_BUSINESS_COUNTRIES_FAILURE,
} from "./actionTypes";

const initialState = {
  countryCurrency: [],
  businessCountries: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const countryCurrencyReducer = (state = initialState, action) => {
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
    case FETCH_BUSINESS_COUNTRIES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_BUSINESS_COUNTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        businessCountries: action.payload,
      };
    case FETCH_BUSINESS_COUNTRIES_FAILURE:
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

export default countryCurrencyReducer;
