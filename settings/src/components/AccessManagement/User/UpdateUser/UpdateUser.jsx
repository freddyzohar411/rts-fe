import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Label,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import DualListBox from "react-dual-listbox";
import {
  userGroupData,
  userGroupMembersData,
  userData,
} from "../../dataSample";

function UpdateUser() {
  const { username } = useParams();
  const userDetails = userData.find((user) => user.username === username);
  document.title = `${userDetails.firstName} ${userDetails.lastName} Update | RTS`;

  const formattedGroups = userGroupData.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  const userGroup = userGroupMembersData.find((group) =>
    group.members.includes(username)
  );
  console.log(userGroup.groupName);
  const [selectedGroup, setSelectedGroup] = useState([]);

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
                <BreadcrumbItem active>Update User</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Update User</span>
                    <span className="text-muted">
                      Make changes to user details, groups and roles.
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
                            <Col lg={4}>
                              <Label>First Name</Label>
                              <Input
                                name="firstName"
                                type="text"
                                className="form-control"
                                value={userDetails.firstName}
                              />
                            </Col>
                            <Col lg={4}>
                              <Label>Last Name</Label>
                              <Input
                                name="lastName"
                                type="text"
                                className="form-control"
                                value={userDetails.lastName}
                              />
                            </Col>
                            <Col lg={4}>
                              <Label>Username</Label>
                              <Input
                                name="username"
                                type="text"
                                className="form-control"
                                value={userDetails.username}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={4}>
                              <Label>Employee ID</Label>
                              <Input
                                name="employeeId"
                                type="text"
                                className="form-control"
                                value={userDetails.employeeId}
                              />
                            </Col>
                            <Col lg={4}>
                              <Label>Email Address</Label>
                              <Input
                                name="email"
                                type="email"
                                className="form-control"
                                value={userDetails.email}
                              />
                            </Col>
                            <Col lg={4}>
                              <Label>Contact Number</Label>
                              <Input
                                name="contactNo"
                                type="number"
                                className="form-control"
                                value={userDetails.contactNo}
                              />
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col lg={4}>
                              <Label>Password</Label>
                              <Input
                                name="password"
                                type="password"
                                className="form-control"
                                value={userDetails.password}
                              />
                            </Col>
                            <Col lg={4}>
                              <Label>Confirm Password</Label>
                              <Input
                                name="confirmPassword"
                                type="password"
                                className="form-control"
                                value={userDetails.confirmPassword}
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
                              <span className="h6 fw-bold">Group</span>
                            </Col>
                          </Row>
                          <div className="border rounded p-3">
                          <Row className="mb-3">
                            <Col>
                                <div className="d-flex flex-row justify-content-around">
                                    <span className="fw-semibold">All Groups</span>
                                    <span className="fw-semibold">Assigned Groups</span>
                                </div>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col>
                            
                                <DualListBox
                                options={formattedGroups}
                                selected={selectedGroup}
                                onChange={(e) => setSelectedGroup(e)}
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
                          </Row></div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-end gap-2">
                    <Link to="/settings/access">
                      <Button className="btn btn-primary" type="button">
                        Cancel
                      </Button>
                    </Link>

                    <Button className="btn btn-primary" type="submit">
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

export default UpdateUser;
