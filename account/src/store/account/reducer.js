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
  RESET_ACCOUNTS
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
  accounts: null,
  accountsMeta: {},
  accountsFields: [],
  accountsFieldsAll: [],
  meta: {},
  createMeta: {},
  updateMeta: {},
  deleteMeta: {},
  tableMeta: {},
  accountCustomView: {},
  accountCustomViews: null,
  deleteAccountsMeta: {},
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
        accountsMeta: pendingMetaData(),
      };
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accountsMeta: successMetaData(action.payload),
        accounts: action.payload,
      };
    case FETCH_ACCOUNTS_FAILURE:
      return {
        ...state,
        accounts: [],
        accountsMeta: errorMetaData(action.payload),
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
    case ACCOUNT_RESET_META_DATA:
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
    case FETCH_ACCOUNTS_FIELDS_ALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTS_FIELDS_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        accountsFieldsAll: action.payload,
      };
    case FETCH_ACCOUNTS_FIELDS_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Create Account Custom View
    case CREATE_ACCOUNT_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_ACCOUNT_CUSTOM_VIEW_SUCCESS:
      return {
        loading: false,
        accountCustomView: action.payload,
      };

    case CREATE_ACCOUNT_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Fetch Account Custom Views
    case FETCH_ACCOUNT_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        accountCustomViews: action.payload,
      };
    case FETCH_ACCOUNT_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_ACCOUNT_CUSTOM_VIEW:
      return {
        ...state,
        accountCustomViews: null,
      };
    // Select Account Custom View
    case SELECT_ACCOUNT_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SELECT_ACCOUNT_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        accountCustomView: action.payload,
      };
    case SELECT_ACCOUNT_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    // Delete Account Custom View
    case DELETE_ACCOUNT_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_ACCOUNT_CUSTOM_VIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        accountCustomView: action.payload,
      };
    case DELETE_ACCOUNT_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case DELETE_ACCOUNTS:
      return {
        ...state,
        deleteAccountsMeta: pendingMetaData(),
      };
    case DELETE_ACCOUNTS_SUCCESS:
      const newAccountsTemp = JSON.parse(JSON.stringify(state.accounts));
      const filteredAccountsTemp = newAccountsTemp.accounts.filter(
        (account) => !action.payload.includes(account.id)
      );
      newAccountsTemp.accounts = filteredAccountsTemp;
      return {
        ...state,
        accounts: newAccountsTemp,
        deleteAccountsMeta: successMetaData(action.payload),
      };
    case DELETE_ACCOUNTS_FAILURE:
      return {
        ...state,
        deleteAccountsMeta: errorMetaData(action.payload),
      };
    case DELETE_ACCOUNTS_RESET:
      return {
        ...state,
        deleteAccountsMeta: resetAllMetaData(),
      };
    case FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        accountCustomView: action.payload,
      };
    case FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        accountCustomView: action.payload,
      };
    case EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case RESET_ACCOUNTS:
      return {
        ...state,
        accounts: [],
        accountsMeta: {},
      };
    default:
      return state;
  }
};

export default AccountReducer;
