import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import { userGroupData, userData, userGroupMembersData } from "../dataSample";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";

function AssignToGroup(props) {
  const [selected, setSelected] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  // Filter out the users who are already assigned to this group *FIX
  const usersNotInChosenGroup = userData.filter((user) => {
    const userGroups = userGroupMembersData
      .filter((group) => group.members.includes(user.username))
      .map((group) => group.groupName);
    return !userGroups.includes(selectedGroup);
  });

  const formattedUserData = usersNotInChosenGroup.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));

  const handleSave = () => {
    // Find the group
    const assignedGroup = userGroupMembersData.find(
      (group) => group.groupName === selectedGroup
    );
    // Push the new members into the group
    selected.map((member) => assignedGroup.members.push(member));
    console.log("Assigned Group:", assignedGroup);
    props.cancel();
  };

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
          <span className="modal-title">Assign User to Group</span>
          <span className="fs-6 text-muted">
            Assign new members to user groups.
          </span>
        </div>
      </ModalHeader>
      <ModalBody>
        <Row>
          <Col>
            <div className="mb-1">
              <div className="d-flex flex-center gap-2">
                <Label>Select a Group</Label>
                <i className="ri-information-line" id="groupTooltip"></i>
                <UncontrolledTooltip placement="right" target="groupTooltip">
                  User groups are a collection of users who perform a similar
                  task.
                </UncontrolledTooltip>
              </div>

              <Input
                type="select"
                name="groupSelection"
                className="form-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="">Select</option>
                {userGroupData.map((group) => (
                  <option value={group.groupName}>{group.groupName}</option>
                ))}
              </Input>
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
            {selectedGroup ? (
              <div className="mb-3">
                <Row>
                  <Col>
                    <div className="bg-light rounded p-3">
                      <p className="text-muted">
                        Now showing users that do not belong in: {selectedGroup}
                        .
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
                className="my-3 rounded bg-light"
                style={{ minHeight: "200px" }}
              >
                <p className="text-muted fw-medium p-3">
                  Please pick a group to begin assigning members to this group.
                </p>
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-row justify-content-between">
              <Button
                className="btn btn-dark"
                type="button"
                onClick={() => {
                  setSelected([]);
                  setSelectedGroup("");
                }}
              >
                Reset
              </Button>
              <div className="d-flex flex-row gap-2">
                <Button
                  className="btn btn-dark"
                  onClick={() => handleSave()}
                  type="submit"
                >
                  Save
                </Button>
                <Button
                  className="btn btn-dark"
                  type="button"
                  onClick={() => {
                    props.cancel();
                    setSelected([]);
                    setSelectedGroup("");
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

export default AssignToGroup;
