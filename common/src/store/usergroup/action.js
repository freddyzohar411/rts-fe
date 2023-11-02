import {
  FETCH_USERGROUP,
  FETCH_USERGROUP_SUCCESS,
  FETCH_USERGROUP_FAILURE,
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
