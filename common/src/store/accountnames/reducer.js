import {
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_SUCCESS,
  FETCH_ACCOUNT_NAMES_FAILURE,
  FETCH_ACCOUNT_NAMES_ALL,
  FETCH_ACCOUNT_NAMES_ALL_SUCCESS,
  FETCH_ACCOUNT_NAMES_ALL_FAILURE,
} from "./actionTypes";

const initialState = {
  accountNames: [],
  accountNamesAll: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const AccountNamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNT_NAMES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_NAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        accountNames: action.payload,
      };
    case FETCH_ACCOUNT_NAMES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case FETCH_ACCOUNT_NAMES_ALL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNT_NAMES_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        accountNames: action.payload,
      };
    case FETCH_ACCOUNT_NAMES_ALL_FAILURE:
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

export default AccountNamesReducer;
