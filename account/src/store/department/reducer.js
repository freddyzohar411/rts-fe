import {
  FETCH_DEPARTMENT,
  FETCH_DEPARTMENT_SUCCESS,
  FETCH_DEPARTMENT_FAILURE,
} from "./actionTypes";

const initialState = {
  department: [],
  errorMsg: "",
  loading: false,
  error: false,
};

const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT:
            return {
                ...state,
                loading: true,
                error: false,
            }
        case FETCH_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                department: action.payload,
            }
        case FETCH_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: true,
                errorMsg: action.payload,
            }
        default:
            return state
    }
};


export default DepartmentReducer;