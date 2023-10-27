import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_DRAFT_ACCOUNT, DELETE_DRAFT_ACCOUNT } from "./actionTypes";
import { setAccountId, setAccountCountry, deleteAccountId, deleteAccountCountry, deleteDraftAccount } from "./action";
import { deleteDraftAccountById } from "../../helpers/backend_helper";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;

const api = new APIClient();

function* workFetchDraftAccount(action) {
  try {
    const response = yield call(
      api.get,
      `http://localhost:8100/accounts/draft`
    );
    console.log("DRAFTTT", response.data);
    if (response.data === null) {
      yield put(deleteAccountId());
      yield put(deleteAccountCountry());
    } else {
      yield put(setAccountId(response.data.id));
      yield put(setAccountCountry(response.data.accountCountry));
    }
  } catch (error) {
    throw error;
  }
}

function* workDeleteDraftAccount(action) {
  const { accountId, resetStepper } = action.payload;
  try {
    yield call(deleteDraftAccountById, accountId);
    yield put(deleteAccountId());
    yield put(deleteAccountCountry());
    resetStepper(0);
  } catch (error) {
    throw error;
  }
}

export default function* watchFetchDraftAccount() {
  yield takeEvery(FETCH_DRAFT_ACCOUNT, workFetchDraftAccount);
  yield takeEvery(DELETE_DRAFT_ACCOUNT, workDeleteDraftAccount);
}
