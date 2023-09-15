import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_DEPARTMENT } from "./actionTypes";
import { fetchDepartmentSuccess, fetchDepartmentFailure } from "./action";

function* workFetchDepartment() {
  try {
    const response = yield call(axios.get, "http://localhost:8900/departments");
    yield put(fetchDepartmentSuccess(response.data));
  } catch (error) {
    yield put(fetchDepartmentFailure(error));
  }
}

export default function* watchFetchDepartmentSaga() {
  yield takeEvery(FETCH_DEPARTMENT, workFetchDepartment);
}
