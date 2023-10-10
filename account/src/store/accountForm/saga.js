import { call, put, takeEvery } from "redux-saga/effects";

import {FETCH_ACCOUNTFORM, FETCH_ACCOUNTFORM_SUBMISSION, CLEAR_ACCOUNTFORM_SUBMISSION} from "./actionTypes";
import {
  clearAccountFormSubmission,
  fetchAccountFormSuccess,
  fetchAccountFormFailure,
  fetchAccountFormSubmissionSuccess,
  fetchAccountFormSubmissionFailure,
} from "./action";
import { getFormById, getFormByFormName, getAccountById } from "../../helpers/backend_helper";

const formURL = {
  "account_account": getAccountById
}

function* workFetchAccountForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchAccountFormSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountFormFailure(error));
  }
}

function* workFetchAccountFormSubmission(action) {
  const { formName, accountId } = action.payload;
  console.log("workFetchAccountFormSubmission", formName, accountId)
  try {
    const response = yield call(
      formURL[formName],
      accountId
    );
    yield put(fetchAccountFormSubmissionSuccess(response.data));
  } catch (error) {
    yield put(fetchAccountFormSubmissionFailure(error));
  }
}

// function* workClearAccountFormSubmission() {
//   yield put(clearAccountFormSubmission());
// }


export default function* watchFetchAccountFormsSaga() {
  yield takeEvery(FETCH_ACCOUNTFORM, workFetchAccountForm);
  yield takeEvery(FETCH_ACCOUNTFORM_SUBMISSION, workFetchAccountFormSubmission);
  // yield takeEvery(CLEAR_ACCOUNTFORM_SUBMISSION, workClearAccountFormSubmission);
}
