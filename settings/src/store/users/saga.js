import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_USER, CREATE_USER } from "./actionTypes";
import {
  fetchUserSuccess,
  fetchUserFailure,
  createUserSuccess,
  createUserFailure,
} from "./action";

import { createUser, getUser } from "../../helpers/backend_helper";

function* workFetchUser(action) {
  try {
    const response = yield call(getUser, action.payload);
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

function* workCreateUser(action) {
  const { newUser, navigate } = action.payload;
  try {
    const userResponse = yield call(createUser, newUser);
    yield put(createUserSuccess(userResponse.data));
    navigate("/settings/access");
  } catch (error) {
    yield put(createUserFailure(error));
  }
}

export default function* watchFetchUserSaga() {
  yield takeEvery(FETCH_USER, workFetchUser);
  yield takeEvery(CREATE_USER, workCreateUser);
}
