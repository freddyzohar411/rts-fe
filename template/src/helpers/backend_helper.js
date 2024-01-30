import { BASE_TEMPLATE, BASE_MEDIA } from "./url_helper";
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
export const getTemplates = (data) =>
  api.create(`${COMMON_URL}${BASE_TEMPLATE}/listing`, data);

// Get Template Categories
export const getTemplateCategories = () =>
  api.get(`${COMMON_URL}${BASE_TEMPLATE}/categories`);

// Get Templates by category
export const getTemplatesByCategory = (category) =>
  api.get(`${COMMON_URL}${BASE_TEMPLATE}/categories/${category}`);

// URL
export const addMediaUrl = () => `${COMMON_URL}${BASE_MEDIA}/add`;

export const deleteDraftMediaUrl = () =>
  `${COMMON_URL}${BASE_MEDIA}/delete/user-draft`;

export const deleteMediaUrls = () => `${COMMON_URL}${BASE_MEDIA}/delete`;
