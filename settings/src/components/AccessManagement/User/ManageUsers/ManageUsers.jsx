import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
} from "reactstrap";
import ExtractUsers from "../MassImportUsers/ExtractUsers";
import ManageUsersTable from "./ManageUsersTable";
import { truncate } from "@workspace/common/src/helpers/string_helper";

function ManageUsers({ selectedFiles, onHandleNewUsers }) {
  const [extractedUserData, setExtractedUserData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submittedUsers, setSubmittedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleExtractedUserData = (data) => {
    setExtractedUserData(data);
  };

  const handleViewUsers = (filename) => {
    setSelectedFile(filename);
  };

  const handleSubmittedUsers = (users) => {
    setSubmittedUsers(users);
    onHandleNewUsers(users);
  };

  const filteredFiles = Object.keys(extractedUserData).filter((filename) =>
    filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
      <div>
        <hr />
        <Row>
          <Col lg={3}>
            <Card>
              <CardHeader>
                <h6 className="fw-bold">Imported Files</h6>
                <span className="text-muted">
                  Uploaded files will be shown here.
                </span>
              </CardHeader>
              <CardBody>
                <Row className="mb-3">
                  <Col>
                    <div className="search-box">
                      <Input
                        type="text"
                        placeholder="Search.."
                        className="form-control border-primary"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <i className="bx bx-search-alt search-icon"></i>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table className="table table-hover table-striped border-secondary align-middle table-nowrap rounded-3">
                      <thead
                        style={{ backgroundColor: "#B8DAF3", color: "#000000" }}
                      >
                        <tr>
                          <th>File Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredFiles.map((filename, index) => (
                          <tr key={index}>
                            <td>{truncate(filename, 14)}</td>
                            <td>
                              <Button
                                className="btn btn-sm btn-custom-primary"
                                onClick={() => handleViewUsers(filename)}
                              >
                                View Users
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <CardHeader>
                <h6 className="fw-bold">Manage Extracted User Data</h6>
                <span className="text-muted">
                  User data will be extracted from the files into the following
                  table.
                </span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                    {selectedFile ? (
                      <ManageUsersTable
                        extractedUserData={extractedUserData}
                        selectedFile={selectedFile}
                        onSubmittedUsers={handleSubmittedUsers}
                      />
                    ) : (
                      <div>
                        <span>Please select an imported file to begin.</span>
                      </div>
                    )}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <ExtractUsers
              selectedFiles={selectedFiles}
              onExtractedUserData={handleExtractedUserData}
            />
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ManageUsers;
