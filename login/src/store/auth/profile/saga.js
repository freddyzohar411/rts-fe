import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import { EDIT_PROFILE, FETCH_PROFILE } from "./actionTypes";
import { profileSuccess, profileError } from "./actions";

import { getUserProfile } from "../../../helpers/backend_helper";
import axios from "axios";

function* editProfile({ payload: { user } }) {
  try {
  } catch (error) {
    yield put(profileError(error));
  }
}
export function* watchProfile() {
  yield takeEvery(EDIT_PROFILE, editProfile);
}

export function* fetchProfile() {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + JSON.parse(sessionStorage.getItem("authUser")).access_token;
    const response = yield call(getUserProfile);
    if (response) {
      yield put(profileSuccess(response));
    } else {
      yield put(profileError(response));
    }
  } catch (error) {
    yield put(profileError(error));
  }
}

function* ProfileSaga() {
  yield all([fork(watchProfile)]);
  yield takeEvery(FETCH_PROFILE, fetchProfile);
}

export default ProfileSaga;
