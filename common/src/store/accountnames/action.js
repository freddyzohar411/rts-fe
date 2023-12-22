import {
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_SUCCESS,
  FETCH_ACCOUNT_NAMES_FAILURE,
  FETCH_ACCOUNT_NAMES_ALL,
  FETCH_ACCOUNT_NAMES_ALL_SUCCESS,
  FETCH_ACCOUNT_NAMES_ALL_FAILURE
} from "./actionTypes";

export const fetchAccountNames = () => ({
  type: FETCH_ACCOUNT_NAMES,
});

export const fetchAccountNamesSuccess = (accounts) => ({
  type: FETCH_ACCOUNT_NAMES_SUCCESS,
  payload: accounts,
});

export const fetchAccountNamesFailure = (error) => ({
  type: FETCH_ACCOUNT_NAMES_FAILURE,
  payload: error,
});

export const fetchAccountNamesAll = () => ({
  type: FETCH_ACCOUNT_NAMES_ALL,
});

export const fetchAccountNamesAllSuccess = (accounts) => ({
  type: FETCH_ACCOUNT_NAMES_ALL_SUCCESS,
  payload: accounts,
});

export const fetchAccountNamesAllFailure = (error) => ({
  type: FETCH_ACCOUNT_NAMES_ALL_FAILURE,
  payload: error,
});
