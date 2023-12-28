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
