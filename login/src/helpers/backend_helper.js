import { Axios } from "@workspace/common";

import {
  POST_LOGIN,
  GET_LOGOUT,
  POST_PASSWORD_FORGET,
  GET_VALIDATE,
  GET_USER_PROFILE,
  LOGIN_RESET_PASSWORD,
  forgetPassword,
  validateResetToken,
  FORGET_RESET_PASSWORD,
  POST_LOGIN_1FA,
  POST_LOGIN_2FA,
  RESEND_OTP,
} from "./url_helper";

const { APIClient } = Axios;

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const postLogin = (data) => api.create(POST_LOGIN, data);

// Logout Method
export const getLogout = (data) => api.get(GET_LOGOUT, data);

// postForgetPwd
export const postForgetPwd = (data) => api.create(POST_PASSWORD_FORGET, data);

// is user is logged in
export const getValidate = (data) => api.get(GET_VALIDATE, data);

// Get User profile and details
export const getUserProfile = () => api.get(GET_USER_PROFILE);

// First time login reset password
export const loginResetPwd = (data) => api.create(LOGIN_RESET_PASSWORD, data);

// Forgot Password
export const getforgetPassword = (data) => api.get(forgetPassword(data));

// Validate Reset Token
export const getValidateResetToken = (data) =>
  api.get(validateResetToken(data));

// Forget reset password
export const postForgetPasswordReset = (data) =>
  api.create(FORGET_RESET_PASSWORD, data);

// Login 2FA Method
export const postLogin2FA = (data, config) =>
  api.create(POST_LOGIN_2FA, data, config);

// Resend OTP
export const getResendOTP = (config) => api.getWithConfig(RESEND_OTP, config);
