import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import { RiInformationFill } from "react-icons/ri";
import { Badge, Input, DropdownItem } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import "./JobListing.scss";
import { DateHelper, useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper } from "@workspace/common";
import {
  JOB_INITIAL_OPTIONS,
  JOB_MANDATORY_OPTIONS,
} from "./JobListingConstants";
import { DeleteCustomModal } from "@workspace/common";
import {
  createJobFOD,
  deleteJobList,
  fetchJobLists,
  fetchJobListsFields,
  fetchUserGroupByName,
  deleteFOD,
  deleteFODReset,
  createJobFODReset,
  resetJobList,
} from "../../store/jobList/action";
import { cloneJob } from "../../store/job/action";
import { useUserAuth } from "@workspace/login";
import { RECRUITER_GROUP } from "../../helpers/constant";
import JobTagCanvas from "./JobTagCanvas";
import "simplebar/dist/simplebar.min.css";
import ActionDropDown from "@workspace/common/src/Components/DynamicTable/Components/ActionDropDown";
import { generateId } from "@workspace/common/src/helpers/generate_id_helper";
import ShowCountModal from "@workspace/common/src/Components/ShowCountModal/ShowCountModal";
import { fetchJobtimeineCount } from "../../store/actions";

const JobListing = () => {
  const { Permission, checkAllPermission, checkAnyRole, Role } = useUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobType } = useParams();
  const jobsData = useSelector((state) => state.JobListReducer.jobs);
  const jobsFields = useSelector((state) => state?.JobListReducer?.jobsFields);
  const jobFODMeta = useSelector((state) => state.JobListReducer.jobFODMeta);
  const deleteFODMeta = useSelector(
    (state) => state.JobListReducer.deleteFODMeta
  );
  const userProfile = useSelector((state) => state.Profile.userProfile);

  // Table state
  const [tableConfig, setTableConfig] = useState([]);

  // Dropdown State
  const [activeJob, setActiveJob] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState([]);
  const [gridView, setGridView] = useState(jobType ?? "all_jobs");
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [countJobId, setCountJobId] = useState(null);

  // Placeholder Recruiter Name List
  const [tagOffcanvas, setTagOffcanvas] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Action Loader State
  const [isActionLoadingId, setIsActionLoadingId] = useState(null);
  const isCloneJobLoading = useSelector((state) => state.JobReducer.loading);

  // Show modal states
  const [showCountModalOpen, setShowCountModalOpen] = useState(false);

  const hasPageRendered = useRef(false);

  const isFOD = gridView === "fod";
  const showDelete = gridView === "fod" || gridView === "active_jobs";

  // Custom renders
  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          DynamicTableHelper.getDynamicNestedResult(data, opt.value) || "-"
        ),
    },
    {
      names: ["jobSubmissionData.visaStatus"],
      render: (data, opt) => (
        <Badge color={"success"} className="text-uppercase">
          {DynamicTableHelper.getDynamicNestedResult(data, opt.value) || "-"}
        </Badge>
      ),
    },
    {
      names: ["jobSubmissionData.jobTitle"],
      render: (data) => {
        return (
          <>
            <Link
              to={`/jobs/${data.id}/snapshot`}
              className="text-custom-primary text-decoration-underline"
            >
              <span>{data?.jobSubmissionData?.jobTitle}</span>
            </Link>
            <span
              className="info-icon"
              onClick={() => {
                handleInfoIconClick(data?.id);
              }}
            >
              <RiInformationFill size={18} />
            </span>
          </>
        );
      },
    },
    {
      names: ["jobSubmissionData.accountOwner"],
      render: (data) => {
        const owner = data?.jobSubmissionData?.accountOwner
          ?.split("(")?.[0]
          ?.trim();
        return <span>{owner}</span>;
      },
    },
  ];

  // Clone Job Function
  const handleCloneJob = async (data) => {
    setIsActionLoadingId((prev) => data?.id);
    const jobId = data?.id;
    const pulseJobId = data?.jobSubmissionData?.jobId;
    const pulseInitial = pulseJobId.split("-")[0].substring(1);
    const countryISO = pulseInitial.match(/^[A-Za-z]{2,3}/)?.[0] ?? "";
    const cloneJobId = await generateId("J", countryISO, "job");
    const payload = {
      id: jobId,
      cloneJobId: cloneJobId,
      clone: true,
    };
    dispatch(cloneJob({ payload, navigate: navigate }));
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
    handleRowCheck,
    selectAllRows,
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
    JOB_MANDATORY_OPTIONS,
    JOB_INITIAL_OPTIONS,
    customRenderList
  );

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchJobListsFields());
    dispatch(fetchUserGroupByName(RECRUITER_GROUP));
    return () => {
      dispatch(resetJobList());
    };
  }, []);

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    const request = { ...pageRequest, jobType: gridView };
    if (pageRequest?.searchFields?.length > 0) {
      setActiveRow([]);
      dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
    }
  }, [JSON.stringify({ ...pageRequest, jobType: gridView }), gridView]);

  useEffect(() => {
    if (hasPageRendered.current) {
      pageRequestSet.setPage(0);
    }
    hasPageRendered.current = true;
  }, [gridView]);

  // Update the page info when job Data changes
  useEffect(() => {
    if (jobsData) {
      setPageInfoData(jobsData);
    }
    setTableData(jobsData?.jobs);
  }, [jobsData]);

  useEffect(() => {
    if (deleteFODMeta?.isSuccess) {
      setGridView("new_job");
      dispatch(deleteFODReset());
      setActiveJob([]);
    }
  }, [deleteFODMeta]);

  useEffect(() => {
    if (jobFODMeta?.isSuccess) {
      setGridView("fod");
      dispatch(createJobFODReset());
      setActiveJob([]);
    }
  }, [jobFODMeta]);

  useEffect(() => {
    if (countJobId) {
      dispatch(fetchJobtimeineCount({ jobId: countJobId }));
    }
  }, [countJobId]);

  const handleTableViewChange = (e) => {
    setGridView(e.target.value);
    setActiveJob([]);
  };

  const selectAllJobs = (isChecked) => {
    selectAllRows(isChecked);
    if (isChecked) {
      if (jobsData?.jobs) {
        const ids = [];
        jobsData?.jobs?.forEach((item) => {
          ids.push(item?.id);
        });
        setActiveJob(ids);
      }
    } else {
      setActiveJob([]);
    }
  };

  const handleJobCheck = (id, checked) => {
    handleRowCheck(id, checked);
    if (checked) {
      setActiveJob([...activeJob, id]);
    } else {
      const updatedVal = activeJob?.filter((sid) => sid !== id);
      setActiveJob(updatedVal);
    }
  };

  const handleFODCheck = (id, checked) => {
    if (checked) {
      setSelectedRecruiter([...selectedRecruiter, id]);
    } else {
      const updatedVal = selectedRecruiter?.filter((sid) => sid !== id);
      setSelectedRecruiter(updatedVal);
    }
  };

  const handleFODAssign = () => {
    if (activeJob?.length === 0) {
      toast.error("Please select a job.");
    } else if (selectedRecruiter?.length > 0) {
      dispatch(
        createJobFOD({ jobId: activeJob, recruiterId: selectedRecruiter })
      );
    } else {
      toast.error("Please select a recruiter.");
    }
  };

  // Modal Delete
  const confirmDelete = () => {
    if (isFOD) {
      dispatch(deleteFOD({ jobId: deleteId }));
      setIsDeleteModalOpen(false);
    } else {
      dispatch(deleteJobList({ deleteId, isDraft: false }));
      setIsDeleteModalOpen(false);
    }
  };

  // Modal ShowCount
  const handleInfoIconClick = (jobId) => {
    setShowCountModalOpen(true);
    setCountJobId(jobId);
  };

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateJobListConfig = (customConfig) => {
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
              id="checkbox"
              checked={
                activeJob?.length > 0 &&
                activeJob?.length === jobsData?.jobs?.length
              }
              onChange={(e) => selectAllJobs(e?.target?.checked)}
            />
          </div>
        ),
        name: "checkbox",
        sort: false,
        render: (data) => {
          return (
            <div className="form-check">
              <Input
                className="form-check-input"
                type="checkbox"
                checked={activeJob.includes(parseInt(data?.id))}
                onChange={(e) => handleJobCheck(data?.id, e.target.checked)}
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
        sticky: "right",
        expand: true,
        center: true,
        render: (data) => {
          return (
            <>
              <ActionDropDown
                isLoading={
                  isCloneJobLoading && data?.id == isActionLoadingId
                    ? true
                    : false
                }
              >
                {checkAllPermission([Permission.JOB_EDIT]) && (
                  <DropdownItem>
                    <span
                      onClick={() => {
                        setSelectedRowData(data);
                        setTagOffcanvas(!tagOffcanvas);
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        <i className="ri-parent-fill"></i>
                        <span>Tag</span>
                      </div>
                    </span>
                  </DropdownItem>
                )}
                {/* Clone Button */}
                {checkAnyRole([Role.ADMIN, Role.SUPER_ADMIN]) && (
                  <DropdownItem>
                    <span onClick={() => handleCloneJob(data)}>
                      <div className="d-flex  align-items-center gap-2">
                        <i className="mdi mdi-content-copy"></i>
                        <span>Clone</span>
                      </div>
                    </span>
                  </DropdownItem>
                )}
                {checkAllPermission([Permission.JOB_EDIT]) && (
                  <DropdownItem>
                    <Link
                      to={`/jobs/${data.id}/snapshot`}
                      style={{ color: "black" }}
                      state={{ view: false }}
                    >
                      <div className="d-flex  align-items-center gap-2">
                        <i className="mdi mdi-pencil"></i>
                        <span>Edit</span>
                      </div>
                    </Link>
                  </DropdownItem>
                )}
                {checkAllPermission([Permission.JOB_DELETE]) &&
                  showDelete &&
                  (userProfile?.id === data?.createdBy ||
                    checkAnyRole([Role.ADMIN])) && (
                    <DropdownItem>
                      <span
                        type="button"
                        onClick={() => {
                          setDeleteId(data.id);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          {isFOD ? (
                            <>
                              <i className="mdi mdi-minus-circle"></i>
                              <span>Unassign</span>
                            </>
                          ) : (
                            <>
                              <i className="mdi mdi-delete"></i>
                              <span>Delete</span>
                            </>
                          )}
                        </div>
                      </span>
                    </DropdownItem>
                  )}
              </ActionDropDown>
            </>
          );
        },
      },
    ];
  };
  // ==================================================================

  useEffect(() => {
    if (tableConfig) {
      const newConfig = generateJobListConfig(customConfig);
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
      setTableConfig(generateJobListConfig(customConfig));
    }
  }, [
    customConfig,
    pageInfo,
    activeRow,
    tableData,
    isActionLoadingId,
    isCloneJobLoading,
  ]);

  return (
    <LoadingOverlay
      active={(jobFODMeta?.isLoading || deleteFODMeta?.isLoading) ?? false}
      spinner
      text="Please wait..."
    >
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        header={isFOD ? "Delete FOD" : "Delete Job"}
        deleteText={`Are you sure you would like to delete this ${
          isFOD ? "fod" : "job"
        }?`}
      />

      <ShowCountModal
        isOpen={showCountModalOpen}
        closeModal={() => setShowCountModalOpen(false)}
        jobData={jobsData?.jobs?.find((it) => it?.id === countJobId) ?? null}
      />

      <DynamicTableWrapper
        data={jobsData?.jobs ?? []}
        config={tableConfig}
        pageInfo={pageInfo}
        pageRequest={pageRequest}
        pageRequestSet={pageRequestSet}
        search={search}
        setSearch={setSearch}
        optGroup={jobsFields}
        setCustomConfigData={setCustomConfigData}
        gridView={gridView}
        handleTableViewChange={handleTableViewChange}
        operations={{
          handleJobCheck: handleJobCheck,
          handleFODCheck: handleFODCheck,
          handleFODAssign: handleFODAssign,
          activeJob: activeJob,
          selectedRecruiter: selectedRecruiter,
          setActiveJob: setActiveJob,
          setSelectedRecruiter: setSelectedRecruiter,
        }}
        activeRow={activeRow}
        setActiveRow={setActiveRow}
        setTableConfig={setTableConfig}
      />
      <JobTagCanvas
        tagOffcanvas={tagOffcanvas}
        setTagOffcanvas={setTagOffcanvas}
        selectedRowData={selectedRowData}
      />
    </LoadingOverlay>
  );
};

export default JobListing;
