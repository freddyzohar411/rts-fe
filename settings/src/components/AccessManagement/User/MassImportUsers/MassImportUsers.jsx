import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Col,
  CardBody,
  CardHeader,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";
import classnames from "classnames";
import ImportFiles from "./ImportFiles";
import FinaliseMassUsers from "../FinaliseMassUsers/FinaliseMassUsers";
import { Link } from "react-router-dom";
import ManageUsers from "../ManageUsers/ManageUsers";

function MassImportUsers() {
  document.title = "Import Users | RTS";
  const [activeArrowTab, setactiveArrowTab] = useState(0);
  const [passedarrowSteps, setPassedarrowSteps] = useState([0]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  

  function toggleArrowTab(tab) {
    if (activeArrowTab !== tab && tab >= 0 && tab <= 2) {
      setactiveArrowTab(tab);
      setPassedarrowSteps([...passedarrowSteps, tab]);
    }
  }

  const handleImportFiles = (files) => {
    setSelectedFiles(files);
  };

  const handleNewUsers = (users) => {
    setNewUsers(users);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Import Users</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <h6>Mass Import Users</h6>
                    <span>
                      Efficiently add multiple users to the system in one go.
                      Follow the steps below to seamlessly import a large number
                      of users into our platform.
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Nav
                    className="nav-pills custom-nav nav-justified"
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        id="steparrow-import-files-tab"
                        className={classnames(
                          {
                            active: activeArrowTab === 0,
                            done: activeArrowTab > 0,
                          },
                          "d-flex align-items-center justify-content-center cursor-pointer"
                        )}
                        onClick={() => toggleArrowTab(0)}
                      >
                        <div className="d-flex flex-row gap-2 align-items-center">
                          <div
                            className="rounded-pill border border-primary d-flex justify-content-center align-items-center"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <span>1</span>
                          </div>
                          <span>Import Files</span>
                        </div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        id="steparrow-validate-users-tab"
                        className={classnames(
                          {
                            active: activeArrowTab === 1,
                            done: activeArrowTab > 1,
                          },
                          "d-flex align-items-center justify-content-center cursor-pointer"
                        )}
                        onClick={() => toggleArrowTab(1)}
                      >
                        <div className="d-flex flex-row gap-2 align-items-center">
                          <div
                            className="rounded-pill border border-primary d-flex justify-content-center align-items-center"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <span>2</span>
                          </div>
                          <span>Manage Users</span>
                        </div>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        id="steparrow-final-confirmation-tab"
                        className={classnames(
                          {
                            active: activeArrowTab === 2,
                          },
                          "d-flex align-items-center justify-content-center cursor-pointer"
                        )}
                        onClick={() => toggleArrowTab(2)}
                      >
                        <div className="d-flex flex-row gap-2 align-items-center">
                          <div
                            className="rounded-pill border border-primary d-flex justify-content-center align-items-center"
                            style={{ width: "24px", height: "24px" }}
                          >
                            <span>3</span>
                          </div>
                          <span>Final Confirmation</span>
                        </div>
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={activeArrowTab}>
                    <TabPane tabId={0}>
                      <div className="py-3">
                        <Row className="mb-3">
                          <Col>
                            <ImportFiles onImportFiles={handleImportFiles} />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex flex-row gap-2 justify-content-end">
                              <Button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  toggleArrowTab(activeArrowTab - 1)
                                }
                              >
                                Back
                              </Button>
                              <Button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  toggleArrowTab(activeArrowTab + 1)
                                }
                                disabled={selectedFiles.length === 0}
                              >
                                Next
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId={1}>
                      <div className="py-3">
                        <Row className="mb-3">
                          <Col>
                            <ManageUsers
                              selectedFiles={selectedFiles}
                              onHandleNewUsers={handleNewUsers}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex flex-row gap-2 justify-content-end">
                              <Button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  toggleArrowTab(activeArrowTab - 1)
                                }
                              >
                                Back
                              </Button>
                              <Button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  toggleArrowTab(activeArrowTab + 1)
                                }
                                disabled={newUsers.length === 0}
                              >
                                Next
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                    <TabPane tabId={2}>
                      <div className="py-3">
                        <Row>
                          <Col>
                            <FinaliseMassUsers newUsers={newUsers} />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="d-flex flex-row gap-2">
                              <Button
                                className="btn btn-custom-primary"
                                onClick={() =>
                                  toggleArrowTab(activeArrowTab - 1)
                                }
                              >
                                Back
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default MassImportUsers;
