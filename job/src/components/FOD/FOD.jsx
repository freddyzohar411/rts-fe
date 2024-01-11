import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Label,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobLists } from "../../store/actions";
import { useTableHook, DynamicTableHelper } from "@workspace/common";
import { JOB_INITIAL_OPTIONS } from "../JobListing/jobListingConstants";
import FODTableWrapper from "./FODTableWrapper";
import { FODTagTable } from "../FODTagTable";
import { useUserAuth } from "@workspace/login";

function FOD() {
  document.title = "Focus of the Day | RTS";
  const { Permission, checkAllPermission } = useUserAuth();
  // Placeholder Recruiter Name List
  const [nestedVisible, setNestedVisible] = useState([]);

  const toggleNested = (index) => {
    setNestedVisible((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  const namesData = [
    { name: "Anna", subNames: ["John", "Ben"] },
    { name: "Sally", subNames: ["Alice", "Ken"] },
  ];

  const postList = ["LinkedIn", "Naukri", "Monster", "Avensys"];

  const [fodAssign, setFodAssign] = useState({});
  const handleFodAssignDropdown = (dataId) => {
    setFodAssign((prevStates) => ({
      ...prevStates,
      [dataId]: !prevStates[dataId],
    }));
  };

  const [postDropdown, setPostDropdown] = useState({});
  const handlePostDropdown = (dataId) => {
    setPostDropdown((prevStates) => ({
      ...prevStates,
      [dataId]: !prevStates[dataId],
    }));
  };

  const [tagOffcanvas, setTagOffcanvas] = useState(false);
  const dispatch = useDispatch();
  const jobsData = useSelector((state) => state.JobListReducer.jobs);
  const jobsFields = useSelector((state) => state.JobListReducer.jobsFields);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Table Hooks
  const {
    pageRequest,
    pageRequestSet,
    pageInfo,
    setPageInfoData,
    customConfig,
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
    JOB_INITIAL_OPTIONS
  );

  // Job Listing Setup
  const generateJobListConfig = (customConfig) => {
    return [
      ...customConfig,
      {
        header: "Action",
        name: "action",
        sort: false,
        sortValue: "action",
        render: (data) => (
          <div className="d-flex column-gap-2">
            {/* Sales View - Start */}
            {checkAllPermission([Permission.ACCOUNT_WRITE]) && (
              <>
                <Link>
                  <Button
                    tag="button"
                    className="btn btn-sm btn-custom-primary"
                  >
                    <i className="ri-pencil-fill"></i>
                  </Button>
                </Link>
                <Dropdown
                  isOpen={fodAssign[data.id] || false}
                  toggle={() => handleFodAssignDropdown(data.id)}
                >
                  <DropdownToggle className="btn btn-sm btn-custom-primary">
                    Assign
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
                          {namesData.map((item, index) => (
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
                                  {item.subNames.map((subName, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="d-flex flew-row justify-content-between"
                                    >
                                      {subName}
                                      <Label check className="mb-0 ms-2">
                                        <Input type="checkbox" />
                                      </Label>
                                    </li>
                                  ))}
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
                          <Button className="btn btn-sm btn-custom-primary px-3">
                            Assign
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
            {/* Sales View - End */}

            {/* Recruiter View - Start */}
            {checkAllPermission([Permission.CANDIDATE_WRITE]) && (
              <>
                {/* Tag Button */}
                <Button
                  tag="button"
                  className="btn btn-sm btn-custom-primary"
                  onClick={() => {
                    setSelectedRowData(data);
                    setTagOffcanvas(!tagOffcanvas);
                  }}
                >
                  <i className="ri-parent-fill"></i>
                </Button>
                {/* Edit Button */}
                <Link>
                  <Button
                    tag="button"
                    className="btn btn-sm btn-custom-primary"
                  >
                    <i className="ri-pencil-fill"></i>
                  </Button>
                </Link>
                {/* Toggle Reassign Button */}
                <Dropdown
                  isOpen={fodAssign[data.id] || false}
                  toggle={() => handleFodAssignDropdown(data.id)}
                >
                  <DropdownToggle className="btn btn-sm btn-custom-primary">
                    Reassign
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
                          {namesData.map((item, index) => (
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
                                  {item.subNames.map((subName, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="d-flex flew-row justify-content-between"
                                    >
                                      {subName}
                                      <Label check className="mb-0 ms-2">
                                        <Input type="checkbox" />
                                      </Label>
                                    </li>
                                  ))}
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
                          <Button className="btn btn-sm btn-custom-primary px-3">
                            Assign
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </Dropdown>
                {/* Toggle Post Button */}
                <Dropdown
                  isOpen={postDropdown[data.id] || false}
                  toggle={() => handlePostDropdown(data.id)}
                >
                  <DropdownToggle
                    tag="span"
                    className="btn btn-sm btn-custom-primary px-4"
                  >
                    Post
                  </DropdownToggle>
                  <DropdownMenu className="p-3">
                    <Row className="mb-2">
                      <Col>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          Select All
                          <Label check className="mb-0 ms-2">
                            <Input type="checkbox" />
                          </Label>
                        </div>

                        {postList.map((post) => (
                          <div
                            key={post}
                            className="mb-2 d-flex justify-content-between align-items-center"
                          >
                            {post}
                            <Label check className="mb-0 ms-2">
                              <Input type="checkbox" />
                            </Label>
                          </div>
                        ))}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <Button
                            tag="button"
                            className="btn btn-sm btn-custom-primary px-3"
                          >
                            Confirm
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
            {/* Recruiter View - End */}
          </div>
        ),
      },
    ];
  };

  // Fetch the job when the pageRequest changes
  useEffect(() => {
    dispatch(fetchJobLists(DynamicTableHelper.cleanPageRequest(pageRequest)));
  }, [pageRequest]);

  // Update the page info when job Data changes
  useEffect(() => {
    if (jobsData) {
      setPageInfoData(jobsData);
    }
  }, [jobsData]);

  return (
    <div className="page-content">
      <Container fluid>
        <Row className="mb-3">
          <Col>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Focus of the Day</BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col>
                    {/* Table */}
                    <FODTableWrapper
                      config={generateJobListConfig(customConfig)}
                      data={jobsData?.jobs ?? []}
                      pageRequestSet={pageRequestSet}
                      pageInfo={pageInfo}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Offcanvas
              isOpen={tagOffcanvas}
              toggle={() => setTagOffcanvas(!tagOffcanvas)}
              direction="end"
              style={{ width: "65vw" }}
            >
              <OffcanvasHeader
                toggle={() => setTagOffcanvas(!tagOffcanvas)}
                className="border-start-0 border-top-0 border-end-0 border-bottom border-dashed border-primary align-items-start"
              >
                {selectedRowData && (
                  <div>
                    <Row className="g-5">
                      <Col lg={2}>
                        <span
                          className="bg-custom-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: "50px", height: "50px" }}
                        >
                          {selectedRowData.jobSubmissionData.accountName.charAt(
                            0
                          )}
                        </span>
                      </Col>
                      <Col lg={10}>
                        <Row className="mb-1">
                          <Col>
                            <div className="d-flex flex-row align-items-center gap-2">
                              <span className="fs-5 fw-bold">
                                {selectedRowData.jobSubmissionData.accountName}
                              </span>
                              <span className="bg-custom-primary text-white rounded fs-6 fw-semibold px-2 text-center">
                                New
                              </span>
                            </div>
                          </Col>
                        </Row>
                        <Row className="mb-1">
                          <Col>
                            <div className="d-flex gap-4 align-items-center">
                              <span className="fs-6 fw-semibold">
                                Job ID -{" "}
                                {selectedRowData.jobSubmissionData.clientJobId}
                              </span>
                              <span className="fs-6 fw-semibold">|</span>
                              <span className="fs-6 fw-semibold">
                                Job Title -{" "}
                                {selectedRowData.jobSubmissionData.jobTitle}
                              </span>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <span className="text-muted fs-6">N/A</span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                )}
              </OffcanvasHeader>
              <OffcanvasBody>
                {/* Specific Data information */}
                <FODTagTable selectedRowData={selectedRowData} />
              </OffcanvasBody>
            </Offcanvas>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FOD;
