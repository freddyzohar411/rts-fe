import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_CITY } from "./actionTypes";
import { fetchCitySuccess, fetchCityFailure } from "./action";

function* workFetchCity(action) {
    console.log(`localhost:8600/geo/cities/country/${action.payload}`)
    try{
        const response = yield call (axios.get, `http://localhost:8600/geo/cities/country/${action.payload}`);
        yield put (fetchCitySuccess(response.data));
    } catch (error) {
        yield put (fetchCityFailure(error));
    }
}

// function* workFetchBillingCity(action) {
//     console.log(`localhost:8600/geo/cities/country/${action.payload}`)
//     try{
//         const response = yield call (axios.get, `http://localhost:8600/geo/cities/country/${action.payload}`);
//         console.log('Billing city: ',response)
//         yield put (fetchBillingCitySuccess(response.data.data));
//     } catch (error) {
//         throw error;
//         yield put (fetchBillingCityFailure(error));
//     }
// }

export default function* watchFetchCitySaga() {
    yield takeEvery(FETCH_CITY, workFetchCity);
    // yield takeEvery(FETCH_BILLINGCITY, workFetchBillingCity);

}

