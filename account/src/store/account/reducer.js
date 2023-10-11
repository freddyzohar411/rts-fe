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
} from "./actionTypes";

const initialState = {
  account: {},
  accounts: [],
  errorMsg: "",
  loading: false,
  error: false,
  success: false,
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
        loading: false,
        account: action.payload,
      };
    case CREATE_ACCOUNT_FAILURE:
    return {
      ...state,
      loading: false,
      error: true,
      errorMsg: action.payload,
    };

    // Post an Account
    case POST_ACCOUNT:
      console.log("POST_ACCOUNT")
      return {
        ...state,
        loading: true,
        error: false,
      };
    case POST_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
        success: true,
      };
    case POST_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: true
      };
    

    // Put an Account
    case PUT_ACCOUNT:
      console.log("PUT_ACCOUNT")
      return {
        ...state,
        loading: true,
        error: false,
      };
    case PUT_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        account: action.payload,
        success: true,
      };
    case PUT_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };

    default:
      return state;
  }
};

export default AccountReducer;
