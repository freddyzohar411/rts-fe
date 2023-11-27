import * as configURL from "../config";
import * as baseURL from "../baseUrl";
import {
  GEO_COUNTRY_CURRENCY_URL,
  GEO_BUSINESS_COUNTRIES_URL,
  INDUSTRY_PARENT_URL,
  INDUSTRY_SUB_URL,
  DEPARTMENT_BASE_URL,
  GEO_CITIES_URL,
} from "../endpoint";

import { Axios } from "@workspace/common";
const { APIClient } = Axios;

const api = new APIClient();

// Account microservice
// Get parent company
export const getAccountNamesFromUser = () =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`);

// Geo Microservice
export const getCountryCurrency = () => api.get(GEO_COUNTRY_CURRENCY_URL);
export const getBusinessCountries = () => api.get(GEO_BUSINESS_COUNTRIES_URL);
export const getCities = (countryId) => api.get(GEO_CITIES_URL(countryId));

// Industry Microservice
export const getParentIndustries = () => api.get(INDUSTRY_PARENT_URL);
export const getSubIndustries = (parentId) =>
  api.get(INDUSTRY_SUB_URL(parentId));

// Department Microservice
export const getDepartments = () => api.get(DEPARTMENT_BASE_URL);

// UserGroup Microservice
export const getUserGroup = () =>
  api.get(`${configURL.GROUP_URL}/${baseURL.USERGROUP}`);

// Account Names Microservice
export const getAccountNames = () =>
  api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`);

// Account Contacts Microservice
export const getAccountContacts = (input) =>
  api.get(
    `${configURL.CONTACT_URL}/${baseURL.CONTACTS}/entity/${input.entityType}/${input.entityId}`
  );
