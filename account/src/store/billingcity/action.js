import {
  FETCH_BILLINGCITY,
  FETCH_BILLINGCITY_SUCCESS,
  FETCH_BILLINGCITY_FAILURE,
} from "./actionTypes";

export const fetchBillingCity = (countryId) => ({
  type: FETCH_BILLINGCITY,
  payload: countryId,
});

export const fetchBillingCitySuccess = (billingCity) => ({
  type: FETCH_BILLINGCITY_SUCCESS,
  payload: billingCity,
});

export const fetchBillingCityFailure = (error) => ({
  type: FETCH_BILLINGCITY_FAILURE,
  payload: error,
});
