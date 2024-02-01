import { call, put, takeEvery } from "redux-saga/effects";

import {
  FETCH_ACCOUNT_BY_ID,
  FETCH_ACCOUNT_NAMES,
  FETCH_ACCOUNT_NAMES_ALL,
} from "./actionTypes";
import {
  fetchAccountNamesSuccess,
  fetchAccountNamesFailure,
  fetchAccountNamesAllFailure,
  fetchAccountNamesAllSuccess,
  fetchAccountByIdSuccess,
  fetchAccountByIdFailure,
} from "./action";
import {
  getAccountById,
  getAccountNames,
  getAccountNamesAll,
} from "../../helpers/backend_helper";

function* workFetchAccountNames() {
  try {
    const response = yield call(getAccountNames);
    yield put(fetchAccountNamesSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountNamesFailure(error));
  }
}

function* workFetchAccountNamesAll() {
  try {
    const response = yield call(getAccountNamesAll);
    yield put(fetchAccountNamesAllSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountNamesAllFailure(error));
  }
}

function* workFetchAccountById(action) {
  try {
    const response = yield call(getAccountById, action.payload);
    yield put(fetchAccountByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountByIdFailure(error));
  }
}

export default function* watchFetchAccountNamesSaga() {
  yield takeEvery(FETCH_ACCOUNT_NAMES, workFetchAccountNames);
  yield takeEvery(FETCH_ACCOUNT_NAMES_ALL, workFetchAccountNamesAll);
  yield takeEvery(FETCH_ACCOUNT_BY_ID, workFetchAccountById);
}
