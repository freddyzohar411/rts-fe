import React, { useState, useEffect } from "react";
import {
  Offcanvas,
  Row,
  Col,
  OffcanvasBody,
  Button,
  Input,
  Collapse,
} from "reactstrap";
import "./CandidateStaticReport.scss";

function CandidateStaticFilter({ isFilterOpen, setIsFilterOpen }) {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
  const [isSalesPersonsOpen, setIsSalesPersonsOpen] = useState(false);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(false);
  const [isClientOpen, setIsClientOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  return (
    <Offcanvas
      isOpen={isFilterOpen}
      toggle={setIsFilterOpen(!isFilterOpen)}
      direction="end"
      className="candidate-static-filter-offcanvas"
      backdrop={false}
    >
      <div className="offcanvas-header pb-0 mb-0">
        <div className="d-flex flex-row justify-content-between align-items-end w-100">
          <span className="csf-title">Filter</span>
          <span>
            <Button className="csf-clear me-2">Clear</Button>
            <Button className="csf-apply">Apply</Button>
          </span>
        </div>
      </div>
      <OffcanvasBody className="mt-1 pt-0">
        <hr />
        <Row className="mb-3">
          <Col>
            <div className="search-box">
              <Input placeholder="Search.." className="border-light" />
              <span className="ri-search-eye-line search-icon"></span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <span>Date Range</span>{" "}
              <span
                className={`cursor-pointer ${
                  isDateRangeOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
          </Col>
        </Row>
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default CandidateStaticFilter;
