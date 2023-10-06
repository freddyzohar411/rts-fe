import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_INDUSTRY, FETCH_SUBINDUSTRY } from "./actionTypes";
import {
  fetchIndustrySuccess,
  fetchIndustryFailure,
  fetchSubIndustryFailure,
  fetchSubIndustrySuccess,
} from "./action";

function* workFetchIndustry() {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8200/industries/parent`
    );
    yield put(fetchIndustrySuccess(response.data));
  } catch (error) {
    yield put(fetchIndustryFailure(error));
  }
}

function* workFetchSubIndustry(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8200/industries/${action.payload}/sub`
    );
    yield put(fetchSubIndustrySuccess(response.data));
  } catch (error) {
    yield put(fetchSubIndustryFailure(error));
  }
}

export default function* watchFetchIndustrySaga() {
  yield takeEvery(FETCH_INDUSTRY, workFetchIndustry);
  yield takeEvery(FETCH_SUBINDUSTRY, workFetchSubIndustry);
}
