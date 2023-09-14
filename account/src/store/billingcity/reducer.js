import {
  FETCH_BILLINGCITY,
  FETCH_BILLINGCITY_SUCCESS,
  FETCH_BILLINGCITY_FAILURE,
} from "./actionTypes";

const initialState = {
  billingCity: [],
  countryId: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const BillingCityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILLINGCITY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_BILLINGCITY_SUCCESS:
      return {
        ...state,
        loading: false,
        billingCity: action.payload,
      };
    case FETCH_BILLINGCITY_FAILURE:
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

export default BillingCityReducer;
