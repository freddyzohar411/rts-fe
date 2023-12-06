import React, { useState, useRef, useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
// import DynamicTable from "./DynamicTable";
import { DynamicTable } from "@Workspace/common";
import DualListBox from "react-dual-listbox";
import { GeneralModal } from "@Workspace/common";
import { ACCOUNT_INITIAL_OPTIONS } from "../../pages/AccountListing/accountListingConstants";
import "./DynamicTableWrapper.scss";
import { useUserAuth } from "@workspace/login";

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
}) => {
  const { Permission, checkAllPermission } = useUserAuth();
  const [customViewShow, setCustomViewShow] = useState(false);
  const [selectedOptGroup, setSelectedOptGroup] = useState(
    ACCOUNT_INITIAL_OPTIONS
  );

  const [isCustomViewModalOpen, setIsCustomModalView] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

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
                  <h5 className="fs-14 mb-1">Account Fields Options</h5>
                  <p className="text-muted">
                    Select fields to show on account listing table
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
                    options={optGroup}
                    selected={selectedOptGroup.map((option) => option?.value)}
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
                      {setSearch && (
                        <Col>
                          <div className="search-box">
                            <form onSubmit={pageRequestSet.setSearchTerm}>
                              <Input
                                type="text"
                                placeholder="Search"
                                className="form-control search bg-light border-light"
                                value={search}
                                style={{ width: "350px" }}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </form>
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </Col>
                      )}
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <Button
                            type="button"
                            className="btn btn-custom-primary d-flex align-items-center column-gap-2"
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
                            className="btn btn-custom-primary d-flex align-items-center column-gap-2"
                          >
                            <span>
                              <i className="ri-settings-3-fill"></i>
                            </span>
                            Custom View
                          </Button>
                          {checkAllPermission([Permission.ACCOUNT_WRITE]) && (
                            <Link
                              to="/accounts/create"
                              style={{ color: "black" }}
                            >
                              <Button
                                type="button"
                                className="btn btn-custom-primary"
                              >
                                Create New Account
                              </Button>
                            </Link>
                          )}
                          <Button
                            type="button"
                            className="btn btn-custom-primary"
                          >
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
