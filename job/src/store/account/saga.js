import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_ACCOUNTNAMES } from "./actionTypes";
import { fetchAccountNamesSuccess, fetchAccountNamesFailure } from "./action";
import axios from "axios";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function* workFetchAccountNames() {
    try{
        const response = yield call(axios.get,"http://localhost:8100/accounts/names");
        yield put(fetchAccountNamesSuccess(response.data));
    } catch (error) {
        yield put(fetchAccountNamesFailure(error));
    }
}

export default function* watchFetchAccountNamesSaga() {
    yield takeEvery(FETCH_ACCOUNTNAMES, workFetchAccountNames);
}

