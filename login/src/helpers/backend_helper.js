import { APIClient } from "./api_helper";

import * as url from "./url_helper";

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
export const postLogin = (data) => api.create(url.POST_LOGIN, data);

// Logout Method
export const getLogout = (data) => api.get(url.GET_LOGOUT, data);

// postForgetPwd
export const postForgetPwd = (data) =>
  api.create(url.POST_PASSWORD_FORGET, data);

// Register Method
export const postJwtRegister = (url, data) => {
  return api.create(url, data).catch((err) => {
    var message;
    if (err.response && err.response.status) {
      switch (err.response.status) {
        case 404:
          message = "Sorry! the page you are looking for could not be found";
          break;
        case 500:
          message =
            "Sorry! something went wrong, please contact our support team";
          break;
        case 401:
          message = "Invalid credentials";
          break;
        default:
          message = err[1];
          break;
      }
    }
    throw message;
  });
};

// postForgetPwd
export const postJwtForgetPwd = (data) =>
  api.create(url.POST_JWT_PASSWORD_FORGET, data);
