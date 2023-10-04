import { Axios } from "@workspace/common";
import { GET_FORMS } from "./url_helper";
import { FORM_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Forms
export const getForms = (data) => api.get(`${FORM_URL}${GET_FORMS}`, data);

// Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${GET_FORMS}/${id}`);

// Delete Form by id
export const deleteFormById = (id) => api.delete(`${FORM_URL}${GET_FORMS}/${id}`);

