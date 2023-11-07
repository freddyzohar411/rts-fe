import {
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
  LIST_GROUPS,
  LIST_GROUPS_SUCCESS,
  LIST_GROUPS_FAILURE,
  FETCH_GROUP,
  FETCH_GROUP_SUCCESS,
  FETCH_GROUP_FAILURE,
  UPDATE_GROUP,
  UPDATE_GROUP_SUCCESS,
  UPDATE_GROUP_FAILURE,
  DELETE_GROUP,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE,
} from "./actionTypes";

// Create Group
export const createGroup = (groupRequest) => ({
  type: CREATE_GROUP,
  payload: groupRequest,
});

export const createGroupSuccess = (group) => ({
  type: CREATE_GROUP_SUCCESS,
  payload: group,
});

export const createGroupFailure = (error) => ({
  type: CREATE_GROUP_FAILURE,
  payload: error,
});

// Fetch Groups
export const fetchGroups = () => ({
  type: FETCH_GROUPS,
});

export const fetchGroupsSuccess = (groups) => ({
  type: FETCH_GROUPS_SUCCESS,
  payload: groups,
});

export const fetchGroupsFailure = (error) => ({
  type: FETCH_GROUPS_FAILURE,
  payload: error,
});

// List Groups
export const listGroups = (groupRequest) => ({
  type: LIST_GROUPS,
  payload: groupRequest,
});

export const listGroupsSuccess = (groupListing) => ({
  type: LIST_GROUPS_SUCCESS,
  payload: groupListing,
});

export const listGroupsFailure = (error) => ({
  type: LIST_GROUPS_FAILURE,
  payload: error,
});

// Fetch Group
export const fetchGroup = (groupId) => ({
  type: FETCH_GROUP,
  payload: groupId,
});

export const fetchGroupSuccess = (group) => ({
  type: FETCH_GROUP_SUCCESS,
  payload: group,
});

export const fetchGroupFailure = (error) => ({
  type: FETCH_GROUP_FAILURE,
  payload: error,
});

// Update Group
export const updateGroup = (groupRequest) => ({
  type: UPDATE_GROUP,
  payload: groupRequest,
});

export const updateGroupSuccess = (group) => ({
  type: UPDATE_GROUP_SUCCESS,
  payload: group,
});

export const updateGroupFailure = (error) => ({
  type: UPDATE_GROUP_FAILURE,
  payload: error,
});

// Delete Group
export const deleteGroup = (group) => ({
  type: DELETE_GROUP,
  payload: group,
});

export const deleteGroupSuccess = () => ({
  type: DELETE_GROUP_SUCCESS,
});

export const deleteGroupFailure = (error) => ({
  type: DELETE_GROUP_FAILURE,
  payload: error,
});
