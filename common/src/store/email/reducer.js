import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  SET_EMAIL_OPEN,
  SET_EMAIL_CLOSE,
} from "./actionTypes";

const initialState = {
  isEmailOpen: false,
  category: "",
  subCategory: "",
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
      const { category, subCategory } = action.payload;
      return {
        ...state,
        category,
        subCategory,
        isEmailOpen: true,
      };
    case SET_EMAIL_CLOSE:
      return {
        ...state,
        category: "",
        subCategory: "",
        isEmailOpen: false,
      };  
    default:
      return state;
  }
};

export default EmailCommonReducer;
