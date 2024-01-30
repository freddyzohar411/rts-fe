import { COMMON_URL } from "../../config";
const TEMPLATE_BASE_URL = `${COMMON_URL}/api/template`;

// Get all templates from list of category and name
export const getTemplateFromCategoryAndName = () =>
  `${TEMPLATE_BASE_URL}/categories-names`;
