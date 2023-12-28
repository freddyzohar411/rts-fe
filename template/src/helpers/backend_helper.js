import { BASE_TEMPLATE } from "./url_helper";
import { COMMON_URL } from "@workspace/common/src/config";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

// Create Template
export const createTemplate = (data) =>
  api.create(`${COMMON_URL}${BASE_TEMPLATE}/add`, data);

// Update Template
export const updateTemplateById = (templateId, data) =>
  api.put(`${COMMON_URL}${BASE_TEMPLATE}/update/${templateId}`, data);

// Get Template by id
export const getTemplateById = (templateId) =>
  api.get(`${COMMON_URL}${BASE_TEMPLATE}/get/${templateId}`);

// Delete Template by id
export const deleteTemplateById = (templateId) =>
  api.delete(`${COMMON_URL}${BASE_TEMPLATE}/delete/${templateId}`);

// Get Templates
export const getTemplates = (data) => api.create(`${COMMON_URL}${BASE_TEMPLATE}/listing`, data);