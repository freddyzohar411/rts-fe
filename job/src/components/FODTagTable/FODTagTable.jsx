import React, { useEffect } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCandidates,
  fetchCandidatesFields,
} from "../../../../candidate/src/store/candidate/action";
import { useTableHook, DynamicTableHelper } from "@Workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "./FODCandidateListingConstants";
import DynamicTableWrapper from "../CandidateDynamicTableWrapper/DynamicTableWrapper";
import { tagJob } from "../../store/jobStage/action";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

const FODTagTable = ({ selectedRowData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const candidatesData = useSelector(
    (state) => state.CandidateReducer.candidates
  );
  const candidatesFields = useSelector(
    (state) => state.CandidateReducer.candidatesFields
  );

  // Table Hooks
  const {
    pageRequest,
    pageRequestSet,
    pageInfo,
    setPageInfoData,
    search,
    setSearch,
    customConfig,
    setCustomConfigData,
  } = useTableHook(
    {
      page: 0,
      pageSize: 5,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        CANDIDATE_INITIAL_OPTIONS
      ),
    },
    CANDIDATE_INITIAL_OPTIONS
  );

  const handleTag = (candidateId) => {
    const payload = {
      jobId: selectedRowData?.id,
      jobStageId: JOB_STAGE_IDS?.TAG,
      status: JOB_STAGE_STATUS?.IN_PROGRESS,
      candidateId,
    };
    dispatch(tagJob({ payload, navigate }));
  };

  // Candidate Config
  const generateCandidateConfig = (customConfig) => {
    return [
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="checkbox"
              value="option"
            />
          </div>
        ),
        name: "checkbox",
        sort: false,
        sortValue: "checkbox",
        render: () => {
          return (
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                value="option1"
              />
            </div>
          );
        },
      },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        render: (data) => (
          <Button
            className="btn btn-sm btn-custom-primary px-4 py-0"
            onClick={() => handleTag(data?.id)}
          >
            <span className="fs-6">Tag</span>
          </Button>
        ),
      },
    ];
  };

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchCandidatesFields());
  }, []);

  // Fetch the candidate when the pageRequest changes
  useEffect(() => {
    dispatch(fetchCandidates(DynamicTableHelper.cleanPageRequest(pageRequest)));
  }, [pageRequest]);

  // Update the page info when candidate Data changes
  useEffect(() => {
    if (candidatesData) {
      setPageInfoData(candidatesData);
    }
  }, [candidatesData]);

  return (
    <DynamicTableWrapper
      data={candidatesData.candidates}
      config={generateCandidateConfig(customConfig)}
      pageInfo={pageInfo}
      pageRequest={pageRequest}
      pageRequestSet={pageRequestSet}
      search={search}
      setSearch={setSearch}
      optGroup={candidatesFields}
      setCustomConfigData={setCustomConfigData}
    />
  );
};

export default FODTagTable;
