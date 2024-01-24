import axios from "axios";
import * as api from "../config";
import { toast } from "react-toastify";

// default
axios.defaults.baseURL = api.API_URL;
// content type
axios.defaults.headers.post["Content-Type"] = "application/json";

// content type
const token = sessionStorage.getItem("accessToken") ?? null;
// if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      // config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// intercepting to capture errors
axios.interceptors.response.use(
  async function (response) {
    return response.data ? response.data : response;
  },
  async function (error) {
    const originalRequest = error?.config;

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error?.response?.status === 403) {
      try {
        const refreshTokenResponse = await refreshToken();
        const { access_token, refresh_token } = refreshTokenResponse;
        sessionStorage.setItem("accessToken", access_token);
        sessionStorage.setItem("refreshToken", refresh_token);
      } catch (e) {
        toast.error("Your session has been expired.");
        window.location.replace("/login");
      }
    }

    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }

    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      case 404:
        message = "Sorry! the data you are looking for could not be found";
        break;
      default:
        message = error.message || error;
    }
    return Promise.reject(message);
  }
);
/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

const refreshToken = () => {
  const userData = JSON.parse(sessionStorage.getItem("authUser"));
  const refreshToken = sessionStorage.getItem("refreshToken");
  const data = {
    id: userData?.user?.id,
    refreshToken,
  };
  return axios.post("/api/user/refreshToken", data);
};

class APIClient {
  /**
   * Fetches data from given url
   */

  //  get = (url, params) => {
  //   return axios.get(url, params);
  // };
  get = (url, params) => {
    let response;

    let paramKeys = [];

    if (params) {
      Object.keys(params).map((key) => {
        paramKeys.push(key + "=" + params[key]);
        return paramKeys;
      });

      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join("&") : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }

    return response;
  };
  /**
   * post given data to url
   */
  create = (url, data, config = {}) => {
    return axios.post(url, data, config);
  };
  /**
   * Updates data
   */
  update = (url, data) => {
    return axios.patch(url, data);
  };

  put = (url, data, config) => {
    return axios.put(url, data, config);
  };
  /**
   * Delete
   */
  delete = (url, config) => {
    return axios.delete(url, { ...config });
  };

  getToken = () => {
    return sessionStorage.getItem("accessToken") ?? null;
  };
}

const getLoggedinUser = () => {
  const user = sessionStorage.getItem("authUser");
  if (!user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export { APIClient, setAuthorization, getLoggedinUser };
