import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { FETCH_DRAFT_CANDIDATE, DELETE_DRAFT_CANDIDATE } from "./actionTypes";
import {
  setCandidateId,
  setCandidateCountry,
  deleteCandidateId,
  deleteCandidateCountry,
  deleteDraftCandidate,
} from "./action";
import {
  deleteDraftCandidateById,
  getDraftCandidate,
} from "../../helpers/backend_helper";
import { CandidateEntityConstant } from "../../constants/candidateConstant"
import { fetchCandidateFormSubmission, setFormSubmission } from "../candidateForm/action";

function* workFetchDraftCandidate(action) {
  try {
    const response = yield call(getDraftCandidate);
    if (response.data === null) {
      yield put(deleteCandidateId());
      yield put(deleteCandidateCountry());
    } else {
      yield put(setCandidateId(response.data.id));
      yield put(setCandidateCountry(response.data.candidateCountry));
      yield put(setFormSubmission(response.data.candidateSubmissionData))
    }
  } catch (error) {
    throw error;
  }
}

function* workDeleteDraftCandidate(action) {
  const { candidateId , resetStepper } = action.payload;
  try {
    yield call(deleteDraftCandidateById, candidateId);
    yield put(deleteCandidateId());
    yield put(deleteCandidateCountry());
    resetStepper(0);
  } catch (error) {
    throw error;
  }
}

export default function* watchFetchDraftCandidate() {
  yield takeEvery(FETCH_DRAFT_CANDIDATE, workFetchDraftCandidate);
  yield takeEvery(DELETE_DRAFT_CANDIDATE, workDeleteDraftCandidate);
}
