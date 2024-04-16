import { getIdCount } from "./backend_helper";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;

export const generateId = async (prefix, cntryCode, module) => {
  const api = new APIClient();

  let id = "";
  const year = new Date().getFullYear().toString().substring(2, 4);
  let countryCode = cntryCode;
  if (module) {
    try {
      const countData = await getIdCount(module);
      id = parseInt(countData?.data) ?? "";
      if (id < 1000) {
        id = ("0000" + countData?.data).slice(-4);
      }
    } catch (e) {
      id = "";
    }
  }
  const output = `${prefix}${countryCode}${year}-${id}`;
  return output;
};
