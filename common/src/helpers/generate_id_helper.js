import axios from "axios";
import { v4 as uuid } from "uuid";

export const generateId = async (prefix) => {
  const id = uuid().substring(0, 5);
  const year = new Date().getFullYear().toString().substring(2, 4);
  let countryCode = "SG";
  try {
    const countryDetails = await axios.get("https://ipapi.co/json/");
    countryCode = countryDetails?.country_code;
  } catch (e) {}
  const output = `${prefix}${countryCode}${year}-${id}`;
  return output;
};
