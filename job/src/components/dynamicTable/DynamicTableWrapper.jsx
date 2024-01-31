import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import { GeneralModal } from "@workspace/common";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";
import {
  JOB_FILTERS,
  JOB_INITIAL_OPTIONS,
} from "../JobListing/JobListingConstants";

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

  const handleChange = (selected) => {
    const selectedObjects = selected.map((value) => {
      return optGroup.find((option) => option.value === value);
    });
    setSelectedOptGroup(selectedObjects);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <GeneralModal
          isOpen={isCustomViewModalOpen}
          setIsOpen={setIsCustomModalView}
        >
          <div>
            <Row>
              <Col lg={12}>
                <div className="mt-4 mt-lg-0 p-4">
                  <h5 className="fs-14 mb-1">Job Fields Options</h5>
                  <p className="text-muted">
                    Select fields to show on job listing table
                  </p>
                  <DualListBox
                    canFilter
                    filterCallback={(optGroup, filterInput) => {
                      if (filterInput === "") {
                        return true;
                      }
                      return new RegExp(filterInput, "i").test(optGroup.label);
                    }}
                    filterPlaceholder="Search..."
                    options={optGroup ?? []}
                    selected={
                      selectedOptGroup.map((option) => option?.value) ?? []
                    }
                    onChange={handleChange}
                    icons={{
                      moveLeft: (
                        <span className="mdi mdi-chevron-left" key="key" />
                      ),
                      moveAllLeft: [
                        <span
                          className="mdi mdi-chevron-double-left"
                          key="key"
                        />,
                      ],
                      moveRight: (
                        <span className="mdi mdi-chevron-right" key="key" />
                      ),
                      moveAllRight: [
                        <span
                          className="mdi mdi-chevron-double-right"
                          key="key"
                        />,
                      ],
                      moveDown: (
                        <span className="mdi mdi-chevron-down" key="key" />
                      ),
                      moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                      moveTop: (
                        <span className="mdi mdi-chevron-double-up" key="key" />
                      ),
                      moveBottom: (
                        <span
                          className="mdi mdi-chevron-double-down"
                          key="key"
                        />
                      ),
                    }}
                  />
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-primary mt-3 "
                      onClick={() => {
                        setCustomConfigData(selectedOptGroup);
                        setIsCustomModalView(false);
                      }}
                    >
                      Set
                    </button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </GeneralModal>
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
