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
// import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

function CandidateStaticFilter({ isFilterOpen, setIsFilterOpen }) {
  const [isDateRangeOpen, setIsDateRangeOpen] = useState(true);
  const [isSalesPersonsOpen, setIsSalesPersonsOpen] = useState(true);
  const [isRecruiterOpen, setIsRecruiterOpen] = useState(true);
  const [isClientOpen, setIsClientOpen] = useState(true);
  const [isCountryOpen, setIsCountryOpen] = useState(true);

  return (
    <Offcanvas
      isOpen={isFilterOpen}
      toggle={() => setIsFilterOpen(!isFilterOpen)}
      direction="end"
      className="candidate-static-filter-offcanvas"
      backdrop={true}
      fade={false}
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
        <Row className="mb-3">
          <Col>
            <div
              className="d-flex flex-row justify-content-between cursor-pointer w-100"
              onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
            >
              <span className="fw-semibold">Date Range</span>{" "}
              <span
                className={`${
                  isDateRangeOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
            <Collapse isOpen={isDateRangeOpen}>Date Range Opened</Collapse>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div
              className="d-flex flex-row justify-content-between cursor-pointer w-100"
              onClick={() => setIsSalesPersonsOpen(!isSalesPersonsOpen)}
            >
              <span className="fw-semibold">Sales Person</span>{" "}
              <span
                className={`${
                  isSalesPersonsOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
            <Collapse isOpen={isSalesPersonsOpen}>Sales Person Opened</Collapse>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div
              className="d-flex flex-row justify-content-between cursor-pointer w-100"
              onClick={() => setIsRecruiterOpen(!isRecruiterOpen)}
            >
              <span className="fw-semibold">Recruiter</span>{" "}
              <span
                className={`${
                  isRecruiterOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
            <Collapse isOpen={isRecruiterOpen}>Recruiter Opened</Collapse>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div
              className="d-flex flex-row justify-content-between w-100 cursor-pointer"
              onClick={() => setIsClientOpen(!isClientOpen)}
            >
              <span className="fw-semibold">Client</span>{" "}
              <span
                className={`${
                  isClientOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
            <Collapse isOpen={isClientOpen}>Client Opened</Collapse>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <div
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="d-flex flex-row justify-content-between w-100 cursor-pointer"
            >
              <span className="fw-semibold">Country</span>{" "}
              <span
                className={` ${
                  isCountryOpen ? "mdi mdi-menu-up" : "mdi mdi-menu-down"
                }`}
              ></span>
            </div>
            <Collapse isOpen={isCountryOpen}>Country Opened</Collapse>
          </Col>
        </Row>
      </OffcanvasBody>
    </Offcanvas>
  );
}

export default CandidateStaticFilter;
