import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  Input,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import {
  permissionRoleData,
  permissionData,
  roleGroupData,
  roleData,
} from "../../dataSample";

function ViewRole() {
  document.title = "Role | RTS";
  const { roleName } = useParams();
  const roleDetail = roleData.find((role) => role.roleName === roleName);

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

  // Retrieve Permissions
  const rolePermissions = permissionRoleData.find(
    (role) => role.roleName === roleDetail.roleName
  );

  // Retrieve Groups
  const roleGroups = roleGroupData.find(
    (role) => role.roleName === roleDetail.roleName
  );

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
                <BreadcrumbItem active>View Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Role</span>
                    <span className="text-muted">
                      View the role details, permissions and user groups
                      assigned to this role.
                    </span>
                  </div>
                </CardHeader>
                <CardBody className="bg-light">
                  <Row>
                    <Col>
                      <Card>
                        <CardBody className="p-4">
                          <Row className="mb-3">
                            <Col>
                              <span className="fw-bold h6">
                                General Information
                              </span>
                            </Col>
                          </Row>
                          <Row className="mb-3">
                            <Col className="d-flex flex-column gap-1">
                              <span className="fw-semibold">Role Name</span>
                              <span>{roleDetail.roleName}</span>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="d-flex flex-column gap-1">
                              <span className="fw-semibold">
                                Role Description
                              </span>
                              <span>{roleDetail.roleDescription}</span>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Card>
                        <CardBody className="p-4">
                          <Row className="mb-3">
                            <Col>
                              <span className="h6 fw-bold">
                                Permissions and Groups
                              </span>
                            </Col>
                          </Row>
                          <Nav tabs>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab === "1",
                                })}
                                onClick={() => toggle("1")}
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
                                onClick={() => toggle("2")}
                              >
                                Groups
                              </NavLink>
                            </NavItem>
                          </Nav>

                          <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                              <Table className="table table-bordered table-striped table-hover border-light align-middle">
                                <thead>
                                  <tr>
                                    <th>Modules</th>
                                    <th>Read</th>
                                    <th>Write</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {rolePermissions ? (
                                    <>
                                      {rolePermissions.permissionData.map(
                                        (module) => (
                                          <tr>
                                            <td>{module.moduleName}</td>
                                            {module.permissions.map(
                                              (permission) => (
                                                <>
                                                  <td>
                                                    {permission.read ? (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                        checked
                                                      />
                                                    ) : (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                      />
                                                    )}
                                                  </td>
                                                  <td>
                                                    {permission.write ? (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                        checked
                                                      />
                                                    ) : (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                      />
                                                    )}
                                                  </td>
                                                  <td>
                                                    {permission.update ? (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                        checked
                                                      />
                                                    ) : (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                      />
                                                    )}
                                                  </td>
                                                  <td>
                                                    {permission.delete ? (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                        checked
                                                      />
                                                    ) : (
                                                      <Input
                                                        type="checkbox"
                                                        disabled
                                                      />
                                                    )}
                                                  </td>
                                                </>
                                              )
                                            )}
                                          </tr>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {permissionData.map((module) => (
                                        <tr>
                                          <td>{module.moduleName}</td>
                                          {module.permissions.map(
                                            (permission) => (
                                              <>
                                                <td>
                                                  {permission.read && (
                                                    <Input
                                                      type="checkbox"
                                                      disabled
                                                    />
                                                  )}
                                                </td>
                                                <td>
                                                  {permission.write && (
                                                    <Input
                                                      type="checkbox"
                                                      disabled
                                                    />
                                                  )}
                                                </td>
                                                <td>
                                                  {permission.update && (
                                                    <Input
                                                      type="checkbox"
                                                      disabled
                                                    />
                                                  )}
                                                </td>
                                                <td>
                                                  {permission.delete && (
                                                    <Input
                                                      type="checkbox"
                                                      disabled
                                                    />
                                                  )}
                                                </td>
                                              </>
                                            )
                                          )}
                                        </tr>
                                      ))}
                                    </>
                                  )}
                                </tbody>
                              </Table>
                            </TabPane>

                            <TabPane tabId="2">
                              <Table className="table table-bordered table-striped table-hover border-light align-middle">
                                <thead>
                                  <tr>
                                    <th scope="col" style={{ width: "10px" }}>
                                      <Input
                                        type="checkbox"
                                        className="form-check-input"
                                      />
                                    </th>
                                    <th scope="col">Group Name</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {roleGroups.groups.map((group) => (
                                    <tr>
                                      <td>
                                        <Input
                                          type="checkbox"
                                          className="form-check-input"
                                        />
                                      </td>
                                      <td>{group}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </TabPane>
                          </TabContent>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Link to="/settings/access/"><Button>Back</Button></Link>
                  
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ViewRole;
