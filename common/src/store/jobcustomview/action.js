import {
    CREATE_JOB_CUSTOM_VIEW,
    CREATE_JOB_CUSTOM_VIEW_SUCCESS,
    CREATE_JOB_CUSTOM_VIEW_FAILURE,
    FETCH_JOB_CUSTOM_VIEW,
    FETCH_JOB_CUSTOM_VIEW_SUCCESS,
    FETCH_JOB_CUSTOM_VIEW_FAILURE,
} from "./actionTypes";

// Create a Job Custom View
export const createJobCustomView = (customViewRequest) => ({
    type: CREATE_JOB_CUSTOM_VIEW,
    payload: customViewRequest,
});

export const createJobCustomViewSuccess = (customView) => ({
    type: CREATE_JOB_CUSTOM_VIEW_SUCCESS,
    payload: customView,
});

export const createJobCustomViewFailure = (error) => ({
    type: CREATE_JOB_CUSTOM_VIEW_FAILURE,
    payload: error,
});

// Fetch a Job Custom View
export const fetchJobCustomView = (customViewRequest) => ({
    type: FETCH_JOB_CUSTOM_VIEW,
    payload: customViewRequest,
});

export const fetchJobCustomViewSuccess = (customView) => ({
    type: FETCH_JOB_CUSTOM_VIEW_SUCCESS,
    payload: customView,
});

export const fetchJobCustomViewFailure = (error) => ({
    type: FETCH_JOB_CUSTOM_VIEW_FAILURE,
    payload: error,
});

