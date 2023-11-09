import { call, put, takeEvery } from "redux-saga/effects";
import {
  FETCH_USER,
  FETCH_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  LIST_USERS
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
  listUsersSuccess,
  listUsersFailure
} from "./action";

import {
  createUser,
  getUser,
  getUsers,
  deleteUser,
  updateUser,
  listUsers
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

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

function* workListUsers(action) {
  try {
    const response = yield call(listUsers, action.payload);
    yield put(listUsersSuccess(response.data));
  } catch (error) {
    yield put(listUsersFailure(error));
  }
}

function* workCreateUser(action) {
  const { newUser, navigate } = action.payload;
  try {
    const userResponse = yield call(createUser, newUser);
    yield put(createUserSuccess(userResponse.data));
    navigate("/settings/access");
    toast.success("User created successfully!");
  } catch (error) {
    yield put(createUserFailure(error));
    if (error.message.includes("409")) {
      toast.error("User already exists!");
      return;
    }
    toast.error("User creation failed!");
  }
}

function* workDeleteUser(action) {
  try {
    const response = yield call(deleteUser, action.payload);
    const fetchUsers = yield call(listUsers, {
      page: 0,
      size: 5,
    });
    yield put(listUsersSuccess(fetchUsers.data));
    yield put(deleteUserSuccess(response.data));
    toast.success("User deleted successfully!");
  } catch (error) {
    yield put(deleteUserFailure(error));
    toast.error("User deletion failed!");
  }
}

function* workUpdateUser(action) {
  const { updatedUser, navigate } = action.payload;
  try {
    const userResponse = yield call(updateUser, updatedUser);
    yield put(updateUserSuccess(userResponse.data));
    navigate("/settings/access");
    toast.success("User updated successfully!");
  } catch (error) {
    yield put(updateUserFailure(error));
    toast.error("User update failed!");
  }
}

export default function* watchFetchUserSaga() {
  yield takeEvery(FETCH_USER, workFetchUser);
  yield takeEvery(FETCH_USERS, workFetchUsers);
  yield takeEvery(CREATE_USER, workCreateUser);
  yield takeEvery(DELETE_USER, workDeleteUser);
  yield takeEvery(UPDATE_USER, workUpdateUser);
  yield takeEvery(LIST_USERS, workListUsers);
}
