import {
  FETCH_INDUSTRY,
  FETCH_INDUSTRY_SUCCESS,
  FETCH_INDUSTRY_FAILURE,
  FETCH_SUBINDUSTRY,
  FETCH_SUBINDUSTRY_SUCCESS,
  FETCH_SUBINDUSTRY_FAILURE
} from "./actionTypes";

// Fetch Industry (Parent)
export const fetchIndustry = () => ({
    type: FETCH_INDUSTRY,
})

export const fetchIndustrySuccess = (industry) => ({
    type: FETCH_INDUSTRY_SUCCESS,
    payload: industry,
})

export const fetchIndustryFailure = (error) => ({
    type: FETCH_INDUSTRY_FAILURE,
    payload: error,
})


// Fetch Sub Industry (Children)
export const fetchSubIndustry = (industryId) => ({
    type: FETCH_SUBINDUSTRY,
    payload: industryId,
})

export const fetchSubIndustrySuccess = (subIndustry) => ({
    type: FETCH_SUBINDUSTRY_SUCCESS,
    payload: subIndustry,
})

export const fetchSubIndustryFailure = (error) => ({
    type: FETCH_SUBINDUSTRY_FAILURE,
    payload: error,
})