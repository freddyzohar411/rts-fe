import { call, put, takeLatest } from "redux-saga/effects";

import { FETCH_ACCOUNT_NAMES, FETCH_ACCOUNT_NAMES_ALL } from "./actionTypes";
import {
  fetchAccountNamesSuccess,
  fetchAccountNamesFailure,
  fetchAccountNamesAllFailure,
  fetchAccountNamesAllSuccess,
} from "./action";
import {
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

export default function* watchFetchAccountNamesSaga() {
  yield takeLatest(FETCH_ACCOUNT_NAMES, workFetchAccountNames);
  yield takeLatest(FETCH_ACCOUNT_NAMES_ALL, workFetchAccountNamesAll);
}
