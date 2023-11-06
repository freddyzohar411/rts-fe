import { Axios } from "@workspace/common";
import { GET_FORMS } from "./url_helper";
import { FORM_URL } from "@workspace/common/src/config";
import {
  // User
  GET_USER,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
  GET_USERS,
  LIST_USERS,
  // Roles
  GET_ROLE,
  GET_ROLES,
  CREATE_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
  // Modules
  GET_MODULES,
  // Permissions
  GET_PERMISSIONS,
  GET_USER_GROUP,
} from "./url_helper";
import { API_URL, ACCESS_URL, GROUP_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Forms
export const getForms = (data) => api.get(`${FORM_URL}${GET_FORMS}`, data);

// Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${GET_FORMS}/${id}`);

// Delete Form by id
export const deleteFormById = (id) =>
  api.delete(`${FORM_URL}${GET_FORMS}/${id}`);

// User

// Get User
export const getUser = (data) => api.get(`${API_URL}${GET_USER}/${data}`);
// Get Users
export const getUsers = () => api.get(`${API_URL}${GET_USERS}`);
// Create User
export const createUser = (data) =>
  api.create(`${API_URL}${CREATE_USER}`, data);
// Update User
export const updateUser = (data) => api.put(`${API_URL}${UPDATE_USER}`, data);
// Delete User
export const deleteUser = (data) =>
  api.delete(`${API_URL}${DELETE_USER}/${data}`);
// List Users
export const listUsers = (data) => api.create(`${API_URL}${LIST_USERS}`, data);

// Role

// Get Role
export const getRole = (data) => api.get(`${ACCESS_URL}${GET_ROLE}/${data}`);
// Get Roles
export const getRoles = () => api.get(`${ACCESS_URL}${GET_ROLES}`);
// Create Role
export const createRole = (data) =>
  api.create(`${ACCESS_URL}${CREATE_ROLE}`, data);
// Update Role
export const updateRole = (data) =>
  api.put(`${ACCESS_URL}${UPDATE_ROLE}`, data);
// Delete Role
export const deleteRole = (data) =>
  api.delete(`${ACCESS_URL}${DELETE_ROLE}/${data}`);

// Module
// Get Modules
export const getModules = () => api.get(`${ACCESS_URL}${GET_MODULES}`);

// Permission
// Get Permissions
export const getPermissions = () => api.get(`${ACCESS_URL}${GET_PERMISSIONS}`);

//Group
// Get Group
export const getGroup = (id) => api.get(`${GROUP_URL}${GET_USER_GROUP}/${id}`);
// Get Groups
export const getGroups = () => api.get(`${GROUP_URL}${GET_USER_GROUP}`);
// Create Group
export const createGroup = (data) =>
  api.create(`${GROUP_URL}${GET_USER_GROUP}`, data);
// Update Group
export const updateGroup = (data) =>
  api.put(`${GROUP_URL}${GET_USER_GROUP}`, data);
// Delete Group
export const deleteGroup = (id) =>
  api.delete(`${GROUP_URL}${GET_USER_GROUP}/${id}`);
