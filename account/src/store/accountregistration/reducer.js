import {
  SET_ACCOUNT_ID,
  SET_ACCOUNT_COUNTRY,
  DELETE_ACCOUNT_ID,
  DELETE_ACCOUNT_COUNTRY,
  FETCH_DRAFT_ACCOUNT,
  DELETE_DRAFT_ACCOUNT,
  DELETE_DRAFT_ACCOUNT_SUCCESS,
  DELETE_DRAFT_ACCOUNT_FAILURE,
} from "./actionTypes";

const initialState = {
  accountId: null,
  accountCountry:null,
  loading: false,
  error: false,
  success: false,
};

const AccountRegistrationReducer = (state = initialState, action) => {
  console.log("AccountRegistrationReducer", state)
  switch (action.type) {
    case SET_ACCOUNT_ID:
      return {
        ...state,
        accountId: action.payload,
      };
    case SET_ACCOUNT_COUNTRY:
      return {
        ...state,
        accountCountry: action.payload,
      };
    case DELETE_ACCOUNT_ID:
      return {
        ...state,
        accountId: null,
      };
    case DELETE_ACCOUNT_COUNTRY:
      return {
        ...state,
        accountCountry: null,
      };
    case FETCH_DRAFT_ACCOUNT:
      return {
        ...state,
      };
    case DELETE_DRAFT_ACCOUNT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRAFT_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_DRAFT_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
};

export default AccountRegistrationReducer;
