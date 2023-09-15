import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_BILLINGCITY } from "./actionTypes";
import { fetchBillingCitySuccess, fetchBillingCityFailure } from "./action";

function* workFetchBillingCity(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8600/geo/cities/country/${action.payload}`
    );
    yield put(fetchBillingCitySuccess(response.data));
  } catch (error) {
    yield put(fetchBillingCityFailure(error));
  }
}

export default function* watchFetchBillingCitySaga() {
  yield takeEvery(FETCH_BILLINGCITY, workFetchBillingCity);
}
