import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { 
  getStates
 } from "../../helpers/backend_helper"

import { FETCH_STATE } from "./actionTypes";
import { fetchStateSuccess, fetchStateFailure } from "./action";

function* workFetchState(action) {
  try {
    const response = yield call(getStates, action.payload)
    yield put(fetchStateSuccess(response.data));
  } catch (error) {
    yield put(fetchStateFailure(error));
  }
}

export default function* watchFetchStateSaga() {
  yield takeEvery(FETCH_STATE, workFetchState);
}
