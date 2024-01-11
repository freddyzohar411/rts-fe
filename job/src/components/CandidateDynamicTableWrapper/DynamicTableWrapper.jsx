import React, { useState } from "react";
import { Button, Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { Link } from "react-router-dom";
// import DynamicTable from "./DynamicTable";
import { DynamicTable } from "@Workspace/common";
import DualListBox from "react-dual-listbox";
import { GeneralModal } from "@Workspace/common";
import { CANDIDATE_INITIAL_OPTIONS } from "../../../../candidate/src/pages/CandidateListing/candidateListingConstants";
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
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={12}>
            <div className="listjs-table">
              <Row className="d-flex column-gap-1 mb-3">
                <Col>
                  <div className="d-flex flex-row justify-content-between align-items-baseline">
                    <div className="text-decoration-underline">
                      <span>Suitable Candidates </span>
                      <span className="fw-semibold">(20)</span>
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-baseline">
                      <div className="search-box">
                        {setSearch && (
                          <form onSubmit={pageRequestSet.setSearchTerm}>
                            <Input
                              type="text"
                              placeholder="Search"
                              className="form-control search bg-light border-light"
                              value={search}
                              style={{ width: "350px" }}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </form>
                        )}
                      </div>
                      <div>
                        <Button className="btn btn-custom-primary">
                          Tag Selected Candidates
                        </Button>
                      </div>
                    </div>
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
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
