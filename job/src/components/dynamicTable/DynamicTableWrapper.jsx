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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserGroupByName } from "../../store/jobList/action";
import {
  fetchJobCustomView,
  selectJobCustomView,
  deleteJobCustomView,
} from "../../store/job/action";
import { DeleteCustomModal } from "@workspace/common";
import {
  JOB_FILTERS,
  JOB_INITIAL_OPTIONS,
} from "../JobListing/JobListingConstants";
import { toast } from "react-toastify";
import { RECRUITER_GROUP } from "../../helpers/constant";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { truncate } from "@workspace/common/src/helpers/string_helper";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  confirmDelete,
  gridView,
  handleTableViewChange,
  operations,
}) => {
  const { Permission, checkAllPermission } = useUserAuth();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingCustomViewId, setDeletingCustomViewId] = useState(null);
  const [isCustomViewModalOpen, setIsCustomModalView] = useState(false);
  const [massFODOpen, setMassFODOpen] = useState(false);
  const [namesData, setNamesData] = useState([]);
  const [nestedVisible, setNestedVisible] = useState([]);
  const [customViewDropdownOpen, setCustomViewDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
  );
  const allJobCustomView = useSelector(
    (state) => state?.JobReducer?.jobCustomViews
  );
  const jobsMeta = useSelector((state) => state.JobListReducer.jobsMeta);

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
    dispatch(fetchUserGroupByName(RECRUITER_GROUP));
    dispatch(fetchJobCustomView());
  }, []);

  const handleSelectCustomView = (id) => {
    dispatch(selectJobCustomView({ id: id }));
  };

  useEffect(() => {
    if (allJobCustomView && allJobCustomView.length > 0) {
      const selectedCustomView = allJobCustomView?.find(
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
      }
    } else {
      setCustomConfigData(JOB_INITIAL_OPTIONS);
    }
  }, [allJobCustomView, optGroup]);

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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex flex-row align-items-baseline column-gap-1 mb-3">
                      <Col>
                        <div className="d-flex justify-content-start align-items-center">
                          {setSearch && (
                            <div className="search-box">
                              <form onSubmit={pageRequestSet.setSearchTerm}>
                                <Input
                                  type="text"
                                  placeholder="Search"
                                  className="form-control search bg-light border-light"
                                  value={search}
                                  style={{ width: "280px" }}
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
                      </Col>
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          {(gridView === "new_job" ||
                            gridView === "active_jobs") &&
                            checkAllPermission([Permission.JOB_EDIT]) && (
                              <ButtonDropdown
                                isOpen={massFODOpen}
                                toggle={() => setMassFODOpen(!massFODOpen)}
                              >
                                <DropdownToggle
                                  className="d-flex flex-row align-items-center gap-1 bg-custom-primary text-white"
                                  caret
                                >
                                  <i className="bx bxs-user-account"></i>
                                  <span>FOD</span>
                                </DropdownToggle>
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
                                              onClick={() =>
                                                toggleNested(index)
                                              }
                                            >
                                              <span>{item.name}</span>
                                              <span>
                                                {nestedVisible[index]
                                                  ? "-"
                                                  : "+"}
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
                          <Button
                            type="button"
                            className="btn btn-custom-primary d-flex align-items-center header-btn"
                          >
                            <span>
                              <i className="mdi mdi-download me-1"></i>
                            </span>
                            Export
                          </Button>
                          <Dropdown
                            isOpen={customViewDropdownOpen}
                            toggle={() =>
                              setCustomViewDropdownOpen(!customViewDropdownOpen)
                            }
                          >
                            <DropdownToggle
                              caret
                              className="btn btn-custom-primary py-2"
                            >
                              <i className="ri-settings-3-fill me-2"></i>
                              <span>Custom View</span>
                            </DropdownToggle>
                            <DropdownMenu>
                              <Link to="/jobs/custom-view">
                                <DropdownItem>Create Custom View</DropdownItem>
                              </Link>
                              <DropdownItem divider />
                              <DropdownItem header>
                                My Custom Views
                              </DropdownItem>
                              {allJobCustomView &&
                              allJobCustomView.length > 0 ? (
                                allJobCustomView.map((customView, index) => (
                                  <div className="d-flex flex-row gap-1 me-3 mb-1">
                                    <DropdownItem
                                      onClick={() => {
                                        handleSelectCustomView(customView?.id);
                                      }}
                                      key={index}
                                    >
                                      <div className="d-flex flex-row justify-content-between">
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
                                    <Button
                                      className="btn btn-sm btn-danger"
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
                          {/* <Button
                            type="button"
                            onClick={() => {
                              if (areOptionsEmpty()) {
                                toast.error(
                                  "No fields to show. Please have at least one job"
                                );
                                return;
                              }
                              setIsCustomModalView(true);
                              setCustomViewShow(!customViewShow);
                            }}
                            className="btn btn-custom-primary d-flex align-items-center header-btn"
                          >
                            <span>
                              <i className="ri-settings-3-fill me-1"></i>
                            </span>
                            Custom View
                          </Button> */}

                          {checkAllPermission([Permission.JOB_WRITE]) && (
                            <Link
                              to="/jobs/job-creation"
                              style={{ color: "black" }}
                            >
                              <Button
                                type="button"
                                className="btn btn-custom-primary header-btn"
                              >
                                Create Job Openings
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
                      isLoading={jobsMeta?.isLoading}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
