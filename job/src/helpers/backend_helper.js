import { Axios } from "@workspace/common";
import {
  GET_JOBS
} from "./url_helper";
import { JOB_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Jobs
export const getJobs = (data) => api.get(`${JOB_URL}${GET_JOBS}`, data);
