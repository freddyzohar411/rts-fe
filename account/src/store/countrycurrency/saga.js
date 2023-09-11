import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_COUNTRYCURRENCY,FETCH_COUNTRYCURRENCY_SUCCESS, FETCH_COUNTRYCURRENCY_FAILURE } from "./actionTypes";
import { fetchCountryCurrency, fetchCountryCurrencySuccess, fetchCountryCurrencyFailure } from "./action";

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

