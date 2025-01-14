import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  LIST_USERS,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAILURE,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CREATE_USERS,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAILURE,
} from "./actionTypes";

// Fetch User
export const fetchUser = (userId) => ({
  type: FETCH_USER,
  payload: userId,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Fetch Users
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

// List Users
export const listUsers = (userRequest) => ({
  type: LIST_USERS,
  payload: userRequest,
});

export const listUsersSuccess = (usersListing) => ({
  type: LIST_USERS_SUCCESS,
  payload: usersListing,
});

export const listUsersFailure = (error) => ({
  type: LIST_USERS_FAILURE,
  payload: error,
});

// Create User
export const createUser = (userRequest) => ({
  type: CREATE_USER,
  payload: userRequest,
});

export const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

export const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

// Create Users
export const createUsers = (userRequests) => ({
  type: CREATE_USERS,
  payload: userRequests,
});

export const createUsersSuccess = (users) => ({
  type: CREATE_USERS_SUCCESS,
  payload: users,
});

export const createUsersFailure = (error) => ({
  type: CREATE_USERS_FAILURE,
  payload: error,
});

// Delete User
export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const deleteUserSuccess = () => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserFailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

// Update User
export const updateUser = (userRequest) => ({
  type: UPDATE_USER,
  payload: userRequest,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});
