import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_ROLE,
  FETCH_ROLES,
  FETCH_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from "./actionTypes";
import {
  createRoleSuccess,
  createRoleFailure,
  fetchRolesSuccess,
  fetchRolesFailure,
  fetchRoleSuccess,
  fetchRoleFailure,
  updateRoleSuccess,
  updateRoleFailure,
  deleteRoleSuccess,
  deleteRoleFailure,
} from "./action";

import {
  createRole,
  getRoles,
  getRole,
  deleteRole,
  updateRole,
} from "../../helpers/backend_helper";

// Create Role
function* workCreateRole(action) {
  const { newRole, navigate } = action.payload;
  try {
    const roleResponse = yield call(createRole, newRole);
    yield put(createRoleSuccess(roleResponse.data));
    navigate("/settings/access");
  } catch (error) {
    yield put(createRoleFailure(error));
  }
}

// Fetch Roles
function* workFetchRoles() {
  try {
    const response = yield call(getRoles);
    yield put(fetchRolesSuccess(response.data));
  } catch (error) {
    yield put(fetchRolesFailure(error));
  }
}

// Fetch Role
function* workFetchRole(action) {
  try {
    const response = yield call(getRole, action.payload);
    yield put(fetchRoleSuccess(response.data));
  } catch (error) {
    yield put(fetchRoleFailure(error));
  }
}

// Update Role
function* workUpdateRole(action) {
  const { updatedRole, navigate } = action.payload;
  try {
    const roleResponse = yield call(updateRole, updatedRole);
    yield put(updateRoleSuccess(roleResponse.data));
    navigate("/settings/access");
  } catch (error) {
    yield put(updateRoleFailure(error));
  }
}

// Delete Role
function* workDeleteRole(action) {
  try {
    const response = yield call(deleteRole, action.payload);
    const fetchRoles = yield call(getRoles);
    yield put(fetchRolesSuccess(fetchRoles.data));
    yield put(deleteRoleSuccess(response.data));
  } catch (error) {
    yield put(deleteRoleFailure(error));
  }
}

export default function* watchFetchRoleSaga() {
  yield takeEvery(CREATE_ROLE, workCreateRole);
  yield takeEvery(FETCH_ROLES, workFetchRoles);
  yield takeEvery(FETCH_ROLE, workFetchRole);
  yield takeEvery(UPDATE_ROLE, workUpdateRole);
  yield takeEvery(DELETE_ROLE, workDeleteRole);
}
