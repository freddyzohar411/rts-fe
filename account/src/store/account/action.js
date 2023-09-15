import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_SUCCESS,
  FETCH_ACCOUNTS_FAILURE,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
} from "./actionTypes";

// Fetch Account
export const fetchAccount = () => ({
  type: FETCH_ACCOUNT,
});

export const fetchAccountSuccess = (account) => ({
  type: FETCH_ACCOUNT_SUCCESS,
  payload: account,
});

export const fetchAccountFailure = (error) => ({
  type: FETCH_ACCOUNT_FAILURE,
  payload: error,
});

// Fetch Accounts
export const fetchAccounts = (params) => ({
  type: FETCH_ACCOUNTS,
  payload: params,
});

export const fetchAccountsSuccess = (accounts) => ({
  type: FETCH_ACCOUNTS_SUCCESS,
  payload: accounts,
});

export const fetchAccountsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FAILURE,
  payload: error,
});

// Create an Account
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
