import {
  FETCH_TEMPLATES,
  FETCH_TEMPLATES_SUCCESS,
  FETCH_TEMPLATES_FAILURE,
  FETCH_TEMPLATE,
  FETCH_TEMPLATE_SUCCESS,
  FETCH_TEMPLATE_FAILURE,
  DELETE_TEMPLATE,
  DELETE_TEMPLATE_SUCCESS,
  DELETE_TEMPLATE_FAILURE,
  CREATE_TEMPLATE,
  CREATE_TEMPLATE_SUCCESS,
  CREATE_TEMPLATE_FAILURE,
  UPDATE_TEMPLATE,
  UPDATE_TEMPLATE_SUCCESS,
  UPDATE_TEMPLATE_FAILURE,
  CLEAR_TEMPLATE,
  FETCH_TEMPLATE_CATEGORIES,
  FETCH_TEMPLATE_CATEGORIES_SUCCESS,
  FETCH_TEMPLATE_CATEGORIES_FAILURE,
  FETCH_TEMPLATE_BY_CATEGORY,
  FETCH_TEMPLATE_BY_CATEGORY_SUCCESS,
  FETCH_TEMPLATE_BY_CATEGORY_FAILURE,
  FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY,
  FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY_SUCCESS,
  FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY_FAILURE,
} from "./actionTypes";

// Fetch templates
export const fetchTemplates = (templatePageRequest) => ({
  type: FETCH_TEMPLATES,
  payload: templatePageRequest,
});

export const fetchTemplatesSuccess = (templates) => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: templates,
});

export const fetchTemplatesFailure = (error) => ({
  type: FETCH_TEMPLATES_FAILURE,
  payload: error,
});

// Fetch template by id
export const fetchTemplate = (id) => ({
  type: FETCH_TEMPLATE,
  payload: id,
});

export const fetchTemplateSuccess = (template) => ({
  type: FETCH_TEMPLATE_SUCCESS,
  payload: template,
});

export const fetchTemplateFailure = (error) => ({
  type: FETCH_TEMPLATE_FAILURE,
  payload: error,
});

// Delete Templates
export const deleteTemplate = (id) => ({
  type: DELETE_TEMPLATE,
  payload: id,
});

export const deleteTemplateSuccess = (id) => ({
  type: DELETE_TEMPLATE_SUCCESS,
  payload: id,
});

export const deleteTemplateFailure = (error) => ({
  type: DELETE_TEMPLATE_FAILURE,
  payload: error,
});

// Create Template
export const createTemplate = (templateRequest) => ({
  type: CREATE_TEMPLATE,
  payload: templateRequest,
});

export const createTemplateSuccess = (template) => ({
  type: CREATE_TEMPLATE_SUCCESS,
  payload: template,
});

export const createTemplateFailure = (error) => ({
  type: CREATE_TEMPLATE_FAILURE,
  payload: error,
});

// Update Template
export const updateTemplate = (templateRequest) => ({
  type: UPDATE_TEMPLATE,
  payload: templateRequest,
});

export const updateTemplateSuccess = (template) => ({
  type: UPDATE_TEMPLATE_SUCCESS,
  payload: template,
});

export const updateTemplateFailure = (error) => ({
  type: UPDATE_TEMPLATE_FAILURE,
  payload: error,
});

// Clear Template
export const clearTemplate = () => ({
  type: CLEAR_TEMPLATE,
});

// Fetch template categories
export const fetchTemplateCategories = () => ({
  type: FETCH_TEMPLATE_CATEGORIES,
});

export const fetchTemplateCategoriesSuccess = (templateCategories) => ({
  type: FETCH_TEMPLATE_CATEGORIES_SUCCESS,
  payload: templateCategories,
});

export const fetchTemplateCategoriesFailure = (error) => ({
  type: FETCH_TEMPLATE_CATEGORIES_FAILURE,
  payload: error,
});

// Fetch template by category
export const fetchTemplateByCategory = (category) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY,
  payload: category,
});

export const fetchTemplateByCategorySuccess = (templates) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY_SUCCESS,
  payload: templates,
});

export const fetchTemplateByCategoryFailure = (error) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY_FAILURE,
  payload: error,
});

// Fetch template by category and subcategory
export const fetchTemplateByCategoryAndSubCategory = (category, subCategory) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY,
  payload: { category, subCategory },
});

export const fetchTemplateByCategoryAndSubCategorySuccess = (templates) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY_SUCCESS,
  payload: templates,
});

export const fetchTemplateByCategoryAndSubCategoryFailure = (error) => ({
  type: FETCH_TEMPLATE_BY_CATEGORY_SUBCATEGORY_FAILURE,
  payload: error,
});




