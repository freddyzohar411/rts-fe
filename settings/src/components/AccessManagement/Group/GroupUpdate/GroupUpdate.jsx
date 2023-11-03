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
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GroupUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();

  const users = useSelector((state) => state.UserReducer.users);
  const roles = useSelector((state) => state.RoleReducer.users);
  const groups = useSelector((state) => state?.GroupReducer?.groups) ?? [];

  const [formattedUsers, setFormattedUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [formattedRoles, setFormattedRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [groupDetails, setGroupDetails] = useState();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  useEffect(() => {
    if (groups?.length > 0) {
      const groupDetails = groups?.find((group) => group?.id == id);
      setGroupDetails(groupDetails);

      document.title = `${groupDetails?.userGroupName} | RTS`;

      const existingUsers = groupDetails?.users?.map((user) => user?.id);
      setSelectedUsers(existingUsers);

      const roleNames = groupDetails?.roleEntities?.map((role) => role?.id);
      setSelectedRoles(roleNames);
    } else {
      navigate("/settings/access");
    }
  }, []);

  useEffect(() => {
    if (users?.length) {
      const usersData = users?.map((user) => ({
        value: user?.id,
        label: user?.firstName + " " + user?.lastName,
      }));
      setFormattedUsers(usersData);
    }
  }, [users]);

  useEffect(() => {
    if (roles?.length) {
      const rolesData = roles?.map((role) => ({
        value: role?.id,
        label: role?.roleName,
      }));
      setFormattedRoles(rolesData);
    }
  }, [roles]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access/">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Update Group</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Update Group Details</span>
                    <span>
                      Make changes the group details, members and roles assigned
                      to the group.
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-4">
                    <Col>
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
                            value={groupDetails?.userGroupName}
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
                            value={groupDetails?.userGroupDescription}
                            className="form-control"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Row className="mb-3">
                        <Col>
                          <span className="h6 fw-bold">Member and Roles</span>
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
                                    <div className="d-flex flex-row w-100">
                                      <span className="fw-semibold w-50">
                                        All Users
                                      </span>
                                      <span className="fw-semibold w-50 ms-5">
                                        Assigned Users
                                      </span>
                                    </div>
                                  </Col>
                                </Row>
                                <Row className="mb-3">
                                  <Col>
                                    <DualListBox
                                      options={formattedUsers}
                                      selected={selectedUsers}
                                      onChange={(e) => setSelectedUsers(e)}
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
                                    <div className="d-flex flex-row w-100">
                                      <span className="fw-semibold w-50">
                                        All Roles
                                      </span>
                                      <span className="fw-semibold w-50 ms-5">
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
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-end gap-2">
                    <Link to="/settings/access/">
                      <Button className="btn btn-custom-primary">Cancel</Button>
                    </Link>
                    <Button className="btn btn-custom-primary" type="submit">
                      Save
                    </Button>
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
