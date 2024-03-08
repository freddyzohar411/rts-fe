import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postCandidate,
  putCandidate,
  putCandidateDraftStatus,
  resetMetaData,
} from "../../store/candidate/action";
import {
  candidateBasicInfoMap,
  candidateWorkExperienceMap,
} from "./importCandidateHelper";
import { ObjectHelper } from "@workspace/common";
import {
  CandidateFormConstant,
  CandidateEntityConstant,
  CandidateTableListConstant,
} from "../../constants/candidateConstant";
import axios from "axios";

const useImportCandidate = () => {
  const dispatch = useDispatch();
  const [formNameId, setFormNameId] = useState(null);

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

  console.log(formNameId);

  function importCandidate(candidateData) {
    // Get candidate basic info Object
    const candidateBasicInfo = {};
    for (const [field, value] of Object.entries(candidateBasicInfoMap)) {
      console.log(field, value);
      if (value.render) {
        candidateBasicInfo[field] = value.render(candidateData[value.key]);
      } else {
        candidateBasicInfo[field] = candidateData[value.key];
      }
    }
    const candidateBasicInfoOut = {
      ...candidateBasicInfo,
      formData: JSON.stringify(candidateBasicInfo),
      formId: parseInt(formNameId["Candidate_basic_info"]),
    };
    const candidateBasicInfoOutFormData = ObjectHelper.convertObjectToFormData(
      candidateBasicInfoOut
    );

    // Get work experience object array
    const workExperienceArray = [];
    candidateData.companiesDetails.forEach((company) => {
      const workExperience = {};
      for (const [field, value] of Object.entries(candidateWorkExperienceMap)) {
        if (value.render) {
          workExperience[field] = value.render(company[value.key]);
        } else {
          workExperience[field] = company[value.key];
        }
      }
      workExperienceArray.push(workExperience);
    });

    const workExperienceArrayOut = workExperienceArray.map((workExperience) => {
      const workExperienceFormSubmit = { ...workExperience, multiFiles: "" };
      return {
        ...workExperience,
        multiFiles: [],
        entityType: CandidateEntityConstant.CANDIDATE_WORK_EXPERIENCE,
        formData: JSON.stringify(workExperienceFormSubmit),
        formId: parseInt(formNameId["Candidate_work_experience"]),
      };
    });

    console.log("Work experience", workExperienceArrayOut);


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

  return { importCandidate };
};

export default useImportCandidate;
