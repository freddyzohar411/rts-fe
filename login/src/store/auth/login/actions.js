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

export const loginUser = (user, history) => {
  return {
    type: LOGIN_USER,
    payload: { user, history },
  };
};

export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};

export const resetLoginFlag = () => {
  return {
    type: RESET_LOGIN_FLAG,
  };
};

export const loginResetPassword = (user, history) => {
  return {
    type: LOGIN_RESET_PASSWORD_USER,
    payload: { user, history },
  };
};

export const loginResetPasswordSuccess = (user) => {
  return {
    type: LOGIN_RESET_PASSWORD_SUCCESS,
    payload: user,
  };
};

export const loginResetPasswordError = (error) => {
  return {
    type: LOGIN_RESET_PASSWORD_ERROR,
    payload: error,
  };
};
