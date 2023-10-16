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
import RolesTab from "./Roles/RolesTab"
import UsersTab from "./User/UsersTab";
import GroupsTab from "./Group/GroupsTab";
import NewGroup from "./Group/NewGroup";
import NewUser from "./User/NewUser";

function AccessManagement() {
  document.title = "Access Management Settings | RTS";
  const [activeTab, setActiveTab] = useState("1");
  const [newUserModal, setNewUserModal] = useState(false);
  const [newGroupModal, setNewGroupModal] = useState(false);
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [ugTab, setUgTab] = useState("1");
  const toggleUg = (tab) => {
    if (ugTab !== tab) {
      setUgTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
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

                  <TabContent activeTab={activeTab} className="text-muted">
                    <TabPane tabId="1" id="manageUsersGroups">
                      <Row>
                        <Col lg={12}>
                          <h5 className="fw-bolder mb-3">
                            Manage Users & Groups
                          </h5>
                          <p className="text-muted">
                            Manage different users and user groups in this
                            system.
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={12} className="d-flex flex-start gap-3 mb-5">
                          <Button
                            className="btn btn-secondary btn-sm"
                            type="button"
                            onClick={() => setNewUserModal(!newUserModal)}
                          >
                            <i className="ri-user-line me-2"></i>
                            <span>NEW USER</span>
                          </Button>
                          <Button
                            className="btn btn-secondary"
                            type="button"
                            size="sm"
                            onClick={() => setNewGroupModal(!newGroupModal)}
                          >
                            <i className="ri-team-line me-2"></i>
                            <span>NEW USER GROUP</span>
                          </Button>
                        </Col>
                      </Row>
                      <NewUser show={newUserModal} cancel={() => setNewUserModal(!newUserModal)}/>
                      <NewGroup
                        show={newGroupModal}
                        cancel={() => setNewGroupModal(!newGroupModal)}
                      />

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
                              <Row>
                                <Col lg={12}>
                                  <UsersTab />
                                </Col>
                              </Row>
                            </TabPane>

                            {/* GROUPS MANAGEMENT */}
                            <TabPane tabId="2" id="manageGroups">
                              <Row className="my-3">
                                <Col lg={12}>
                                  <GroupsTab />
                                </Col>
                              </Row>
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
