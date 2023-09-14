import {
  FETCH_ACCOUNT,
  FETCH_ACCOUNT_SUCCESS,
  FETCH_ACCOUNT_FAILURE,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAILURE,
} from "./actionTypes";

const initialState = {
  account: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const AccountReducer = (state = initialState, action) => {
  switch (action.type) {
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
        countryCurrency: action.payload,
      };
    case FETCH_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
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
    default:
      return state;
  }
};

export default AccountReducer;
