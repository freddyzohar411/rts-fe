import { call, put, takeEvery } from "redux-saga/effects";

import {FETCH_CANDIDATEFORM, FETCH_CANDIDATEFORM_SUBMISSION, CLEAR_CANDIDATEFORM_SUBMISSION} from "./actionTypes";
import {
  clearCandidateFormSubmission,
  fetchCandidateFormSuccess,
  fetchCandidateFormFailure,
  fetchCandidateFormSubmissionSuccess,
  fetchCandidateFormSubmissionFailure,
} from "./action";
import { getFormByFormName, getCandidateById, getCandidateInstructionById, getCandidateCommercialById } from "../../helpers/backend_helper";
import { toast } from "react-toastify";

// const formURL = {
//   "account_account": getCandidateById,
//   "account_instruction": getCandidateInstructionById,
//   "account_commercial": getCandidateCommercialById
// }

function* workFetchCandidateForm(action) {
  try {
    const response = yield call(getFormByFormName, action.payload);
    yield put(fetchCandidateFormSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching account form");
    yield put(fetchCandidateFormFailure(error));
  }
}

function* workFetchCandidateFormSubmission(action) {
  const { formName, accountId } = action.payload;
  try {
    const response = yield call(
      formURL[formName],
      accountId
    );
    yield put(fetchCandidateFormSubmissionSuccess(response.data));
  } catch (error) {
    yield put(fetchCandidateFormSubmissionFailure(error));
  }
}


export default function* watchFetchCandidateFormsSaga() {
  yield takeEvery(FETCH_CANDIDATEFORM, workFetchCandidateForm);
  yield takeEvery(FETCH_CANDIDATEFORM_SUBMISSION, workFetchCandidateFormSubmission);
}
