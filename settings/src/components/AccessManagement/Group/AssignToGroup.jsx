import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
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
  // const filteredGroup = userData.filter((user) => {
  //   return !user.groups.includes(selectedGroup);
  // });

  const formattedUserData = userData.map((user) => ({
    value: user.username,
    label: user.firstName,
  }));

  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      size="xl"
      centered
      scrollable
    >
      <ModalBody>
        <Row>
          <Col>
            <div className="mb-4">
              <h5 className="fw-bold">Assign User to Group</h5>
              <p className="text-muted fs-6">
                Assign new members to user groups.
              </p>
            </div>
          </Col>
        </Row>
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
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button onClick={() => {setSelectedGroup(""); setSelected([]);}}>Reset Form</Button>
        <Button onClick={() => {console.log(selected); props.cancel;}}>Save</Button>
      </ModalFooter>
    </Modal>
  );
}

export default AssignToGroup;