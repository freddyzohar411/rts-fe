import {
  FETCH_ACCOUNTCONTACTS,
  FETCH_ACCOUNTCONTACTS_SUCCESS,
  FETCH_ACCOUNTCONTACTS_FAILURE,
} from "./actionTypes";

export const fetchAccountContacts = (accountId) => ({
  type: FETCH_ACCOUNTCONTACTS,
  payload: accountId,
});

export const fetchAccountContactsSuccess = (accountContacts) => ({
  type: FETCH_ACCOUNTCONTACTS_SUCCESS,
  payload: accountContacts,
});

export const fetchAccountContactsFailure = (error) => ({
  type: FETCH_ACCOUNTCONTACTS_FAILURE,
  payload: error,
});

