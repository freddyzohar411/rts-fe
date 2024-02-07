import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  DropdownToggle,
  DropdownMenu,
  ButtonDropdown,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserGroupByName } from "../../store/jobList/action";
import {
  JOB_FILTERS,
  JOB_INITIAL_OPTIONS,
} from "../JobListing/JobListingConstants";
import { toast } from "react-toastify";

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
}) => {
  const { jobType } = useParams();
  const { Permission, checkAllPermission } = useUserAuth();
  const [customViewShow, setCustomViewShow] = useState(false);
  const [selectedOptGroup, setSelectedOptGroup] = useState(JOB_INITIAL_OPTIONS);
  const [isCustomViewModalOpen, setIsCustomModalView] = useState(false);
  const [massFODOpen, setMassFODOpen] = useState(false);
  const [namesData, setNamesData] = useState([]);
  const [nestedVisible, setNestedVisible] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState();

  const dispatch = useDispatch();

  const recruiterGroup = useSelector(
    (state) => state.JobListReducer.recruiterGroup
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

  useEffect(() => {
    dispatch(fetchUserGroupByName("Recruiter Group"));
  }, []);

  const toggleNested = (index) => {
    setNestedVisible((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const handleChange = (selected) => {
    const selectedObjects = selected.map((value) => {
      return optGroup.find((option) => option.value === value);
    });
    setSelectedOptGroup(selectedObjects);
  };

  const areOptionsEmpty = () => {
    return !(optGroup && optGroup.length > 0);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Modal
          isOpen={isCustomViewModalOpen}
          setIsOpen={setIsCustomModalView}
          size="xl"
          centered
        >
          <ModalHeader className="border border-bottom border-primary pb-3">
            <div className="d-flex flex-column gap-1">
              <span className="modal-title">Job Fields Options</span>
              <span className="text-muted fs-6">
                Select fields to show on job listing table.
              </span>
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="p-2">
              <DualListBox
                id="preserve-order"
                canFilter
                filterCallback={(optGroup, filterInput) => {
                  if (filterInput === "") {
                    return true;
                  }
                  return new RegExp(filterInput, "i").test(optGroup.label);
                }}
                options={optGroup ?? []}
                preserveSelectOrder
                selected={selectedOptGroup.map((option) => option?.value) ?? []}
                showOrderButtons
                onChange={handleChange}
                icons={{
                  moveLeft: [
                    <span
                      className={`mdi mdi-chevron-left ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveAllLeft: [
                    <span
                      className={`mdi mdi-chevron-double-left ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveRight: (
                    <span
                      className={`mdi mdi-chevron-right ${
                        areOptionsEmpty() ? "disabled-icon" : ""
                      }`}
                      key="key"
                    />
                  ),
                  moveAllRight: [
                    <span
                      className={`mdi mdi-chevron-double-right ${
                        areOptionsEmpty() ? "disabled-icon cursor-none" : ""
                      }`}
                      key="key"
                    />,
                  ],
                  moveDown: <span className="mdi mdi-chevron-down" />,
                  moveUp: <span className="mdi mdi-chevron-up" />,
                  moveTop: <span className="mdi mdi-chevron-double-up" />,
                  moveBottom: <span className="mdi mdi-chevron-double-down" />,
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter className="border border-top border-primary pt-3">
            <div className="d-flex flex-row gap-2 justify-content-end">
              <Button
                className="btn btn-danger"
                onClick={() => setIsCustomModalView(!isCustomViewModalOpen)}
              >
                Cancel
              </Button>
              <Button
                className="btn btn-custom-primary px-3"
                onClick={() => {
                  setCustomConfigData(selectedOptGroup);
                  setIsCustomModalView(false);
                }}
              >
                Set
              </Button>
            </div>
          </ModalFooter>
        </Modal>
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
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
                          {jobType && (
                            <div className="select-width">
                              <Input
                                type="select"
                                className="form-select border-secondary"
                                onChange={handleTableViewChange}
                                value={gridView}
                              >
                                <option value="">Select View</option>
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
                          )}
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <ButtonDropdown
                            isOpen={massFODOpen}
                            toggle={() => setMassFODOpen(!massFODOpen)}
                          >
                            <DropdownToggle
                              className="d-flex flex-row align-items-center gap-2"
                              caret
                            >
                              <i className="bx bxs-user-account"></i>
                              <span>Mass FOD</span>
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
                                          onClick={() => toggleNested(index)}
                                        >
                                          <span>{item.name}</span>
                                          <span>
                                            {nestedVisible[index] ? "-" : "+"}
                                          </span>
                                        </div>
                                        {nestedVisible[index] && (
                                          <ul className="d-flex flex-row justify-content-start gap-3 ps-0 ms-0">
                                            <div className="d-flex flex-column justify-content-center align-items-center">
                                              <div className="styled-dropdown ball-1"></div>
                                              <div className="styled-line"></div>
                                              <div className="styled-dropdown ball-2"></div>
                                            </div>
                                            <div className="ps-0 ms-0 w-100">
                                              {item.subNames.map(
                                                (subName, subIndex) => {
                                                  const split =
                                                    subName?.split("@");
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
                                                }
                                              )}
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
                                  >
                                    Assign
                                  </Button>
                                </Col>
                              </Row>
                            </DropdownMenu>
                          </ButtonDropdown>
                          <Button
                            type="button"
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <span>
                              <i className="mdi mdi-download"></i>
                            </span>
                            Imports
                          </Button>
                          <Button
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
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <span>
                              <i className="ri-settings-3-fill"></i>
                            </span>
                            Custom View
                          </Button>
                          {checkAllPermission([Permission.JOB_WRITE]) && (
                            <Button type="button" className="btn btn-primary">
                              <Link
                                to="/jobs/job-creation"
                                style={{ color: "black" }}
                              >
                                Create Job Openings
                              </Link>
                            </Button>
                          )}
                          <Button type="button" className="btn btn-primary">
                            <i className="ri-filter-line"></i>
                          </Button>
                        </div>
                      </Col>
                    </Row>
                    <DynamicTable
                      config={config}
                      data={data}
                      pageRequestSet={pageRequestSet}
                      pageInfo={pageInfo}
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
