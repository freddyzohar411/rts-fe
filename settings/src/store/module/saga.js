import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_MODULES } from "./actionTypes";
import { fetchModulesSuccess, fetchModulesFailure } from "./action";
import { getModules } from "../../helpers/backend_helper";

// Fetch Modules
function* workFetchModules() {
  try {
    const response = yield call(getModules);
    yield put(fetchModulesSuccess(response.data));
  } catch (error) {
    yield put(fetchModulesFailure(error));
  }
}

export default function* watchFetchModuleSaga() {
  yield takeEvery(FETCH_MODULES, workFetchModules);
}
