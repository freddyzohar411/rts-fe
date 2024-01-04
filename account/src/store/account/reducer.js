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

import {
  errorMetaData,
  pendingMetaData,
  resetAllMetaData,
  successMetaData,
} from "@workspace/common";

const initialState = {
  account: {},
  accountData: null,
  accounts: [],
  accountsFields: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
  tableMeta: {},
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Account
    case FETCH_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
      };
    case FETCH_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Fetch all accounts
    case FETCH_ACCOUNTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create an Account
    case CREATE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        account: action.payload,
      };
    case CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Post an Account
    case POST_ACCOUNT:
      return {
        ...state,
        createMeta: pendingMetaData(),
      };
    case POST_ACCOUNT_SUCCESS:
      return {
        ...state,
        createMeta: successMetaData(action.payload),
        account: action.payload,
      };
    case POST_ACCOUNT_FAILURE:
      return {
        ...state,
        createMeta: errorMetaData(action.payload),
      };

    // Put an Account
    case PUT_ACCOUNT:
      return {
        ...state,
        updateMeta: pendingMetaData(),
      };
    case PUT_ACCOUNT_SUCCESS:
      return {
        ...state,
        updateMeta: successMetaData(action.payload),
        account: action.payload,
      };
    case PUT_ACCOUNT_FAILURE:
      return {
        ...state,
        updateMeta: errorMetaData(action.payload),
      };

    // Delete an Account
    case DELETE_ACCOUNT:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_ACCOUNT_SUCCESS:
      const newAccounts = JSON.parse(JSON.stringify(state.accounts));
      const filteredAccounts = newAccounts.accounts.filter(
        (account) => account.id !== action.payload
      );
      newAccounts.accounts = filteredAccounts;
      return {
        ...state,
        accounts: newAccounts,
        loading: false,
        success: true,
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };

    // Fetch all accounts fields
    case FETCH_ACCOUNTS_FIELDS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_ACCOUNTS_FIELDS_SUCCESS:
      return {
        ...state,
        loading: false,
        accountsFields: action.payload,
      };

    case FETCH_ACCOUNTS_FIELDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_META_DATA:
      return {
        ...state,
        meta: resetAllMetaData(),
        createMeta: resetAllMetaData(),
        updateMeta: resetAllMetaData(),
        deleteMeta: resetAllMetaData(),
      };
    case FETCH_ACCOUNT_DATA:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        accountData: action.payload,
      };
    case FETCH_ACCOUNT_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default AccountReducer;
