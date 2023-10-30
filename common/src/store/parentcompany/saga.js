import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_PARENTCOMPANY } from "./actionTypes";
import { fetchParentCompanySuccess, fetchParentCompanyFailure } from "./action";
import { getAccountNamesFromUser } from "../../helpers/backend_helper";

function* workFetchParentCompany() {
  try {
    const response = yield call(getAccountNamesFromUser);
    yield put(fetchParentCompanySuccess(response.data));
  } catch (error) {
    yield put(fetchParentCompanyFailure(error));
  }
}

export default function* watchFetchParentCompanySaga() {
  yield takeEvery(FETCH_PARENTCOMPANY, workFetchParentCompany);
}
