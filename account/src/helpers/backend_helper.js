import { Axios } from "@workspace/common";
// import axios from "axios";

import {
  GET_ACCOUNTS,
  BASE_FORMS,
  BASE_ACCOUNTS,
  BASE_CONTACTS,
  BASE_DOCUMENTS,
  BASE_CLIENT_INSTRUCTIONS,
  BASE_ACCOUNT_ACCESS,
  BASE_COMMERCIAL,
} from "./url_helper";

import {
  ACCOUNT_URL,
  CONTACT_URL,
  DOCUMENT_URL,
  ACCOUNT_INSTRUCTION_URL,
  FORM_URL,
} from "@workspace/common/src/config";

import { generateAccountModuleURL, accountModuleURL } from "./constant";

const { APIClient } = Axios;

const api = new APIClient();

// Get Accounts
export const getAccounts = (data) =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}`, data);

// Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${BASE_FORMS}/${id}`);

//Get Form by formname
export const getFormByFormName = (formName) =>
  api.get(`${FORM_URL}${BASE_FORMS}/name/${formName}`);

/**
 * Account_account
 */
// Create a new account
export const createAccount = (entity, id, data, config) =>
  api.create(generateAccountModuleURL(entity, id), data, config);

// Update an account
export const updateAccount = (entity, id, data, config) =>
  api.put(`${accountModuleURL[entity]}/${id}`, data, config);

// Get account by id
export const getAccountById = (id) =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/${id}`);

// Get account Instruction by id
export const getAccountInstructionById = (id) =>
  api.get(
    `${ACCOUNT_INSTRUCTION_URL}${BASE_CLIENT_INSTRUCTIONS}/entity/account_instruction/${id}`
  );

// export const getAccountNamesFromUser = () => api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/names`);

  // Get account Commercial by id
export const getAccountCommercialById = (id) =>
api.get(
  `${ACCOUNT_URL}${BASE_COMMERCIAL}/${id}`
);