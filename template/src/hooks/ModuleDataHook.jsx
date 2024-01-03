import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountData } from "../../../account/src/store/account/action";
import { fetchCandidateData } from "../../../candidate/src/store/candidate/action";

const useModuleData = (props) => {
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.AccountReducer.accountData);
  const candidateData = useSelector((state) => state.CandidateReducer.candidateData);
  const [accountId, setAccountId] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [candidateId, setCandidateId] = useState(null);
  const [allIds, setAllIds] = useState({
    accountId: null,
    jobId: null,
    candidateId: null,
  });
  const [allModuleData, setAllModuleData] = useState({});

//   console.log("accountId", accountId);
//   console.log("jobId", jobId);
//   console.log("candidateId", candidateId);

  const setAllIdsHandler = () => {
    setAllIds({
        accountId: accountId,
        jobId: jobId,
        candidateId: candidateId,
    })
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
    if (accountData) {
      const obj = JSON.parse(JSON.stringify(allModuleData));
      obj["Accounts"] = flattenObject(accountData);
      setAllModuleData(obj);
    }
  }, [accountData]);

  useEffect(() => {
    if (candidateData) {
      const obj = JSON.parse(JSON.stringify(allModuleData));
      obj["Candidates"] = flattenObject(candidateData);
      setAllModuleData(obj);
    }
  }, [candidateData]);

  // Dispatch accordingly of accountId, jobId, candidateId changes
  useEffect(() => {
    if (accountId) {
      dispatch(fetchAccountData(accountId));
    }
    // if (jobId) {
    //   dispatch(fetchJobData(jobId));
    // }
    if (candidateId) {
      dispatch(fetchCandidateData(candidateId));
    }
  }, [allIds]);

  return {
    allModuleData,
    setAccountId,
    setJobId,
    setCandidateId,
    setAllIdsHandler
  };
};

export default useModuleData;
