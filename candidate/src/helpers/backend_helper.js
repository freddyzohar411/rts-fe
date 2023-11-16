import { Axios } from "@workspace/common";

import {
  BASE_FORMS,
  BASE_CANDIDATES,
  BASE_DOCUMENTS,
  BASE_CANDIDATE_WORK_EXPERIENCE,
  BASE_CANDIDATE_EDUCATION_DETAILS,
} from "./url_helper";

import {
  CANDIDATE_URL,
  DOCUMENT_URL,
  FORM_URL,
  CANDIDATE_WORK_EXPERIENCE_URL,
  CANDIDATE_EDUCATION_DETAILS_URL,
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

// Get draft account
export const getDraftCandidate = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft`);

// Delete draft account by id
export const deleteDraftCandidateById = (id) =>
  api.delete(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft/${id}`);

// Candidate Documents
export const DOCUMENT_BASE_URL = `${DOCUMENT_URL}${BASE_DOCUMENTS}`;
export const GET_DOCUMENT_BY_ENTITY_URL = (entityType, entityId) =>
  `${DOCUMENT_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate work experience
export const CANDIDATE_WORK_EXPERIENCE_BASE_URL = `${CANDIDATE_WORK_EXPERIENCE_URL}${BASE_CANDIDATE_WORK_EXPERIENCE}`;
export const GET_CANDIDATE_WORK_EXPERIENCE_BY_ENTITY_URL = (entityType, entityId) =>
  `${CANDIDATE_WORK_EXPERIENCE_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate education details
export const CANDIDATE_EDUCATION_DETAILS_BASE_URL = `${CANDIDATE_EDUCATION_DETAILS_URL}${BASE_CANDIDATE_EDUCATION_DETAILS}`;
export const GET_CANDIDATE_EDUCATION_DETAILS_BY_ENTITY_URL = (entityType, entityId) =>
  `${CANDIDATE_EDUCATION_DETAILS_BASE_URL}/entity/${entityType}/${entityId}`;