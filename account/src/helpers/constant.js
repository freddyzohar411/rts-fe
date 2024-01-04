import * as PortURL from "@workspace/common/src/config";
import * as BaseURL from "./url_helper";

export const accountModuleURL = {
  account_account: `${PortURL.ACCOUNT_URL}${BaseURL.BASE_ACCOUNTS}/add`,
  account_contact: `${PortURL.CONTACT_URL}${BaseURL.BASE_CONTACTS}`,
  account_document: `${PortURL.DOCUMENT_URL}${BaseURL.BASE_DOCUMENTS}`,
  account_instruction: `${PortURL.ACCOUNT_INSTRUCTION_URL}${BaseURL.BASE_CLIENT_INSTRUCTIONS}`,
  // "account_access": `${PortURL.ACCOUNT_URL}${BaseURL.BASE_ACCOUNT_ACCESS}`,
  account_commercial: `${PortURL.ACCOUNT_URL}${BaseURL.BASE_COMMERCIAL}`,
};

export const generateAccountModuleURL = (entity, id = undefined) => {
  if (id) {
    return `${accountModuleURL[entity]}/${id}`;
  }
  return `${accountModuleURL[entity]}`;
};
