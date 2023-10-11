import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  // FETCH_ACCOUNT,
  // FETCH_ACCOUNTS,
  // CREATE_ACCOUNT,
  POST_ACCOUNT,
  PUT_ACCOUNT,
} from "./actionTypes";
import {
  // fetchAccountSuccess,
  // fetchAccountFailure,
  // fetchAccountsSuccess,
  // fetchAccountsFailure,
  postAccountSuccess,
  postAccountFailure,
  putAccountSuccess,
  putAccountFailure,
} from "./action";
import {
  getAccounts,
  createAccount,
  updateAccount,
} from "../../helpers/backend_helper";

// Post account
function* workPostAccount(action) {
  const { entity, newData, config, rerenderTable, resetForm } = action.payload;
  console.log("Config", config)
  try {
    const response = yield call(createAccount, entity, newData, config);
    yield put(postAccountSuccess(response.data));
    if (typeof rerenderTable === "function") {
      console.log("WorkPost table renderer");
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
  } catch (error) {
    yield put(postAccountFailure(error));
  }
}

// Put Account
function* workPutAccount(action) {
  const { entity, id, newData, config, rerenderTable, resetForm } = action.payload;
  try {
    const response = yield call(updateAccount, entity, id, newData, config);
    yield put(putAccountSuccess(response.data));
    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
  } catch (error) {
    yield put(putAccountFailure(error));
  }
}

export default function* watchFetchAccountSaga() {
  yield takeEvery(POST_ACCOUNT, workPostAccount);
  yield takeEvery(PUT_ACCOUNT, workPutAccount);
}
