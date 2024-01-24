import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  SET_EMAIL_OPEN,
  SET_EMAIL_CLOSE,
} from "./actionTypes";

const initialState = {
  isEmailOpen: false,
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
    case SET_EMAIL_OPEN:
      return {
        ...state,
        isEmailOpen: true,
      };
    case SET_EMAIL_CLOSE:
      return {
        ...state,
        isEmailOpen: false,
      };  
    default:
      return state;
  }
};

export default EmailCommonReducer;
