import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  ButtonDropdown,
  Label,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUserGroupByName,
  fetchJobLists,
  resetJobList
} from "../../store/jobList/action";
import {
  fetchJobCustomView,
  selectJobCustomView,
  deleteJobCustomView,
  resetJobCustomView,
} from "../../store/job/action";
import { deleteJobs, deleteJobsReset } from "../../store/jobList/action";
import { DeleteCustomModal } from "@workspace/common";
import {
  JOB_FILTERS,
  JOB_INITIAL_OPTIONS,
  JOB_LABELS,
} from "../JobListing/JobListingConstants";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { truncate } from "@workspace/common/src/helpers/string_helper";
import { DateHelper, DynamicTableHelper } from "@workspace/common";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
import { TooltipWrapper } from "@workspace/common";
import { toast } from "react-toastify";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequest,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  gridView,
  handleTableViewChange,
  operations,
  activeRow,
  setActiveRow,
  setTableConfig,
}) => {
  // ================== Custom Render ==================
  const customRenderList = [
    {
      names: ["updatedAt", "createdAt"],
      render: (data, opt) =>
        DateHelper.formatDateStandard2(
          DynamicTableHelper.getDynamicNestedResultForExport(data, opt?.name) ||
            ""
        ),
    },
  ];
  // ==================================================
  const { Permission, checkAllPermission } = useUserAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCustomViewId, setDeletingCustomViewId] = useState(null);
  const [massFODOpen, setMassFODOpen] = useState(false);
  const [namesData, setNamesData] = useState([]);
  const [nestedVisible, setNestedVisible] = useState([true]);
  const [customViewDropdownOpen, setCustomViewDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
  );
  const allJobCustomViews = useSelector(
    (state) => state?.JobReducer?.jobCustomViews
  );
  const jobsMeta = useSelector((state) => state.JobListReducer.jobsMeta);

  const deleteJobsMeta = useSelector(
    (state) => state.JobListReducer.deleteJobsMeta
  );

  // Delete modal states
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

  useEffect(() => {
    dispatch(fetchJobCustomView());
    return () => {
      dispatch(resetJobCustomView())
    }
  }, []);

  const handleSelectCustomView = (id) => {
    dispatch(selectJobCustomView({ id: id }));
  };

  useEffect(() => {
    if (allJobCustomViews != null && allJobCustomViews.length > 0) {
      const selectedCustomView = allJobCustomViews?.find(
        (customView) => customView?.selected
      );
      if (
        selectedCustomView &&
        Array.isArray(optGroup) &&
        optGroup.length > 0
      ) {
        const selectedGroup = selectedCustomView?.columnName?.split(",");
        const selectedObjects = selectedGroup?.map((value) => {
          return optGroup?.find((option) => option?.value === value);
        });
        if (selectedObjects.length > 0) {
          setCustomConfigData(selectedObjects);
        }
        pageRequestSet.setFilterData(selectedCustomView?.filters);
      }
    }
    if (allJobCustomViews != null && allJobCustomViews.length === 0) {
      enableDefaultView();
    }

    return () => {
      dispatch(resetJobList());
    }
  }, [allJobCustomViews, optGroup]);

  const enableDefaultView = () => {
    setCustomConfigData(JOB_INITIAL_OPTIONS);
    pageRequestSet.setFilterData(null);
  };

  const handleDeleteButtonClick = (id) => {
    setDeletingCustomViewId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCustomView = (id) => {
    dispatch(deleteJobCustomView({ id: id }));
    setDeleteModalOpen(false);
    setDeletingCustomViewId(null);
  };

  const toggleNested = (index) => {
    setNestedVisible((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const handleEportExcel = () => {
    let exportData = null;
    if (!activeRow) {
      exportData = data;
    } else if (activeRow?.length === 0) {
      exportData = data;
    } else {
      exportData = data.filter((item) => activeRow.includes(item?.id));
    }

    DynamicTableHelper.handleExportExcel(
      "Jobs",
      exportData,
      config.slice(2, -1),
      customRenderList,
      true
    );
  };

  const handleDelete = () => {
    if (activeRow?.length === 0) {
      toast.error("Please select at least one record to delete.");
      return;
    }
    setIsDeleteModalOpen(true);
  };

  // Modal Delete accounts
  const confirmDelete = () => {
    dispatch(deleteJobs(activeRow));
  };

  useEffect(() => {
    if (deleteJobsMeta?.isSuccess) {
      dispatch(deleteJobsReset());
      toast.success("Job deleted successfully");
      setIsDeleteModalOpen(false);
      const request = { ...pageRequest, jobType: gridView };
      if (pageRequest?.searchFields?.length > 0) {
        setActiveRow([]);
        dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(request)));
      }
    }
  }, [deleteJobsMeta?.isSuccess]);

  const buttonStyle = () => {
    if (
      (gridView === "new_job" || gridView === "active_jobs") &&
      checkAllPermission([Permission.JOB_EDIT])
    ) {
      return {
        borderTopLeftRadius: "0px",
        borderBottomLeftRadius: "0px",
        borderLeft: "none",
      };
    } else {
      return {};
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div
                className="listjs-table d-flex flex-column"
                style={{
                  height: "calc(100vh - 160px)",
                }}
              >
                <Row className="d-flex align-items-center mb-3">
                  <Col lg={6}>
                    <div className="d-flex flex-column flex-wrap align-items-start justify-content-start gap-2">
                      <h4
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span>{`${JOB_LABELS[gridView] ?? "Jobs"} (${
                          pageInfo?.totalElements ?? 0
                        })`}</span>
                      </h4>
                      <div className="d-flex flex-row flex-wrap align-items-center gap-2">
                        {setSearch && (
                          <div className="search-box">
                            <form onSubmit={pageRequestSet.setSearchTerm}>
                              <Input
                                type="text"
                                placeholder="Search"
                                className="form-control search"
                                value={search}
                                style={{ width: "210px", height: "40px" }}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </form>
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        )}
                        <div className="select-width">
                          <Input
                            type="select"
                            className="form-select border-secondary"
                            onChange={handleTableViewChange}
                            value={gridView}
                            style={{ width: "210px", height: "40px" }}
                          >
                            {JOB_FILTERS?.map((ob, index) => {
                              const key = Object.keys(ob);
                              return (
                                <option key={index} value={key}>
                                  {ob[key]}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="d-flex column-gap  gap-1 justify-content-end align-items-center">
                      <TableItemDisplay pageInfo={pageInfo} />
                      <div
                        style={{
                          width: "2px",
                          height: "20px",
                          backgroundColor: "#adb5bd",
                          marginLeft: "12px",
                        }}
                      ></div>
                      <TableRowsPerPageWithNav
                        pageInfo={pageInfo}
                        pageRequestSet={pageRequestSet}
                      />
                      <ButtonGroup>
                        {(gridView === "new_job" ||
                          gridView === "active_jobs") &&
                          checkAllPermission([Permission.JOB_EDIT]) && (
                            <ButtonDropdown
                              isOpen={massFODOpen}
                              toggle={() => {
                                setMassFODOpen(!massFODOpen);
                                setSearchQuery("");
                              }}
                            >
                              <TooltipWrapper tooltipText="Assign Recruiter">
                                <DropdownToggle
                                  className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                                  style={{ height: "40px" }}
                                >
                                  <i className="bx bxs-user-account fs-5"></i>
                                </DropdownToggle>
                              </TooltipWrapper>
                              <DropdownMenu
                                className="pt-3 px-3"
                                style={{ width: "200px" }}
                              >
                                <Row className="mb-3">
                                  <Col>
                                    <div className="search-box">
                                      <Input
                                        type="text"
                                        placeholder="Search.."
                                        className="form-control form-control-sm"
                                        value={searchQuery}
                                        onChange={handleSearch}
                                      />
                                      <i className="bx bx-search search-icon"></i>
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
                                                  {item?.subNames
                                                    ?.filter((it) =>
                                                      it
                                                        ?.toLowerCase()
                                                        .includes(
                                                          searchQuery.toLowerCase()
                                                        )
                                                    )
                                                    ?.map(
                                                      (subName, subIndex) => {
                                                        const split =
                                                          subName?.split("@");
                                                        return (
                                                          <li
                                                            key={subIndex}
                                                            className="d-flex flew-row align-items-center justify-content-between me-3"
                                                          >
                                                            {truncate(
                                                              split[1],
                                                              16
                                                            )}
                                                            <Label
                                                              check
                                                              className="d-flex flex-row align-items-center gap-2 mb-0 ms-2"
                                                            >
                                                              <Input
                                                                type="checkbox"
                                                                checked={operations?.selectedRecruiter?.includes(
                                                                  parseInt(
                                                                    split[0]
                                                                  )
                                                                )}
                                                                onChange={(e) =>
                                                                  operations?.handleFODCheck(
                                                                    parseInt(
                                                                      split[0]
                                                                    ),
                                                                    e.target
                                                                      .checked
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
                                  <Col className="d-flex justify-content-end">
                                    <Button
                                      type="submit"
                                      className="btn btn-custom-primary btn-sm px-3"
                                      onClick={() => {
                                        operations?.handleFODAssign();
                                        setMassFODOpen(!massFODOpen);
                                        operations?.setActiveJob([]);
                                        operations?.setSelectedRecruiter([]);
                                      }}
                                    >
                                      Assign
                                    </Button>
                                  </Col>
                                </Row>
                              </DropdownMenu>
                            </ButtonDropdown>
                          )}
                        <TooltipWrapper tooltipText="Custom View">
                          <Dropdown
                            isOpen={customViewDropdownOpen}
                            toggle={() =>
                              setCustomViewDropdownOpen(!customViewDropdownOpen)
                            }
                          >
                            <DropdownToggle
                              color="light"
                              className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                              style={{
                                borderTopRightRadius: "0px",
                                borderBottomRightRadius: "0px",
                                height: "40px",
                                ...buttonStyle(),
                              }}
                            >
                              <i className="ri-settings-3-fill fs-5"></i>
                            </DropdownToggle>
                            <DropdownMenu className="mt-1">
                              <Link to="/jobs/custom-view">
                                <DropdownItem>Create Custom View</DropdownItem>
                              </Link>
                              <DropdownItem onClick={() => enableDefaultView()}>
                                Enable Default View
                              </DropdownItem>
                              <DropdownItem divider />
                              <DropdownItem header>
                                My Custom Views
                              </DropdownItem>
                              {allJobCustomViews &&
                              allJobCustomViews.length > 0 ? (
                                allJobCustomViews?.map((customView, index) => (
                                  <div className="d-flex flex-row gap-1 me-2">
                                    <DropdownItem
                                      onClick={() => {
                                        handleSelectCustomView(customView?.id);
                                      }}
                                      key={index}
                                    >
                                      <div className="d-flex flex-row align-items-center justify-content-between">
                                        <span className="me-2">
                                          {customView?.name}
                                        </span>
                                        {customView?.selected && (
                                          <span>
                                            <i className="ri-check-fill"></i>
                                          </span>
                                        )}
                                      </div>
                                    </DropdownItem>
                                    <Link
                                        to={`/jobs/custom-view/${customView?.id}`}
                                      >
                                        <Button
                                          className="btn btn-sm btn-secondary"
                                          style={{ height: "29px" }}
                                        >
                                          <i className="ri-pencil-line"></i>
                                        </Button>
                                      </Link>
                                    <Button
                                      className="btn btn-sm btn-danger"
                                      style={{ height: "29px" }}
                                      onClick={() =>
                                        handleDeleteButtonClick(customView?.id)
                                      }
                                    >
                                      <i className="mdi mdi-delete"></i>
                                    </Button>
                                  </div>
                                ))
                              ) : (
                                <>
                                  <DropdownItem text>
                                    No custom view created yet!
                                  </DropdownItem>
                                </>
                              )}
                            </DropdownMenu>
                          </Dropdown>
                        </TooltipWrapper>
                        <TooltipWrapper tooltipText="Export Excel">
                          <Button
                            color="light"
                            className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                            onClick={handleEportExcel}
                            style={{ height: "40px", borderLeft: "none" }}
                          >
                            <i className="ri-download-fill align-bottom fs-5"></i>
                          </Button>
                        </TooltipWrapper>
                        {checkAllPermission([Permission.JOB_DELETE]) && (
                          <TooltipWrapper tooltipText="Delete Multiple">
                            <Button
                              color="light"
                              className="btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                              onClick={handleDelete}
                              style={{
                                height: "40px",
                                borderLeft: "none",
                                borderTopRightRadius: "4px",
                                borderBottomRightRadius: "4px",
                              }}
                            >
                              <i className="mdi mdi-delete align-bottom fs-5"></i>
                            </Button>
                          </TooltipWrapper>
                        )}
                      </ButtonGroup>
                      <DeleteCustomModal
                        isOpen={deleteModalOpen}
                        setIsOpen={setDeleteModalOpen}
                        confirmDelete={() =>
                          handleDeleteCustomView(deletingCustomViewId)
                        }
                        header="Delete Custom View Confirmation"
                        deleteText={`Are you sure you want to delete this custom view?`}
                        confirmButtonText="Delete"
                        isLoading={false}
                      />

                      {checkAllPermission([Permission.JOB_WRITE]) && (
                        <Link
                          to="/jobs/job-creation"
                          style={{ color: "black" }}
                        >
                          <Button
                            type="button"
                            className="btn btn-custom-primary header-btn d-flex align-items-center"
                            style={{
                              height: "40px",
                              backgroundColor: "#0A65CC",
                            }}
                          >
                            <span className="fs-3 align-bottom">+</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Col>
                </Row>
                <DynamicTable
                  config={config}
                  data={data}
                  pageRequestSet={pageRequestSet}
                  pageInfo={pageInfo}
                  isLoading={jobsMeta?.isLoading ?? true}
                  freezeHeader={true}
                  activeRow={activeRow}
                  setTableConfig={setTableConfig}
                  pageRequest={pageRequest}
                  tableHeight="100%"
                />
              </div>
            </Col>
          </Row>
          <DeleteCustomModal
            isOpen={isDeleteModalOpen}
            setIsOpen={setIsDeleteModalOpen}
            confirmDelete={confirmDelete}
            header="Delete Job"
            deleteText={"Are you sure you would like to delete this job?"}
            isLoading={deleteJobsMeta?.isLoading}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
