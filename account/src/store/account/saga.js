import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { FETCH_ACCOUNT, CREATE_ACCOUNT } from "./actionTypes";
import { fetchAccountSuccess, fetchAccountFailure, createAccountSuccess, createAccountFailure } from "./action";

function* workFetchAccount(action) {
    try{
        const response = yield call (axios.get, `http://localhost:8100/accounts/${action.payload}`);
        yield put (fetchAccountSuccess(response.data));
    } catch (error) {
        yield put (fetchAccountFailure(error));
    }
}

function* workCreateAccount(action) {
    try{
        const response = yield call (axios.post, "http://localhost:8100/accounts", action.payload);
        yield put (createAccountSuccess(response.data));
    } catch (error) {
        yield put (createAccountFailure(error));
    }
}

export default function* watchFetchAccountSaga() {
    yield takeEvery(FETCH_ACCOUNT, workFetchAccount);
    yield takeEvery(CREATE_ACCOUNT, workCreateAccount);
}

