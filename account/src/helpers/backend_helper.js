import { Axios } from "@workspace/common";
import axios from "axios";

import {
  GET_ACCOUNTS
} from "./url_helper";

import { ACCOUNT_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Accounts
export const getAccounts = (data) => api.get(`${ACCOUNT_URL}${GET_ACCOUNTS}`, data);





// // Gets the logged in user data from local session
// export const getLoggedInUser = () => {
//   const user = localStorage.getItem("user");
//   if (user) return JSON.parse(user);
//   return null;
// };

// // //is user is logged in
// export const isUserAuthenticated = () => {
//   return getLoggedInUser() !== null;
// };

// // Login Method
// export const postLogin = (data) => api.create(POST_LOGIN, data);

// // Logout Method
// export const getLogout = (data) => api.get(GET_LOGOUT, data);

// // postForgetPwd
// export const postForgetPwd = (data) => api.create(POST_PASSWORD_FORGET, data);

// // is user is logged in
// export const getValidate = (data) => api.get(GET_VALIDATE, data);
