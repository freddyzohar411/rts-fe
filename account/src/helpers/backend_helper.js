import { Axios } from "@workspace/common";

import {
  BASE_FORMS,
  BASE_ACCOUNTS,
  BASE_CLIENT_INSTRUCTIONS,
  BASE_COMMERCIAL,
  BASE_ACCOUNT_CUSTOM_VIEW,
} from "./url_helper";

import {
  ACCOUNT_URL,
  ACCOUNT_INSTRUCTION_URL,
  FORM_URL,
} from "@workspace/common/src/config";

import { generateAccountModuleURL, accountModuleURL } from "./constant";

const { APIClient } = Axios;
const api = new APIClient();

// Get Accounts Fields
export const getAccountsFields = () =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/fields`);

// Get Accounts
export const getAccounts = (data) =>
  api.create(`${ACCOUNT_URL}${BASE_ACCOUNTS}/listing`, data);

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
  api.create(`${generateAccountModuleURL(entity, id)}/add`, data, config);

// Update an account
export const updateAccount = (entity, id, data, config) =>
  api.put(`${accountModuleURL[entity]}/${id}`, data, config);

// Get account by id
export const getAccountById = (id) =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/${id}`);

// Delete an account
export const deleteAccount = (id) =>
  api.delete(`${ACCOUNT_URL}${BASE_ACCOUNTS}/${id}`);

// Get account Instruction by id
export const getAccountInstructionById = (id) =>
  api.get(
    `${ACCOUNT_INSTRUCTION_URL}${BASE_CLIENT_INSTRUCTIONS}/entity/account_instruction/${id}`
  );

// Get draft account
export const getDraftAccount = () =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/draft`);

// Delete draft account by id
export const deleteDraftAccountById = (id) =>
  api.delete(`${ACCOUNT_URL}${BASE_ACCOUNTS}/draft/${id}`);

// Get account Commercial by id
export const getAccountCommercialById = (id) =>
  api.get(`${ACCOUNT_URL}${BASE_COMMERCIAL}/${id}`);

// Get account data by Id
export const getAccountDataById = (id) =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/${id}/data/all`);

// Get account fields all
export const getAccountsFieldsAll = () =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNTS}/fields/all`);

// Admin
// Get Accounts
export const getAccountsAdmin = (data) =>
  api.create(`${ACCOUNT_URL}${BASE_ACCOUNTS}/listing/all`, data);

// Create Account Custom View
export const createAccountCustomView = (data) => {
  api.create(
    `${ACCOUNT_URL}${BASE_ACCOUNT_CUSTOM_VIEW}/save/customfields`,
    data
  );
};
// Get All Account Custom View
export const getAllAccountCustomView = () =>
  api.get(`${ACCOUNT_URL}${BASE_ACCOUNT_CUSTOM_VIEW}/customView/all`);

// Update isSelected of Account Custom View
export const selectAccountCustomView = (id) =>
  api.put(`${ACCOUNT_URL}${BASE_ACCOUNT_CUSTOM_VIEW}/customView/update/${id}`);

// Delete Account Custom View
export const deleteAccountCustomView = (id) =>
  api.delete(
    `${ACCOUNT_URL}${BASE_ACCOUNT_CUSTOM_VIEW}/customView/delete/${id}`
  );
