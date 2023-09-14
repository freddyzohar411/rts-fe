import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_COUNTRYCURRENCY } from "./actionTypes";
import { fetchCountryCurrencySuccess, fetchCountryCurrencyFailure } from "./action";

import axios from "axios";

function* workFetchCountryCurrency() {
    try{
        const response = yield call (axios.get, "http://localhost:8600/geo/country-currency");
        yield put (fetchCountryCurrencySuccess(response.data));
    } catch (error) {
        yield put (fetchCountryCurrencyFailure(error));
    }
}

export default function* watchFetchCountryCurrencySaga() {
    yield takeEvery(FETCH_COUNTRYCURRENCY, workFetchCountryCurrency);
}

