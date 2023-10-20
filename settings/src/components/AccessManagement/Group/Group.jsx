import React from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Row,
  Col,
  Card,
  CardBody,
  ListGroup,
  ListGroupItem,
  Input,
  ModalHeader,
} from "reactstrap";
import {
  userData,
  userGroupMembersData,
  roleGroupData,
  roleData,
} from "../dataSample";
import SimpleBar from "simplebar-react";

function Group(props) {
  if (!props.groupData) {
    return null;
  }

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

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalHeader className="border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Group</span>
          <span className="text-muted fs-6">View group details and members assigned to this group.</span>
        </div>
        </ModalHeader>
      <ModalBody className="bg-light">
        <SimpleBar
          style={{ height: "600px", overflowX: "hidden", overflowY: "auto" }}
        >
          <Row>
            <Col lg={6}>
              <Card style={{ minHeight: "300px" }}>
                <CardBody className="p-4">
                  <div className="mb-4">
                    <div className="d-flex flex-column gap-2 mb-3">
                      <span className="fw-bold">General Information</span>
                      <span className="fw-semibold">
                        {props.groupData.groupName}
                      </span>
                      <span className="text-muted">
                        {props.groupData.groupDescription}
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card style={{ minHeight: "300px" }}>
                <CardBody className="p-4">
                  <div className="mb-4">
                    <div className="d-flex flex-column gap-2 mb-3">
                      <span className="fw-bold">Roles</span>
                      <span className="text-muted">
                        All roles that belongs to this user group.
                      </span>
                    </div>

                    <ListGroup>
                      {roleDetails ? (
                        roleDetails.map((role, index) => (
                          <ListGroupItem key={index} color="dark">
                            <div className="d-flex flex-column gap-2">
                              <span className="fw-semibold">
                                {role.roleName}
                              </span>
                              <span>{role.roleDescription}</span>
                            </div>
                          </ListGroupItem>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>No roles assigned to this group.</td>
                        </tr>
                      )}
                    </ListGroup>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <div className="mb-3 d-flex flex-column gap-2">
                      <span className="fw-bold">Members</span>
                      <span className="text-muted">
                        All the members that belong to this group.
                      </span>
                    </div>

                    <Table className="table table-hover table-bordered table-striped border-light align-middle table-nowrap rounded-3">
                      <thead>
                        <tr>
                          <th scope="col" style={{ width: "10px" }}></th>
                          <th scope="col">Name</th>
                          <th scope="col">Username</th>
                          <th scope="col">Email Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberDetails.map((member, index) => (
                          <tr key={index}>
                            <td>
                              <Input type="checkbox" name="memberCheckbox" />
                            </td>
                            <td>
                              {member.firstName} {member.lastName}
                            </td>
                            <td>{member.username}</td>
                            <td>{member.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </SimpleBar>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-primary" onClick={props.cancel}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Group;
