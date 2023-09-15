import {
  FETCH_ACCOUNTNAMES,
  FETCH_ACCOUNTNAMES_SUCCESS,
  FETCH_ACCOUNTNAMES_FAILURE,
} from "./actionTypes";

const initialState = {
  accounts: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const AccountNamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTNAMES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTNAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };
    case FETCH_ACCOUNTNAMES_FAILURE:
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
