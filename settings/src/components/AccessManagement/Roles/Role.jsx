import React, { useEffect, useState } from "react";
import {
    Button,
  Card,
  CardBody,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { roleGroupData, userData, userGroupMembersData } from "../dataSample";

function Role(props) {
  if (!props.roleItemData) {
    return null;
  }
  // Retrieve all the individual users belonging to this role
  const [roleUsers, setRoleUsers] = useState([]);

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

  console.log("ROLEDATA", roleData.groups);
  console.log("userGroup:", userGroup);
  console.log("usersInGroup:", usersInGroups);
  console.log("roleItemData", props.roleItemData);

  useEffect(() => {}, []);

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="modal-title border-bottom">Role</ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col>
                    <div className="mb-4 d-flex flex-column gap-1">
                      <span className="text-muted">Role</span>
                      <span className="fw-semibold">
                        {props.roleItemData.roleName}
                      </span>
                      <span>{props.roleItemData.roleDescription}</span>
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
                    <div className="mb-3 d-flex flex-column gap-1">
                      <span className="fw-semibold">Users</span>
                      <span className="text-muted">
                        Users who are assigned to this role.
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table className="table table-bordered table-striped table-hover border-light align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}></th>
                          <th>Name</th>
                          <th>Username</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersInGroups.map((user, idx) => (
                          <tr>
                            <td>
                              <Input type="checkbox" />
                            </td>
                            <td>
                              {user.firstName} {user.lastName}
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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
                    <div className="mb-3 d-flex flex-column gap-1">
                      <span className="fw-semibold">Groups</span>
                      <span className="text-muted">
                        Groups who are assigned to this role.
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table className="table table-bordered table-hover table-striped border-light align-middle">
                      <thead>
                        <tr>
                          <th style={{ width: "10px" }}></th>
                          <th>Group</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roleData.groups.map((group, idx) => (
                          <tr key={idx}>
                            <td>
                              <Input type="checkbox" />
                            </td>
                            <td>{group}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col></Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card>
              <CardBody>
                <div className="mb-3 d-flex flex-column gap-1">
                  <span className="fw-bold">Permissions</span>
                  <span className="text-muted">
                    Permissions assigned to this role.
                  </span>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.cancel} className="btn btn-dark">Close</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Role;
