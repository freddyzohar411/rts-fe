import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "../../metadata";
import {
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_SUCCESS,
  FETCH_ACCOUNT_NAMES_FAILURE,
  FETCH_ACCOUNT_NAMES_ALL,
  FETCH_ACCOUNT_NAMES_ALL_SUCCESS,
  FETCH_ACCOUNT_NAMES_ALL_FAILURE,
  FETCH_ACCOUNT_BY_ID,
  FETCH_ACCOUNT_BY_ID_SUCCESS,
  FETCH_ACCOUNT_BY_ID_FAILURE,
} from "./actionTypes";

const initialState = {
  accountNames: [],
  accountNamesAll: [],
  accountById: {},
  accountByIdMeta: pendingMetaData(),
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
    case FETCH_ACCOUNT_BY_ID:
      return {
        ...state,
        accountByIdMeta: pendingMetaData(),
      };
    case FETCH_ACCOUNT_BY_ID_SUCCESS:
      return {
        ...state,
        accountByIdMeta: successMetaData(action.payload),
        accountById: action.payload,
      };
    case FETCH_ACCOUNT_BY_ID_FAILURE:
      return {
        ...state,
        accountByIdMeta: errorMetaData(action.payload),
      };
    default:
      return state;
  }
};

export default AccountNamesReducer;
