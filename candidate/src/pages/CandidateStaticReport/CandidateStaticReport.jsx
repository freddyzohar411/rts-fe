import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  Input,
  ButtonGroup,
  Button,
  Table,
  Badge,
} from "reactstrap";
import { staticColumns, staticTableHeader } from "./CandidateStaticConstants";
import "./CandidateStaticReport.scss";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
function CandidateStaticReport() {
  document.title = "Candidate Static Report | RTS";
  return (
    <React.Fragment>
      <div className="page-content">
        <div className="p-0">
          <Row className="sticky-header sticky-static-candidate-header">
            <Col>
              <div className="static-grid">
                {staticColumns.map((item, index) => (
                  <div className="static-grid-item" key={index}>
                    <div className="d-flex flex-column">
                      <span className="static-header-title">{item}</span>
                      <span className="static-header-count">20</span>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>

          <div className="p-2">
            <Row className="mb-2">
              <Col>
                <span className="candidate-static-title">
                  Candidate Static Report
                </span>
              </Col>
            </Row>
            {/* Search & Filter */}
            <Row className="mb-2">
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="search-box" style={{ width: "200px" }}>
                    <form>
                      <Input
                        placeholder="Search.."
                        className="border-light padding-3 search-input"
                      />
                    </form>
                    <span className="ri-search-line search-icon"></span>
                  </div>
                  <div className="d-flex flex-row align-items-center gap-3">
                    <div className="d-flex flex-row align-items-center gap-3">
                      <TableItemDisplay />
                      <TableRowsPerPageWithNav />
                    </div>
                    <ButtonGroup>
                      <Button className="bg-white border-light">
                        <i className="mdi mdi-filter-variant"></i>
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Col>
            </Row>
            {/* Table */}
            <Row>
              <Col>
                <Table>
                  <thead className="bg-white border-light">
                    <tr>
                      {staticTableHeader.map((item, index) => {
                        return (
                          <>
                            {/* <td></td> */}
                            <th
                              key={index}
                              className="static-table-header-item"
                            >
                              <span>{item}</span>{" "}
                              <span className="mdi mdi-sort cursor-pointer"></span>
                            </th>
                          </>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="bg-white border-light">
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                    <tr>
                      <td>John Doe</td>
                      <td>Data Analyst</td>
                      <td>2139212</td>
                      <td>Fawaz Khalid</td>
                      <td>Nitesh</td>
                      <td>Lily Doe</td>
                      <td><Badge color="success">Active</Badge></td>
                      <td>34 Days</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CandidateStaticReport;
