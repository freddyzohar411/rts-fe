import { call, put, takeEvery } from "redux-saga/effects";

import {FETCH_ACCOUNTFORM } from "./actionTypes";
import {
  fetchAccountFormSuccess,
  fetchAccountFormFailure,
} from "./action";
import { getFormById, getFormByFormName } from "../../helpers/backend_helper";

function* workFetchAccountForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchAccountFormSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountFormFailure(error));
  }
}

export default function* watchFetchAccountFormsSaga() {
  yield takeEvery(FETCH_ACCOUNTFORM, workFetchAccountForm);
}
