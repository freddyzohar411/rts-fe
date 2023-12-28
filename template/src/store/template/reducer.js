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
import { JsonHelper } from "@workspace/common";

const initialState = {
  templates: [],
  template: null,
  errorMsg: "",
  loading: false,
  error: false,
};

const TemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch templates
    case FETCH_TEMPLATES:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_TEMPLATES_SUCCESS:
      return {
        ...state,
        loading: false,
        templates: action.payload,
      };
    case FETCH_TEMPLATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Fetch Template by id
    case FETCH_TEMPLATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case FETCH_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        template: action.payload,
      };
    case FETCH_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Delete template by id
    case DELETE_TEMPLATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case DELETE_TEMPLATE_SUCCESS:
      // Let filter away the deleted template from templates
      const newTemplates = JSON.parse(JSON.stringify(state.templates));
      const templatesData = newTemplates.templates.filter(
        (template) => parseInt(template.id) !== action.payload
      );
      newTemplates.templates = templatesData;
      return {
        ...state,
        loading: false,
        templates: newTemplates,
      };
    case DELETE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Create a template
    case CREATE_TEMPLATE:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case CREATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        template: null,
      };

    case CREATE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };

    // Update a template
    case UPDATE_TEMPLATE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case UPDATE_TEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        template: null,
      };
    case UPDATE_TEMPLATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case CLEAR_TEMPLATE:
      return {
        ...state,
        template: null,
      };
    default:
      return state;
  }
};

export default TemplateReducer;
