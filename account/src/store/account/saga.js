import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  AccountEntityConstant,
} from "../../constants/accountConstant";

import {
  FETCH_ACCOUNT,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_FIELDS,
} from "./actionTypes";
import {
  fetchAccountSuccess,
  fetchAccountFailure,
  postAccountSuccess,
  postAccountFailure,
  putAccountSuccess,
  putAccountFailure,
  deleteAccountSuccess,
  deleteAccountFailure,
  fetchAccountsSuccess,
  fetchAccountsFailure,
  fetchAccountsFieldsSuccess,
  fetchAccountsFieldsFailure,
} from "./action";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountsFields,
  getAccountById,
} from "../../helpers/backend_helper";
import {
  setAccountId,
  deleteAccountId,
  setAccountCountry,
  deleteAccountCountry,
} from "../accountregistration/action";
import { toast } from "react-toastify";

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

    if (entity === AccountEntityConstant.ACCOUNT_ACCOUNT) {
      yield put(setAccountId(response.data.id));
      yield put(setAccountCountry(response.data.accountCountry));
      handleNext();
      return;
    }
    if (entity === AccountEntityConstant.ACCOUNT_COMMERCIAL) {
      yield put(deleteAccountId());
      yield put(deleteAccountCountry());
      toast.success("Account created successfully");
      return;
    }
    if (typeof handleNext === "function") {
      handleNext();
    }
  } catch (error) {
    toast.error(error.message);
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
    toast.error(error.message);
    yield put(putAccountFailure(error));
  }
}

// Fetch accounts listing
function* workFetchAccounts(action) {
  try {
    const response = yield call(getAccounts, action.payload);
    yield put(fetchAccountsSuccess(response.data));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchAccountsFailure(error));
  }
}

// Delete Account
function* workDeleteAccount(action) {
  try {
    const response = yield call(deleteAccount, action.payload);
    yield put(deleteAccountSuccess(action.payload));
    toast.success("Account deleted successfully");
  } catch (error) {
    yield put(deleteAccountFailure(error));
    toast.error(error.message);
  }
}

// Fetch accounts fields
function* workFetchAccountsFields() {
  try {
    const response = yield call(getAccountsFields);
    yield put(fetchAccountsFieldsSuccess(response.data));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchAccountsFieldsFailure(error));
  }
}

// Fet account by id
function* workFetchAccount(action) {
  try {
    const response = yield call(getAccountById, action.payload);
    yield put(fetchAccountSuccess(response.data));
    yield put(setAccountCountry(response.data.accountCountry));
  } catch (error) {
    toast.error(error.message);
    yield put(fetchAccountFailure(error));
  }
}

export default function* watchFetchAccountSaga() {
  yield takeEvery(POST_ACCOUNT, workPostAccount);
  yield takeEvery(PUT_ACCOUNT, workPutAccount);
  yield takeEvery(FETCH_ACCOUNTS, workFetchAccounts);
  yield takeEvery(DELETE_ACCOUNT, workDeleteAccount);
  yield takeEvery(FETCH_ACCOUNTS_FIELDS, workFetchAccountsFields);
  yield takeEvery(FETCH_ACCOUNT, workFetchAccount);
}
