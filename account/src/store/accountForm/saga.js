import { call, put, takeEvery } from "redux-saga/effects";

import {FETCH_ACCOUNTFORM, FETCH_ACCOUNTFORM_SUBMISSION, CLEAR_ACCOUNTFORM_SUBMISSION} from "./actionTypes";
import {
  clearAccountFormSubmission,
  fetchAccountFormSuccess,
  fetchAccountFormFailure,
  fetchAccountFormSubmissionSuccess,
  fetchAccountFormSubmissionFailure,
} from "./action";
import { getFormByFormName, getAccountById, getAccountInstructionById, getAccountCommercialById } from "../../helpers/backend_helper";

const formURL = {
  "account_account": getAccountById,
  "account_instruction": getAccountInstructionById,
  "account_commercial": getAccountCommercialById
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


export default function* watchFetchAccountFormsSaga() {
  yield takeEvery(FETCH_ACCOUNTFORM, workFetchAccountForm);
  yield takeEvery(FETCH_ACCOUNTFORM_SUBMISSION, workFetchAccountFormSubmission);
}
