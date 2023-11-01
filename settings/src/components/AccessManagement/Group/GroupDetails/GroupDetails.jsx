import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import {
  roleData,
  roleGroupData,
  userData,
  userGroupData,
  userGroupMembersData,
} from "../../dataSample";
import classnames from "classnames";

function GroupDetails() {
  const { groupName } = useParams();
  const groupDetails = userGroupData.find(
    (group) => group.groupName === groupName
  );

  document.title = `${groupDetails.groupName} | RTS`;

  const groupMembers = userGroupMembersData.find(
    (group) => group.groupName === groupName
  );
  const groupMember = groupMembers.members;
  const memberDetails = groupMember.map((username) =>
    userData.find((user) => user.username === username)
  );

  const groupRoles = roleGroupData.filter((role) =>
    role.groups.includes(groupName)
  );
  const roleNames = groupRoles.map((role) => role.roleName);
  const roleDetails = roleData.filter((role) =>
    roleNames.includes(role.roleName)
  );

  // Tab
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Group Details</span>
                    <span>
                      View details, members and roles assigned to this group.
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
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-semibold">Group Name</span>
                            <span>{groupDetails.groupName}</span>
                          </div>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-semibold">
                              Group Description
                            </span>
                            <span>{groupDetails.groupDescription}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="mb-3">
                        <Col>
                          <span className="h6 fw-bold">Members and Roles</span>
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
                              <Row>
                                <Col>
                                  <Table className="table table-hover table-striped table-bordered border-light align-middle">
                                    <thead>
                                      <tr>
                                        <th>Employee ID</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {memberDetails.map((member) => (
                                        <tr>
                                          <td>{member.employeeId}</td>
                                          <td>
                                            {member.firstName} {member.lastName}{" "}
                                          </td>
                                          <td>{member.username}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col>
                                  <Table className="table table-striped table-bordered table-hover border-light align-middle">
                                    <thead>
                                      <tr>
                                        <th>Role Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {roleDetails.map((role) => (
                                        <tr>
                                          <td>{role.roleName}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Link to="/settings/access">
                    <Button className="btn btn-custom-primary" type="button">
                      Back
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default GroupDetails;
