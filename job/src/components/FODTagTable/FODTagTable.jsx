import React, { useEffect, useState } from "react";
import { Button, Input } from "reactstrap";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCandidatesFields,
  candidateRecommendationList,
  resetCandidateRecommendationList,
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
  const fodTableType = {
    Recommendation: "Recommendation",
    All: "All",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [abortController, setAbortController] = useState(null);
  const [customQuery, setCustomQuery] = useState(null);
  const [fodTableShowType, setFODTableShowType] = useState({
    label: fodTableType.Recommendation,
    value: fodTableType.Recommendation,
  });
  const [tableConfig, setTableConfig] = useState([]);

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
      pageSize: 10,
      sortBy: null,
      sortDirection: null,
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray(
        CANDIDATE_INITIAL_OPTIONS
      ),
    },
    [],
    CANDIDATE_INITIAL_OPTIONS,
    customRenderList
  );

  // Fetch candidate recommendation list
  useEffect(() => {
    // Only create a new abort controller when tagOffcanvas is true
    if (tagOffcanvas) {
      setSelected([]);
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      const jobPageRequest = { ...pageRequest, jobId: selectedRowData?.id };
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
  }, [
    pageRequest,
    selectedRowData?.id,
    tagOffcanvas,
    customQuery,
    fodTableShowType,
  ]);

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
              jobId={selectedRowData?.id}
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
          <Button
            className="btn btn-sm btn-custom-primary px-3 py-0"
            onClick={() => handleTag(data?.id)}
          >
            <span className="fs-6">Tag</span>
          </Button>
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
};

export default FODTagTable;
