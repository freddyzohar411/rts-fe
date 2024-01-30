import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
  SET_EMAIL_OPEN,
  SET_EMAIL_CLOSE,
} from "./actionTypes";

export const sendEmail = (payload) => ({
  type: SEND_EMAIL,
  payload,
});

export const sendEmailSuccess = (payload) => ({
  type: SEND_EMAIL_SUCCESS,
  payload,
});

export const sendEmailFailure = (payload) => ({
  type: SEND_EMAIL_FAILURE,
  payload,
});

export const setEmailOpen = () => ({
  type: SET_EMAIL_OPEN,
});

export const setEmailClose = () => ({
  type: SET_EMAIL_CLOSE,
});
