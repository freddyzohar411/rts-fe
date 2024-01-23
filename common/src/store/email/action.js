import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
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
