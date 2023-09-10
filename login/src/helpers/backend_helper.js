import { Axios } from "@workspace/common";

import { POST_LOGIN, GET_LOGOUT, POST_PASSWORD_FORGET } from "./url_helper";

const { APIClient } = Axios;

const api = new APIClient();

// Gets the logged in user data from local session
export const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

// //is user is logged in
export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

// Login Method
export const postLogin = (data) => api.create(POST_LOGIN, data);

// Logout Method
export const getLogout = (data) => api.get(GET_LOGOUT, data);

// postForgetPwd
export const postForgetPwd = (data) => api.create(POST_PASSWORD_FORGET, data);
