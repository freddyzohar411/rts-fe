import * as configURL from "../config";
import * as baseURL from "../baseUrl";
import {
  GEO_COUNTRY_CURRENCY_URL,
  GEO_BUSINESS_COUNTRIES_URL,
  INDUSTRY_PARENT_URL,
  INDUSTRY_SUB_URL,
  DEPARTMENT_BASE_URL,
  GEO_CITIES_URL,
  GEO_STATES_URL,
} from "../endpoint";

// import { Axios } from "@workspace/common";
// const { APIClient } = Axios;
import { APIClient } from "../helpers/api_helper";

const api = new APIClient();

// Account microservice
// Get parent company
export const getAccountNamesFromUser = () =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`);

// Geo Microservice
export const getCountryCurrency = () => api.get(GEO_COUNTRY_CURRENCY_URL);
export const getBusinessCountries = () => api.get(GEO_BUSINESS_COUNTRIES_URL);
export const getCities = (countryId) => api.get(GEO_CITIES_URL(countryId));
export const getStates = (countryId) => api.get(GEO_STATES_URL(countryId));

// Industry Microservice
export const getParentIndustries = () => api.get(INDUSTRY_PARENT_URL);
export const getSubIndustries = (parentId) =>
  api.get(INDUSTRY_SUB_URL(parentId));

// Department Microservice
export const getDepartments = () => api.get(DEPARTMENT_BASE_URL);

// UserGroup Microservice
export const getUserGroup = () =>
  api.get(`${configURL.GROUP_URL}/${baseURL.USERGROUP}`);

// User Microservice
export const getUsers = () => api.get(`${configURL.API_URL}/${baseURL.USER}`);

// Account Names Microservice
export const getAccountNames = () =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`);

// Account Contacts Microservice
export const getAccountContacts = (input) =>
  api.get(
    `${configURL.CONTACT_URL}/${baseURL.CONTACTS}/entity/${input.entityType}/${input.entityId}`
  );

export const getAccountNamesAll = () =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names-all`);

export const getAccountById = (id) =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/${id}/data`);

// Form Microservice
export const getFormCategories = () =>
  api.get(`${configURL.FORM_URL}/${baseURL.FORM}/categories`);

export const getFormsByCategories = (category) =>
  api.get(`${configURL.FORM_URL}/${baseURL.FORM}/categories/${category}`);

// Common Microservice

// Email
export const sendEmail = (data, config) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.EMAIL}/sendingEmail`,
    data,
    config
  );

// Refresh token
export const refreshToken = (data) =>
  api.get(`${configURL.API_URL}/${baseURL.USER}/refreshToken`, data);

// Document Conversion

// Html string to pdf
export const convertHtmlStringToPdf = (data) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/htmlString-to-pdf`,
    data
  );

// Html string to docx
export const convertHtmlStringToDocx = (data) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/htmlString-to-docx`,
    data
  );

// Docx to HTML string
export const convertDocxToHtmlString = (
  data,
  config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/docx-to-htmlString`,
    data,
    config
  );

// Excel to HTML string
export const convertExcelToHtmlString = (
  data,
  config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/xlsx-to-htmlString`,
    data,
    config
  );

// HTML to Jpeg
export const convertHtmlStringToJpeg = (data) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/htmlString-to-jpeg`,
    data
  );

// HTML to Png
export const convertHtmlStringToPng = (data) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/htmlString-to-png`,
    data
  );

// Convert Ms Doc to Pdf
export const convertMsDocToPdf = (data) =>
  api.create(
    `${configURL.COMMON_URL}/${baseURL.DOCUMENT_CONVERSION}/convert/ms-pdf`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

// Get Templates by category
export const getTemplatesByCategory = (category) =>
  api.get(`${configURL.COMMON_URL}/${baseURL.TEMPLATE}/categories/${category}`);

export const getTemplatesByCategoryAndSubCategory = (category, subCategory) =>
  api.get(
    `${configURL.COMMON_URL}/${baseURL.TEMPLATE}/categories/${category}/sub-category/${subCategory}`
  );

// Document Microservice
// Return a document encoded in base64 string for download
export const downloadDocumentById = (documentId) =>
  api.get(
    `${configURL.DOCUMENT_URL}/${baseURL.DOCUMENTS}/download/${documentId}`
  );

// Return a document encoded in base64 string for download based on entity type and entity id
export const downloadDocumentByEntityAndId = (entityInfo) =>
  api.get(
    `${configURL.DOCUMENT_URL}/${baseURL.DOCUMENTS}/download/entity/${entityInfo?.entityType}/${entityInfo?.entityId}`
  );
