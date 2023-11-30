import { Axios } from "@workspace/common";
import { BASE_FORMS, BASE_JOBS, CREATE_DOCUMENT } from "./url_helper";
import { JOB_URL, DOCUMENT_URL, FORM_URL } from "@workspace/common/src/config";

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

export const updateJob = (entity, id, data, config) =>
  api.put(`${JOB_URL}${BASE_JOBS}`, data, config);

export const deleteJob = (id) => api.delete(`${JOB_URL}${BASE_JOBS}/${id}`);

export const getJobFields = () => api.get(`${JOB_URL}${BASE_JOBS}/fields`);

// Create Document
export const createDocument = (data, config) =>
  api.create(`${DOCUMENT_URL}${CREATE_DOCUMENT}`, data, config);
