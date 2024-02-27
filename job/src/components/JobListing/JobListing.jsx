import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
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
  fetchJobsAdmin,
} from "../../store/jobList/action";
import { useUserAuth } from "@workspace/login";
import { RECRUITER_GROUP } from "../../helpers/constant";
import JobTagCanvas from "./JobTagCanvas";

const JobListing = () => {
  const { Permission, checkAllPermission, checkAnyRole, Role } = useUserAuth();
  const dispatch = useDispatch();
  const { jobType } = useParams();
  console.log("Job Type: ", jobType);

  const jobsData = useSelector((state) => state.JobListReducer.jobs);
  const jobsFields = useSelector((state) => state.JobListReducer.jobsFields);
  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
  );

  // Dropdown State
  const [fodAssign, setFodAssign] = useState({});
  const [namesData, setNamesData] = useState([]);
  const [activeJob, setActiveJob] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState([]);
  const [gridView, setGridView] = useState(jobType);
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Placeholder Recruiter Name List
  const [nestedVisible, setNestedVisible] = useState([]);
  const [tagOffcanvas, setTagOffcanvas] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

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
  ];

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
      searchFields:
        DynamicTableHelper.generateSeachFieldArray(JOB_INITIAL_OPTIONS),
    },
    JOB_INITIAL_OPTIONS,
    customRenderList
  );

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

  console.log("Grid View: ", gridView);

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    const request = { ...pageRequest, jobType: gridView };
    if (checkAnyRole([Role.ADMIN])) {
      dispatch(fetchJobsAdmin(DynamicTableHelper.cleanPageRequest(request)));
    } else {
      dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
    }
  }, [pageRequest, gridView]);

  // Update the page info when job Data changes
  useEffect(() => {
    if (jobsData) {
      setPageInfoData(jobsData);
    }
  }, [jobsData]);

  const handleTableViewChange = (e) => {
    setGridView(e.target.value);
    const request = { ...pageRequest, page: 0, jobType: e.target.value };
    dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
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
    dispatch(deleteJobList({ deleteId, isDraft: false }));
    setIsDeleteModalOpen(false);
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
          <div className="d-flex column-gap-2">{index + 1}.</div>
        ),
      },
      {
        header: (
          <div className="form-check">
            <Input
              className="form-check-input"
              type="checkbox"
              id="checkbox"
              checked={activeJob?.length === jobsData?.jobs?.length}
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
      {
        name: "badges",
        sort: false,
        sortValue: "badges",
        render: () => (
          <div className="d-flex column-gap-2">
            <Badge color="dark">10</Badge>
          </div>
        ),
      },
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        render: (data) => (
          <div className="d-flex column-gap-2">
            {checkAllPermission([Permission.CANDIDATE_WRITE]) && (
              <Dropdown
                isOpen={fodAssign[data.id] || false}
                toggle={() => handleFodAssignDropdown(data.id)}
              >
                <DropdownToggle
                  className="btn btn-sm btn-custom-primary"
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
                              <span>{nestedVisible[index] ? "-" : "+"}</span>
                            </div>
                            {nestedVisible[index] && (
                              <ul className="d-flex flex-row justify-content-start gap-3 ps-0 ms-0">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                  <div className="styled-dropdown ball-1"></div>
                                  <div className="styled-line"></div>
                                  <div className="styled-dropdown ball-2"></div>
                                </div>
                                <div className="ps-0 ms-0 w-100">
                                  {item.subNames.map((subName, subIndex) => {
                                    const split = subName?.split("@");
                                    return (
                                      <li
                                        key={subIndex}
                                        className="d-flex flew-row align-items-center justify-content-between"
                                      >
                                        {split[1]}
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
                                  })}
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
            )}
            {checkAllPermission([Permission.JOB_EDIT]) && (
              <Button
                tag="button"
                className="btn btn-sm btn-custom-primary table-btn"
                onClick={() => {
                  setSelectedRowData(data);
                  setTagOffcanvas(!tagOffcanvas);
                }}
              >
                <i className="ri-parent-fill"></i>
              </Button>
            )}

            <Link
              to={`/jobs/${data.id}/snapshot`}
              style={{ color: "black" }}
              state={{ view: true }}
            >
              <Button
                type="button"
                className="btn btn-custom-primary table-btn"
              >
                <i className="ri-eye-line"></i>
              </Button>
            </Link>

            {checkAllPermission([Permission.JOB_EDIT]) && (
              <Link
                to={`/jobs/${data.id}/snapshot`}
                style={{ color: "black" }}
                state={{ view: false }}
              >
                <Button
                  type="button"
                  className="btn btn-custom-primary table-btn"
                >
                  <i className="mdi mdi-pencil"></i>
                </Button>
              </Link>
            )}

            {checkAllPermission([Permission.JOB_DELETE]) && (
              <Button
                type="button"
                className="btn btn-danger table-btn"
                onClick={() => {
                  setDeleteId(data.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <span>
                  <i className="mdi mdi-delete"></i>
                </span>
              </Button>
            )}
          </div>
        ),
      },
    ];
  };
  // ==================================================================

  return (
    <>
      <DeleteCustomModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        confirmDelete={confirmDelete}
        header="Delete Job"
        deleteText={"Are you sure you would like to delete this job?"}
      />
      <DynamicTableWrapper
        data={jobsData?.jobs ?? []}
        config={generateJobListConfig(customConfig)}
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
      />
      <JobTagCanvas
        tagOffcanvas={tagOffcanvas}
        setTagOffcanvas={setTagOffcanvas}
        selectedRowData={selectedRowData}
      />
    </>
  );
};

export default JobListing;
