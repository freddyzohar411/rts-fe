import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  // FETCH_ACCOUNT,
  // FETCH_ACCOUNTS,
  // CREATE_ACCOUNT,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS
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
  deleteAccountSuccess,
  deleteAccountFailure,
  fetchAccountsSuccess,
  fetchAccountsFailure
} from "./action";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount
} from "../../helpers/backend_helper";
import { setAccountId, deleteAccountId } from "../accountregistration/action";

// Post account
function* workPostAccount(action) {
  const {
    entity,
    newData,
    config,
    rerenderTable,
    resetForm,
    id,
    navigate,
    link,
    handleNext,
  } = action.payload;
  try {
    const response = yield call(createAccount, entity, id, newData, config);
    yield put(postAccountSuccess(response.data));
    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
    if (typeof navigate === "function") {
      navigate(link);
    }
  
    if (entity === "account_account") {
      // Set the account id to the accountregistration reducer
      console.log("set account id: LETS SEE:", response.data)
      yield put(setAccountId(response.data.id));
      handleNext();
      return
    }
    if (entity === "account_commercial") {
      // Delete the account id from the accountregistration reducer
      console.log("delete account id")
      yield put(deleteAccountId());
      return
    }
    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
    yield put(postAccountFailure(error));
  }
}

// Put Account
function* workPutAccount(action) {
  const {
    entity,
    id,
    newData,
    config,
    rerenderTable,
    resetForm,
    navigate,
    link,
    handleNext,
  } = action.payload;
  try {
    const response = yield call(updateAccount, entity, id, newData, config);
    yield put(putAccountSuccess(response.data));
    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
    if (typeof resetForm === "function") {
      resetForm();
    }
    if (typeof navigate === "function") {
      navigate(link);
    }
    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
    yield put(putAccountFailure(error));
  }
}

// Fetch accounts listing
function* workFetchAccounts(action) {
  try {
    const response = yield call(getAccounts, action.payload);
    yield put(fetchAccountsSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountsFailure(error));
  }
}


// Delete Account
function* workDeleteAccount(action) {
  try {
    const response = yield call(deleteAccount, action.payload);
    yield put(deleteAccountSuccess(action.payload));
  } catch (error) {
    yield put(deleteAccountFailure(error));
  }
}

export default function* watchFetchAccountSaga() {
  yield takeEvery(POST_ACCOUNT, workPostAccount);
  yield takeEvery(PUT_ACCOUNT, workPutAccount);
  yield takeEvery(FETCH_ACCOUNTS, workFetchAccounts);
  yield takeEvery(DELETE_ACCOUNT, workDeleteAccount);
}
