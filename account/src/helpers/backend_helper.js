import { Axios } from "@workspace/common";
import axios from "axios";

import { GET_ACCOUNTS } from "./url_helper";

import { ACCOUNT_URL } from "@workspace/common/src/config";

const { APIClient } = Axios;

const api = new APIClient();

// Get Accounts
export const getAccounts = (data) =>
  api.get(`${ACCOUNT_URL}${GET_ACCOUNTS}`, data);
