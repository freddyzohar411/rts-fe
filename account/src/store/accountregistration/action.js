import {
  SET_ACCOUNT_ID,
  DELETE_ACCOUNT_ID,
  FETCH_DRAFT_ACCOUNT,
} from "./actionTypes";

export const fetchDraftAccount = () => ({
  type: FETCH_DRAFT_ACCOUNT,
});

export const setAccountId = (accountId) => ({
  type: SET_ACCOUNT_ID,
  payload: accountId,
});

export const deleteAccountId = () => ({
  type: DELETE_ACCOUNT_ID,
});
