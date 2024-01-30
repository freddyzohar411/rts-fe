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
    yield put(createGroupSuccess(groupResponse));
    toast.success(groupResponse?.message);
  } catch (error) {
    yield put(createGroupFailure(error?.data));
  }
}

// Update Group
function* workUpdateGroup(action) {
  const { payload } = action;
  try {
    const groupResponse = yield call(updateGroup, payload);
    yield put(updateGroupSuccess(groupResponse));
    toast.success(groupResponse?.message);
  } catch (error) {
    yield put(updateGroupFailure(error));
  }
}

// Delete Group
function* workDeleteGroup(action) {
  try {
    const groupResponse = yield call(deleteGroup, action.payload);
    yield put(deleteGroupSuccess(groupResponse));
    toast.success(groupResponse?.message);
  } catch (error) {
    yield put(deleteGroupFailure(error));
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
