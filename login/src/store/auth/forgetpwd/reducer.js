import {
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_ERROR,
  VALIDATE_RESET_TOKEN,
  VALIDATE_RESET_TOKEN_SUCCESS,
  VALIDATE_RESET_TOKEN_ERROR,
  RESET_FORGET_PASSWORD_META,
  FORGET_PASSWORD_RESET,
  FORGET_PASSWORD_RESET_SUCCESS,
  FORGET_PASSWORD_RESET_ERROR,
} from "./actionTypes";

const initialState = {
  forgetSuccessMsg: null,
  forgetError: null,
  resetForgetPasswordSuccess: null,
  resetForgetPasswordIsLoading: false,
  resetForgetPasswordError: null,
  isLoading: false,
  tokenValid: null,
};

const forgetPassword = (state = initialState, action) => {
  switch (action.type) {
    case FORGET_PASSWORD:
      state = {
        ...state,
        isLoading: true,
        forgetSuccessMsg: null,
        forgetError: null,
      };
      break;
    case FORGET_PASSWORD_SUCCESS:
      state = {
        ...state,
        isLoading: false,
        forgetSuccessMsg: action.payload,
      };
      break;
    case FORGET_PASSWORD_ERROR:
      state = { ...state, forgetError: action.payload, isLoading: false };
      break;
    case VALIDATE_RESET_TOKEN:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        tokenValid: null,
      };
      break;
    case VALIDATE_RESET_TOKEN_SUCCESS:
      state = { ...state, tokenValid: action.payload };
      break;
    case VALIDATE_RESET_TOKEN_ERROR:
      state = { ...state, forgetError: action.payload };
      break;

    case FORGET_PASSWORD_RESET:
      state = {
        ...state,
        resetForgetPasswordIsLoading: true,
        forgetSuccessMsg: null,
        forgetError: null,
      };
      break;
    case FORGET_PASSWORD_RESET_SUCCESS:
      state = {
        ...state,
        resetForgetPasswordIsLoading: false,
        forgetSuccessMsg: action.payload,
        resetForgetPasswordSuccess: true,
      };
      break;
    case FORGET_PASSWORD_RESET_ERROR:
      state = {
        ...state,
        resetForgetPasswordSuccess: false,
        resetForgetPasswordIsLoading: false,
        resetForgetPasswordError: action.payload,
      };
      break;
    case RESET_FORGET_PASSWORD_META:
      state = {
        ...state,
        forgetSuccessMsg: null,
        forgetError: null,
        tokenValid: null,
        isLoading: false,
        resetForgetPasswordSuccess: null,
        resetForgetPasswordIsLoading: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default forgetPassword;
