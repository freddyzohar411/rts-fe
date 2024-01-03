import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { CandidateEntityConstant } from "../../constants/candidateConstant";

import {
  FETCH_CANDIDATE,
  POST_CANDIDATE,
  PUT_CANDIDATE,
  DELETE_CANDIDATE,
  FETCH_CANDIDATES,
  FETCH_CANDIDATES_FIELDS,
  PUT_CANDIDATE_DRAFT_STATUS,
  FETCH_CANDIDATE_DATA,
} from "./actionTypes";
import {
  fetchCandidateSuccess,
  fetchCandidateFailure,
  postCandidateSuccess,
  postCandidateFailure,
  putCandidateSuccess,
  putCandidateFailure,
  deleteCandidateSuccess,
  deleteCandidateFailure,
  fetchCandidatesSuccess,
  fetchCandidatesFailure,
  fetchCandidatesFieldsSuccess,
  fetchCandidatesFieldsFailure,
  putCandidateDraftStatusSuccess,
  putCandidateDraftStatusFailure,
  putCandidateDraftStatus,
  fetchCandidateDataSuccess,
  fetchCandidateDataFailure,
} from "./action";
import {
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidatesFields,
  getCandidateById,
  completeCandidateRegistration,
  getCandidateDataById
} from "../../helpers/backend_helper";
import {
  setCandidateId,
  deleteCandidateId,
  setCandidateCountry,
  deleteCandidateCountry,
} from "../candidateregistration/action";
import { toast } from "react-toastify";

// Post account
function* workPostCandidate(action) {
  const { entity, newData, config, rerenderTable, id, resetForm } =
    action.payload;
  try {
    const response = yield call(createCandidate, entity, id, newData, config);
    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(postCandidateSuccess(response.data));
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }

    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(setCandidateId(response.data.id));
      // yield put(setCandidateCountry(response.data.candidateCountry));
      return;
    }

  } catch (error) {
    toast.error("Error creating candidate");
    yield put(postCandidateFailure(error));
  }
}

// Put Candidate
function* workPutCandidate(action) {
  const { entity, id, newData, config, rerenderTable, resetForm } =
    action.payload;
  try {
    const response = yield call(updateCandidate, entity, id, newData, config);
    if (entity === CandidateEntityConstant.CANDIDATE_BASIC_INFO) {
      yield put(putCandidateSuccess(response.data));
    }

    if (typeof resetForm === "function") {
      resetForm();
    }

    if (typeof rerenderTable === "function") {
      rerenderTable();
    }
  } catch (error) {
    toast.error("Error updating account");
    yield put(putCandidateFailure(error));
  }
}

// Fetch accounts listing
function* workFetchCandidates(action) {
  try {
    const response = yield call(getCandidates, action.payload);
    yield put(fetchCandidatesSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts");
    yield put(fetchCandidatesFailure(error));
  }
}

// Delete Candidate
function* workDeleteCandidate(action) {
  try {
    const response = yield call(deleteCandidate, action.payload);
    yield put(deleteCandidateSuccess(action.payload));
    toast.success("Candidate deleted successfully");
  } catch (error) {
    yield put(deleteCandidateFailure(error));
    toast.error("Error deleting candidate");
  }
}

// Fetch accounts fields
function* workFetchCandidatesFields() {
  try {
    const response = yield call(getCandidatesFields);
    yield put(fetchCandidatesFieldsSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching accounts fields");
    yield put(fetchCandidatesFieldsFailure(error));
  }
}

// Fetch account by id
function* workFetchCandidate(action) {
  try {
    const response = yield call(getCandidateById, action.payload);
    yield put(fetchCandidateSuccess(response.data));
    yield put(setCandidateCountry(response.data.accountCountry));
  } catch (error) {
    toast.error("Error fetching account");
    yield put(fetchCandidateFailure(error));
  }
}

// Put candidate draft status
function* workPutCandidateDraftStatus(action) {
  try {
    const response = yield call(completeCandidateRegistration, action.payload);
    yield put(putCandidateDraftStatusSuccess(response.data));
    yield put(deleteCandidateId());
    // yield put(deleteCandidateCountry());
    toast.success("Candidate created successfully");
  } catch (error) {
    yield put(putCandidateDraftStatusFailure(error));
    toast.error("Error updating candidate draft status");
  }
}

// Fetch candidate data by id
function* workFetchCandidateData(action) {
  try {
    const response = yield call(getCandidateDataById, action.payload);
    yield put(fetchCandidateDataSuccess(response.data));
  } catch (error) {
    toast.error("Error fetching candidate data");
    yield put(fetchCandidateDataFailure(error));
  }
}


export default function* watchFetchCandidateSaga() {
  yield takeEvery(POST_CANDIDATE, workPostCandidate);
  yield takeEvery(PUT_CANDIDATE, workPutCandidate);
  yield takeEvery(FETCH_CANDIDATES, workFetchCandidates);
  yield takeEvery(DELETE_CANDIDATE, workDeleteCandidate);
  yield takeEvery(FETCH_CANDIDATES_FIELDS, workFetchCandidatesFields);
  yield takeEvery(FETCH_CANDIDATE, workFetchCandidate);
  yield takeEvery(PUT_CANDIDATE_DRAFT_STATUS, workPutCandidateDraftStatus);
  yield takeEvery(FETCH_CANDIDATE_DATA, workFetchCandidateData);
}
