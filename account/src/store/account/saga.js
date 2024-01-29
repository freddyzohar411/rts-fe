import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AccountEntityConstant } from "../../constants/accountConstant";

import {
  FETCH_ACCOUNT,
  POST_ACCOUNT,
  PUT_ACCOUNT,
  DELETE_ACCOUNT,
  FETCH_ACCOUNTS,
  FETCH_ACCOUNTS_FIELDS,
  FETCH_ACCOUNT_DATA,
  FETCH_ACCOUNTS_FIELDS_ALL,
  FETCH_ACCOUNTS_ADMIN,
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
  fetchAccountDataSuccess,
  fetchAccountDataFailure,
  fetchAccountsFieldsAllSuccess,
  fetchAccountsFieldsAllFailure,
  fetchAccountsAdminSuccess,
  fetchAccountsAdminFailure,
} from "./action";
import {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
  getAccountsFields,
  getAccountById,
  getAccountDataById,
  getAccountsFieldsAll,
  getAccountsAdmin,
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
  const { entity, newData, config, rerenderTable, id, resetForm } =
    action.payload;
  try {
    const response = yield call(createAccount, entity, id, newData, config);
    if (
      entity === AccountEntityConstant.ACCOUNT_ACCOUNT ||
      entity === AccountEntityConstant.ACCOUNT_INSTRUCTION ||
      entity === AccountEntityConstant.ACCOUNT_COMMERCIAL
    ) {
      yield put(postAccountSuccess(response.data));
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }

    if (entity === AccountEntityConstant.ACCOUNT_ACCOUNT) {
      yield put(setAccountId(response.data.id));
      yield put(setAccountCountry(response.data.accountCountry));
      return;
    }

    if (entity === AccountEntityConstant.ACCOUNT_COMMERCIAL) {
      yield put(deleteAccountId());
      yield put(deleteAccountCountry());
      toast.success("Account created successfully");
      return;
    }
  } catch (error) {
    toast.error("Error creating account");
    yield put(postAccountFailure(error));
  }
}

// Put Account
function* workPutAccount(action) {
  const { entity, id, newData, config, rerenderTable, resetForm } =
    action.payload;
  try {
    const response = yield call(updateAccount, entity, id, newData, config);
    if (
      entity === AccountEntityConstant.ACCOUNT_ACCOUNT ||
      entity === AccountEntityConstant.ACCOUNT_INSTRUCTION ||
      entity === AccountEntityConstant.ACCOUNT_COMMERCIAL
    ) {
      yield put(putAccountSuccess(response.data));
    }

    if (entity === AccountEntityConstant.ACCOUNT_COMMERCIAL) {
      yield put(deleteAccountId());
      yield put(deleteAccountCountry());
      toast.success("Account updated successfully");
      return;
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
  } catch (error) {
    toast.error("Error updating account");
    yield put(putAccountFailure(error));
  }
}

// Fetch accounts listing
function* workFetchAccounts(action) {
  try {
    const response = yield call(getAccounts, action.payload);
    yield put(fetchAccountsSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts");
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
    toast.error("Error deleting account");
  }
}

// Fetch accounts fields
function* workFetchAccountsFields() {
  try {
    const response = yield call(getAccountsFields);
    yield put(fetchAccountsFieldsSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts fields");
    yield put(fetchAccountsFieldsFailure(error));
  }
}

// Fetch account by id
function* workFetchAccount(action) {
  try {
    const response = yield call(getAccountById, action.payload);
    yield put(fetchAccountSuccess(response.data));
    yield put(setAccountCountry(response.data.accountCountry));
  } catch (error) {
    toast.error("Error fetching account");
    yield put(fetchAccountFailure(error));
  }
}

// Fetch account data
function* workFetchAccountData(action) {
  try {
    const response = yield call(getAccountDataById, action.payload);
    yield put(fetchAccountDataSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching account data");
    yield put(fetchAccountDataFailure(error));
  }
}

function* workFetchAccountsFieldsAll() {
  try {
    const response = yield call(getAccountsFieldsAll);
    yield put(fetchAccountsFieldsAllSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts fields");
    yield put(fetchAccountsFieldsAllFailure(error));
  }
}

function* workFetchAccountsAdmin(action) {
  try {
    const response = yield call(getAccountsAdmin, action.payload);
    yield put(fetchAccountsAdminSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts");
    yield put(fetchAccountsAdminFailure(error));
  }
}

export default function* watchFetchAccountSaga() {
  yield takeEvery(POST_ACCOUNT, workPostAccount);
  yield takeEvery(PUT_ACCOUNT, workPutAccount);
  yield takeEvery(FETCH_ACCOUNTS, workFetchAccounts);
  yield takeEvery(DELETE_ACCOUNT, workDeleteAccount);
  yield takeEvery(FETCH_ACCOUNTS_FIELDS, workFetchAccountsFields);
  yield takeEvery(FETCH_ACCOUNT, workFetchAccount);
  yield takeEvery(FETCH_ACCOUNT_DATA, workFetchAccountData);
  yield takeEvery(FETCH_ACCOUNTS_FIELDS_ALL, workFetchAccountsFieldsAll);
  yield takeEvery(FETCH_ACCOUNTS_ADMIN, workFetchAccountsAdmin);
}
