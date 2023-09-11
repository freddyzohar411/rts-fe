import {
  FETCH_CITY,
  FETCH_CITY_SUCCESS,
  FETCH_CITY_FAILURE,
  // FETCH_BILLINGCITY,
  // FETCH_BILLINGCITY_SUCCESS,
  // FETCH_BILLINGCITY_FAILURE,
} from "./actionTypes";

const initialState = {
  city: [],
  billingCity: [],
  countryId: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const CityReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_CITY_SUCCESS:
      return {
        ...state,
        loading: false,
        city: action.payload,
      };
    case FETCH_CITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // case FETCH_BILLINGCITY:
    //   return {
    //     ...state,
    //     loading: true,
    //     error: false,
    //   };
    // case FETCH_BILLINGCITY_SUCCESS:
    //   return {
    //     ...state,
    //     loading: false,
    //     billingCity: action.payload,
    //   };
    // case FETCH_BILLINGCITY_FAILURE:
    //   return {
    //     ...state,
    //     loading: false,
    //     error: true,
    //     errorMsg: action.payload,
    //   };
    default:
      return state;
  }
};

export default CityReducer;
