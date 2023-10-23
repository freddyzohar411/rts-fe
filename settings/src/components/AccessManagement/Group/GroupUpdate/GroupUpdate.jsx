import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Col,
  Button,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import classnames from "classnames";
import {
  roleData,
  roleGroupData,
  userData,
  userGroupData,
  userGroupMembersData,
} from "../../dataSample";
function GroupUpdate() {
  const { groupName } = useParams();
  const groupDetails = userGroupData.find(
    (group) => group.groupName === groupName
  );

  document.title = `${groupName} Update | RTS`;

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  // GROUP MEMBERS AND ROLES
  const groupMembers = userGroupMembersData.find(
    (group) => group.groupName === groupName
  );

  const memberUsernames = groupMembers.members;
  const memberDetails = memberUsernames.map((username) =>
    userData.find((user) => user.username === username)
  );

  const groupRoles = roleGroupData.filter((role) =>
    role.groups.includes(groupName)
  );
  const roleNames = groupRoles.map((role) => role.roleName);
  const roleDetails = roleData.filter((role) =>
    roleNames.includes(role.roleName)
  );

  const formattedUsers = userData.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));
  const existingMembers = memberDetails.map((user) => user.username);
  const [selectedMembers, setSelectedMembers] = useState(existingMembers);

  const formattedRoles = roleData.map((role) => ({
    value: role.roleName,
    label: role.roleName,
  }));
  const [selectedRoles, setSelectedRoles] = useState(roleNames);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem><Link to="/settings/access/">Settings</Link></BreadcrumbItem>
                <BreadcrumbItem active>Update Group</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h6 fw-bold">Update Group Details</span>
                    <span className="text-muted">
                      Make changes the group details, members and roles assigned
                      to the group.
                    </span>
                  </div>
                </CardHeader>
                <CardBody className="bg-light">
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row className="mb-3">
                            <Col>
                              <span className="h6 fw-bold">
                                General Information
                              </span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col>
                              <Label>Group Name</Label>
                              <Input
                                type="text"
                                name="groupName"
                                value={groupDetails.groupName}
                                className="form-control"
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col>
                              <Label>Group Description</Label>
                              <Input
                                type="textarea"
                                name="groupDescription"
                                value={groupDetails.groupDescription}
                                className="form-control"
                              />
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row className="mb-3">
                            <Col>
                              <span className="h6 fw-bold">
                                Member and Roles
                              </span>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Nav tabs>
                                <NavItem>
                                  <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                      active: activeTab === "1",
                                    })}
                                    onClick={() => {
                                      toggle("1");
                                    }}
                                  >
                                    Members
                                  </NavLink>
                                </NavItem>
                                <NavItem>
                                  <NavLink
                                    style={{ cursor: "pointer" }}
                                    className={classnames({
                                      active: activeTab === "2",
                                    })}
                                    onClick={() => {
                                      toggle("2");
                                    }}
                                  >
                                    Roles
                                  </NavLink>
                                </NavItem>
                              </Nav>
                              <TabContent activeTab={activeTab}>
                                <TabPane tabId="1">
                                  <div className="p-3">
                                    <Row className="mb-3">
                                      <Col>
                                        <div className="d-flex flex-row justify-content-around">
                                          <span className="fw-semibold">
                                            All Users
                                          </span>
                                          <span className="fw-semibold">
                                            Assigned Users
                                          </span>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row className="mb-3">
                                      <Col>
                                        <DualListBox
                                          options={formattedUsers}
                                          selected={selectedMembers}
                                          onChange={(e) =>
                                            setSelectedMembers(e)
                                          }
                                          canFilter={true}
                                          icons={{
                                            moveLeft: (
                                              <span
                                                className="mdi mdi-chevron-left"
                                                key="key"
                                              />
                                            ),
                                            moveAllLeft: [
                                              <span
                                                className="mdi mdi-chevron-double-left"
                                                key="key"
                                              />,
                                            ],
                                            moveRight: (
                                              <span
                                                className="mdi mdi-chevron-right"
                                                key="key"
                                              />
                                            ),
                                            moveAllRight: [
                                              <span
                                                className="mdi mdi-chevron-double-right"
                                                key="key"
                                              />,
                                            ],
                                            moveDown: (
                                              <span
                                                className="mdi mdi-chevron-down"
                                                key="key"
                                              />
                                            ),
                                            moveUp: (
                                              <span
                                                className="mdi mdi-chevron-up"
                                                key="key"
                                              />
                                            ),
                                            moveTop: (
                                              <span
                                                className="mdi mdi-chevron-double-up"
                                                key="key"
                                              />
                                            ),
                                            moveBottom: (
                                              <span
                                                className="mdi mdi-chevron-double-down"
                                                key="key"
                                              />
                                            ),
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                </TabPane>
                                <TabPane tabId="2">
                                  <div className="p-3">
                                    <Row className="mb-3">
                                      <Col>
                                        <div className="d-flex flex-row justify-content-around">
                                          <span className="fw-semibold">
                                            All Roles
                                          </span>
                                          <span className="fw-semibold">
                                            Assigned Roles
                                          </span>
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row className="mb-3">
                                      <Col>
                                        <DualListBox
                                          options={formattedRoles}
                                          selected={selectedRoles}
                                          onChange={(e) => setSelectedRoles(e)}
                                          canFilter={true}
                                          icons={{
                                            moveLeft: (
                                              <span
                                                className="mdi mdi-chevron-left"
                                                key="key"
                                              />
                                            ),
                                            moveAllLeft: [
                                              <span
                                                className="mdi mdi-chevron-double-left"
                                                key="key"
                                              />,
                                            ],
                                            moveRight: (
                                              <span
                                                className="mdi mdi-chevron-right"
                                                key="key"
                                              />
                                            ),
                                            moveAllRight: [
                                              <span
                                                className="mdi mdi-chevron-double-right"
                                                key="key"
                                              />,
                                            ],
                                            moveDown: (
                                              <span
                                                className="mdi mdi-chevron-down"
                                                key="key"
                                              />
                                            ),
                                            moveUp: (
                                              <span
                                                className="mdi mdi-chevron-up"
                                                key="key"
                                              />
                                            ),
                                            moveTop: (
                                              <span
                                                className="mdi mdi-chevron-double-up"
                                                key="key"
                                              />
                                            ),
                                            moveBottom: (
                                              <span
                                                className="mdi mdi-chevron-double-down"
                                                key="key"
                                              />
                                            ),
                                          }}
                                        />
                                      </Col>
                                    </Row>
                                  </div>
                                </TabPane>
                              </TabContent>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-end gap-2">
                    <Link to="/settings/access/">
                      <Button>Cancel</Button>
                    </Link>
                    <Button>Save</Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default GroupUpdate;
