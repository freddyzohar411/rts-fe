import { Axios } from "@workspace/common";
import axios from "axios";

import { GET_ACCOUNTS, BASE_FORMS  } from "./url_helper";

import { ACCOUNT_URL, FORM_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Accounts
export const getAccounts = (data) =>
  api.get(`${ACCOUNT_URL}${GET_ACCOUNTS}`, data);

  // Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${BASE_FORMS}/${id}`);

//Get Form by formname
export const getFormByFormName = (formName) => api.get(`${FORM_URL}${BASE_FORMS}/name/${formName}`);
