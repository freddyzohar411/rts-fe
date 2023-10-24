import { Axios } from "@workspace/common";
import { GET_USER, CREATE_USER } from "./url_helper";
import { API_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;
const api = new APIClient();

export const getUser = (data) => api.get(`${API_URL}${GET_USER}`, data);
export const createUser = (data) =>
  api.create(`${API_URL}${CREATE_USER}`, data);
