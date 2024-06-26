import { call, put, takeEvery, delay } from "redux-saga/effects";
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
  CREATE_ACCOUNT_CUSTOM_VIEW,
  FETCH_ACCOUNT_CUSTOM_VIEW,
  SELECT_ACCOUNT_CUSTOM_VIEW,
  DELETE_ACCOUNT_CUSTOM_VIEW,
  DELETE_ACCOUNTS,
  FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID,
  EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID,
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
  createAccountCustomViewSuccess,
  createAccountCustomViewFailure,
  fetchAccountCustomViewSuccess,
  fetchAccountCustomViewFailure,
  selectAccountCustomViewSuccess,
  selectAccountCustomFailure,
  fetchAccountCustomView,
  deleteAccountCustomViewSuccess,
  deleteAccountCustomViewFailure,
  deleteAccountsFailure,
  deleteAccountsSuccess,
  fetchAccountCustomViewByIdFailure,
  fetchAccountCustomViewByIdSuccess,
  editAccountCustomViewByIdSuccess,
  editAccountCustomViewByIdFailure,
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
  createAccountCustomView,
  getAllAccountCustomView,
  selectAccountCustomView,
  deleteAccountCustomView,
  deleteAccounts,
  getAccountCustomViewById,
  editAccountCustomViewById,
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
    toast.success("Account deleted successfully");
  } catch (error) {
    yield put(deleteAccountFailure(error));
  }
}

// Fetch accounts fields
function* workFetchAccountsFields() {
  try {
    const response = yield call(getAccountsFields);
    yield put(fetchAccountsFieldsSuccess(response.data));
  } catch (error) {
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
    yield put(fetchAccountFailure(error));
  }
}

// Fetch account data
function* workFetchAccountData(action) {
  try {
    const response = yield call(getAccountDataById, action.payload);
    yield put(fetchAccountDataSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountDataFailure(error));
  }
}

function* workFetchAccountsFieldsAll() {
  try {
    const response = yield call(getAccountsFieldsAll);
    yield put(fetchAccountsFieldsAllSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountsFieldsAllFailure(error));
  }
}

// Fetch Account Custom Views
function* workFetchAccountCustomView() {
  try {
    const response = yield call(getAllAccountCustomView);
    yield put(fetchAccountCustomViewSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountCustomViewFailure(error));
  }
}

// Create Account Custom View
function* workCreateAccountCustomView(action) {
  const { payload, navigate } = action.payload;
  try {
    const accountCustomViewResponse = yield call(
      createAccountCustomView,
      payload
    );
    yield delay(500);
    yield put(createAccountCustomViewSuccess(accountCustomViewResponse));
    toast.success("Account custom view created successfully!");
    navigate("/accounts");
  } catch (error) {
    yield put(createAccountCustomViewFailure(error));
    if (error?.code === 409) {
      toast.error("Account custom view name already exists.");
    } else {
      toast.error("Error creating account custom view!");
    }
  }
}

// Select Account Custom View
function* workSelectAccountCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(selectAccountCustomView, id);
    yield put(selectAccountCustomViewSuccess(response.data));
    yield put(fetchAccountCustomView());
    toast.success("Account custom view selected successfully!");
  } catch (error) {
    yield put(selectAccountCustomFailure(error));
    toast.error("Error selecting account custom view!");
  }
}

// Delete Account Custom View
function* workDeleteAccountCustomView(action) {
  const { id } = action.payload;
  try {
    const response = yield call(deleteAccountCustomView, id);
    yield put(deleteAccountCustomViewSuccess(response.data));
    yield put(fetchAccountCustomView());
    toast.success("Account custom view deleted successfully!");
  } catch (error) {
    yield put(deleteAccountCustomViewFailure(error));
    toast.error("Error deleting account custom view!");
  }
}

// Delete Accounts
function* workDeleteAccounts(action) {
  try {
    const response = yield call(deleteAccounts, {
      accountIds: action.payload,
    });
    yield put(deleteAccountsSuccess(action.payload));
  } catch (error) {
    yield put(deleteAccountsFailure(error));
  }
}

// Fetch Account Custom View By Id
function* workFetchAccountCustomViewById(action) {
  try {
    const response = yield call(getAccountCustomViewById, action.payload);
    yield put(fetchAccountCustomViewByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountCustomViewByIdFailure(error));
  }
}

// Edit Account Custom View By Id
function* workEditAccountCustomViewById(action) {
  const { editId, payload, navigate } = action.payload;
  try {
    const response = yield call(editAccountCustomViewById, editId, payload);
    yield delay(500);
    yield put(editAccountCustomViewByIdSuccess(response.data));
    toast.success("Account custom view updated successfully!");
    navigate("/accounts");
  } catch (error) {
    yield put(editAccountCustomViewByIdFailure(error));
    if (error?.code === 409) {
      toast.error("Account custom view name already exists.");
    } else {
      toast.error("Error updating account custom view!");
    }
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
  yield takeEvery(CREATE_ACCOUNT_CUSTOM_VIEW, workCreateAccountCustomView);
  yield takeEvery(FETCH_ACCOUNT_CUSTOM_VIEW, workFetchAccountCustomView);
  yield takeEvery(SELECT_ACCOUNT_CUSTOM_VIEW, workSelectAccountCustomView);
  yield takeEvery(DELETE_ACCOUNT_CUSTOM_VIEW, workDeleteAccountCustomView);
  yield takeEvery(DELETE_ACCOUNTS, workDeleteAccounts);
  yield takeEvery(
    FETCH_ACCOUNT_CUSTOM_VIEW_BY_ID,
    workFetchAccountCustomViewById
  );
  yield takeEvery(
    EDIT_ACCOUNT_CUSTOM_VIEW_BY_ID,
    workEditAccountCustomViewById
  );
}
