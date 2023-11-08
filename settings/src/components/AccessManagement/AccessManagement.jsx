import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import RolesTab from "./Roles/RolesTab";
import UsersTab from "./User/UsersTab";
import GroupsTab from "./Group/GroupsTab";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { fetchGroups, listGroups } from "../../store/group/action";

function AccessManagement() {
  const location = useLocation();
  const navState = location.state;

  document.title = "Access Management Settings | RTS";

  // Tabs
  const [activeTab, setActiveTab] = useState(navState?.activeTab || "1");

  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // User Group Tab
  const [ugTab, setUgTab] = useState(navState?.ugTab || "1");
  const toggleUg = (tab) => {
    if (ugTab !== tab) {
      setUgTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <div className="mb-3">
                <h5>Access Management Settings</h5>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Nav tabs className="nav-tabs mb-3">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          toggle("1");
                        }}
                      >
                        Users & Groups
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          toggle("2");
                        }}
                      >
                        Roles & Permissions
                      </NavLink>
                    </NavItem>
                  </Nav>

                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1" id="manageUsersGroups">
                      <Row>
                        <Col lg={12}>
                          <div className="d-flex flex-column mb-3">
                            <h5 className="fw-bolder">Manage Users & Groups</h5>
                            <span className="text-muted">
                              Manage different users and user groups in this
                              system.
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} className="d-flex flex-start gap-3 mb-3">
                          <Link to="/settings/access/user/user-creation">
                            <Button
                              className="btn btn-custom-primary btn-sm"
                              type="button"
                            >
                              <i className="ri-user-line me-2"></i>
                              <span>NEW USER</span>
                            </Button>
                          </Link>
                          <Link to="/settings/access/group/group-creation">
                            <Button
                              className="btn btn-custom-primary"
                              type="button"
                              size="sm"
                            >
                              <i className="ri-team-line me-2"></i>
                              <span>NEW USER GROUP</span>
                            </Button>
                          </Link>
                        </Col>
                      </Row>

                      <Row>
                        <Col lg={12}>
                          <Nav tabs>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: ugTab === "1",
                                })}
                                onClick={() => {
                                  toggleUg("1");
                                }}
                              >
                                <i className="ri-user-line me-2"></i>
                                <span>Users</span>
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: ugTab === "2",
                                })}
                                onClick={() => {
                                  toggleUg("2");
                                }}
                              >
                                <i className="ri-team-line me-2"></i>
                                <span>Groups</span>
                              </NavLink>
                            </NavItem>
                          </Nav>
                          <TabContent activeTab={ugTab}>
                            {/* USERS MANAGEMENT */}
                            <TabPane tabId="1" id="manageUsers">
                              <Card>
                                <CardBody>
                                  <UsersTab />
                                </CardBody>
                              </Card>
                            </TabPane>

                            {/* GROUPS MANAGEMENT */}
                            <TabPane tabId="2" id="manageGroups">
                              <Card>
                                <CardBody>
                                  <GroupsTab />
                                </CardBody>
                              </Card>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </Row>
                    </TabPane>

                    {/* ROLES AND PERMISSION */}
                    <TabPane tabId="2" id="manageRolesPermission">
                      <RolesTab />
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

export default AccessManagement;
