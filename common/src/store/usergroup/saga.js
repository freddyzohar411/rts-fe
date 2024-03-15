import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USERGROUP, FETCH_USERS } from "./actionTypes";
import {
  fetchUserGroupSuccess,
  fetchUserGroupFailure,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./action";
import { getUserGroup, getUsers } from "../../helpers/backend_helper";

function* workFetchUserGroup() {
  try {
    const response = yield call(getUserGroup);
    const userGroups = response.data;
    yield put(fetchUserGroupSuccess(userGroups));
  } catch (error) {
    yield put(fetchUserGroupFailure(error));
  }
}

function* workFetchUsers() {
  try {
    const response = yield call(getUsers);
    const userGroups = response.data;
    yield put(fetchUsersSuccess(getUsers));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

export default function* watchFetchUserGroupSaga() {
  yield takeEvery(FETCH_USERGROUP, workFetchUserGroup);
  yield takeEvery(FETCH_USERS, workFetchUsers);
}
