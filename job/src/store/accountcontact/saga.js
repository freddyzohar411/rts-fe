import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

import { FETCH_ACCOUNTCONTACTS } from "./actionTypes";
import {
  fetchAccountContactsSuccess,
  fetchAccountContactsFailure,
} from "./action";

import axios from "axios";

function* workFetchAccountContacts(action) {
  try {
    const response = yield call(
      axios.post,
      "http://localhost:8700/contacts-by-entity-and-type",
      {
        entityId: action.payload,
        entityType: "account_contact",
      }
    );
    yield put(fetchAccountContactsSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountContactsFailure(error));
  }
}

export default function* watchFetchAccountContactsSaga() {
  yield takeEvery(FETCH_ACCOUNTCONTACTS, workFetchAccountContacts);
}
