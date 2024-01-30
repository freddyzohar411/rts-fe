import {
FETCH_FORMCATEGORIES,
FETCH_FORMCATEGORIES_SUCCESS,
FETCH_FORMCATEGORIES_FAILURE,
FETCH_FORMS_BY_CATEGORY,
FETCH_FORMS_BY_CATEGORY_SUCCESS,
FETCH_FORMS_BY_CATEGORY_FAILURE,
} from "./actionTypes";

export const fetchFormCategories = () => ({
  type: FETCH_FORMCATEGORIES,
});

export const fetchFormCategoriesSuccess = (formCategories) => ({
  type: FETCH_FORMCATEGORIES_SUCCESS,
  payload: formCategories,
});

export const fetchFormCategoriesFailure = (error) => ({
  type: FETCH_FORMCATEGORIES_FAILURE,
  payload: error,
});

export const fetchFormsByCategory = (category) => ({
  type: FETCH_FORMS_BY_CATEGORY,
  payload: category,
});

export const fetchFormsByCategorySuccess = (formsByCategories) => ({
  type: FETCH_FORMS_BY_CATEGORY_SUCCESS,
  payload: formsByCategories,
});

export const fetchFormsByCategoryFailure = (error) => ({
  type: FETCH_FORMS_BY_CATEGORY_FAILURE,
  payload: error,
});
  
