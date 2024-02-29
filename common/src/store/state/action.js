import {
  FETCH_STATE,
  FETCH_STATE_SUCCESS,
  FETCH_STATE_FAILURE,
} from "./actionTypes";

export const fetchState = (countryId) => ({
  type: FETCH_STATE,
  payload: countryId,
});

export const fetchStateSuccess = (city) => ({
  type: FETCH_STATE_SUCCESS,
  payload: city,
});

export const fetchStateFailure = (error) => ({
  type: FETCH_STATE_FAILURE,
  payload: error,
});


