import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";

import {
  CREATE_CANDIDATE_CUSTOM_VIEW,
} from "./actionTypes";
import {
  createCandidateCustomViewSuccess,
  createCandidateCustomViewFailure,
} from "./action";
import {
  createCandidateCustomView,
} from "../../helpers/backend_helper";

function* workCreateCandidateCustomView(action) {
    const { payload } = action.payload;
    try {
        const customViewResponse = yield call(createCandidateCustomView, payload);
        yield put(createCandidateCustomViewSuccess(customViewResponse));
        toast.success(customViewResponse?.message);
    } catch (error) {
        yield put(createCandidateCustomViewFailure(error));
        toast.error(customViewResponse?.message);
    }
}

export default function* watchFetchCandidateCustomViewSaga() {
  yield takeEvery(CREATE_CANDIDATE_CUSTOM_VIEW, workCreateCandidateCustomView);
}
