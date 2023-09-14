import {
  FETCH_COUNTRYCURRENCY,
  FETCH_COUNTRYCURRENCY_SUCCESS,
  FETCH_COUNTRYCURRENCY_FAILURE,
} from "./actionTypes";


export const fetchCountryCurrency = () => ({
    type: FETCH_COUNTRYCURRENCY,
})

export const fetchCountryCurrencySuccess = (countrycurrency) => ({
    type: FETCH_COUNTRYCURRENCY_SUCCESS,
    payload: countrycurrency,
})

export const fetchCountryCurrencyFailure = (error) => ({
    type: FETCH_COUNTRYCURRENCY_FAILURE,
    payload: error,
})