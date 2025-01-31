import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  importCandidate as importCandidateAction,
  importCandidateMulti,
} from "../../store/candidate/action";
import { candidateMapping } from "./importCandidateHelper";
import { ObjectHelper } from "@workspace/common";
import {
  CandidateEntityConstant,
  CandidateFormNameConstant,
} from "../../constants/candidateConstant";
import { useNavigate } from "react-router-dom";
import { getCandidateFormIdMap } from "../../helpers/backend_helper";
import { getCandidateMapping as getCandidateMappingAction } from "../../store/candidateMapping/action";
import { toast } from "react-toastify";
import { generateId } from "@workspace/common/src/helpers/generate_id_helper";

const useImportCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formNameId, setFormNameId] = useState(null);
  const [candidateMappingData, setCandidateMappingData] = useState(null);
  const candidateMappingFetchData = useSelector(
    (state) => state.CandidateMappingReducer.candidateMapping
  );

  useEffect(() => {
    if (!candidateMappingFetchData) {
      dispatch(getCandidateMappingAction());
    }
  }, []);

  useEffect(() => {
    if (candidateMappingFetchData) {
      setCandidateMappingData(candidateMappingFetchData);
    }
  }, [candidateMappingFetchData]);

  const formNames = [
    "Candidate_basic_info",
    "Candidate_work_experience",
    "Candidate_languages",
    "Candidate_education_details",
    "Candidate_documents",
    "Candidate_certification",
    "Candidate_employer_details",
  ];

  useEffect(() => {
    getCandidateFormIdMap(formNames)
      .then((response) => {
        setFormNameId(response.data);
      })
      .catch((error) => {});
  }, []);

  function mapResumeDataToFormData(
    resumeData,
    formToParseFieldMapping,
    parseFieldToDataMapping
  ) {
    if (
      formToParseFieldMapping === null ||
      formToParseFieldMapping === undefined
    )
      return;
    const dataOut = {};

    for (const [field, value] of Object.entries(formToParseFieldMapping)) {
      const [parseKey, parseValue] = value.split("__");
      if (
        parseFieldToDataMapping[parseKey][parseValue]?.map === "none" &&
        parseFieldToDataMapping[parseKey][parseValue]?.render
      ) {
        dataOut[field] =
          parseFieldToDataMapping[parseKey][parseValue]?.render(resumeData);
      } else if (parseFieldToDataMapping[parseKey][parseValue]?.render) {
        dataOut[field] = parseFieldToDataMapping[parseKey][parseValue]?.render(
          resumeData[parseFieldToDataMapping[parseKey][parseValue].key]
        );
      } else {
        dataOut[field] =
          resumeData[parseFieldToDataMapping[parseKey][parseValue]?.key] || "";
      }
    }
    return dataOut;
  }

  async function convertCandidateDataToRequestArray(
    candidatesData,
    fileObjects
  ) {
    if (!candidatesData) return;
    if (candidatesData.length === 0) {
      toast.error("No candidate data found");
    }

    // Check Mapping Data
    if (!candidateMappingData) {
      toast.error(
        "Candidate Mapping Data not found. Please set up mapping data before importing candidate."
      );
      return;
    }

    if (candidateMappingData?.basicInfo === undefined) {
      toast.error(
        "Candidate basic info not mapped. Cannot import candidate. Please map the basic info fields and try again."
      );
      return;
    }

    if (
      candidateMappingData?.basicInfo["firstName"] === undefined ||
      candidateMappingData?.basicInfo["lastName"] === undefined
    ) {
      toast.error(
        "Candidate basic info not mapped. Cannot import candidate. Please map the first name and last name fields and try again."
      );
      return;
    }

    // Initialize the request array
    const candidateRequestArrayAll = [];
    // candidatesData.forEach((candidateData, i) => {
    for (const [i, candidateData] of candidatesData.entries()) {
      // Get candidate basic info Object

      const candidateBasicInfo = mapResumeDataToFormData(
        candidateData,
        candidateMappingData?.basicInfo,
        candidateMapping
      );

      const candidateIdGenerated = await generateId("C", "", "candidate");

      const candidateBasicInfoOut = {
        ...candidateBasicInfo,
        formData: JSON.stringify({
          ...candidateBasicInfo,
          candidateId: candidateIdGenerated,
        }),
        formId: parseInt(
          formNameId[CandidateFormNameConstant.CANDIDATE_BASIC_INFO]
        ),
      };

      const candidateBasicInfoOutFormData =
        ObjectHelper.convertObjectToFormData(candidateBasicInfoOut);

      // Get work experience object array
      const workExperienceArray = [];
      candidateData.companiesDetails.forEach((company) => {
        const workExperience = mapResumeDataToFormData(
          company,
          candidateMappingData?.workExperiences,
          candidateMapping
        );
        if (workExperience) {
          workExperienceArray.push(workExperience);
        }
      });

      const workExperienceArrayOut = workExperienceArray.map(
        (workExperience) => {
          const workExperienceFormSubmit = {
            ...workExperience,
            multiFiles: "",
          };
          return {
            ...workExperience,
            entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
            formData: JSON.stringify(workExperienceFormSubmit),
            formId: parseInt(
              formNameId[CandidateFormNameConstant.CANDIDATE_WORK_EXPERIENCE]
            ),
          };
        }
      );

      // Get Language object
      const languagesArray = [];
      candidateData?.spokenLanguages.forEach((language) => {
        const languageData = mapResumeDataToFormData(
          language,
          candidateMappingData?.languages,
          candidateMapping
        );
        if (languageData) {
          languagesArray.push(languageData);
        }
      });

      const languageArrayOut = languagesArray.map((language) => {
        return {
          ...language,
          entityType: CandidateEntityConstant.CANDIDATE_LANGUAGES,
          formData: JSON.stringify(language),
          formId: parseInt(
            formNameId[CandidateFormNameConstant.CANDIDATE_LANGUAGES]
          ),
        };
      });

      // Education Details
      const educationDetailsArray = [];
      candidateData?.educationDetails.forEach((education) => {
        const educationData = mapResumeDataToFormData(
          education,
          candidateMappingData?.educationDetails,
          candidateMapping
        );
        if (educationData) {
          educationDetailsArray.push(educationData);
        }
      });

      const educationDetailsArrayOut = educationDetailsArray.map(
        (education) => {
          return {
            ...education,
            entityType: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
            formData: JSON.stringify(education),
            formId: parseInt(
              formNameId[CandidateFormNameConstant.CANDIDATE_EDUCATION_DETAILS]
            ),
          };
        }
      );

      // Document
      const file = fileObjects[i];
      const documentFormData = mapResumeDataToFormData(
        file?.file,
        candidateMappingData?.documents,
        candidateMapping
      );

      const documentData = {
        file: fileObjects[i]?.file,
        entityType: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
        formData: JSON.stringify(documentFormData),
        formId: parseInt(
          formNameId[CandidateFormNameConstant.CANDIDATE_DOCUMENTS]
        ),
      };

      // Certification
      const certificationArray = [];
      candidateData?.certifications.forEach((certification) => {
        const certificationData = mapResumeDataToFormData(
          certification,
          candidateMappingData?.certification,
          candidateMapping
        );
        if (certificationData) {
          certificationArray.push(certificationData);
        }
      });

      const certificationArrayOut = certificationArray.map((certification) => {
        return {
          ...certification,
          entityType: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
          formData: JSON.stringify(certification),
          formId: parseInt(
            formNameId[CandidateFormNameConstant.CANDIDATE_CERTIFICATION]
          ),
        };
      });

      // Consolidate the request array
      const candidateRequestArray = [
        {
          entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
          newData: candidateBasicInfoOutFormData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        {
          entity: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
          newData: workExperienceArrayOut,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        {
          entity: CandidateEntityConstant.CANDIDATE_LANGUAGES,
          newData: languageArrayOut,
        },
        {
          entity: CandidateEntityConstant.CANDIDATE_EDUCATION_DETAILS,
          newData: educationDetailsArrayOut,
        },
        {
          entity: CandidateEntityConstant.CANDIDATE_DOCUMENTS,
          newData: documentData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        },
        {
          entity: CandidateEntityConstant.CANDIDATE_CERTIFICATION,
          newData: certificationArrayOut,
        },
      ];
      candidateRequestArrayAll.push(candidateRequestArray);
    }
    // });
    return candidateRequestArrayAll;
  }

  async function importCandidate(candidatesData, fileObjects) {
    const candidateRequestArrayAll = await convertCandidateDataToRequestArray(
      candidatesData,
      fileObjects
    );

    if (!candidateRequestArrayAll) return;
    if (candidateRequestArrayAll.length === 0) return;

    if (candidateRequestArrayAll.length === 1) {
      dispatch(
        importCandidateAction({
          candidateRequestArray: candidateRequestArrayAll[0],
          navigate: navigate,
        })
      );
    } else {
      dispatch(
        importCandidateMulti({
          candidateRequestArrayAll: candidateRequestArrayAll,
          navigate: navigate,
        })
      );
    }
  }

  return { importCandidate, setCandidateMappingData };
};

export default useImportCandidate;
