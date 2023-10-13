import * as configURL from '../config';
import * as baseURL from '../baseUrl'

import { Axios } from "@workspace/common";
const { APIClient } = Axios;

const api = new APIClient();

console.log("Get parent URl",`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`)
// Get parent company
export const getAccountNamesFromUser = () => api.get(`${configURL.ACCOUNT_URL}/${baseURL.ACCOUNT}/names`);