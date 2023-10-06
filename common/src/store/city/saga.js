import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_CITY } from "./actionTypes";
import { fetchCitySuccess, fetchCityFailure } from "./action";

function* workFetchCity(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8600/geo/cities/country/${action.payload}`
    );
    yield put(fetchCitySuccess(response.data));
  } catch (error) {
    yield put(fetchCityFailure(error));
  }
}

export default function* watchFetchCitySaga() {
  yield takeEvery(FETCH_CITY, workFetchCity);
}
