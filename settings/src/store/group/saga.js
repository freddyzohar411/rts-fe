import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_GROUP,
  LIST_GROUPS,
  FETCH_GROUPS,
  FETCH_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from "./actionTypes";
import {
  createGroupSuccess,
  createGroupFailure,
  listGroupsSuccess,
  listGroupsFailure,
  fetchGroupsSuccess,
  fetchGroupsFailure,
  fetchGroupSuccess,
  fetchGroupFailure,
  updateGroupSuccess,
  updateGroupFailure,
  deleteGroupSuccess,
  deleteGroupFailure,
} from "./action";

import {
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  updateGroup,
  listGroups,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

// Fetch Groups
function* workFetchGroups() {
  try {
    const response = yield call(getGroups);
    yield put(fetchGroupsSuccess(response.data));
  } catch (error) {
    yield put(fetchGroupsFailure(error));
  }
}

// List Groups
function* workListGroups(action) {
  try {
    const response = yield call(listGroups, action.payload);
    yield put(listGroupsSuccess(response?.data));
  } catch (error) {
    yield put(listGroupsFailure(error?.data));
  }
}

// Fetch Group
function* workFetchGroup(action) {
  try {
    const response = yield call(getGroup, action.payload);
    yield put(fetchGroupSuccess(response.data));
  } catch (error) {
    yield put(fetchGroupFailure(error));
  }
}

// Create Group
function* workCreateGroup(action) {
  const { payload } = action;
  try {
    const groupResponse = yield call(createGroup, payload);
    yield put(createGroupSuccess(groupResponse?.data));
    toast.success("Group created successfully!");
  } catch (error) {
    yield put(createGroupFailure(error?.data));
    toast.error("Failed to create group!");
  }
}

// Update Group
function* workUpdateGroup(action) {
  const { payload } = action;
  try {
    const groupResponse = yield call(updateGroup, payload);
    yield put(updateGroupSuccess(groupResponse.data));
    toast.success("Group updated successfully!");
  } catch (error) {
    yield put(updateGroupFailure(error));
    toast.error("Failed to update group!");
  }
}

// Delete Group
function* workDeleteGroup(action) {
  try {
    const response = yield call(deleteGroup, action.payload);
    const fetchGroups = yield call(getGroups);
    yield put(fetchGroupsSuccess(fetchGroups.data));
    yield put(deleteGroupSuccess(response.data));
    toast.success("Group deleted successfully!");
  } catch (error) {
    yield put(deleteGroupFailure(error));
    toast.error("Failed to delete group!");
  }
}

export default function* watchFetchGroupSaga() {
  yield takeEvery(CREATE_GROUP, workCreateGroup);
  yield takeEvery(FETCH_GROUPS, workFetchGroups);
  yield takeEvery(FETCH_GROUP, workFetchGroup);
  yield takeEvery(UPDATE_GROUP, workUpdateGroup);
  yield takeEvery(DELETE_GROUP, workDeleteGroup);
  yield takeEvery(LIST_GROUPS, workListGroups);
}
