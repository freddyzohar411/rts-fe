import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { FETCH_PARENTCOMPANY } from "./actionTypes";
import { fetchParentCompanySuccess, fetchParentCompanyFailure } from "./action";

function* workFetchParentCompany() {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:8100/accounts/names`
    );
    yield put(fetchParentCompanySuccess(response.data));
  } catch (error) {
    yield put(fetchParentCompanyFailure(error));
  }
}

export default function* watchFetchParentCompanySaga() {
  yield takeEvery(FETCH_PARENTCOMPANY, workFetchParentCompany);
}
