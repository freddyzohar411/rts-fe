import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import classnames from "classnames";
import { userGroupData, userData, permissionData } from "../dataSample";

function NewRole(props) {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader>
        <h5 className="fw-bold">Create New Role</h5>
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          <Row>
            <Col lg={12} className="mb-3">
              <Label>Role Name</Label>
              <Input
                type="text"
                className="form-control"
                placeholder="Enter role name.."
              />
            </Col>
          </Row>
          <Row>
            <Col lg={12} className="mb-3">
              <Label>Role Description</Label>
              <Input
                type="textarea"
                className="form-control"
                placeholder="Enter role description.."
              />
            </Col>
          </Row>
        </div>

        <Row>
          <Col lg={12}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: activeTab === "1" })}
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
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => {
                    toggle("2");
                  }}
                >
                  Members
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" id="permissions">
                <div className="my-3">
                  <h6>Permissions</h6>
                  <p className="text-muted">
                    Permissions control the types of activities that a user or
                    group can do. Please tick the appropriate boxes for
                    permission to carry out these actions for this role.
                  </p>
                  <Table
                    className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3"
                    id="permissionsTable"
                  >
                    <thead>
                      <tr>
                        <th>Module</th>
                        <th>Create</th>
                        <th>Retrieve</th>
                        <th>Update</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permissionData.map((module) => (
                        <tr>
                          <td>{module.moduleName}</td>
                          <td>
                            <Input
                              type="checkbox"
                              name="createCheckbox"
                              className="form-check-input"
                            />
                          </td>
                          <td>
                            <Input
                              type="checkbox"
                              name="retrieveCheckbox"
                              className="form-check-input"
                            />
                          </td>
                          <td>
                            <Input
                              type="checkbox"
                              name="updateCheckbox"
                              className="form-check-input"
                            />
                          </td>
                          <td>
                            <Input
                              type="checkbox"
                              name="deleteCheckbox"
                              className="form-check-input"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </TabPane>

              <TabPane tabId="2" id="members">
                <div className="my-3">
                  <Row>
                    <Col lg={12}>
                      <h6>Members</h6>
                      <p className="text-muted">
                        Assign users or user groups to this role.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      lg={12}
                      className="d-flex flex-start justify-content-between mt-2"
                    >
                      <div
                        className="border col-6"
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                      >
                        <Card>
                          <CardHeader className="d-flex align-items-center gap-3">
                            <i className="ri-user-fill"></i>
                            <span>User</span>
                          </CardHeader>
                          <CardBody>
                            <div className="table-responsive">
                              <div className="search-box">
                                <Input
                                  type="text"
                                  placeholder="Search.."
                                  className="form-control mb-2"
                                />
                                <i className="ri-search-line search-icon"></i>
                              </div>
                              <Table className="table table-hover table-striped border-light align-middle table-nowrap rounded-3">
                                <thead>
                                  <tr>
                                    <th scope="col" style={{ width: "20px" }}>
                                      <Input type="checkbox" name="group" />
                                    </th>
                                    <th scope="col">
                                      <span>Users</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userData.map((item, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        <Input type="checkbox" name="group" />
                                      </td>
                                      <td>{item.username}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                      <div
                        className="border col-6"
                        style={{ maxHeight: "300px", overflowY: "auto" }}
                      >
                        <Card>
                          <CardHeader className="d-flex align-items-center gap-3">
                            <i className="ri-team-fill"></i> <span>Groups</span>
                          </CardHeader>
                          <CardBody>
                            <div className="table-responsive">
                              <div className="search-box">
                                <Input
                                  type="text"
                                  placeholder="Search.."
                                  className="form-control mb-2"
                                />
                                <i className="ri-search-line search-icon"></i>
                              </div>
                              <Table className="table table-hover table-striped border-light align-middle table-nowrap rounded-3">
                                <thead>
                                  <tr>
                                    <th scope="col" style={{ width: "20px" }}>
                                      <Input type="checkbox" name="group" />
                                    </th>
                                    <th scope="col">
                                      <span>Group Name</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {userGroupData.map((group, idx) => (
                                    <tr key={idx}>
                                      <td>
                                        <Input type="checkbox" name="group" />
                                      </td>
                                      <td>{group.groupName}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </Col>
                  </Row>
                </div>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button>Save</Button>
        <Button onClick={props.cancel}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewRole;
