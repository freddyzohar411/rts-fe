import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_PERMISSIONS } from "./actionTypes";
import { fetchPermissionsSuccess, fetchPermissionsFailure } from "./action";
import { getPermissions } from "../../helpers/backend_helper";

// Fetch Permissions
function* workFetchPermissions() {
  try {
    const response = yield call(getPermissions);
    yield put(fetchPermissionsSuccess(response.data));
  } catch (error) {
    yield put(fetchPermissionsFailure(error));
  }
}

export default function* watchFetchPermissionSaga() {
  yield takeEvery(FETCH_PERMISSIONS, workFetchPermissions);
}
