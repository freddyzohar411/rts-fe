import { Axios } from "@workspace/common";

import {
  GET_ALLREVENUE_DATA,
  GET_MONTHREVENUE_DATA,
  GET_HALFYEARREVENUE_DATA,
  GET_YEARREVENUE_DATA,
  BASE_DASHBOARD,
} from "./url_helper";
import { DASHBOARD_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () => api.get(GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(GET_YEARREVENUE_DATA);

// Dashboard Jobs count
export const newJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/newjobs`);

export const activeJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/activejobs`);

export const inactiveJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/inactivejobs`);

export const closedJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/closedjobs`);

export const assignedJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/assignedjobs`);

export const fodJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/fod`);

export const allJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/alljobs`);

export const totalAssignedJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/totalassignedjobs`);

export const totalFODJobsCount = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/totalfodjobs`);
