import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CANDIDATE_MAPPING, POST_CANDIDATE_MAPPING } from "./actionTypes";
import {
  getCandidateMappingSuccess,
  getCandidateMappingFailure,
  postCandidateMappingSuccess,
  postCandidateMappingFailure,
} from "./action";
import {
  getCandidateMapping,
  postCandidateMapping,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

function* workPostCandidateMapping(action) {
  try {
    const response = yield call(postCandidateMapping, action.payload);
    yield put(postCandidateMappingSuccess(response.data));
    toast.success("Candidate Mapping Updated Successfully");
  } catch (error) {
    yield put(postCandidateMappingFailure(error));
    toast.error("Candidate Mapping Update Failed");
  }
}

function* workGetCandidateMapping() {
  try {
    const response = yield call(getCandidateMapping);
    yield put(getCandidateMappingSuccess(response.data));
  } catch (error) {
    yield put(getCandidateMappingFailure(error));
  }
}

export default function* watchFetchCandidateMappingSaga() {
  yield takeEvery(POST_CANDIDATE_MAPPING, workPostCandidateMapping);
  yield takeEvery(GET_CANDIDATE_MAPPING, workGetCandidateMapping);
}
