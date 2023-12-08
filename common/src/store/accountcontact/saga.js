import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_ACCOUNTCONTACTS } from "./actionTypes";
import {
  fetchAccountContactsSuccess,
  fetchAccountContactsFailure,
} from "./action";
import { getAccountContacts } from "../../helpers/backend_helper";

function* workFetchAccountContacts(action) {
  try {
    const response = yield call(getAccountContacts, {
      entityId: action.payload,
      entityType: "account_contact",
    });
    yield put(fetchAccountContactsSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountContactsFailure(error));
  }
}

export default function* watchFetchAccountContactsSaga() {
  yield takeEvery(FETCH_ACCOUNTCONTACTS, workFetchAccountContacts);
}
