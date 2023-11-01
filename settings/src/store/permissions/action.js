import { FETCH_PERMISSIONS, FETCH_PERMISSIONS_SUCCESS, FETCH_PERMISSIONS_FAILURE } from "./actionTypes";

// Fetch Permissions
export const fetchPermissions = () => ({
  type: FETCH_PERMISSIONS,
});

export const fetchPermissionsSuccess = (permissions) => ({
  type: FETCH_PERMISSIONS_SUCCESS,
  payload: permissions,
});

export const fetchPermissionsFailure = (error) => ({
  type: FETCH_PERMISSIONS_FAILURE,
  payload: error,
});
