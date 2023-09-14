import {
  FETCH_CITY,
  FETCH_CITY_SUCCESS,
  FETCH_CITY_FAILURE,
  // FETCH_BILLINGCITY,
  // FETCH_BILLINGCITY_SUCCESS,
  // FETCH_BILLINGCITY_FAILURE,
} from "./actionTypes";

export const fetchCity = (countryId) => ({
  type: FETCH_CITY,
  payload: countryId,
});

export const fetchCitySuccess = (city) => ({
  type: FETCH_CITY_SUCCESS,
  payload: city,
});

export const fetchCityFailure = (error) => ({
  type: FETCH_CITY_FAILURE,
  payload: error,
});

// export const fetchBillingCity = (countryId) => ({
//   type: FETCH_BILLINGCITY,
//   payload: countryId,
// });

// export const fetchBillingCitySuccess = (billingCity) => ({
//   type: FETCH_BILLINGCITY_SUCCESS,
//   payload: billingCity,
// });

// export const fetchBillingCityFailure = (error) => ({
//   type: FETCH_BILLINGCITY_FAILURE,
//   payload: error,
// });
