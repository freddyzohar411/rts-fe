import {
  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAILURE,
  FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
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

const initialState = {
  group: {},
  groups: [],
  message: "",
  success: false,
  loading: false,
  error: false,
};

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    // Create Group
    case CREATE_GROUP:
      return {
        ...state,
        success: false,
        loading: true,
        error: false,
      };

    case CREATE_GROUP_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        error: false,
        message: action.payload,
      };

    case CREATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Fetch Groups
    case FETCH_GROUPS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload,
      };

    case FETCH_GROUPS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Fetch Group
    case FETCH_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
      };

    case FETCH_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Update Group
    case UPDATE_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case UPDATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
      };

    case UPDATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        message: action.payload,
      };

    // Delete Group
    case DELETE_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case DELETE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        group: action.payload,
      };

    case DELETE_GROUP_FAILURE:
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

export default GroupReducer;
