import {
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_SUCCESS,
  FETCH_ACCOUNT_NAMES_FAILURE,
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
