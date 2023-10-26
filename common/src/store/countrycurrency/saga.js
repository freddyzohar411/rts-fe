import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_COUNTRYCURRENCY, FETCH_BUSINESS_COUNTRIES } from "./actionTypes";
import {
  fetchCountryCurrencySuccess,
  fetchCountryCurrencyFailure,
  fetchBusinessCountriesSuccess,
  fetchBusinessCountriesFailure
} from "./action";
import { 
  getCountryCurrency,
  getBusinessCountries
} from "../../helpers/backend_helper";

function* workFetchCountryCurrency() {
  try {
    const response = yield call(getCountryCurrency);
    yield put(fetchCountryCurrencySuccess(response.data));
  } catch (error) {
    yield put(fetchCountryCurrencyFailure(error));
  }
}

function* workFetchBusinessCountries() {
  try {
    const response = yield call(getBusinessCountries);
    yield put(fetchBusinessCountriesSuccess(response.data));
  } catch (error) {
    yield put(fetchBusinessCountriesFailure(error));
  }
}

export default function* watchFetchCountryCurrencySaga() {
  yield takeEvery(FETCH_COUNTRYCURRENCY, workFetchCountryCurrency);
  yield takeEvery(FETCH_BUSINESS_COUNTRIES, workFetchBusinessCountries);
}
