import {
  FETCH_CITY,
  FETCH_CITY_SUCCESS,
  FETCH_CITY_FAILURE,
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


