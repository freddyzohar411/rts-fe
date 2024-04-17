import { getIdCount } from "./backend_helper";

export const generateId = async (prefix, cntryCode, module) => {
  let id = "";
  const year = new Date().getFullYear().toString().substring(2, 4);
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
  const output = `${prefix}${cntryCode}${year}-${id}`;
  return output;
};
