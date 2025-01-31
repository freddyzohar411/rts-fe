import * as PortURL from "@workspace/common/src/config";
import * as BaseURL from "./url_helper";

export const candidateModuleURL = {
  candidate_basic_info: `${PortURL.CANDIDATE_URL}${BaseURL.BASE_CANDIDATES}`,
  candidate_documents: `${PortURL.DOCUMENT_URL}${BaseURL.BASE_DOCUMENTS}`,
  candidate_work_experience: `${PortURL.CANDIDATE_WORK_EXPERIENCE_URL}${BaseURL.BASE_CANDIDATE_WORK_EXPERIENCE}`,
  candidate_education_details: `${PortURL.CANDIDATE_EDUCATION_DETAILS_URL}${BaseURL.BASE_CANDIDATE_EDUCATION_DETAILS}`,
  candidate_certification: `${PortURL.CANDIDATE_CERTIFICATE_URL}${BaseURL.BASE_CERTIFICATE}`,
  candidate_languages: `${PortURL.CANDIDATE_LANGUAGES_URL}${BaseURL.BASE_LANGUAGES}`,
  candidate_employer_details: `${PortURL.CANDIDATE_EMPLOYER_DETAILS_URL}${BaseURL.BASE_EMPLOYER_DETAILS}`,
};

export const generateCandidateModuleURL = (entity, id = undefined) => {
  if (id) {
    return `${candidateModuleURL[entity]}/${id}`;
  }
  return `${candidateModuleURL[entity]}`;
};
