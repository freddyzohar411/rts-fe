import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
} from "./actionTypes";

const initialState = {
  emailResponse: {},
  errorMsg: "",
  loading: false,
  error: false,
};

const EmailCommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SEND_EMAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        emailResponse: action.payload,
      };
    case SEND_EMAIL_FAILURE:
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

export default EmailCommonReducer;
