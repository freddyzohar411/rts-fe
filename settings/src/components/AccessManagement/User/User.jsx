import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Table,
} from "reactstrap";
import { userGroupMembersData, roleGroupData } from "../dataSample";
import SimpleBar from "simplebar-react";

function User(props) {
  if (!props.user) {
    return null;
  }

  const groupForMember = userGroupMembersData.find((group) =>
    group.members.includes(props.user.username)
  );

  const userRoles = userGroupMembersData
    .filter(
      (group) => group.members && group.members.includes(props.user.username)
    )
    .flatMap((group) =>
      roleGroupData
        .filter((role) => role.groups && role.groups.includes(group.groupName))
        .map((role) => role.roleName)
    );

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalBody className="d-flex flex-column gap-3 bg-light p-4">
        <SimpleBar
          style={{ height: "490px", overflowX: "hidden", overflowY: "auto" }}
        >
          <Row>
            <Col lg={12}>
              <h5 className="fw-bold">User Profile</h5>
              <p className="text-muted">
                Manage user details, view user groups and roles.
              </p>
            </Col>
          </Row>
          <Row className="d-flex align-items-stretch justify-content-between">
            <Col lg={12}>
              <Card>
                <CardBody className="d-flex flex-column gap-5 p-4 ">
                  <Row>
                    <Col>
                      <Row>
                        <Col lf={12}>
                          <p className="fw-bold">General Information</p>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row mb-3">
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">
                            First Name
                          </span>
                          <span className="fw-semibold">
                            {props.user.firstName}
                          </span>
                        </Col>
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">
                            Last Name
                          </span>
                          <span className="fw-semibold">
                            {props.user.lastName}
                          </span>
                        </Col>
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">Username</span>
                          <span className="fw-semibold">
                            {props.user.username}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">
                            Email Address
                          </span>
                          <span className="fw-semibold">
                            {props.user.email}
                          </span>
                        </Col>
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">
                            Contact Number
                          </span>
                          <span className="fw-semibold">
                            {props.user.contactNo}
                          </span>
                        </Col>
                        <Col lg={4} className="d-flex flex-column">
                          <span className="text-muted semi-bold">Status</span>
                          <span className="fw-semibold text-success">
                            Active
                          </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>

            {/* GROUPS */}
            <Col lg={12}>
              <Card>
                <CardBody className="d-flex flex-column gap-3 p-4">
                  <Row>
                    <Col>
                      <p className="fw-bold">Groups</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Table className="table table-hover table-bordered align-middle  border-light">
                        <thead>
                          <tr>
                            <th style={{ width: "10px" }}>
                              <Input type="checkbox" />
                            </th>
                            <th>Group Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Input type="checkbox" />
                            </td>
                            <td>{groupForMember.groupName}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* ROLES AND PERMISSIONS */}
          <Row>
            <Col>
              <Card>
                <CardBody className="p-4">
                  <Row>
                    <Col>
                      <p className="fw-bold">Roles and Permissions</p>
                    </Col>
                  </Row>
                  <Row>
                    <Table className="table table-hover table-bordered table-striped border-light align-middle">
                      <thead>
                        <tr>
                          <th scope="col" style={{width: "10px"}}></th>
                          <th scope="col">Role Name</th>
                          <th scope="col" style={{width: "170px"}}>Permissions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          userRoles.map((role, idx) => (
                            <tr key={idx}>
                              <td><Input type="checkbox" /></td>
                              <td>{role}</td>
                              <td><Button>View Permissions</Button></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </SimpleBar>
      </ModalBody>
      <ModalFooter>
        <Button className="btn btn-dark" onClick={props.cancel}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default User;
