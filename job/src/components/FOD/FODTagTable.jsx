import React from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const FODTagTable = ({ selectedRowData }) => {
  const tableHeaders = [
    "Candidate Name",
    "Candidate Nationality",
    "Visa Status",
    "Phone",
    "Email",
    "Actions",
  ];

  const sampleData = [
    {
      candidateName: "John Doe",
      candidateNationality: "Malaysia",
      visaStatus: "H1B",
      phone: "123-456-7890",
      email: "john.doe@example.com",
    },
    {
      candidateName: "Alice Chen",
      candidateNationality: "Malaysia",
      visaStatus: "Work Permit",
      phone: "987-654-3210",
      email: "alice.smith@example.com",
    },
    {
      candidateName: "Mohammed Ali",
      candidateNationality: "India",
      visaStatus: "Work Permit",
      phone: "555-555-5555",
      email: "mohammed.ali@example.com",
    },
    {
      candidateName: "Elena Tan",
      candidateNationality: "Malaysia",
      visaStatus: "Work Permit",
      phone: "111-222-3333",
      email: "elena.rodriguez@example.com",
    },
    {
      candidateName: "Chen Wei",
      candidateNationality: "Singapore",
      visaStatus: "Citizen",
      phone: "777-888-9999",
      email: "chen.wei@example.com",
    },
  ];

  return (
    <div>
      <Row className="mb-3">
        <Col>
          <div className="d-flex flex-row align-items-center justify-content-between">
            <span className="h6 fw-bold text-dark text-decoration-underline">
              Suitable Candidates ({sampleData.length})
            </span>
            <div className="d-flex flex-row gap-2">
              <div className="search-box">
                <Input
                  className="form-control border border-secondary"
                  type="text"
                  placeholder="Search for Candidate.."
                />
                <i className="ri-search-eye-line search-icon"></i>
              </div>

              <Button className="btn btn-custom-primary">
                Tag Selected Candidates
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table className="table table-hover table-striped border-secondary">
            <thead className="table-dark text-white align-middle">
              <tr>
                <th>
                  <Input type="checkbox" />
                </th>
                {tableHeaders.map((header, index) => (
                  <th className="me-1" key={index}>
                    <span>{header}</span>
                    <i
                      className="mdi mdi-sort"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sampleData.map((data, rowIndex) => (
                <tr key={rowIndex}>
                  <td>
                    <Input type="checkbox" />
                  </td>
                  <td>{data.candidateName}</td>
                  <td>{data.candidateNationality}</td>
                  <td>{data.visaStatus}</td>
                  <td>{data.phone}</td>
                  <td>{data.email}</td>
                  <td>
                    <Button className="btn btn-sm btn-custom-primary px-4 py-0">
                      <span className="fs-6">Tag</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-row gap-3 justify-content-end align-items-baseline">
            <div>
              <Input type="select" className="form-select form-select-md border-secondary">
                <option value="5">5</option>
                <option value="5">10</option>
                <option value="5">20</option>
                <option value="5">30</option>
              </Input>
            </div>
            <div>
              <Pagination>
                <PaginationItem>
                  <PaginationLink>Previous</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>Next</PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FODTagTable;
