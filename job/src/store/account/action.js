import {
  FETCH_ACCOUNTNAMES,
  FETCH_ACCOUNTNAMES_SUCCESS,
  FETCH_ACCOUNTNAMES_FAILURE,
} from "./actionTypes";

export const fetchAccountNames = () => ({
  type: FETCH_ACCOUNTNAMES,
});

export const fetchAccountNamesSuccess = (accounts) => ({
  type: FETCH_ACCOUNTNAMES_SUCCESS,
  payload: accounts,
});

export const fetchAccountNamesFailure = (error) => ({
  type: FETCH_ACCOUNTNAMES_FAILURE,
  payload: error,
});

