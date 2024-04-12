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
  LOGIN_RESET_PASSWORD_USER,
  LOGIN_RESET_PASSWORD_SUCCESS,
  LOGIN_RESET_PASSWORD_ERROR,
  LOGIN_ERROR,
  LOGOUT_USER_ERROR,
  LOGIN_1FA,
  LOGIN_1FA_SUCCESS,
  LOGIN_1FA_ERROR,
  LOGIN_2FA,
  LOGIN_2FA_SUCCESS,
  LOGIN_2FA_ERROR,
  RESEND_OTP,
  RESEND_OTP_SUCCESS,
  RESEND_OTP_ERROR,
} from "./actionTypes";

const initialState = {
  loginMeta: {},
  logoutMeta: {},
  loginResetPassword: {},
  loginResetPasswordMeta: {},
  login1FAMeta: {},
  login2FAMeta: {},
  resendOtpMeta: {},
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginMeta: pendingMetaData(),
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginMeta: successMetaData(action.payload),
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginMeta: errorMetaData(action.payload),
      };
    case LOGOUT_USER:
      return { ...state, logoutMeta: pendingMetaData(), isUserLogout: false };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        logoutMeta: successMetaData(action.payload),
        isUserLogout: true,
      };
    case LOGOUT_USER_ERROR:
      return {
        ...state,
        logoutMeta: errorMetaData(action.payload),
        isUserLogout: true,
      };
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
    case LOGIN_1FA:
      return { ...state, login1FAMeta: pendingMetaData() };
    case LOGIN_1FA_SUCCESS:
      return { ...state, login1FAMeta: successMetaData(action.payload) };
    case LOGIN_1FA_ERROR:
      return { ...state, login1FAMeta: errorMetaData(action.payload) };
    case LOGIN_2FA:
      return { ...state, login2FAMeta: pendingMetaData() };
    case LOGIN_2FA_SUCCESS:
      return { ...state, login2FAMeta: successMetaData(action.payload) };
    case LOGIN_2FA_ERROR:
      return { ...state, login2FAMeta: errorMetaData(action.payload) };
    case RESEND_OTP:
      return { ...state, resendOtpMeta: pendingMetaData() };
    case RESEND_OTP_SUCCESS:
      return { ...state, resendOtpMeta: successMetaData() };
    case RESEND_OTP_ERROR:
      return { ...state, resendOtpMeta: errorMetaData(action.payload) };
    default:
      return { ...state };
  }
};

export default login;
