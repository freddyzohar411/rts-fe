import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
} from "./actionTypes";

export const fetchAccount = () => ({
  type: FETCH_ACCOUNT,
});

export const fetchAccountSuccess = (countrycurrency) => ({
  type: FETCH_ACCOUNT_SUCCESS,
  payload: countrycurrency,
});

export const fetchAccountFailure = (error) => ({
  type: FETCH_ACCOUNT_FAILURE,
  payload: error,
});

export const createAccount = (accountRequest) => ({
  type: CREATE_ACCOUNT,
  payload: accountRequest,
});

export const createAccountSuccess = (account) => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: account,
});

export const createAccountFailure = (error) => ({
  type: CREATE_ACCOUNT_FAILURE,
  payload: error,
});
