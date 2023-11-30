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

const formURL = {
  "candidate_basic_info": getCandidateById,
}

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
  const { formName, candidateId } = action.payload;
  try {
    const response = yield call(
      formURL[formName],
      candidateId
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
