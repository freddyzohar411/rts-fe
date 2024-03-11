import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postCandidate,
  putCandidate,
  putCandidateDraftStatus,
  resetMetaData,
  importCandidate as importCandidateAction,
} from "../../store/candidate/action";
import {
  candidateBasicInfoMap,
  candidateWorkExperienceMap,
  candidateMapping,
} from "./importCandidateHelper";
import { ObjectHelper } from "@workspace/common";
import {
  CandidateFormConstant,
  CandidateEntityConstant,
  CandidateTableListConstant,
} from "../../constants/candidateConstant";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useImportCandidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formNameId, setFormNameId] = useState(null);
  const [candidateMappingData, setCandidateMappingData] = useState(null);

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
    axios
      .post("http://localhost:9400/api/forms/formname/idmap", formNames)
      .then((response) => {
        setFormNameId(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Fetch data for mapping
  useEffect(() => {
    // Fetch data
    axios
      .get("http://localhost:8050/api/candidates/mapping/get")
      .then((res) => {
        if (res.data.candidateMapping) {
          setCandidateMappingData(res.data.candidateMapping);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log("candidateMapping: ", candidateMapping);
  console.log("candidateMappingData: ", candidateMappingData);

  // function importCandidate(candidateData) {
  //   console.log("Candidate Data", candidateData);

  //   // Get candidate basic info Object
  //   const candidateBasicInfo = {};
  //   for (const [field, value] of Object.entries(candidateBasicInfoMap)) {
  //     console.log(field, value);
  //     if (value.render) {
  //       candidateBasicInfo[field] = value.render(candidateData[value.key]);
  //     } else {
  //       candidateBasicInfo[field] = candidateData[value.key];
  //     }
  //   }
  //   const candidateBasicInfoOut = {
  //     ...candidateBasicInfo,
  //     formData: JSON.stringify(candidateBasicInfo),
  //     formId: parseInt(formNameId["Candidate_basic_info"]),
  //   };
  //   const candidateBasicInfoOutFormData = ObjectHelper.convertObjectToFormData(
  //     candidateBasicInfoOut
  //   );

  //   // Get work experience object array
  //   const workExperienceArray = [];
  //   candidateData.companiesDetails.forEach((company) => {
  //     const workExperience = {};
  //     for (const [field, value] of Object.entries(candidateWorkExperienceMap)) {
  //       if (value.render) {
  //         workExperience[field] = value.render(company[value.key]);
  //       } else {
  //         workExperience[field] = company[value.key];
  //       }
  //     }
  //     workExperienceArray.push(workExperience);
  //   });

  //   const workExperienceArrayOut = workExperienceArray.map((workExperience) => {
  //     const workExperienceFormSubmit = { ...workExperience, multiFiles: "" };
  //     return {
  //       ...workExperience,
  //       // multiFiles: [],
  //       entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
  //       formData: JSON.stringify(workExperienceFormSubmit),
  //       formId: parseInt(formNameId["Candidate_work_experience"]),
  //     };
  //   });

  //   // const workExperienceFormDataArray = workExperienceArrayOut.map(
  //   //   (workExperience) => ObjectHelper.convertObjectToFormData(workExperience)
  //   // );

  //   console.log("Work experience", workExperienceArrayOut);

  //   const candidateRequestArray = [
  //     {
  //       entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
  //       newData: candidateBasicInfoOutFormData,
  //       config: {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       },
  //     },
  //     {
  //       entity: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
  //       newData: workExperienceArrayOut,
  //       config: {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       },
  //     }
  //   ];

  //   dispatch(importCandidateAction(candidateRequestArray));

  //   //   dispatch(
  //   //     postCandidate({
  //   //       entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
  //   //       newData: formData1,
  //   //       config: {
  //   //         headers: {
  //   //           "Content-Type": "multipart/form-data",
  //   //         },
  //   //       },
  //   //     })
  //   //   );

  //   return "Import Candidate";
  // }

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

    console.log("resumeData", resumeData);
    console.log("formToParseFieldMapping", formToParseFieldMapping);

    for (const [field, value] of Object.entries(formToParseFieldMapping)) {
      console.log("Field Value", field, value);
      const [parseKey, parseValue] = value.split("__");
      console.log(
        "parseFieldToDataMapping[parseKey][parseValue]",
        parseFieldToDataMapping[parseKey][parseValue]
      );
      if (
        parseFieldToDataMapping[parseKey][parseValue]?.map === "none" &&
        parseFieldToDataMapping[parseKey][parseValue]?.render
      ) {
        console.log("None", resumeData);
        // dataOut[field] = resumeData;
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

  function importCandidate(candidateData) {
    console.log("Candidate Data", candidateData);

    // Get candidate basic info
    const candidateBasicInfo = mapResumeDataToFormData(
      candidateData,
      candidateMappingData?.basicInfo,
      candidateMapping
    );

    const candidateBasicInfoOut = {
      ...candidateBasicInfo,
      formData: JSON.stringify(candidateBasicInfo),
      formId: parseInt(formNameId["Candidate_basic_info"]),
    };

    // console.log("candidateBasicInfoOut", candidateBasicInfoOut);
    const candidateBasicInfoOutFormData = ObjectHelper.convertObjectToFormData(
      candidateBasicInfoOut
    );

    // Get work experience object array
    const workExperienceArray = [];
    candidateData.companiesDetails.forEach((company) => {
      const workExperience = mapResumeDataToFormData(
        company,
        candidateMappingData?.workExperiences,
        candidateMapping
      );
      workExperienceArray.push(workExperience);
    });

    const workExperienceArrayOut = workExperienceArray.map((workExperience) => {
      const workExperienceFormSubmit = { ...workExperience, multiFiles: "" };
      return {
        ...workExperience,
        entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
        formData: JSON.stringify(workExperienceFormSubmit),
        formId: parseInt(formNameId["Candidate_work_experience"]),
      };
    });

    // console.log("Work experience", workExperienceArrayOut);

    // Get Language object
    const lanagaugesArray = [];
    console.log(
      "candidateData?.spokenLanguages",
      candidateData?.spokenLanguages
    );
    candidateData?.spokenLanguages.forEach((language) => {
      const languageData = mapResumeDataToFormData(
        language,
        candidateMappingData?.languages,
        candidateMapping
      );
      lanagaugesArray.push(languageData);
    });

    console.log("lanagaugesArray", lanagaugesArray);

    const languageArrayOut = lanagaugesArray.map((language) => {
      return {
        ...language,
        entityType: CandidateEntityConstant.CANDIDATE_LANGUAGES,
        formData: JSON.stringify(language),
        formId: parseInt(formNameId["Candidate_languages"]),
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
    ];

    dispatch(
      importCandidateAction({ candidateRequestArray, navidate: navigate })
    );

    //   dispatch(
    //     postCandidate({
    //       entity: CandidateEntityConstant.CANDIDATE_BASIC_INFO,
    //       newData: formData1,
    //       config: {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       },
    //     })
    //   );

    return "Import Candidate";
  }

  return { importCandidate, setCandidateMappingData };
};

export default useImportCandidate;
