import {
  FETCH_USERGROUP,
  FETCH_USERGROUP_SUCCESS,
  FETCH_USERGROUP_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./actionTypes";

export const fetchUserGroup = () => ({
  type: FETCH_USERGROUP,
});

export const fetchUserGroupSuccess = (usergroups) => ({
  type: FETCH_USERGROUP_SUCCESS,
  payload: usergroups,
});

export const fetchUserGroupFailure = (error) => ({
  type: FETCH_USERGROUP_FAILURE,
  payload: error,
});

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
