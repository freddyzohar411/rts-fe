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
} from "reactstrap";
import { roleData, userData } from "../dataSample";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";

function AssignToRole(props) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selected, setSelected] = useState([]);

  // Filter out the users who are already assigned to this role *FIX
  // const filteredRoles = userData.filter((user) => {
  //   return !user.roles.includes(selectedRole);
  // });

  const formattedUserData = userData.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));

  const resetForm = () => {
    setSelected([]);
    setSelectedRole("");
  };

  const handleSave = () => {
    resetForm();
    props.cancel();
    console.log("Saved!", selected);
  };

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalBody>
        <Row>
          <Col>
            <div className="mb-4">
              <h5 className="fw-bold">Assign User to Role</h5>
              <p className="text-muted">Assign new members to a role.</p>
            </div>
          </Col>
        </Row>
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
                        Now showing users that do not belong in: {selectedRole}
                      </p>
                      <DualListBox
                        options={formattedUserData}
                        selected={selected}
                        onChange={(e) => setSelected(e)}
                        canFilter={true}
                        icons={{
                          moveLeft: (
                            <span className="mdi mdi-chevron-left" key="key" />
                          ),
                          moveAllLeft: [
                            <span
                              className="mdi mdi-chevron-double-left"
                              key="key"
                            />,
                          ],
                          moveRight: (
                            <span className="mdi mdi-chevron-right" key="key" />
                          ),
                          moveAllRight: [
                            <span
                              className="mdi mdi-chevron-double-right"
                              key="key"
                            />,
                          ],
                          moveDown: (
                            <span className="mdi mdi-chevron-down" key="key" />
                          ),
                          moveUp: (
                            <span className="mdi mdi-chevron-up" key="key" />
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
      </ModalBody>
      <ModalFooter>
        <Button
          className="btn btn-dark"
          onClick={() => {
            props.cancel();
            resetForm();
          }}
        >
          Cancel
        </Button>
        <Button
          className="btn btn-dark"
          onClick={() => {
            resetForm();
          }}
        >
          Reset Form
        </Button>
        <Button
          className="btn btn-dark"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AssignToRole;
