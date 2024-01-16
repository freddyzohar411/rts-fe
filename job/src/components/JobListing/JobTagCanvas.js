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
import FODTagTable from "../FODTagTable/FODTagTable";

const JobTagCanvas = ({ tagOffcanvas, setTagOffcanvas, selectedRowData }) => {
  return (
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
                      {selectedRowData?.jobSubmissionData?.accountName?.charAt(
                        0
                      ) ?? ""}
                    </span>
                  </Col>
                  <Col lg={10}>
                    <Row className="mb-1">
                      <Col>
                        <div className="d-flex flex-row align-items-center gap-2">
                          <span className="fs-5 fw-bold">
                            {selectedRowData?.jobSubmissionData?.accountName}
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
                            {`Job ID - ${selectedRowData?.jobSubmissionData?.clientJobId}`}
                          </span>
                          <span className="fs-6 fw-semibold">|</span>
                          <span className="fs-6 fw-semibold">
                            {`Job Title - ${selectedRowData?.jobSubmissionData?.jobTitle}`}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <span className="text-muted fs-6">
                          {selectedRowData?.jobSubmissionData?.workLocation ??
                            "N/A"}
                        </span>
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
  );
};

export default JobTagCanvas;
