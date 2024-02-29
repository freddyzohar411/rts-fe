import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchCandidates,
  fetchCandidatesFields,
} from "../../../../candidate/src/store/candidate/action";
import { useTableHook, DynamicTableHelper } from "@workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "./FODCandidateListingConstants";
import DynamicTableWrapper from "../CandidateDynamicTableWrapper/DynamicTableWrapper";
import { tagJob, tagJobAll } from "../../store/jobStage/action";
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

  const [selected, setSelected] = useState([]);

  const handleSelect = (id, isChecked) => {
    if (isChecked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter((item) => item !== id));
    }
  };

  const selectAll = (isChecked) => {
    if (isChecked) {
      if (candidatesData?.candidates) {
        const ids = [];
        candidatesData?.candidates?.forEach((item) => {
          ids.push(item?.id);
        });
        setSelected(ids);
      }
    } else {
      setSelected([]);
    }
  };

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
      status: JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
    };
    dispatch(tagJob({ payload, navigate }));
  };

  const handleTagAll = () => {
    const payload = [];
    if (selected?.length > 0) {
      selected?.forEach((itemId) => {
        payload.push({
          jobId: selectedRowData?.id,
          jobStageId: JOB_STAGE_IDS?.TAG,
          status: JOB_STAGE_STATUS?.COMPLETED,
          candidateId: itemId,
        });
      });
      dispatch(tagJobAll({ payload, navigate }));
    } else {
      toast.error("Please select at least one checkbox.");
    }
  };

  // Candidate Config
  const generateCandidateConfig = (customConfig) => {
    return [
      {
        header: "#",
        name: "indexing",
        sort: false,
        sortValue: "indexing",
        render: (data, index) => (
          <div className="d-flex column-gap-2">{index + 1}.</div>
        ),
      },
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="fodTable"
              checked={selected?.length === candidatesData?.candidates?.length}
              onChange={(e) => selectAll(e?.target?.checked)}
            />
          </div>
        ),
        name: "checkbox",
        sort: false,
        sortValue: "checkbox",
        render: (data) => {
          return (
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                name="chk_child"
                onChange={(e) => handleSelect(data?.id, e?.target?.checked)}
                checked={selected?.includes(data?.id)}
              />
            </div>
          );
        },
      },
      {
        header: "Candidate First Name",
        name: "candidateFirstName",
        sort: true,
        sortValue: "candidate_submission_data.firstName",
        render: (data) => {
          return (
            <Link
              to={`/candidates/${data?.id}/snapshot`}
              className="text-custom-primary text-decoration-underline"
            >
              <span>{data?.candidateSubmissionData?.firstName}</span>
            </Link>
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
      data={candidatesData?.candidates}
      config={generateCandidateConfig(customConfig)}
      pageInfo={pageInfo}
      pageRequest={pageRequest}
      pageRequestSet={pageRequestSet}
      search={search}
      setSearch={setSearch}
      optGroup={candidatesFields}
      setCustomConfigData={setCustomConfigData}
      handleTagAll={handleTagAll}
    />
  );
};

export default FODTagTable;
