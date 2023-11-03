import {
  ACCOUNT_URL,
  CONTACT_URL,
  DOCUMENT_URL,
  ACCOUNT_INSTRUCTION_URL,
  FORM_URL,
} from "@workspace/common/src/config";

import {
  GET_ACCOUNTS,
  BASE_FORMS,
  BASE_ACCOUNTS,
  BASE_CONTACTS,
  BASE_DOCUMENTS,
  BASE_CLIENT_INSTRUCTIONS,
  BASE_ACCOUNT_ACCESS,
  BASE_COMMERCIAL,
} from "../helpers/url_helper";


// Contact API
export const CONTACT_BASE_URL = `${CONTACT_URL}${BASE_CONTACTS}`;
export const GET_CONTACT_BY_ENTITY_URL = (entityType, entityId) =>
  `${CONTACT_BASE_URL}/entity/${entityType}/${entityId}`;

// Document API
export const DOCUMENT_BASE_URL = `${DOCUMENT_URL}${BASE_DOCUMENTS}`;
export const GET_DOCUMENT_BY_ENTITY_URL = (entityType, entityId) =>
  `${DOCUMENT_BASE_URL}/entity/${entityType}/${entityId}`;

