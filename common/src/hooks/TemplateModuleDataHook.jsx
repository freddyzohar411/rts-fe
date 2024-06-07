import react, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountData } from "../../../account/src/store/account/action";
import { fetchCandidateData } from "../../../candidate/src/store/candidate/action";
import { fetchJobData } from "../../../job/src/store/job/action";
import { extractNameAndEmail } from "./TemplateModuleDataUtil";

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
  const [isAllLoading, setIsAllLoading] = useState(true);

  const setAllIdsHandler = () => {
    setAllIds({
      accountId: accountId,
      jobId: jobId,
      candidateId: candidateId,
    });
  };

  useEffect(() => {
    setAllModuleData((prevData) => {
      const obj = { ...prevData };

      if (accountData) {
        obj["Accounts"] = accountData;
      }

      if (candidateData) {
        obj["Candidates"] = candidateData;

        // Add adition data here if needed
        const candidateOwnerOriginal = candidateData.basicInfo?.candidateOwner;
        if (candidateOwnerOriginal) {
          const nameEmail = extractNameAndEmail(candidateOwnerOriginal);
          if (
            candidateData.basicInfo?.candidateOwner &&
            nameEmail?.email &&
            nameEmail?.name
          ) {
            obj["Candidates"]["basicInfo"]["candidateOwner"] = nameEmail.name;
            obj["Candidates"]["basicInfo"]["candidateOwnerEmail"] =
              nameEmail?.email;
          }
        }
      }

      if (jobData) {
        obj["Jobs"] = jobData;
      }

      return obj;
    });
  }, [accountData, candidateData, jobData]);

  // Dispatch accordingly of accountId, jobId, candidateId changes
  // useEffect(() => {
  //   // const getData = async () => {
  //   //   if (accountId) {
  //   //     setIsAllLoading((prev) => ({ ...prev, account: true }));
  //   //     await dispatch(fetchAccountData(accountId));
  //   //     setIsAllLoading((prev) => ({ ...prev, account: false }));
  //   //   }
  //   //   if (jobId) {
  //   //     setIsAllLoading((prev) => ({ ...prev, job: true }));
  //   //     await dispatch(fetchJobData(jobId));
  //   //     setIsAllLoading((prev) => ({ ...prev, job: false }));
  //   //   }
  //   //   if (candidateId) {
  //   //     setIsAllLoading((prev) => ({ ...prev, candidate: true }));
  //   //     await dispatch(fetchCandidateData(candidateId));
  //   //     setTimeout(() => {
  //   //       setIsAllLoading((prev) => ({ ...prev, candidate: false }));
  //   //     }, 10000);
  //   //     // setIsAllLoading((prev) => ({ ...prev, candidate: false }));
  //   //   }
  //   // };
  //   // getData();
  //   if (accountId) {
  //     dispatch(fetchAccountData(accountId));
  //   }
  //   if (jobId) {
  //     dispatch(fetchJobData(jobId));
  //   }
  //   if (candidateId) {
  //     dispatch(fetchCandidateData(candidateId));
  //   }

  // }, [allIds]);

  useEffect(() => {
    const getData = async () => {
      if (accountId || jobId || candidateId) {
        // Start loading

        try {
          setIsAllLoading(true);
          // Fetch all data
          await Promise.all([
            accountId && dispatch(fetchAccountData(accountId)),
            jobId && dispatch(fetchJobData(jobId)),
            candidateId && dispatch(fetchCandidateData(candidateId)),
          ]);
        } catch (error) {
          console.error(error);
        } finally {
          // Stop loading
          setIsAllLoading(false);
        }
      }
    };

    getData();
  }, [accountId, jobId, candidateId]);

  return {
    allModuleData,
    setAccountId,
    setJobId,
    setCandidateId,
    setAllIdsHandler,
    isAllLoading,
  };
};
