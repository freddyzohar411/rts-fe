import {
  SET_ACCOUNT_ID,
  DELETE_ACCOUNT_ID,
  FETCH_DRAFT_ACCOUNT,
  DELETE_DRAFT_ACCOUNT,
  DELETE_DRAFT_ACCOUNT_SUCCESS,
  DELETE_DRAFT_ACCOUNT_FAILURE,
} from "./actionTypes";

const initialState = {
  accountId: null,
  loading: false,
  error: false,
  success: false,
};

const AccountRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      return {
        accountId: action.payload,
      };
    case DELETE_ACCOUNT_ID:
      return {
        accountId: null,
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
