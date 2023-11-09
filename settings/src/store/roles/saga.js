import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_ROLE,
  LIST_ROLES,
  FETCH_ROLES,
  FETCH_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
} from "./actionTypes";
import {
  createRoleSuccess,
  createRoleFailure,
  listRolesSuccess,
  listRolesFailure,
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
  listRoles
} from "../../helpers/backend_helper";

import { toast } from "react-toastify";

// Create Role
function* workCreateRole(action) {
  const { newRole, navigate } = action.payload;
  try {
    const roleResponse = yield call(createRole, newRole);
    yield put(createRoleSuccess(roleResponse.data));
    navigate("/settings/access", {
      state: {
        activeTab: "2",
      },
    });
    toast.success("Role creation success!");
  } catch (error) {
    yield put(createRoleFailure(error));
    toast.error("Role creation failed!");
  }
}

// List Roles
function* workListRoles(action) {
  try {
    const response = yield call(listRoles, action.payload);
    yield put(listRolesSuccess(response.data));
  } catch (error) {
    yield put(listRolesFailure(error));
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
    navigate("/settings/access", {
      state: {
        activeTab: "2",
      },
    });
    toast.success("Role update success!");
  } catch (error) {
    yield put(updateRoleFailure(error));
    toast.error("Role update failed!");
  }
}

// Delete Role
function* workDeleteRole(action) {
  try {
    const response = yield call(deleteRole, action.payload);
    const fetchRoles = yield call(listRoles, {
      page: 0,
      size: 5,
    });
    yield put(deleteRoleSuccess(response.data));
    yield put(listRolesSuccess(fetchRoles.data));
    toast.success("Role deletion success!");
  } catch (error) {
    yield put(deleteRoleFailure(error));
    toast.error("Role deletion failed!");
  }
}

export default function* watchFetchRoleSaga() {
  yield takeEvery(CREATE_ROLE, workCreateRole);
  yield takeEvery(FETCH_ROLES, workFetchRoles);
  yield takeEvery(FETCH_ROLE, workFetchRole);
  yield takeEvery(UPDATE_ROLE, workUpdateRole);
  yield takeEvery(DELETE_ROLE, workDeleteRole);
  yield takeEvery(LIST_ROLES, workListRoles);
}
