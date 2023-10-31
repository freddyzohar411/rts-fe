import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from "./actionTypes";
import {
  fetchUserSuccess,
  fetchUserFailure,
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserSuccess,
  createUserFailure,
  deleteUserSuccess,
  deleteUserFailure,
  updateUserSuccess,
  updateUserFailure,
} from "./action";

import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../../helpers/backend_helper";

function* workFetchUser(action) {
  try {
    const response = yield call(getUser, action.payload);
    yield put(fetchUserSuccess(response.data));
  } catch (error) {
    yield put(fetchUserFailure(error));
  }
}

function* workFetchUsers() {
  try {
    const response = yield call(getUsers);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
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

function* workDeleteUser(action) {
  try {
    const response = yield call(deleteUser, action.payload);
    const fetchUsers = yield call(getUsers);
    yield put(fetchUsersSuccess(fetchUsers.data));
    yield put(deleteUserSuccess(response.data));
  } catch (error) {
    yield put(deleteUserFailure(error));
  }
}

function* workUpdateUser(action) {
  const { updatedUser, navigate } = action.payload;
  try {
    const userResponse = yield call(updateUser, updatedUser);
    yield put(updateUserSuccess(userResponse.data));
    navigate("/settings/access");
  } catch (error) {
    console.error("Error updating from SAGA:", error);
    yield put(updateUserFailure(error));
  }
}

export default function* watchFetchUserSaga() {
  yield takeEvery(FETCH_USER, workFetchUser);
  yield takeEvery(FETCH_USERS, workFetchUsers);
  yield takeEvery(CREATE_USER, workCreateUser);
  yield takeEvery(DELETE_USER, workDeleteUser);
  yield takeEvery(UPDATE_USER, workUpdateUser);
}
