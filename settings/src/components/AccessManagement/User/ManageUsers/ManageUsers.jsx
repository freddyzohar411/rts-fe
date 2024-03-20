import React, { useState } from "react";
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
import ExtractUsers from "../ImportUsers/ExtractUsers";
import ManageUsersTable from "./ManageUsersTable";

function ManageUsers({ selectedFiles, onImportUsers }) {
  const [extractedUserData, setExtractedUserData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleExtractedUserData = (data) => {
    setExtractedUserData(data);
  };

  const handleViewUsers = (filename) => {
    setSelectedFile(filename);
  };

  return (
    <React.Fragment>
      <div>
        <hr/>
        <Row>
          <Col lg={3}>
            <Card>
              <CardHeader>
                <h6 className="fw-bold">Imported Files</h6>
                <span className="text-muted">
                  Files that you have uploaded will be shown here.
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
                        {Object.keys(extractedUserData).map(
                          (filename, index) => (
                            <tr key={index}>
                              <td>{filename}</td>
                              <td>
                                <Button
                                  className="btn btn-sm btn-custom-primary"
                                  onClick={() => handleViewUsers(filename)}
                                >
                                  View Users
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
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
                        onImportUsers={onImportUsers}
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
        <Row>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                // onClick={handleSubmitAll}
                className="btn btn-custom-primary"
              >
                Confirm User Data
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ManageUsers;
