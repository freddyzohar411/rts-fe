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

export const userForgetPassword = (user, history) => {
  return {
    type: FORGET_PASSWORD,
    payload: { user, history },
  };
};

export const userForgetPasswordSuccess = (message) => {
  return {
    type: FORGET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const userForgetPasswordError = (message) => {
  return {
    type: FORGET_PASSWORD_ERROR,
    payload: message,
  };
};

export const validateResetToken = (token, navigate) => {
  return {
    type: VALIDATE_RESET_TOKEN,
    payload: { token, navigate },
  };
};

export const validateResetTokenSuccess = (message) => {
  return {
    type: VALIDATE_RESET_TOKEN_SUCCESS,
    payload: message,
  };
};

export const validateResetTokenError = (message) => {
  return {
    type: VALIDATE_RESET_TOKEN_ERROR,
    payload: message,
  };
};

export const resetForgetPasswordMeta = () => {
  return {
    type: RESET_FORGET_PASSWORD_META,
  };
};

export const forgetPasswordReset = (data) => {
  return {
    type: FORGET_PASSWORD_RESET,
    payload: data,
  };
}

export const forgetPasswordResetSuccess = (message) => {
  return {
    type: FORGET_PASSWORD_RESET_SUCCESS,
    payload: message,
  };
}

export const forgetPasswordResetError = (message) => {
  return {
    type: FORGET_PASSWORD_RESET_ERROR,
    payload: message,
  };
}


