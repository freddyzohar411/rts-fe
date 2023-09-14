import {
  SET_ACCOUNT_ID,
  DELETE_ACCOUNT_ID,
  FETCH_DRAFT_ACCOUNT,
} from "./actionTypes";

const initialState = {
  accountId: null,
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
    default:
      return state;
  }
};

export default AccountRegistrationReducer;
