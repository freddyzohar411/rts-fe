import {
  FETCH_ACCOUNTCONTACTS,
  FETCH_ACCOUNTCONTACTS_SUCCESS,
  FETCH_ACCOUNTCONTACTS_FAILURE,
} from "./actionTypes";

const initialState = {
  accountContacts: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const AccountContactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ACCOUNTCONTACTS:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_ACCOUNTCONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accountContacts: action.payload,
      };
    case FETCH_ACCOUNTCONTACTS_FAILURE:
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

export default AccountContactsReducer;
