import { Axios } from "@workspace/common";
import { GET_JOBS, CREATE_JOB, CREATE_DOCUMENT } from "./url_helper";
import { JOB_URL, DOCUMENT_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Jobs
export const getJobs = (data) => api.get(`${JOB_URL}${GET_JOBS}`, data);
export const createJob = (data) => api.create(`${JOB_URL}${CREATE_JOB}`, data);

// Create Document
export const createDocument = (data, config) =>
  api.create(`${DOCUMENT_URL}${CREATE_DOCUMENT}`, data, config);
