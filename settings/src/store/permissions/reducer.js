import {
  FETCH_PERMISSIONS,
  FETCH_PERMISSIONS_SUCCESS,
  FETCH_PERMISSIONS_FAILURE,
} from "./actionTypes";

const initialState = {
  permissions: [],
  message: "",
  error: false,
  loading: false,
};

const PermissionReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch Permissions
    case FETCH_PERMISSIONS:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case FETCH_PERMISSIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        permissions: action.payload,
      };

    case FETCH_PERMISSIONS_FAILURE:
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

export default PermissionReducer;
