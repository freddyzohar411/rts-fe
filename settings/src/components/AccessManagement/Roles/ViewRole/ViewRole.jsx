import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Input,
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
import classnames from "classnames";
import { fetchRole } from "../../../../store/roles/action";
import { fetchGroups } from "../../../../store/group/action";

function ViewRole() {
  const { roleId } = useParams();
  const dispatch = useDispatch();
  const role = useSelector((state) => state.RoleReducer.role);
  const groups = useSelector((state) => state.GroupReducer.groups);
  useEffect(() => {
    if (roleId) {
      dispatch(fetchRole(roleId));
      dispatch(fetchGroups());
    }
  }, []);


  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab != tab) {
      setActiveTab(tab);
    }
  };

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
                <BreadcrumbItem active>View Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold">View Role</span>
                    <span>
                      View role details, groups and permissions associated to
                      this role.
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <span className="fw-bold">General Information</span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <div className="d-flex flex-column gap-1">
                        <span className="fw-semibold">Role Name</span>
                        <span>{role?.roleName}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <div className="d-flex flex-column gap-1">
                        <span className="fw-semibold">Role Description</span>
                        <span>{role?.roleDescription}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <span className="fw-bold">Permissions and Groups</span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({ active: activeTab == "1" })}
                            onClick={() => toggle("1")}
                          >
                            Permissions
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            style={{ cursor: "pointer" }}
                            className={classnames({ active: activeTab == "2" })}
                            onClick={() => toggle("2")}
                          >
                            Groups
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" id="viewRolePermissions">
                          <Row>
                            <Col>
                              <Table className="table table-hover table-bordered table-striped align-middle border-secondary">
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
                                  {role &&
                                    role.modules &&
                                    role.modules.map((module, idx) => (
                                      <tr key={idx}>
                                        <td>{module.moduleName}</td>
                                        <td>
                                          {module.permissions.includes(
                                            "Read"
                                          ) ? (
                                            <Input
                                              type="checkbox"
                                              checked
                                              disabled
                                            />
                                          ) : (
                                            <Input type="checkbox" disabled />
                                          )}
                                        </td>
                                        <td>
                                          {module.permissions.includes(
                                            "Write"
                                          ) ? (
                                            <Input
                                              type="checkbox"
                                              checked
                                              disabled
                                            />
                                          ) : (
                                            <Input type="checkbox" disabled />
                                          )}
                                        </td>
                                        <td>
                                          {module.permissions.includes(
                                            "Edit"
                                          ) ? (
                                            <Input
                                              type="checkbox"
                                              checked
                                              disabled
                                            />
                                          ) : (
                                            <Input type="checkbox" disabled />
                                          )}
                                        </td>
                                        <td>
                                          {module.permissions.includes(
                                            "Delete"
                                          ) ? (
                                            <Input
                                              type="checkbox"
                                              checked
                                              disabled
                                            />
                                          ) : (
                                            <Input type="checkbox" disabled />
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2" id="viewRoleGroups">
                          <Row>
                            <Col>
                              <Table className="table table-hover table-striped table-bordered align-middle border-secondary">
                                <thead>
                                  <tr>
                                    <th>Group Name</th>
                                    <th>Group Description</th>
                                  </tr>
                                </thead>
                                <tbody></tbody>
                              </Table>
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Link to="/settings/access">
                    <Button className="btn btn-custom-primary">Back</Button>
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

export default ViewRole;
