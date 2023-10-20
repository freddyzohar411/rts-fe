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
import {
  roleGroupData,
  userData,
  userGroupMembersData,
  permissionRoleData,
} from "../dataSample";
import SimpleBar from "simplebar-react";

function Role(props) {
  if (!props.roleItemData) {
    return null;
  }

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

  console.log("All user groups:", userGroup);

  const usersInGroups = userData.filter((user) =>
    allUsernames.includes(user.username)
  );

  // Retrieve all the permissions from the role
  const permissions = permissionRoleData.find(
    (role) => role.roleName === props.roleItemData.roleName
  );

  if (!permissions) {
    console.log("No permissions assigned.");
  } else console.log("Permissions:", permissions);

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="modal-title border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Role</span>
          <span className="text-muted fs-6">
            View the role details, user groups and permissions assigned to this
            role.
          </span>
        </div>
      </ModalHeader>
      <SimpleBar style={{ height: "400px" }}>
        <ModalBody className="bg-light">
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
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-bold">Permissions</span>
                        <span className="text-muted">
                          Permissions assigned to this role.
                        </span>
                      </div>
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={12}>
                      <Table className="table table-striped table-hover table-bordered border-light align-middle">
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
                          {permissions ? (
                            permissions.permissionData.map(
                              (permission, idx) => (
                                <tr key={idx}>
                                  <td>{permission.moduleName}</td>
                                  {permission.permissions.map((data) => (
                                    <>
                                      <td>{data.read ? "Yes" : "No"}</td>
                                      <td>{data.write ? "Yes" : "No"}</td>
                                      <td>{data.edit ? "Yes" : "No"}</td>
                                      <td>{data.delete ? "Yes" : "No"}</td>
                                    </>
                                  ))}
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan={5}>No permissions assigned.</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </ModalBody>
      </SimpleBar>

      <ModalFooter>
        <Button onClick={props.cancel} className="btn btn-primary">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Role;
