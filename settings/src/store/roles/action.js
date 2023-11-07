import {
  CREATE_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  LIST_ROLES, LIST_ROLES_SUCCESS, LIST_ROLES_FAILURE,
  FETCH_ROLES,
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  FETCH_ROLE,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_FAILURE,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAILURE,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILURE,
} from "./actionTypes";

// Create Role
export const createRole = (roleRequest) => ({
  type: CREATE_ROLE,
  payload: roleRequest,
});

export const createRoleSuccess = (role) => ({
  type: CREATE_ROLE_SUCCESS,
  payload: role,
});

export const createRoleFailure = (error) => ({
  type: CREATE_ROLE_FAILURE,
  payload: error,
});

// List Roles
export const listRoles = (roleRequest) => ({
  type: LIST_ROLES,
  payload: roleRequest,
});

export const listRolesSuccess = (roles) => ({ 
  type: LIST_ROLES_SUCCESS,
  payload: roles,
});

export const listRolesFailure = (error) => ({
  type: LIST_ROLES_FAILURE,
  payload: error,
});

// Fetch Roles
export const fetchRoles = () => ({
  type: FETCH_ROLES,
});

export const fetchRolesSuccess = (roles) => ({
  type: FETCH_ROLES_SUCCESS,
  payload: roles,
});

export const fetchRolesFailure = (error) => ({
  type: FETCH_ROLES_FAILURE,
  payload: error,
});

// Fetch Role
export const fetchRole = (roleId) => ({
  type: FETCH_ROLE,
  payload: roleId,
});

export const fetchRoleSuccess = (role) => ({
  type: FETCH_ROLE_SUCCESS,
  payload: role,
});

export const fetchRoleFailure = (error) => ({
  type: FETCH_ROLE_FAILURE,
  payload: error,
});

// Update Role
export const updateRole = (roleRequest) => ({
  type: UPDATE_ROLE,
  payload: roleRequest,
});

export const updateRoleSuccess = (role) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload: role,
});

export const updateRoleFailure = (error) => ({
  type: UPDATE_ROLE_FAILURE,
  payload: error,
});

// Delete Role
export const deleteRole = (role) => ({
  type: DELETE_ROLE,
  payload: role,
});

export const deleteRoleSuccess = () => ({
  type: DELETE_ROLE_SUCCESS,
});

export const deleteRoleFailure = (error) => ({
  type: DELETE_ROLE_FAILURE,
  payload: error,
});
