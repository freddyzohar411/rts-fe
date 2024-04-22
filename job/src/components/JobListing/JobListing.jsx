import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import {
  Badge,
  Button,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Row,
  Col,
  Label,
  DropdownItem,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import "./JobListing.scss";
import { DateHelper, useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper } from "@workspace/common";
import { JOB_INITIAL_OPTIONS } from "./JobListingConstants";
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
} from "../../store/jobList/action";
import { cloneJob } from "../../store/job/action";
import { useUserAuth } from "@workspace/login";
import { RECRUITER_GROUP } from "../../helpers/constant";
import JobTagCanvas from "./JobTagCanvas";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { truncate } from "@workspace/common/src/helpers/string_helper";
import ActionDropDown from "@workspace/common/src/Components/DynamicTable/Components/ActionDropDown";

const JobListing = () => {
  const { Permission, checkAllPermission, checkAnyRole, Role } = useUserAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobType } = useParams();
  const jobsData = useSelector((state) => state.JobListReducer.jobs);
  const jobsFields = useSelector((state) => state?.JobListReducer?.jobsFields);

  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
  );
  const jobFODMeta = useSelector((state) => state.JobListReducer.jobFODMeta);
  const deleteFODMeta = useSelector(
    (state) => state.JobListReducer.deleteFODMeta
  );
  const userProfile = useSelector((state) => state.Profile.userProfile);

  // Table state
  const [tableConfig, setTableConfig] = useState([]);

  // Dropdown State
  const [fodAssign, setFodAssign] = useState({});
  const [namesData, setNamesData] = useState([]);
  const [activeJob, setActiveJob] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState([]);
  const [gridView, setGridView] = useState(jobType ?? "all_jobs");
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Placeholder Recruiter Name List
  const [nestedVisible, setNestedVisible] = useState([]);
  const [tagOffcanvas, setTagOffcanvas] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
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
          <Link
            to={`/jobs/${data.id}/snapshot`}
            className="text-custom-primary text-decoration-underline"
          >
            <span>{data?.jobSubmissionData?.jobTitle}</span>
          </Link>
        );
      },
    },
  ];

  // Clone Job Function
  const handleCloneJob = (cloneJobId) => {
    const payload = {
      id: cloneJobId,
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
  } = useTableHook(
    {
      page: 0,
      pageSize: 20,
      sortBy: null,
      sortDirection: "asc",
      searchTerm: null,
      searchFields:
        DynamicTableHelper.generateSeachFieldArray(JOB_INITIAL_OPTIONS),
    },
    JOB_INITIAL_OPTIONS,
    customRenderList
  );

  function MyComponent({ pageRequest, gridView }) {
    const memoizedDispatch = useCallback(() => {
      const request = { ...pageRequest, jobType: gridView };
      dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
    }, [pageRequest, gridView]);

    useEffect(() => {
      memoizedDispatch();
    }, [memoizedDispatch]);
  }

  useEffect(() => {
    if (recruiterGroup?.users?.length > 0) {
      const users = [];

      recruiterGroup?.users?.map((user) => {
        users?.push(user?.id + "@" + user?.firstName + " " + user?.lastName);
      });
      const data = [{ name: recruiterGroup?.userGroupName, subNames: users }];
      setNamesData(data);
    }
  }, [recruiterGroup]);

  // Get all the option groups
  useEffect(() => {
    dispatch(fetchJobListsFields());
    dispatch(fetchUserGroupByName(RECRUITER_GROUP));
  }, []);

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    const request = { ...pageRequest, jobType: gridView };
    dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
  }, [JSON.stringify(pageRequest)]);

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

  const handleTableViewChange = (e) => {
    setGridView(e.target.value);
    setActiveJob([]);
  };

  const handleFodAssignDropdown = (dataId) => {
    setFodAssign((prevStates) => ({
      ...prevStates,
      [dataId]: !prevStates[dataId],
    }));
  };

  const toggleNested = (index) => {
    setNestedVisible((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
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
      setFodAssign({});
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

  //========================== User Setup ============================
  // This will vary with the table main page. Each table have it own config with additional columns
  const generateJobListConfig = (customConfig) => {
    return [
      {
        header: "#",
        name: "indexing",
        sort: false,
        sortValue: "indexing",
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
        sortValue: "checkbox",
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
      // {
      //   name: "badges",
      //   sort: false,
      //   sortValue: "badges",
      //   render: () => (
      //     <div className="d-flex column-gap-2">
      //       <Badge color="dark">10</Badge>
      //     </div>
      //   ),
      // },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        sticky: "right",
        expand: true,
        render: (data) => (
          <ActionDropDown>
            {checkAllPermission([Permission.JOB_EDIT]) &&
              (gridView === "new_job" || gridView === "active_jobs") && (
                <DropdownItem>
                  <Dropdown
                    isOpen={fodAssign[data.id] || false}
                    toggle={() => handleFodAssignDropdown(data.id)}
                  >
                    <DropdownToggle
                      className="btn btn-sm btn-custom-primary table-btn"
                      style={{ fontSize: "0.65rem" }}
                      onClick={() => {
                        setActiveJob([data.id]);
                        setSelectedRecruiter([]);
                      }}
                    >
                      FOD
                    </DropdownToggle>
                    <DropdownMenu className="p-3" style={{ width: "200px" }}>
                      {/* Map Recruiter Checkbox Here */}
                      <Row className="mb-2">
                        <Col>
                          <div className="search-box">
                            <Input
                              className="form-control form-control-sm"
                              placeholder="Search.."
                              type="text"
                            />
                            <i className="ri-search-eye-line search-icon"></i>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <ul className="ps-0 list-unstyled">
                            {namesData?.map((item, index) => (
                              <li key={index}>
                                <div
                                  className="d-flex flex-row justify-content-between mb-1 cursor-pointer"
                                  onClick={() => toggleNested(index)}
                                >
                                  <span>{item.name}</span>
                                  <span>
                                    {nestedVisible[index] ? "-" : "+"}
                                  </span>
                                </div>
                                {nestedVisible[index] && (
                                  <ul className="d-flex flex-row justify-content-start gap-3 ps-0 ms-0">
                                    <div className="ps-0 ms-0 w-100">
                                      <SimpleBar
                                        className="simplebar-hght"
                                        autoHide={false}
                                      >
                                        {item.subNames.map(
                                          (subName, subIndex) => {
                                            const split = subName?.split("@");
                                            return (
                                              <li
                                                key={subIndex}
                                                className="d-flex flew-row align-items-center justify-content-between me-3"
                                              >
                                                {truncate(split[1], 16)}
                                                <Label
                                                  check
                                                  className="d-flex flex-row align-items-center gap-2 mb-0 ms-2"
                                                >
                                                  <Input
                                                    type="checkbox"
                                                    checked={selectedRecruiter.includes(
                                                      parseInt(split[0])
                                                    )}
                                                    onChange={(e) =>
                                                      handleFODCheck(
                                                        parseInt(split[0]),
                                                        e.target.checked
                                                      )
                                                    }
                                                  />
                                                </Label>
                                              </li>
                                            );
                                          }
                                        )}
                                      </SimpleBar>
                                    </div>
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="d-flex justify-content-end">
                            <Button
                              type="submit"
                              className="btn btn-sm btn-custom-primary px-3"
                              onClick={() => handleFODAssign()}
                            >
                              Assign
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </DropdownMenu>
                  </Dropdown>
                </DropdownItem>
              )}
            {checkAllPermission([Permission.JOB_EDIT]) && (
              <DropdownItem>
                <span
                  onClick={() => {
                    setSelectedRowData(data);
                    setTagOffcanvas(!tagOffcanvas);
                  }}
                >
                  <div className="d-flex  align-items-center gap-2">
                    <i className="ri-parent-fill"></i>
                    <span>Tag</span>
                  </div>
                </span>
              </DropdownItem>
            )}
            {/* Clone Button */}
            <DropdownItem>
              <span onClick={() => handleCloneJob(data.id)}>
                <div className="d-flex  align-items-center gap-2">
                  <i className="mdi mdi-content-copy"></i>
                  <span>Clone</span>
                </div>
              </span>
            </DropdownItem>
            <DropdownItem>
              <Link
                to={`/jobs/${data.id}/snapshot`}
                style={{ color: "black" }}
                state={{ view: true }}
              >
                <div className="d-flex  align-items-center gap-2">
                  <i className="ri-eye-line"></i>
                  <span>View</span>
                </div>
              </Link>
            </DropdownItem>

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
                    className="btn btn-danger table-btn"
                    onClick={() => {
                      setDeleteId(data.id);
                      setIsDeleteModalOpen(true);
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <i className="mdi mdi-delete"></i>
                      <span>Delete</span>
                    </div>
                  </span>
                </DropdownItem>
              )}
          </ActionDropDown>
        ),
      },
    ];
  };
  // ==================================================================

  useEffect(() => {
    setTableConfig(generateJobListConfig(customConfig));
  }, [customConfig, pageInfo, activeRow, tableData]);

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
        header="Jobs"
        activeRow={activeRow}
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
