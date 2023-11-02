import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USERGROUP } from "./actionTypes";
import { fetchUserGroupSuccess, fetchUserGroupFailure } from "./action";
import { getUserGroup} from "../../helpers/backend_helper";

function* workFetchUserGroup() {
  try {
    const response = yield call(getUserGroup);
    const userGroups = response.data;
    yield put(fetchUserGroupSuccess(userGroups));
  } catch (error) {
    yield put(fetchUserGroupFailure(error));
  }
}

export default function* watchFetchUserGroupSaga() {
  yield takeEvery(FETCH_USERGROUP, workFetchUserGroup);
}
