import { call, put, takeLatest } from "redux-saga/effects";

import { FETCH_ACCOUNT_NAMES } from "./actionTypes";
import { fetchAccountNamesSuccess, fetchAccountNamesFailure } from "./action";
import { getAccountNames } from "../../helpers/backend_helper";

function* workFetchAccountNames() {
  try {
    const response = yield call(getAccountNames);
    yield put(fetchAccountNamesSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountNamesFailure(error));
  }
}

export default function* watchFetchAccountNamesSaga() {
  yield takeLatest(FETCH_ACCOUNT_NAMES, workFetchAccountNames);
}
