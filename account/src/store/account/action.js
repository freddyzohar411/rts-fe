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
  ACCOUNT_RESET_META_DATA,
  FETCH_ACCOUNT_DATA,
  FETCH_ACCOUNT_DATA_SUCCESS,
  FETCH_ACCOUNT_DATA_FAILURE,
  FETCH_ACCOUNTS_FIELDS_ALL,
  FETCH_ACCOUNTS_FIELDS_ALL_SUCCESS,
  FETCH_ACCOUNTS_FIELDS_ALL_FAILURE,
  FETCH_ACCOUNTS_ADMIN_SUCCESS,
  FETCH_ACCOUNTS_ADMIN_FAILURE,
  CREATE_ACCOUNT_CUSTOM_VIEW,
  CREATE_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  CREATE_ACCOUNT_CUSTOM_VIEW_FAILURE,
  FETCH_ACCOUNT_CUSTOM_VIEW,
  FETCH_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  FETCH_ACCOUNT_CUSTOM_VIEW_FAILURE,
  SELECT_ACCOUNT_CUSTOM_VIEW,
  SELECT_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  SELECT_ACCOUNT_CUSTOM_VIEW_FAILURE,
  DELETE_ACCOUNT_CUSTOM_VIEW,
  DELETE_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  DELETE_ACCOUNT_CUSTOM_VIEW_FAILURE,
  DELETE_ACCOUNTS,
  DELETE_ACCOUNTS_SUCCESS,
  DELETE_ACCOUNTS_FAILURE,
  DELETE_ACCOUNTS_RESET,
  RESET_ACCOUNT_CUSTOM_VIEW,
  FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID,
  FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE,
  FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS,
  EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID,
  EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS,
  EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE,
  RESET_ACCOUNTS,
  UNSELECT_ACCOUNT_CUSTOM_VIEW,
  UNSELECT_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  UNSELECT_ACCOUNT_CUSTOM_VIEW_FAILURE,
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

export const accountResetMetaData = () => ({
  type: ACCOUNT_RESET_META_DATA,
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

export const fetchAccountsFieldsAll = () => ({
  type: FETCH_ACCOUNTS_FIELDS_ALL,
});

export const fetchAccountsFieldsAllSuccess = (accountsFields) => ({
  type: FETCH_ACCOUNTS_FIELDS_ALL_SUCCESS,
  payload: accountsFields,
});

export const fetchAccountsFieldsAllFailure = (error) => ({
  type: FETCH_ACCOUNTS_FIELDS_ALL_FAILURE,
  payload: error,
});

// Create Account Custom View
export const createAccountCustomView = (accountCustomViewRequest) => ({
  type: CREATE_ACCOUNT_CUSTOM_VIEW,
  payload: accountCustomViewRequest,
});

export const createAccountCustomViewSuccess = (accountCustomView) => ({
  type: CREATE_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  payload: accountCustomView,
});

export const createAccountCustomViewFailure = (error) => ({
  type: CREATE_ACCOUNT_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Fetch Account Custom Views
export const fetchAccountCustomView = () => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW,
});

export const fetchAccountCustomViewSuccess = (accountCustomViews) => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  payload: accountCustomViews,
});

export const fetchAccountCustomViewFailure = (error) => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW_FAILURE,
  payload: error,
});

export const resetAccountCustomView = () => ({
  type: RESET_ACCOUNT_CUSTOM_VIEW,
});

// Select Account Custom View
export const selectAccountCustomView = (accountCustomViewRequest) => ({
  type: SELECT_ACCOUNT_CUSTOM_VIEW,
  payload: accountCustomViewRequest,
});

export const selectAccountCustomViewSuccess = (accountCustomView) => ({
  type: SELECT_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  payload: accountCustomView,
});

export const selectAccountCustomFailure = (error) => ({
  type: SELECT_ACCOUNT_CUSTOM_VIEW_FAILURE,
  payload: error,
});

// Delete Account Custom View
export const deleteAccountCustomView = (accountCustomViewId) => ({
  type: DELETE_ACCOUNT_CUSTOM_VIEW,
  payload: accountCustomViewId,
});

export const deleteAccountCustomViewSuccess = (accountCustomViewId) => ({
  type: DELETE_ACCOUNT_CUSTOM_VIEW_SUCCESS,
  payload: accountCustomViewId,
});

export const deleteAccountCustomViewFailure = (error) => ({
  type: DELETE_ACCOUNT_CUSTOM_VIEW_FAILURE,
  payload: error,
});

export const deleteAccounts = (accountIds) => ({
  type: DELETE_ACCOUNTS,
  payload: accountIds,
});

export const deleteAccountsSuccess = (accountIds) => ({
  type: DELETE_ACCOUNTS_SUCCESS,
  payload: accountIds,
});

export const deleteAccountsFailure = (error) => ({
  type: DELETE_ACCOUNTS_FAILURE,
  payload: error,
});

export const deleteAccountsReset = () => ({
  type: DELETE_ACCOUNTS_RESET,
});

export const fetchAccountCustomViewById = (accountCustomViewId) => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID,
  payload: accountCustomViewId,
});

export const fetchAccountCustomViewByIdSuccess = (accountCustomView) => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS,
  payload: accountCustomView,
});

export const fetchAccountCustomViewByIdFailure = (error) => ({
  type: FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE,
  payload: error,
});

export const editAccountCustomViewById = (
  accountCustomViewRequest
) => ({
  type: EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID,
  payload: accountCustomViewRequest,
});

export const editAccountCustomViewByIdSuccess = (accountCustomView) => ({
  type: EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS,
  payload: accountCustomView,
});

export const editAccountCustomViewByIdFailure = (error) => ({
  type: EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE,
  payload: error,
});

export const resetAccounts = () => ({
  type: RESET_ACCOUNTS,
});

export const unselectAccountCustomView = () => ({
  type: UNSELECT_ACCOUNT_CUSTOM_VIEW,
});

export const unselectAccountCustomViewSuccess = () => ({
  type: UNSELECT_ACCOUNT_CUSTOM_VIEW_SUCCESS,
});

export const unselectAccountCustomViewFailure = (error) => ({
  type: UNSELECT_ACCOUNT_CUSTOM_VIEW_FAILURE,
  payload: error,
});
