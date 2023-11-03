import { Axios } from "@workspace/common";
import { BASE_FORMS } from "./url_helper";
import { FORM_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Forms
// export const getForms = (data) => api.get(`${FORM_URL}${BASE_FORMS}`, data);
export const getForms = (data) => api.create(`${FORM_URL}${BASE_FORMS}/listing`, data);

// Get Form by id
export const getFormById = (id) => api.get(`${FORM_URL}${BASE_FORMS}/${id}`);

// Delete Form by id
export const deleteFormById = (id) => api.delete(`${FORM_URL}${BASE_FORMS}/${id}`);

// Create Form
export const createForm = (data) => api.create(`${FORM_URL}${BASE_FORMS}`, data);

// Update Form
export const updateFormById = (data, formId) => api.put(`${FORM_URL}${BASE_FORMS}/${formId}`, data);

