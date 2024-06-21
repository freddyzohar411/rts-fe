import React, { useEffect, useState } from "react";
import { Button, Input, Spinner } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCandidatesFields,
  candidateRecommendationList,
  resetCandidateRecommendationList,
} from "../../../../../candidate/src/store/candidate/action";
import { useTableHook, DynamicTableHelper } from "@workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "../../FODTagTable/FODCandidateListingConstants";
import { tagJob, tagJobAll, tagReset } from "../../../store/jobStage/action";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../../JobListing/JobListingConstants";
import DynamicTableWrapper from "./DynamicTableWrapper";
import FODCandidateRecommendation from "../../FODTagTable/FODCandidateRecommendation";

function JobOverviewTagTable({ jobId, isJobOverviewTagOpen, closeTag }) {
  const fodTableType = {
    Recommendation: "Recommendation",
    All: "All",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [abortController, setAbortController] = useState(null);
  const [customQuery, setCustomQuery] = useState(null);
  const [fodTableShowType, setFODTableShowType] = useState({
    label: fodTableType.All,
    value: fodTableType.All,
  });
  const [tableConfig, setTableConfig] = useState([]);
  const jobAllTagMeta = useSelector(
    (state) => state.JobStageReducer.jobAllTagMeta
  );  const [jobLoading, setJobLoading] = useState(false);

  // Custom renders
  const customRenderList = [
    {
      names: ["candidateSubmissionData.firstName"],
      render: (data, opt) => (
        <Link
          className="text-custom-primary text-decoration-underline"
          onClick={() => {
            const win = window.open(
              `/candidates/${data?.id}/snapshot`,
              "_blank"
            );
            win.focus();
          }}
        >
          <span>
            {DynamicTableHelper.getDynamicNestedResult(data, opt.value)}
          </span>
        </Link>
      ),
    },
  ];

  const {
    candidatesRecommendation: candidatesData,
    candidateRecommendationLoading: loading,
  } = useSelector((state) => state.CandidateReducer);

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
    setCustomConfig,
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: null,
      sortDirection: null,
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        CANDIDATE_INITIAL_OPTIONS
      ),
      allActive: true,
    },
    [],
    CANDIDATE_INITIAL_OPTIONS,
    customRenderList
  );

  // Fetch candidate recommendation list
  useEffect(() => {
    // Only create a new abort controller when tagOffcanvas is true
    if (isJobOverviewTagOpen) {
      setSelected([]);
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      const jobPageRequest = { ...pageRequest, jobId: jobId };
      if (customQuery) {
        jobPageRequest.customQuery = customQuery;
      } else {
        delete jobPageRequest.customQuery;
      }
      dispatch(
        candidateRecommendationList(
          DynamicTableHelper.cleanPageRequest(jobPageRequest),
          newAbortController.signal,
          fodTableShowType?.value === fodTableType.Recommendation || customQuery
            ? fodTableType.Recommendation
            : fodTableType.All
        )
      );
      return () => {
        // Abort the request when the component unmounts or if tagOffcanvas changes to false
        newAbortController.abort();
        dispatch(resetCandidateRecommendationList());
      };
    } else if (abortController) {
      abortController.abort();
      setAbortController(null);
      dispatch(resetCandidateRecommendationList());
    }
  }, [pageRequest, jobId, isJobOverviewTagOpen, customQuery, fodTableShowType]);

  const handleTagAll = () => {
    const payload = [];
    if (selected?.length > 0) {
      selected?.forEach((itemId) => {
        payload.push({
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.TAG,
          status: JOB_STAGE_STATUS?.COMPLETED,
          candidateId: itemId,
          stepName: "Profile",
          subStepName: "Tag",
        });
      });
      dispatch(tagJobAll({ payload, navigate }));
      closeTag();
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
        render: (data, index) => (
          <div className="d-flex column-gap-2">
            {pageInfo?.currentPage * pageInfo?.pageSize + (index + 1)}.
          </div>
        ),
      },
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="fodTable"
              checked={
                selected?.length > 0 &&
                selected?.length === candidatesData?.candidates?.length
              }
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
      (fodTableShowType?.value === fodTableType.Recommendation ||
        customQuery) && {
        header: "Recommendation",
        name: "action",
        sort: true,
        sortValue: "cosine_similarity",
        render: (data) => {
          return (
            <FODCandidateRecommendation
              data={data}
              candidateId={data?.id}
              jobId={jobId}
            />
          );
        },
      },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        sticky: "right",
        expand: true,
        center: true,
        render: (data) => (
          <TagButton data={data} jobId={jobId} closeTag={closeTag} />
        ),
      },
    ].filter((item) => item);
  };

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchCandidatesFields());
  }, []);

  // Update the page info when candidate Data changes
  useEffect(() => {
    if (candidatesData) {
      setPageInfoData(candidatesData);
    }
  }, [candidatesData]);

  useEffect(() => {
    const newConfig = generateCandidateConfig(customConfig);
    setTableConfig(newConfig);
  }, [customConfig, pageInfo, fodTableShowType, selected]);

  return (
    <DynamicTableWrapper
      data={candidatesData?.candidates}
      config={tableConfig}
      pageInfo={pageInfo}
      pageRequest={pageRequest}
      pageRequestSet={pageRequestSet}
      search={search}
      setSearch={setSearch}
      optGroup={candidatesFields}
      setCustomConfigData={setCustomConfigData}
      handleTagAll={handleTagAll}
      setCustomQuery={setCustomQuery}
      setSelected={setSelected}
      fodODTableShowType={{
        fodTableShowType,
        setFODTableShowType,
      }}
    />
  );
}

export default JobOverviewTagTable;

// Create a Tag Button component to hold the loader here
function TagButton({ data, jobId, closeTag }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobTagMeta = useSelector((state) => state.JobStageReducer.jobTagMeta);
  const [loading, setLoading] = useState(false);

  const handleTag = (candidateId) => {
    const payload = {
      jobId: jobId,
      jobStageId: JOB_STAGE_IDS?.TAG,
      status: JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      stepName: "Profile",
      subStepName: "Tag",
    };
    try {
      setLoading(true);
      dispatch(tagJob({ payload, navigate }));
      closeTag();
    } catch (error) {
      toast.error("Error tagging job.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (jobTagMeta?.isSuccess) {
      dispatch(tagReset());
      setLoading(false);
    }
    if (jobTagMeta?.isError) {
      dispatch(tagReset());
      setLoading(false);
    }
  }, [jobTagMeta?.isSuccess, jobTagMeta?.isError]);

  return (
    <Button
      className="btn btn-sm btn-custom-primary px-3 py-0 d-flex align-items-center justify-content-center"
      onClick={() => handleTag(data?.id)}
      style={{ width: "50px" }}
      disabled={loading}
    >
      <span className="fs-6">
        {loading ? (
          <Spinner style={{ width: "12px", height: "12px" }} />
        ) : (
          "Tag"
        )}
      </span>
    </Button>
  );
}
