import React, { useState } from "react";
import {
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  Button,
  ModalHeader,
  Card,
  CardBody,
} from "reactstrap";
import {
  roleData,
  userData,
  roleGroupData,
  userGroupData,
} from "../dataSample";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";

function AssignToRole(props) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selected, setSelected] = useState([]);

  // Retrieve the groups that are associated to the selected role
  const groupsForChosenRole =
    roleGroupData.find((role) => role.roleName === selectedRole)?.groups || [];

  // Filter the groups that are not associated to the selected role
  const groupsNotInChosenRole = userGroupData.filter(
    (group) => !groupsForChosenRole.includes(group.groupName)
  );

  const formattedGroupData = groupsNotInChosenRole.map((group) => ({
    value: group.groupName,
    label: group.groupName,
  }));

  const resetForm = () => {
    setSelected([]);
    setSelectedRole("");
  };

  const handleSave = () => {
    // Find the role that the user wants to assign groups to
    const assignedRole = roleGroupData.find(
      (role) => role.groupName === selectedRole
    );
    // Push the new groups into the role
    selected.map((group) => assignedRole.groups.push(group));
    console.log("Role Group Data:", assignedRole);
    resetForm();
    props.cancel();
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="border-bottom">
        <div className="d-flex flex-column gap-1">
          <span className="modal-title">Assign User Group to Role</span>
          <span className="fs-6 text-muted">
            Assign new user groups to a role.
          </span>
        </div>
      </ModalHeader>
      <ModalBody className="bg-light">
        <Card>
          <CardBody>
            <Row>
              <Col>
                <div className="mb-1">
                  <div className="d-flex flex-column">
                    <Label>Select a Role</Label>
                    <Input
                      type="select"
                      className="form-select"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      <option value="">Select</option>
                      {roleData.map((role, index) => (
                        <option key={index} value={role.roleName}>
                          <span>{role.roleName}</span>
                        </option>
                      ))}
                    </Input>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="my-4 d-flex flex-start justify-content-center">
                  <i className="ri-arrow-down-circle-line fs-3 text-primary"></i>
                </div>
              </Col>
            </Row>

            <Row>
              <Col>
                {selectedRole ? (
                  <div className="mb-3">
                    <Row>
                      <Col>
                        <div className="bg-light rounded p-3 my-3">
                          <p className="text-muted">
                            Now showing users that do not belong in:{" "}
                            {selectedRole}
                          </p>
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
                        </div>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <div
                    className="bg-light rounded my-3"
                    style={{ minHeight: "200px" }}
                  >
                    <p className="text-muted fw-medium p-3">
                      Please pick a role to begin assigning users to this role.
                    </p>
                  </div>
                )}
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Row>
          <Col>
            <div className="d-flex flex-row justify-content-between">
              <Button
                className="btn btn-dark"
                type="button"
                onClick={() => {
                  setSelected([]), setSelectedRole("");
                }}
              >
                Reset
              </Button>
              <div className="d-flex flex-row gap-3">
                <Button className="btn btn-dark" type="submit">
                  Save
                </Button>
                <Button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => {
                    props.cancel();
                    setSelected([]);
                    setSelectedRole("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

export default AssignToRole;
