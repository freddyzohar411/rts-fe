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
  POST_ACCOUNT,
  POST_ACCOUNT_SUCCESS,
  POST_ACCOUNT_FAILURE,
  PUT_ACCOUNT,
  PUT_ACCOUNT_SUCCESS,
  PUT_ACCOUNT_FAILURE,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  FETCH_ACCOUNTS_FIELDS,
  FETCH_ACCOUNTS_FIELDS_SUCCESS,
  FETCH_ACCOUNTS_FIELDS_FAILURE,
  RESET_META_DATA,
  FETCH_ACCOUNT_DATA,
  FETCH_ACCOUNT_DATA_SUCCESS,
  FETCH_ACCOUNT_DATA_FAILURE,
} from "./actionTypes";

// Fetch Account
export const fetchAccount = (accountId) => ({
  type: FETCH_ACCOUNT,
  payload: accountId,
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

// Post an account
export const postAccount = (accountRequest) => ({
  type: POST_ACCOUNT,
  payload: accountRequest,
});

export const postAccountSuccess = (account) => ({
  type: POST_ACCOUNT_SUCCESS,
  payload: account,
});

export const postAccountFailure = (error) => ({
  type: POST_ACCOUNT_FAILURE,
  payload: error,
});

// Put an account
export const putAccount = (accountRequest) => ({
  type: PUT_ACCOUNT,
  payload: accountRequest,
});

export const putAccountSuccess = (account) => ({
  type: PUT_ACCOUNT_SUCCESS,
  payload: account,
});

export const putAccountFailure = (error) => ({
  type: PUT_ACCOUNT_FAILURE,
  payload: error,
});

export const deleteAccount = (accountId) => ({
  type: DELETE_ACCOUNT,
  payload: accountId,
});

export const deleteAccountSuccess = (accountId) => ({
  type: DELETE_ACCOUNT_SUCCESS,
  payload: accountId,
});

export const deleteAccountFailure = (error) => ({
  type: DELETE_ACCOUNT_FAILURE,
  payload: error,
});

// Fetch Accounts Fields
export const fetchAccountsFields = () => ({
  type: FETCH_ACCOUNTS_FIELDS,
});

export const fetchAccountsFieldsSuccess = (accountsFields) => ({
  type: FETCH_ACCOUNTS_FIELDS_SUCCESS,
  payload: accountsFields,
});

export const fetchAccountsFieldsFailure = (error) => ({
  type: FETCH_ACCOUNTS_FIELDS_FAILURE,
  payload: error,
});

export const resetMetaData = () => ({
  type: RESET_META_DATA,
});

export const fetchAccountData = (accountId) => ({
  type: FETCH_ACCOUNT_DATA,
  payload: accountId,
});

export const fetchAccountDataSuccess = (accountData) => ({
  type: FETCH_ACCOUNT_DATA_SUCCESS,
  payload: accountData,
});

export const fetchAccountDataFailure = (error) => ({
  type: FETCH_ACCOUNT_DATA_FAILURE,
  payload: error,
});

