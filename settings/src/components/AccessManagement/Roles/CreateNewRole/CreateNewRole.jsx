import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import { permissionData, userGroupData } from "../../dataSample";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import { Link } from "react-router-dom";

function CreateNewRole() {
  document.title = "Create New Role | RTS";

  // Tabs
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // Dual List Box
  const [selected, setSelected] = useState([]);
  const formattedGroups = userGroupData.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Role</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Create New Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Create New Role</span>
                    <span className="text-mute fs-6">
                      Create a new role to begin assigning access permissions to
                      user groups.
                    </span>
                  </div>
                </CardHeader>
                <CardBody className="bg-light">
                  <Row>
                    <Col lg={12}>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col>
                              <div className="mb-3">
                                <span className="h6 fw-bold">
                                  General Information
                                </span>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="mb-3">
                                <Label>Role Name</Label>
                                <Input
                                  className="form-control"
                                  placeholder="Enter role name"
                                  type="text"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className="mb-3">
                                <Label>Role Description</Label>
                                <Input
                                  className="form-control"
                                  placeholder="Enter role name"
                                  type="textarea"
                                />
                              </div>
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
                          <Row>
                            <Col>
                              <div className="d-flex flex-column gap-1 mb-3">
                                <span className="fw-bold h6">
                                  Permissions and Groups
                                </span>
                                <span className="text-muted">
                                  Assign permissions and groups to this role.
                                </span>
                              </div>
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
                            <TabPane tabId="1" id="permissionTab">
                              <Table className="table table-bordered table-hover table-striped border-light align-middle">
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
                                  {permissionData.map((module) => (
                                    <tr>
                                      <td>{module.moduleName}</td>
                                      {module.permissions.map((permission) => (
                                        <>
                                          <td>
                                            {!permission.read && (
                                              <Input
                                                type="checkbox"
                                                className="form-check-input"
                                              />
                                            )}
                                          </td>
                                          <td>
                                            {!permission.write && (
                                              <Input type="checkbox" />
                                            )}
                                          </td>
                                          <td>
                                            {!permission.update && (
                                              <Input
                                                type="checkbox"
                                                className="form-check-input"
                                              />
                                            )}
                                          </td>
                                          <td>
                                            {!permission.delete && (
                                              <Input type="checkbox" />
                                            )}
                                          </td>
                                        </>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </TabPane>
                            <TabPane tabId="2" id="groupTab">
                              <Row>
                                <Col>
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
                                          options={formattedGroups}
                                          selected={selected}
                                          onChange={(e) => setSelected(e)}
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
                                </Col>
                              </Row>
                            </TabPane>
                          </TabContent>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Button className="btn btn-primary" type="button">
                      Reset
                    </Button>
                    <div className="d-flex flex-row gap-3">
                      <Link to="/settings/access" className="text-dark">
                        <Button className="btn btn-primary" type="button">
                          Cancel
                        </Button>
                      </Link>
                      <Button className="btn btn-primary" type="submit">
                        Save
                      </Button>
                    </div>
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

export default CreateNewRole;
