import { Axios } from "@workspace/common";

import {
  BASE_FORMS,
  BASE_CANDIDATES,
} from "./url_helper";

import {
  CANDIDATE_URL,
  DOCUMENT_URL,
  FORM_URL,
} from "@workspace/common/src/config";

import { generateCandidateModuleURL, candidateModuleURL } from "./constant";

const { APIClient } = Axios;

const api = new APIClient();

// Get Accounts Fields
export const getCandidatesFields = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/fields`);

// Get Accounts
export const getCandidates = (data) =>
  api.create(`${CANDIDATE_URL}${BASE_CANDIDATES}/listing`, data);

// Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${BASE_FORMS}/${id}`);

//Get Form by formname
export const getFormByFormName = (formName) =>
  api.get(`${FORM_URL}${BASE_FORMS}/name/${formName}`);

/**
 * Account_account
 */
// Create a new account
export const createCandidate = (entity, id, data, config) =>
  api.create(generateCandidateModuleURL(entity, id), data, config);

// Update an account
export const updateCandidate = (entity, id, data, config) =>
  api.put(`${candidateModuleURL[entity]}/${id}`, data, config);

// Get account by id
export const getCandidateById = (id) =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}`);

// Delete an account
export const deleteCandidate = (id) =>
  api.delete(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}`);

// Get account Instruction by id
// export const getAccountInstructionById = (id) =>
//   api.get(
//     `${ACCOUNT_INSTRUCTION_URL}${BASE_CLIENT_INSTRUCTIONS}/entity/account_instruction/${id}`
//   );

// Get draft account
export const getDraftCandidate = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft`);

// Delete draft account by id
export const deleteDraftCandidateById = (id) =>
  api.delete(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft/${id}`);

