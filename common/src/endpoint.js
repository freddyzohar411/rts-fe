import * as configURL from "./config";
import * as baseURL from "./baseUrl";
import { country } from "./common/data";

// Geo Service endpoints
export const GEO_BASE_URL = `${configURL.GEO_URL}/${baseURL.GEO}`;
export const GEO_COUNTRY_CURRENCY_URL = `${GEO_BASE_URL}/country-currency`;
export const GEO_BUSINESS_COUNTRIES_URL = `${GEO_BASE_URL}/offer-country`;
export const GEO_CITIES_URL = (countryId) =>
  `${GEO_BASE_URL}/cities/country/${countryId}`;

// Industry Service endpoints
export const INDUSTRY_BASE_URL = `${configURL.INDUSTRY_URL}/${baseURL.INDUSTRY}`;
export const INDUSTRY_PARENT_URL = `${INDUSTRY_BASE_URL}/parent`;
export const INDUSTRY_SUB_URL = (parentId) =>
  `${INDUSTRY_BASE_URL}/${parentId}/sub`;

// Department Service endpoints
export const DEPARTMENT_BASE_URL = `${configURL.DEPARTMENT_URL}/${baseURL.DEPARTMENT}`;

// Document Service endpoints
export const DOCUMENT_BY_ID_URL = (documentId) =>
  `${configURL.DOCUMENT_URL}/${baseURL.DOCUMENTS}/${documentId}`;
export const DOCUMENTS_BY_ENTITY_URL = (entityId, entityType) =>
  `${configURL.DOCUMENT_URL}/${baseURL.DOCUMENTS}/entity/${entityId}/${entityType}`;

// Template Service endpoints

// Get Template Categories
export const getTemplateCategories = () =>
  `${configURL.COMMON_URL}${baseURL.TEMPLATE}/categories`;

// Get Templates by category
export const getTemplatesByCategory = (category) =>
  `${configURL.COMMON_URL}${baseURL.TEMPLATE}/categories/${category}`;
