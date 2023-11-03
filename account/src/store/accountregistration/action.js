import {
  SET_ACCOUNT_ID,
  SET_ACCOUNT_COUNTRY,
  DELETE_ACCOUNT_ID,
  DELETE_ACCOUNT_COUNTRY,
  FETCH_DRAFT_ACCOUNT,
  DELETE_DRAFT_ACCOUNT,
} from "./actionTypes";

export const fetchDraftAccount = () => ({
  type: FETCH_DRAFT_ACCOUNT,
});

export const setAccountId = (accountId) => ({
  type: SET_ACCOUNT_ID,
  payload: accountId,
});

export const setAccountCountry = (accountCountry) => ({
  type: SET_ACCOUNT_COUNTRY,
  payload: accountCountry,
});

export const deleteAccountId = () => ({
  type: DELETE_ACCOUNT_ID,
});

export const deleteAccountCountry = () => ({
  type: DELETE_ACCOUNT_COUNTRY,
});

export const deleteDraftAccount = (deleteDraftRequest) => ({
  type: DELETE_DRAFT_ACCOUNT,
  payload: deleteDraftRequest,
});

