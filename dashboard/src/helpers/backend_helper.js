import { Axios } from "@workspace/common";

import {
  GET_ALLREVENUE_DATA,
  GET_MONTHREVENUE_DATA,
  GET_HALFYEARREVENUE_DATA,
  GET_YEARREVENUE_DATA,
  DASHBOARD_URL,
  BASE_DASHBOARD,
} from "./url_helper";

const { APIClient } = Axios;

const api = new APIClient();

// Dashboard Ecommerce
// Revenue
export const getAllRevenueData = () => api.get(GET_ALLREVENUE_DATA);
export const getMonthRevenueData = () => api.get(GET_MONTHREVENUE_DATA);
export const getHalfYearRevenueData = () => api.get(GET_HALFYEARREVENUE_DATA);
export const getYearRevenueData = () => api.get(GET_YEARREVENUE_DATA);
export const getJobCounts = () =>
  api.get(`${DASHBOARD_URL}${BASE_DASHBOARD}/jobfod`);
