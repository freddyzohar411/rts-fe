import {
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_SUCCESS,
  FETCH_ACCOUNT_NAMES_FAILURE,
} from "./actionTypes";

const initialState = {
  accountNames: [],
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
    default:
      return state;
  }
};

export default AccountNamesReducer;
