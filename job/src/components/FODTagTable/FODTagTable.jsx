import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCandidates,
  fetchCandidatesFields,
  candidateRecommendationList,
} from "../../../../candidate/src/store/candidate/action";
import { useTableHook, DynamicTableHelper } from "@workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "./FODCandidateListingConstants";
import DynamicTableWrapper from "../CandidateDynamicTableWrapper/DynamicTableWrapper";
import { tagJob, tagJobAll } from "../../store/jobStage/action";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import FODCandidateRecommendation from "./FODCandidateRecommendation";

const FODTagTable = ({ selectedRowData, tagOffcanvas }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [abortController, setAbortController] = useState(null);

  // const candidatesData = useSelector(
  //   (state) => state.CandidateReducer.candidates
  // );

  console.log("Tag Off canvas", tagOffcanvas);

  const {
    candidatesRecommendation: candidatesData,
    candidateRecommendationLoading: loading,
  } = useSelector(
    (state) => state.CandidateReducer
    // (state) => state.CandidateReducer
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
      sortDirection: null,
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        CANDIDATE_INITIAL_OPTIONS
      ),
    },
    CANDIDATE_INITIAL_OPTIONS
  );

  useEffect(() => {
    // Only create a new abort controller when tagOffcanvas is true
    if (tagOffcanvas) {
      // Create a new AbortController
      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      // Create a payload that includes the job ID from selectedRowData
      const jobPageRequest = { ...pageRequest, jobId: selectedRowData?.id };

      // Dispatch the action with the signal from the new abort controller
      dispatch(
        candidateRecommendationList(
          DynamicTableHelper.cleanPageRequest(jobPageRequest),
          newAbortController.signal
        )
      );

      // Cleanup function
      return () => {
        newAbortController.abort(); // Abort the request when the component unmounts or if tagOffcanvas changes to false
      };
    } else if (abortController) {
      // Abort the existing request when tagOffcanvas changes to false
      abortController.abort();
      setAbortController(null); // Reset the abortController state
    }
    // Ensure useEffect is called again if pageRequest changes or tagOffcanvas changes
  }, [pageRequest, selectedRowData?.id, tagOffcanvas]);

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
        header: "Recommendation",
        name: "action",
        sort: false,
        sortValue: "Recommendation",
        render: (data) => {
          return <FODCandidateRecommendation data={data} />;
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
  // useEffect(() => {
  //   // dispatch(fetchCandidates(DynamicTableHelper.cleanPageRequest(pageRequest)));
  //   const jobPageRequest = { ...pageRequest, jobId: selectedRowData?.id };
  //   dispatch(
  //     candidateRecommendationList(
  //       DynamicTableHelper.cleanPageRequest(jobPageRequest)
  //     )
  //   );
  // }, [pageRequest, selectedRowData?.id]);

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
