import { Axios } from "@workspace/common";
import {
  BASE_DOCUMENTS,
  BASE_FORMS,
  BASE_JOBS,
  BASE_USER_GROUP,
} from "./url_helper";
import {
  JOB_URL,
  DOCUMENT_URL,
  FORM_URL,
  GROUP_URL,
} from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

//Get Form by formname
export const getFormByFormName = (formName) =>
  api.get(`${FORM_URL}${BASE_FORMS}/name/${formName}`);

// Get Jobs
export const getJobById = (id) => api.get(`${JOB_URL}${BASE_JOBS}/${id}`);

// Get Accounts
export const getJobs = (data) =>
  api.create(`${JOB_URL}${BASE_JOBS}/listing`, data);

export const createJob = (data) => api.create(`${JOB_URL}${BASE_JOBS}`, data);

export const updateJob = (id, data) =>
  api.put(`${JOB_URL}${BASE_JOBS}/${id}`, data);

export const deleteJob = (id) => api.delete(`${JOB_URL}${BASE_JOBS}/${id}`);

export const getJobFields = () => api.get(`${JOB_URL}${BASE_JOBS}/fields`);

export const postJobFOD = (data) =>
  api.create(`${JOB_URL}${BASE_JOBS}/jobfod`, data);

// Get Jobs
export const draftJob = () => api.get(`${JOB_URL}${BASE_JOBS}/draft`);

export const getUserGroupByName = (name) =>
  api.get(`${GROUP_URL}${BASE_USER_GROUP}/name/${name}`);

// Create Job Document

export const DOCUMENT_BASE_URL = `${DOCUMENT_URL}${BASE_DOCUMENTS}`;
export const createJobDocument = (data, config) =>
  api.create(`${DOCUMENT_BASE_URL}`, data, config);

export const updateJobDocument = (id, data, config) =>
  api.put(`${DOCUMENT_BASE_URL}/${id}`, data, config);

export const GET_DOCUMENT_BY_ENTITY_URL = (entityType, entityId) =>
  `${DOCUMENT_BASE_URL}/entity/user/${entityType}/${entityId}`;

  // Get job data by Id
export const getJobDataById = (id) =>
api.get(`${JOB_URL}${BASE_JOBS}/${id}/data`);

