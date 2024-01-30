import { fetchCandidatesFieldsAll } from "../../../../candidate/src/store/candidate/action";
import { fetchAccountsFieldsAll } from "../../../../account/src/store/account/action";
import { fetchJobsFieldsAll } from "../../../../job/src/store/job/action";

export const moduleActions = {
  Accounts: fetchAccountsFieldsAll,
  Jobs: fetchJobsFieldsAll,
  Candidates: fetchCandidatesFieldsAll,
};
