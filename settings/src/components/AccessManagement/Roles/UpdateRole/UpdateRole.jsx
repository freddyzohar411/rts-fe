import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Label,
  Input,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import classnames from "classnames";
import {
  permissionRoleData,
  roleData,
  roleGroupData,
  userGroupData,
} from "../../dataSample";

function UpdateRole() {
  const { roleName } = useParams();
  const roleDetails = roleData.find((role) => role.roleName === roleName);
  document.title = `${roleDetails.roleName} Update | RTS`;

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  const formattedGroup = userGroupData.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  const existingGroups = roleGroupData.find(
    (role) => role.roleName === roleName
  );
  const formattedExistingGroups = existingGroups.groups.map((group) => group);
  const [selectedGroups, setSelectedGroups] = useState(formattedExistingGroups);

  const rolePermissions = permissionRoleData.find(
    (role) => role.roleName === roleName
  );
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Update Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h6 fw-bold">Update Role</span>
                    <span className="text-muted">
                      Make changes to the permissions and user groups assigned
                      to this role.
                    </span>
                  </div>
                </CardHeader>
                <Formik>
                  {({ errors, touched, resetForm }) => (
                    <Form>
                      <CardBody className="bg-light">
                        <Row className="mb-3">
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
                                    <Label>Role Name</Label>
                                    <Input
                                      type="text"
                                      value={roleDetails.roleName}
                                      className="form-control"
                                    />
                                  </Col>
                                </Row>
                                <Row className="mb-3">
                                  <Col>
                                    <Label>Role Description</Label>
                                    <Input
                                      type="textarea"
                                      value={roleDetails.roleDescription}
                                      className="form-control"
                                    />
                                  </Col>
                                </Row>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col>
                            <Card>
                              <CardBody>
                                <Row className="mb-3">
                                  <Col>
                                    <span className="h6 fw-bold">
                                      Permissions and Groups
                                    </span>
                                  </Col>
                                </Row>
                                <Row className="mb-3">
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
                                          Permissions
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
                                          Groups
                                        </NavLink>
                                      </NavItem>
                                    </Nav>

                                    <TabContent activeTab={activeTab}>
                                      <TabPane tabId="1">
                                        <Row className="mb-3">
                                          <Col>
                                            <Table className="table table-striped table-bordered table-hover border-light align-middle">
                                              <thead>
                                                <tr>
                                                  <th>Module</th>
                                                  <th>Read</th>
                                                  <th>Write</th>
                                                  <th>Edit</th>
                                                  <th>Delete</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {rolePermissions.permissionData.map(
                                                  (role) => (
                                                    <tr>
                                                      <td>{role.moduleName}</td>
                                                      {role.permissions.map(
                                                        (item) => (
                                                          <>
                                                            <td>
                                                              {item.read ? (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  checked
                                                                />
                                                              ) : (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                />
                                                              )}
                                                            </td>
                                                            <td>
                                                              {item.write ? (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  checked
                                                                />
                                                              ) : (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                />
                                                              )}
                                                            </td>
                                                            <td>
                                                              {item.update ? (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  checked
                                                                />
                                                              ) : (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                />
                                                              )}
                                                            </td>
                                                            <td>
                                                              {item.delete ? (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                  checked
                                                                />
                                                              ) : (
                                                                <Input
                                                                  className="form-check-input"
                                                                  type="checkbox"
                                                                />
                                                              )}
                                                            </td>
                                                          </>
                                                        )
                                                      )}
                                                    </tr>
                                                  )
                                                )}
                                              </tbody>
                                            </Table>
                                          </Col>
                                        </Row>
                                      </TabPane>
                                      <TabPane tabId="2">
                                        <div className="p-3">
                                          <Row className="mb-3">
                                            <Col>
                                              <div className="d-flex flex-row justify-content-around">
                                                <span className="fw-semibold">
                                                  All Groups
                                                </span>
                                                <span className="fw-semibold">
                                                  Assigned Groups
                                                </span>
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row className="mb-3">
                                            <Col>
                                              <DualListBox
                                                options={formattedGroup}
                                                selected={selectedGroups}
                                                onChange={(e) =>
                                                  setSelectedGroups(e)
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
                          <Link to="/settings/access">
                            <Button>Cancel</Button>
                          </Link>

                          <Button>Save</Button>
                        </div>
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default UpdateRole;
