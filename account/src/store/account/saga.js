import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_ACCOUNT, FETCH_ACCOUNTS, CREATE_ACCOUNT } from "./actionTypes";
import {
  fetchAccountSuccess,
  fetchAccountFailure,
  fetchAccountsSuccess,
  fetchAccountsFailure,
  createAccountSuccess,
  createAccountFailure,
} from "./action";
import { getAccounts } from "../../helpers/backend_helper";

// Fetch Account
function* workFetchAccount(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8100/accounts/${action.payload}`
    );
    yield put(fetchAccountSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountFailure(error));
  }
}

// Fetch Accounts
function* workFetchAccounts(action) {
  try {
    const response = yield call(getAccounts, action.payload);
    yield put(fetchAccountsSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountsFailure(error));
  }
}

// Create an Account
function* workCreateAccount(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8100/accounts",
      action.payload
    );
    yield put(createAccountSuccess(response.data));
  } catch (error) {
    yield put(createAccountFailure(error));
  }
}

export default function* watchFetchAccountSaga() {
  yield takeEvery(FETCH_ACCOUNT, workFetchAccount);
  yield takeEvery(FETCH_ACCOUNTS, workFetchAccounts);
  yield takeEvery(CREATE_ACCOUNT, workCreateAccount);
}
