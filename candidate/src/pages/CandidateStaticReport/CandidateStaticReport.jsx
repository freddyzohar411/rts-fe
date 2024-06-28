import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Badge } from "reactstrap";
import { Link } from "react-router-dom";
import {
  staticColumns,
  CANDIDATE_STATIC_INITIAL_OPTIONS,
  CANDIDATE_STATIC_MANDATORY_OPTIONS,
} from "./CandidateStaticConstants";
import "./CandidateStaticReport.scss";
import { useSelector, useDispatch } from "react-redux";
import { DynamicTableHelper, useTableHook } from "@workspace/common";
import {
  fetchCandidateStaticReportCount,
  fetchCandidateStaticReportListing,
} from "../../store/candidate/action";
import DynamicTableWrapper from "./DynamicTableWrapper";

function CandidateStaticReport() {
  document.title = "Candidate Static Report | RTS";

  const dispatch = useDispatch();
  const candidateStaticReportCount = useSelector(
    (state) => state?.CandidateReducer?.candidateStaticReportCount
  );
  const candidateStaticReportListing = useSelector(
    (state) => state?.CandidateReducer?.candidateStaticReportListing
  );

  // Table State
  const [tableConfig, setTableConfig] = useState(null);

  // Custom Renders
  const customRenderList = [];

  // Calculate Ageing
  const calculateAgeing = (createdAt) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const diffTime = Math.abs(currentDate - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getBadgeColour = (status) => {
    if (
      status?.includes("Withdrawn") ||
      status === "Backout-Candidate" ||
      status?.includes("Rejected")
    ) {
      return "danger";
    } else {
      return "success";
    }
  };

  // User Setup
  const generateCandidateStaticReportConfig = (customConfig) => {
    return [
      {
        header: "Client Name",
        name: "clientName",
        sort: true,
        sortValue: "job.job_submission_data.accountName",
        expand: true,
        render: (data) => (
          <div>{data?.job?.jobSubmissionData?.accountName}</div>
        ),
      },
      {
        header: "Job Title",
        name: "jobTitle",
        sort: true,
        sortValue: "candidate.candidate_submission_data.firstName",
        expand: true,
        render: (data) => (
          <div>
            <Link
              className="text-decoration-underline"
              to={`/jobs/${data?.job?.id}/snapshot`}
              style={{ color: "#0a56ae" }}
            >
              {data?.job?.jobSubmissionData?.jobTitle}
            </Link>
          </div>
        ),
      },
      {
        header: "Pulse Job ID",
        name: "candidateName",
        sort: true,
        sortValue: "jobs.job_submission_data.jobId",
        expand: true,
        render: (data) => (
          <div>
            <Link
              className="text-decoration-underline"
              to={`/jobs/${data?.job?.id}/snapshot`}
              style={{ color: "#0a56ae" }}
            >
              {data?.job?.jobSubmissionData?.jobId
                ? data?.job?.jobSubmissionData?.jobId
                : "-"}
            </Link>
          </div>
        ),
      },
      ...customConfig,
      {
        header: "Candidate Name",
        name: "candidateName",
        sort: true,
        sortValue: "candidate.candidate_submission_data.firstName",
        expand: true,
        render: (data) => (
          <div>
            <Link
              className="text-decoration-underline"
              to={`/candidates/${data?.candidate?.id}/snapshot`}
              style={{ color: "#0a56ae" }}
            >
              {data?.candidate?.candidateSubmissionData?.firstName}{" "}
              {data?.candidate?.candidateSubmissionData?.lastName}
            </Link>
          </div>
        ),
      },
      {
        header: "Current Candidate Status",
        name: "data.subStepName",
        sort: true,
        sortValue: "sub_step_name",
        expand: true,
        render: (data) => (
          <Badge color={getBadgeColour(data?.subStepName)}>
            {data?.subStepName ? data?.subStepName : "N/A"}
          </Badge>
        ),
      },
      {
        header: "Ageing",
        name: "ageing",
        sort: true,
        sortValue: "created_at",
        expand: true,
        render: (data) => <div>{calculateAgeing(data?.createdAt)} Days</div>,
      },
    ];
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
    setTableData,
    tableData,
    activeRow,
    setActiveRow,
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields: DynamicTableHelper.generateSeachFieldArray([]),
    },
    CANDIDATE_STATIC_MANDATORY_OPTIONS,
    CANDIDATE_STATIC_INITIAL_OPTIONS,
    customRenderList,
    generateCandidateStaticReportConfig
  );

  // Counting: Start
  useEffect(() => {
    dispatch(fetchCandidateStaticReportCount());
  }, []);

  const getCount = (itemKey) => {
    let jobCount = 0;
    switch (itemKey) {
      case "New Requirements":
        jobCount = candidateStaticReportCount.newRequirementsCount ?? 0;
        break;
      case "Active Requirements":
        jobCount = candidateStaticReportCount.activeRequirementsCount ?? 0;
        break;
      case "Associated":
        jobCount = candidateStaticReportCount.associatedCount ?? 0;
        break;
      case "Submitted to Sales":
        jobCount = candidateStaticReportCount.submitToSalesCount ?? 0;
        break;
      case "Submitted to Client":
        jobCount = candidateStaticReportCount.submitToClientCount ?? 0;
        break;
      case "Interview Scheduled":
        jobCount = candidateStaticReportCount.interviewScheduledCount ?? 0;
        break;
      case "Interview Happened":
        jobCount = candidateStaticReportCount.interviewHappenedCount ?? 0;
        break;
      case "Selected":
        jobCount = candidateStaticReportCount.selectedCount ?? 0;
        break;
      case "Rejected":
        jobCount = candidateStaticReportCount.rejectedCount ?? 0;
        break;
      case "No Submission":
        jobCount = candidateStaticReportCount.noSubmissionsCount ?? 0;
        break;
      default:
        jobCount = 0;
        break;
    }
    return jobCount;
  };
  // Counting: End

  const hasPageRendered = useRef(false);

  // Get all option groups

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    dispatch(
      fetchCandidateStaticReportListing(
        DynamicTableHelper.cleanPageRequest(pageRequest)
      )
    );
  }, [pageRequest]);

  useEffect(() => {
    if (candidateStaticReportListing) {
      setPageInfoData(candidateStaticReportListing);
      setTableData(candidateStaticReportListing?.jobs);
    }
  }, [candidateStaticReportListing]);

  useEffect(() => {
    if (tableConfig) {
      const newConfig = generateCandidateStaticReportConfig(customConfig);
      newConfig.forEach((item, index) => {
        const oldConfig = tableConfig?.find(
          (oldItem) => oldItem?.name === item?.name
        );
        // If cannot find then continue
        if (!oldConfig) return;
        if (oldConfig?.expand) {
          newConfig[index].expand = true;
        } else {
          newConfig[index].expand = false;
        }
      });
      setTableConfig(newConfig);
    } else {
      setTableConfig(generateCandidateStaticReportConfig(customConfig));
    }
  }, [customConfig, pageInfo, activeRow, tableData]);

  // Check if page has re-rendered
  useEffect(() => {
    if (hasPageRendered.current) {
      pageRequestSet.setPage(0);
    }
    hasPageRendered.current = true;
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="p-0">
          <Row className="sticky-header sticky-static-candidate-header">
            <Col>
              <div className="static-grid">
                {staticColumns.map((item, index) => (
                  <div className="static-grid-item" key={index}>
                    <div className="d-flex flex-column">
                      <span className="static-header-title">{item}</span>
                      <span className="static-header-count">
                        {getCount(item)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <div className="p-2">
            {/* Table */}
            <DynamicTableWrapper
              data={candidateStaticReportListing.jobs ?? []}
              config={tableConfig}
              pageInfo={pageInfo}
              pageRequest={pageRequest}
              pageRequestSet={pageRequestSet}
              search={search}
              setSearch={setSearch}
              // optGroup={candidatesFields}
              setCustomConfigData={setCustomConfigData}
              header="Candidates Static Report"
              activeRow={activeRow}
              setActiveRow={setActiveRow}
              setTableConfig={setTableConfig}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CandidateStaticReport;
