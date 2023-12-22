import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { FETCH_INDUSTRY, FETCH_SUBINDUSTRY } from "./actionTypes";
import {
  fetchIndustrySuccess,
  fetchIndustryFailure,
  fetchSubIndustryFailure,
  fetchSubIndustrySuccess,
} from "./action";
import {
  getParentIndustries,
  getSubIndustries,
} from "../../helpers/backend_helper";


function* workFetchIndustry() {
  try {
    const response = yield call(getParentIndustries);
    yield put(fetchIndustrySuccess(response.data));
  } catch (error) {
    yield put(fetchIndustryFailure(error));
  }
}

function* workFetchSubIndustry(action) {
  try {
    const response = yield call(getSubIndustries, action.payload);
    yield put(fetchSubIndustrySuccess(response.data));
  } catch (error) {
    yield put(fetchSubIndustryFailure(error));
  }
}

export default function* watchFetchIndustrySaga() {
  yield takeEvery(FETCH_INDUSTRY, workFetchIndustry);
  yield takeEvery(FETCH_SUBINDUSTRY, workFetchSubIndustry);
}
