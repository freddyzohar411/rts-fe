import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountData } from "../../../account/src/store/account/action";
import { fetchCandidateData } from "../../../candidate/src/store/candidate/action";
import { fetchJobData } from "../../../job/src/store/job/action";

export const useTemplateModuleData = (dataId) => {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(true);
  const accountData = useSelector((state) => state.AccountReducer.accountData);
  const candidateData = useSelector(
    (state) => state.CandidateReducer.candidateData
  );
  const jobData = useSelector((state) => state.JobReducer.jobData);
  const [accountId, setAccountId] = useState(dataId?.accountId || null);
  const [jobId, setJobId] = useState(dataId?.jobId || null);
  const [candidateId, setCandidateId] = useState(dataId?.candidateId || null);
  const [allIds, setAllIds] = useState({
    accountId: dataId?.accountId || null,
    jobId: dataId?.jobId || null,
    candidateId: dataId?.candidateId || null,
  });
  const [allModuleData, setAllModuleData] = useState({});
  const [isAllLoading, setIsAllLoading] = useState({
    all: true,
    account: dataId?.accountId ? true : false,
    job: dataId?.jobId ? true : false,
    candidate: dataId?.candidateId ? true : false,
  });

  const setAllIdsHandler = () => {
    setAllIds({
      accountId: accountId,
      jobId: jobId,
      candidateId: candidateId,
    });
  };

  function flattenObject(obj) {
    let flattened = {};

    function recursiveFlatten(currentObj) {
      for (const key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
            // Recursively flatten nested objects
            recursiveFlatten(currentObj[key]);
          } else {
            flattened[key] = currentObj[key];
          }
        }
      }
    }

    recursiveFlatten(obj);
    return flattened;
  }

  useEffect(() => {
    setAllModuleData((prevData) => {
      const obj = { ...prevData };

      if (accountData) {
        obj["Accounts"] = accountData;
      }

      if (candidateData) {
        obj["Candidates"] = candidateData;
      }

      if (jobData) {
        obj["Jobs"] = jobData;
      }

      return obj;
    });
  }, [accountData, candidateData, jobData]);

  // Dispatch accordingly of accountId, jobId, candidateId changes
  useEffect(() => {
    // const getData = async () => {
    //   if (accountId) {
    //     setIsAllLoading((prev) => ({ ...prev, account: true }));
    //     await dispatch(fetchAccountData(accountId));
    //     setIsAllLoading((prev) => ({ ...prev, account: false }));
    //   }
    //   if (jobId) {
    //     setIsAllLoading((prev) => ({ ...prev, job: true }));
    //     await dispatch(fetchJobData(jobId));
    //     setIsAllLoading((prev) => ({ ...prev, job: false }));
    //   }
    //   if (candidateId) {
    //     setIsAllLoading((prev) => ({ ...prev, candidate: true }));
    //     await dispatch(fetchCandidateData(candidateId));
    //     setTimeout(() => {
    //       setIsAllLoading((prev) => ({ ...prev, candidate: false }));
    //     }, 10000);
    //     // setIsAllLoading((prev) => ({ ...prev, candidate: false }));
    //   }
    // };
    // getData();
    if (accountId) {
      dispatch(fetchAccountData(accountId));
    }
    if (jobId) {
      dispatch(fetchJobData(jobId));
    }
    if (candidateId) {
      dispatch(fetchCandidateData(candidateId));
    }

  }, [allIds]);

  return {
    allModuleData,
    setAccountId,
    setJobId,
    setCandidateId,
    setAllIdsHandler,
    isAllLoading,
  };
};
