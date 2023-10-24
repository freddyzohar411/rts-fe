import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  Table,
  TabContent,
  TabPane,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import {
  roleGroupData,
  userData,
  userGroupMembersData,
} from "../../dataSample";
import classnames from "classnames";

function UserDetails() {
  const { username } = useParams();
  const userDetails = userData.find((user) => user.username === username);
  document.title = `${userDetails.firstName} ${userDetails.lastName} | RTS `;

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  // User Groups
  const userGroup = userGroupMembersData.find((group) =>
    group.members.includes(username)
  );

  // User Roles
  const userRoles = userGroup
    ? userGroupMembersData
        .filter((group) => group.members && group.members.includes(username))
        .flatMap((group) =>
          roleGroupData
            .filter(
              (role) => role.groups && role.groups.includes(group.groupName)
            )
            .map((role) => role.roleName)
        )
    : null;
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access/">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>User Detail</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">User Details</span>
                    <span className="fs-6">
                      View the role details, permissions and user groups
                      assigned to this role.
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <Row className="mb-3">
                        <Col>
                          <span className="h6 fw-bold">
                            General Information
                          </span>
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col lg={4}>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-light">Name</span>
                            <span>
                              {userDetails.firstName} {userDetails.lastName}
                            </span>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-light">Username</span>
                            <span>{userDetails.username}</span>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-light">Employee ID</span>
                            <span>{userDetails.employeeId}</span>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mb-3">
                        <Col lg={4}>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-light">Email Address</span>
                            <span>{userDetails.email}</span>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="d-flex flex-column gap-1">
                            <span className="fw-light">Contact Number</span>
                            <span>{userDetails.contactNo}</span>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Row className="mb-3">
                        <Col>
                          <span className="h6 fw-bold">Groups and Roles</span>
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
                                Groups
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
                                  <Table className="table table-striped table-bordered table-hover border-light align-middle">
                                    <thead>
                                      <tr>
                                        <th>Group Name</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>{userGroup.groupName}</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tabId="2">
                              <Row>
                                <Col>
                                  <Table className="table table-bordered table-striped table-hover border-light align-middle">
                                    <thead>
                                      <tr>
                                        <th>Role Name</th>
                                        <th style={{ width: "10px" }}></th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {userRoles.map((role) => (
                                        <tr>
                                          <td>{role}</td>
                                          <td>
                                            <Button>
                                              <i className="ri-eye-line"></i>
                                            </Button>
                                          </td>
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
                  <Link to="/settings/access/">
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

export default UserDetails;
