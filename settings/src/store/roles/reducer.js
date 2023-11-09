import {
  CREATE_ROLE,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  LIST_ROLES,
  LIST_ROLES_SUCCESS,
  LIST_ROLES_FAILURE,
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
  REMOVE_ROLE,
} from "./actionTypes";

const initialState = {
  role: {},
  roles: [],
  rolesListing: [],
  message: "",
  loading: false,
  error: false,
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Role
    case CREATE_ROLE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case CREATE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // List Roles
    case LIST_ROLES:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case LIST_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        rolesListing: action.payload,
      };

    case LIST_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Fetch Roles
    case FETCH_ROLES:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
      };

    case FETCH_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Fetch Role
    case FETCH_ROLE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
      };

    case FETCH_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Update Role
    case UPDATE_ROLE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case UPDATE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
      };

    case UPDATE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Delete Role
    case DELETE_ROLE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        role: action.payload,
      };

    case DELETE_ROLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };
    case REMOVE_ROLE:
      return {
        ...state,
        role: null,
      };

    default:
      return state;
  }
};

export default RoleReducer;
