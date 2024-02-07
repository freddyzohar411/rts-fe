import {
  errorMetaData,
  pendingMetaData,
  successMetaData,
} from "@workspace/common";
import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
  RESET_LOGIN_FLAG,
  LOGIN_RESET_PASSWORD_USER,
  LOGIN_RESET_PASSWORD_SUCCESS,
  LOGIN_RESET_PASSWORD_ERROR,
} from "./actionTypes";

const initialState = {
  errorMsg: "",
  loading: false,
  error: false,
  loginResetPassword: {},
  loginResetPasswordMeta: {},
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      state = {
        ...state,
        loading: true,
        error: false,
      };
      break;
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: false,
      };
      break;
    case LOGOUT_USER:
      state = { ...state, isUserLogout: false };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state, isUserLogout: true };
      break;
    case API_ERROR:
      state = {
        ...state,
        errorMsg: action.payload.data,
        loading: true,
        error: true,
        isUserLogout: false,
      };
      break;
    case RESET_LOGIN_FLAG:
      state = {
        ...state,
        errorMsg: null,
        loading: false,
        error: false,
      };
      break;
    // Login user reset password
    case LOGIN_RESET_PASSWORD_USER:
      return {
        ...state,
        loginResetPasswordMeta: pendingMetaData(),
      };
    case LOGIN_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loginResetPasswordMeta: successMetaData(action.payload),
        loginResetPassword: action.payload,
      };
    case LOGIN_RESET_PASSWORD_ERROR:
      return {
        ...state,
        loginResetPasswordMeta: errorMetaData(action.payload),
      };
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default login;
