import { call, put, takeEvery } from "redux-saga/effects";
import {
  CREATE_GROUP,
  FETCH_GROUPS,
  FETCH_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
} from "./actionTypes";
import {
  createGroupSuccess,
  createGroupFailure,
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
} from "../../helpers/backend_helper";

// Create Group
function* workCreateGroup(action) {
  const { newGroup, navigate } = action.payload;
  try {
    const groupResponse = yield call(createGroup, newGroup);
    yield put(createGroupSuccess(groupResponse.data));
    navigate("/settings/access");
  } catch (error) {
    yield put(createGroupFailure(error));
  }
}

// Fetch Groups
function* workFetchGroups() {
  try {
    const response = yield call(getGroups);
    yield put(fetchGroupsSuccess(response.data));
  } catch (error) {
    yield put(fetchGroupsFailure(error));
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

// Update Group
function* workUpdateGroup(action) {
  const { updatedGroup, navigate } = action.payload;
  try {
    const groupResponse = yield call(updateGroup, updatedGroup);
    yield put(updateGroupSuccess(groupResponse.data));
    navigate("/settings/access");
  } catch (error) {
    yield put(updateGroupFailure(error));
  }
}

// Delete Group
function* workDeleteGroup(action) {
  try {
    const response = yield call(deleteGroup, action.payload);
    const fetchGroups = yield call(getGroups);
    yield put(fetchGroupsSuccess(fetchGroups.data));
    yield put(deleteGroupSuccess(response.data));
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
}
