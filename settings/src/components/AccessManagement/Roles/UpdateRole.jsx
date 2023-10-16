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
} from "reactstrap";
import { roleGroupData, userGroupMembersData, userData } from "../dataSample";
import classnames from "classnames";

function UpdateRole(props) {
  if (!props.roleItemData) {
    return null;
  }

  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Retrieve all the groups belonging to this role
  const roleData = roleGroupData.find((role) => {
    return (
      props.roleItemData && role.roleName.includes(props.roleItemData.roleName)
    );
  });

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

  useEffect(() => {}, []);
  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader className="modal-title border-bottom">
        Editing Role
      </ModalHeader>
      <ModalBody>
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
                  Members
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  style={{ cursor: "pointer" }}
                  className={classnames({ active: activeTab == "3" })}
                  onClick={() => toggle("3")}
                >
                  Permission
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1" id="manageGroups">
                <Card>
                  <CardBody></CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="2" id="manageUsers">
                <Card>
                  <CardBody></CardBody>
                </Card>
              </TabPane>
              <TabPane tabId="3" id="managePermissions">
                <Card>
                  <CardBody></CardBody>
                </Card>
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button>Save</Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateRole;
