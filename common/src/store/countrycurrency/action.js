import {
  FETCH_COUNTRYCURRENCY,
  FETCH_COUNTRYCURRENCY_SUCCESS,
  FETCH_COUNTRYCURRENCY_FAILURE,
  FETCH_BUSINESS_COUNTRIES,
  FETCH_BUSINESS_COUNTRIES_SUCCESS,
  FETCH_BUSINESS_COUNTRIES_FAILURE,
} from "./actionTypes";

export const fetchCountryCurrency = () => ({
  type: FETCH_COUNTRYCURRENCY,
});

export const fetchCountryCurrencySuccess = (countrycurrency) => ({
  type: FETCH_COUNTRYCURRENCY_SUCCESS,
  payload: countrycurrency,
});

export const fetchCountryCurrencyFailure = (error) => ({
  type: FETCH_COUNTRYCURRENCY_FAILURE,
  payload: error,
});

export const fetchBusinessCountries = () => ({
  type: FETCH_BUSINESS_COUNTRIES,
});

export const fetchBusinessCountriesSuccess = (businesscountries) => ({
  type: FETCH_BUSINESS_COUNTRIES_SUCCESS,
  payload: businesscountries,
});

export const fetchBusinessCountriesFailure = (error) => ({
  type: FETCH_BUSINESS_COUNTRIES_FAILURE,
  payload: error,
});
