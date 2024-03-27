import { Axios } from "@workspace/common";

import {
  BASE_FORMS,
  BASE_CANDIDATES,
  BASE_DOCUMENTS,
  BASE_CANDIDATE_WORK_EXPERIENCE,
  BASE_CANDIDATE_EDUCATION_DETAILS,
  BASE_CERTIFICATE,
  BASE_LANGUAGES,
  BASE_EMPLOYER_DETAILS,
  BASE_RESUME_PARSING,
  BASE_CANDIDATE_CUSTOM_VIEW,
} from "./url_helper";

import {
  CANDIDATE_URL,
  DOCUMENT_URL,
  FORM_URL,
  CANDIDATE_WORK_EXPERIENCE_URL,
  CANDIDATE_EDUCATION_DETAILS_URL,
  CANDIDATE_CERTIFICATE_URL,
  CANDIDATE_LANGUAGES_URL,
  CANDIDATE_EMPLOYER_DETAILS_URL,
  COMMON_URL,
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
 * Candidate
 */
// Create a new candidate
export const createCandidate = (entity, id, data, config) =>
  api.create(`${generateCandidateModuleURL(entity, id)}/add`, data, config);

// Create candidate List
export const createCandidateList = (entity, id, data, config) =>
  api.create(
    `${generateCandidateModuleURL(entity, id)}/add/list`,
    data,
    config
  );

// Update an candidate
export const updateCandidate = (entity, id, data, config) =>
  api.put(`${candidateModuleURL[entity]}/${id}`, data, config);

// Get candidate by id
export const getCandidateById = (id) =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}`);

// Delete an candidate
export const deleteCandidate = (id) =>
  api.delete(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}`);

// Get draft candidate
export const getDraftCandidate = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft`);

// Delete draft candidate by id
export const deleteDraftCandidateById = (id) =>
  api.delete(`${CANDIDATE_URL}${BASE_CANDIDATES}/draft/${id}`);

// Complete candidate registration (Set draft status to false)
export const completeCandidateRegistration = (id) =>
  api.put(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}/complete`);

// Candidate Documents
export const DOCUMENT_BASE_URL = `${DOCUMENT_URL}${BASE_DOCUMENTS}`;
export const DOCUMENT_BY_ID_URL = (id) => `${DOCUMENT_BASE_URL}/${id}`;
export const GET_DOCUMENT_BY_ENTITY_URL = (entityType, entityId) =>
  `${DOCUMENT_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate work experience
export const CANDIDATE_WORK_EXPERIENCE_BASE_URL = `${CANDIDATE_WORK_EXPERIENCE_URL}${BASE_CANDIDATE_WORK_EXPERIENCE}`;
export const GET_CANDIDATE_WORK_EXPERIENCE_BY_ENTITY_URL = (
  entityType,
  entityId
) => `${CANDIDATE_WORK_EXPERIENCE_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate education details
export const CANDIDATE_EDUCATION_DETAILS_BASE_URL = `${CANDIDATE_EDUCATION_DETAILS_URL}${BASE_CANDIDATE_EDUCATION_DETAILS}`;
export const GET_CANDIDATE_EDUCATION_DETAILS_BY_ENTITY_URL = (
  entityType,
  entityId
) => `${CANDIDATE_EDUCATION_DETAILS_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate certificate
export const CANDIDATE_CERTIFICATE_BASE_URL = `${CANDIDATE_CERTIFICATE_URL}${BASE_CERTIFICATE}`;
export const GET_CANDIDATE_CERTIFICATE_BY_ENTITY_URL = (entityType, entityId) =>
  `${CANDIDATE_CERTIFICATE_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate languages
export const CANDIDATE_LANGUAGES_BASE_URL = `${CANDIDATE_LANGUAGES_URL}${BASE_LANGUAGES}`;
export const GET_CANDIDATE_LANGUAGES_BY_ENTITY_URL = (entityType, entityId) =>
  `${CANDIDATE_LANGUAGES_BASE_URL}/entity/${entityType}/${entityId}`;

// Candidate employer details
export const CANDIDATE_EMPLOYER_DETAILS_BASE_URL = `${CANDIDATE_EMPLOYER_DETAILS_URL}${BASE_EMPLOYER_DETAILS}`;
export const GET_CANDIDATE_EMPLOYER_DETAILS_BY_ENTITY_URL = (
  entityType,
  entityId
) => `${CANDIDATE_EMPLOYER_DETAILS_BASE_URL}/entity/${entityType}/${entityId}`;

// Get candidate data by Id
export const getCandidateDataById = (id) =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/${id}/data/all`);

// Get candidate field All
export const getCandidateFieldAll = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/fields/all`);

// Admin
// Get candidates
export const getCandidatesAdmin = (data) =>
  api.create(`${CANDIDATE_URL}${BASE_CANDIDATES}/listing/all`, data);

// Candidate Mapping
// Get candidate mapping
export const getCandidateMapping = () =>
  api.get(`${CANDIDATE_URL}${BASE_CANDIDATES}/mapping/get`);

// Post candidate mapping
export const postCandidateMapping = (data) =>
  api.create(`${CANDIDATE_URL}${BASE_CANDIDATES}/mapping/save`, data);

// Get candidate form Id Map
export const getCandidateFormIdMap = (data) =>
  api.create(`${FORM_URL}${BASE_FORMS}/formname/idmap`, data);

// Resume Parsing
export const parseResumeMulti = (data, config) =>
  api.create(
    `${COMMON_URL}${BASE_RESUME_PARSING}/parse-normal/multi`,
    data,
    config
  );

// Create Custom View
export const createCandidateCustomView = (data) =>
  api.create(`${BASE_CANDIDATE_CUSTOM_VIEW}/save/customfields`, data);
