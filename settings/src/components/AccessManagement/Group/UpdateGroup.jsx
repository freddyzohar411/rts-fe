import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
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
// import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import {
  userGroupMembersData,
  userData,
  roleGroupData,
  roleData,
  userGroupData,
} from "../dataSample";

function UpdateGroup(props) {
  if (!props.groupData) {
    return null;
  }

  // TABS
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  // GROUP MEMBERS AND ROLES
  const groupMembers = userGroupMembersData.find(
    (group) => group.groupName === props.groupData.groupName
  );

  const memberUsernames = groupMembers.members;
  const memberDetails = memberUsernames.map((username) =>
    userData.find((user) => user.username === username)
  );

  const groupRoles = roleGroupData.filter((role) =>
    role.groups.includes(props.groupData.groupName)
  );
  const roleNames = groupRoles.map((role) => role.roleName);
  const roleDetails = roleData.filter((role) =>
    roleNames.includes(role.roleName)
  );

  // DUAL LIST BOX

  // Reformat all the users
  const formattedUsers = userData.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));

  // Get members who are already in the group
  const existingMembers = memberDetails.map((user) => ({
    value: user.username,
  }));

  const [selected, setSelected] = useState([existingMembers]);

  const formattedRoles = groupRoles.map((role) => ({
    value: role.roleName,
    label: role.roleName,
  }));

  console.log("Existing Members:", existingMembers);
  console.log("All Member:", formattedUsers);

  // const [selected, setSelected] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([formattedRoles]);

  useEffect(() => {
    console.log("Selected Users:", selected);
  });

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      size="xl"
      scrollable
    >
      <ModalHeader className="modal-title border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Editing Group</span>
          <span className="fs-6 text-muted">
            Make changes to the group details and members assigned to this
            group.
          </span>
        </div>
      </ModalHeader>
      <ModalBody className="bg-light">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="mb-3">
                  <Label>Group Name</Label>
                  <Input
                    type="text"
                    className="form-control"
                    value={props.groupData.groupName}
                  />
                </div>
                <div className="mb-3">
                  <Label>Group Description</Label>
                  <Input
                    type="textarea"
                    className="form-control"
                    value={props.groupData.groupDescription}
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
                      Members
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({ active: activeTab == "2" })}
                      onClick={() => toggle("2")}
                    >
                      Roles
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1" id="manageUsers">
                    <Card>
                      <CardBody>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <span className="text-muted">
                              Viewing all the members that belong to this group.
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <DualListBox
                              options={formattedUsers}
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
                  <TabPane tabId="2" id="manageRoles">
                    <Card>
                      <CardBody>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <span className="text-muted">
                              Viewing all the roles that are assigned to this
                              group.
                            </span>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={12}>
                            <DualListBox
                              options={formattedRoles}
                              selected={selectedRoles}
                              onChange={(e) => setSelectedRoles(e)}
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
        <Button className="btn btn-dark" onClick={(props.cancel)}>
          Cancel
        </Button>
        <Button className="btn btn-dark">Save</Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateGroup;
