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

  // Retrieve all the groups belonging to this role
  const roleData = roleGroupData.find((role) => {
    return (
      props.roleItemData && role.roleName.includes(props.roleItemData.roleName)
    );
  });

  // Retrieve all the permissions from the role
  const allPermissions = permissionRoleData.find(
    (role) => role.roleName === props.roleItemData.roleNem
  );

  // DUAL LIST BOX
  const formattedGroupData = roleData.groups.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));
  const [selectedGroups, setSelectedGroups] = useState([formattedGroupData]);

  // TABS
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const roleGroups = roleData.groups;

  // For each group, get the group members from userGroupMembersData
  const userGroup = userGroupMembersData.filter((group) =>
    roleGroups.includes(group.groupName)
  );

  // From userGroupMembersData, retrieve individual information from userData
  const allUsernames = userGroup.reduce(
    (usernames, group) => usernames.concat(group.members),
    []
  );

  const usersInGroups = userData.filter((user) =>
    allUsernames.includes(user.username)
  );

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
                      Groups
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({ active: activeTab == "2" })}
                      onClick={() => toggle("2")}
                    >
                      Permissions
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1" id="manageGroups">
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
                              selected={selectedGroups}
                              onChange={(e) => setSelectedGroups(e)}
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

                  <TabPane tabId="2" id="managePermissions">
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
                                {allPermissions
                                  ? allPermissions.map((permission, idx) => (
                                      <tr key={idx}>
                                        <td>{permission.moduleName}</td>
                                        {permission.permissions((data) => (
                                          <>
                                            <td>
                                              {data.read ? (
                                                <Input
                                                  type="checkbox"
                                                  checked
                                                />
                                              ) : (
                                                <Input type="checkbox" />
                                              )}
                                            </td>

                                            <td>
                                              {data.write ? (
                                                <Input
                                                  type="checkbox"
                                                  checked
                                                />
                                              ) : (
                                                <Input type="checkbox" />
                                              )}
                                            </td>

                                            <td>
                                              {data.edit ? (
                                                <Input
                                                  type="checkbox"
                                                  checked
                                                />
                                              ) : (
                                                <Input type="checkbox" />
                                              )}
                                            </td>

                                            <td>
                                              {data.delete ? (
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
                                    ))
                                  : permissionData.map((permission, idx) => (
                                      <tr key={idx}>
                                        <td>{permission.moduleName}</td>
                                        {permission.permissions.map((data) => (
                                          <>
                                            <td className="text-center">
                                              {!data.read && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!data.write && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!data.edit && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                            <td className="text-center">
                                              {!data.delete && (
                                                <Input type="checkbox" />
                                              )}
                                            </td>
                                          </>
                                        ))}
                                      </tr>
                                    ))}
                              </tbody>
                            </Table>
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
