import {
  CREATE_CUSTOM_VIEW,
  CREATE_CUSTOM_VIEW_SUCCESS,
  CREATE_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

const initialState = {
  customView: {},
  customViews: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const CustomViewReducer = (state = initialState, action) => {
  switch (action.type) {
    // create custom view
    case CREATE_CUSTOM_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case CREATE_CUSTOM_VIEW_SUCCESS:
      return {
        loading: false,
        customView: action.payload,
      };
    case CREATE_CUSTOM_VIEW_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default CustomViewReducer;
