import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Label,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Table,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import {
  roleGroupData,
  userGroupMembersData,
  userData,
  permissionRoleData,
  permissionData,
} from "../dataSample";
import classnames from "classnames";

function UpdateRole(props) {
  if (!props.roleItemData) {
    return null;
  }

  // Retrieve all the permissions from the role
  const allPermissions = permissionRoleData.find(
    (role) => role.roleName === props.roleItemData.roleName
  );

  if (!allPermissions) {
    console.log("No permissions found.");
  } else {
    console.log("Permissions:", allPermissions);
  }

  // DUAL LIST BOX
  const [selected, setSelected] = useState([]);
  const findGroups = roleGroupData.find(
    (role) => role.roleName === props.roleItemData.roleName
  );
  const formattedGroupData = findGroups.groups.map((group) => ({
    value: group,
    label: group,
  }));

  // TABS
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader className="modal-title border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Editing Role</span>
          <span className="fs-6 text-muted">
            Make changes to the user groups and permissions in this role.
          </span>
        </div>
      </ModalHeader>
      <ModalBody className="bg-light">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="mb-3">
                  <Label>Role Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={props.roleItemData.roleName}
                  />
                </div>
                <div className="mb-3">
                  <Label>Role Description</Label>
                  <Input
                    type="textarea"
                    className="form-control"
                    value={props.roleItemData.roleDescription}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
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
                  <TabPane tabId="1" id="managePermissions">
                    <Card>
                      <CardBody>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <span className="text-muted">
                              Viewing all the permissions assigned to this role.
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <Table className="table table-striped table-bordered table-hover border-light align-middle">
                              <thead>
                                <tr>
                                  <th scope="col">Module</th>
                                  <th scope="col" className="text-center">
                                    Read
                                  </th>
                                  <th scope="col" className="text-center">
                                    Write
                                  </th>
                                  <th scope="col" className="text-center">
                                    Edit
                                  </th>
                                  <th scope="col" className="text-center">
                                    Delete
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {allPermissions ? (
                                  <>
                                    {allPermissions.permissionData.map(
                                      (module) => (
                                        <tr>
                                          <td>{module.moduleName}</td>
                                          {module.permissions.map((access) => (
                                            <>
                                              <td>
                                                {access.read ? (
                                                  <Input
                                                    type="checkbox"
                                                    checked
                                                  />
                                                ) : (
                                                  <Input type="checkbox" />
                                                )}
                                              </td>
                                              <td>
                                                {access.write ? (
                                                  <Input
                                                    type="checkbox"
                                                    checked
                                                  />
                                                ) : (
                                                  <Input type="checkbox" />
                                                )}
                                              </td>
                                              <td>
                                                {access.edit ? (
                                                  <Input
                                                    type="checkbox"
                                                    checked
                                                  />
                                                ) : (
                                                  <Input type="checkbox" />
                                                )}
                                              </td>
                                              <td>
                                                {access.delete ? (
                                                  <Input
                                                    type="checkbox"
                                                    checked
                                                  />
                                                ) : (
                                                  <Input type="checkbox" />
                                                )}
                                              </td>
                                            </>
                                          ))}
                                        </tr>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {permissionData.map((module) => (
                                      <tr>
                                        <td>{module.moduleName}</td>
                                        {module.permissions.map((access) => (
                                          <>
                                            <td className="text-center">
                                              {!access.read && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!access.write && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!access.edit && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!access.delete && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                          </>
                                        ))}
                                      </tr>
                                    ))}
                                  </>
                                )}
                              </tbody>
                            </Table>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </TabPane>
                  <TabPane tabId="2" id="manageGroups">
                    <Card>
                      <CardBody>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <span className="text-muted">
                              Viewing all the groups assigned to this role.
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <DualListBox
                              options={formattedGroupData}
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
                      </CardBody>
                    </Card>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-dark" type="button" onClick={props.cancel}>
          Cancel
        </Button>
        <Button className="btn btn-dark" type="button">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateRole;
