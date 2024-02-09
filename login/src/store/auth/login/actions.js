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
} from "./actionTypes";

// User login
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

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error,
  };
};

// User logout
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

export const logoutUserError = (error) => {
  return {
    type: LOGOUT_USER_ERROR,
    payload: error,
  };
};

// User first time login password reset
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
