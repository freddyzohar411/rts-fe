import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  SET_EMAIL_OPEN,
  SET_EMAIL_CLOSE,
  RESET_SEND_EMAIL
} from "./actionTypes";

const initialState = {
  isEmailOpen: false,
  category: "",
  subCategory: "",
  emailResponse: {},
  errorMsg: "",
  loading: false,
  error: false,
  success: false,
  attachmentCategory: "",
  attachmentSubCategory: "",
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
        success: true,
      };
    case SEND_EMAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
        success: false,
      };
    case SET_EMAIL_OPEN:
      const { category, subCategory, attachmentCategory, attachmentSubCategory } = action.payload;
      return {
        ...state,
        category,
        subCategory,
        attachmentCategory,
        attachmentSubCategory,
        isEmailOpen: true,
      };
    case SET_EMAIL_CLOSE:
      return {
        ...state,
        category: "",
        subCategory: "",
        attachmentCategory: "",
        attachmentSubCategory: "",
        isEmailOpen: false,
      };  
    case RESET_SEND_EMAIL:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
        emailResponse: {},
      };
    default:
      return state;
  }
};

export default EmailCommonReducer;
