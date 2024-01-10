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
import { DateHelper, useTableHook } from "@workspace/common";
import DynamicTableWrapper from "../../components/dynamicTable/DynamicTableWrapper";
import { DynamicTableHelper } from "@workspace/common";
import { JOB_INITIAL_OPTIONS } from "./jobListingConstants";
import { DeleteCustomModal } from "@workspace/common";
import {
  createJobFOD,
  deleteJobList,
  fetchJobLists,
  fetchJobListsFields,
  fetchUserGroupByName,
} from "../../store/jobList/action";
import { useUserAuth } from "@workspace/login";
import { RECRUITER_GROUP } from "../../helpers/constant";

const JobListing = () => {
  const { Permission, checkAllPermission } = useUserAuth();
  const dispatch = useDispatch();
  const { jobType } = useParams();

  const jobsData = useSelector((state) => state.JobListReducer.jobs);
  const jobsFields = useSelector((state) => state.JobListReducer.jobsFields);
  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
  );

  // Dropdown State
  const [fodAssign, setFodAssign] = useState({});
  const [namesData, setNamesData] = useState([]);
  const [activeJob, setActiveJob] = useState(-1);
  const [selectedRecruiter, setSelectedRecruiter] = useState();
  const [gridView, setGridView] = useState(jobType);
  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Placeholder Recruiter Name List
  const [nestedVisible, setNestedVisible] = useState([]);

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

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    const request = { ...pageRequest, jobType };
    console.log();
    dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
  }, [pageRequest]);

  // Update the page info when job Data changes
  useEffect(() => {
    if (jobsData) {
      setPageInfoData(jobsData);
    }
  }, [jobsData]);

  const handleTableViewChange = (e) => {
    setGridView(e.target.value);
    console.log("test page", pageRequest);

    const request = { ...pageRequest, page: 0, jobType: e.target.value };
    console.log("test request", request);

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

  const handleFODAssign = () => {
    if (selectedRecruiter) {
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
            <Dropdown
              isOpen={fodAssign[data.id] || false}
              toggle={() => handleFodAssignDropdown(data.id)}
            >
              <DropdownToggle
                className="btn btn-sm btn-custom-primary"
                onClick={() => {
                  setActiveJob(data.id);
                  setSelectedRecruiter();
                }}
              >
                FOD
              </DropdownToggle>
              <DropdownMenu className="p-3">
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
                            className="d-flex flex-row justify-content-between mb-1"
                            onClick={() => toggleNested(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <span>{item.name}</span>
                            <span>{nestedVisible[index] ? "-" : "+"}</span>
                          </div>
                          {nestedVisible[index] && (
                            <ul
                              style={{
                                listStyleType: "circle",
                                paddingLeft: "20px",
                              }}
                            >
                              {item.subNames.map((subName, subIndex) => {
                                const split = subName?.split("@");
                                return (
                                  <li
                                    key={subIndex}
                                    className="d-flex flew-row justify-content-between"
                                  >
                                    {split[1]}
                                    <Label check className="mb-0 ms-2">
                                      <Input
                                        type="checkbox"
                                        checked={
                                          selectedRecruiter ===
                                          parseInt(split[0])
                                        }
                                        onChange={() =>
                                          setSelectedRecruiter(
                                            parseInt(split[0])
                                          )
                                        }
                                      />
                                    </Label>
                                  </li>
                                );
                              })}
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

            <Link
              to={`/jobs/${data.id}/snapshot`}
              style={{ color: "black" }}
              state={{ view: true }}
            >
              <Button
                type="button"
                className="btn btn-custom-primary d-flex align-items-center column-gap-2 px-2 py-1"
              >
                <i className="ri-eye-line" style={{ fontSize: "0.75rem" }}></i>
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
                  className="btn btn-custom-primary d-flex align-items-center column-gap-2 px-2 py-1"
                >
                  <i
                    className="mdi mdi-pencil"
                    style={{ fontSize: "0.65rem" }}
                  ></i>
                </Button>
              </Link>
            )}

            {checkAllPermission([Permission.JOB_DELETE]) && (
              <Button
                type="button"
                className="btn btn-danger d-flex align-items-center column-gap-2 px-2 py-0"
                onClick={() => {
                  setDeleteId(data.id);
                  setIsDeleteModalOpen(true);
                }}
              >
                <span>
                  <i
                    className="mdi mdi-delete"
                    style={{ fontSize: "0.65rem" }}
                  ></i>
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
      />
    </>
  );
};

export default JobListing;
