import {
  // Fetch User
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  // Fetch Users
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  // Create
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
  // Delete
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  // Update
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "./actionTypes";

const initialState = {
  user: {},
  users: [],
  message: "",
  loading: false,
  error: false,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch User
    case FETCH_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Fetch Users
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Create User
    case CREATE_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_USER_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    case UPDATE_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
