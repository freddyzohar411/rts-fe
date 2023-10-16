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
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import DualListBox from "react-dual-listbox";
import { userData } from "../dataSample";

function NewGroup(props) {
  const [selected, setSelected] = useState([]);
  const formattedUserData = userData.map((user) => ({
    value: user.username,
    label: user.username,
  }));

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
          <Col className="mb-1">
            <h5 className="fw-bold">Create New User Group</h5>
            <p className="text-muted">
              Create a new user group to categorise users who perform similar
              functions.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Label>Group Name</Label>
            <Input
              className="form-control"
              placeholder="Enter group name.."
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col className="mb-3">
            <Label>Group Description</Label>
            <Input
              className="form-control"
              placeholder="Enter group description.."
              type="textarea"
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-row justify-content-center my-2">
            <i className="ri-arrow-down-circle-line fs-3 text-primary"></i>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="bg-light rounded p-3 d-flex flex-column gap-3">
              <span className="text-muted">
                Add members into this group below.
              </span>
              <DualListBox
                options={formattedUserData}
                selected={selected}
                onChange={(e) => setSelected(e)}
                canFilter={true}
                icons={{
                  moveLeft: <span className="mdi mdi-chevron-left" key="key" />,
                  moveAllLeft: [
                    <span className="mdi mdi-chevron-double-left" key="key" />,
                  ],
                  moveRight: (
                    <span className="mdi mdi-chevron-right" key="key" />
                  ),
                  moveAllRight: [
                    <span className="mdi mdi-chevron-double-right" key="key" />,
                  ],
                  moveDown: <span className="mdi mdi-chevron-down" key="key" />,
                  moveUp: <span className="mdi mdi-chevron-up" key="key" />,
                  moveTop: (
                    <span className="mdi mdi-chevron-double-up" key="key" />
                  ),
                  moveBottom: (
                    <span className="mdi mdi-chevron-double-down" key="key" />
                  ),
                }}
              />
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.cancel}>Cancel</Button>
        <Button
          onClick={() => {
            setSelected([]);
          }}
        >
          Reset Form
        </Button>
        <Button onClick={() => console.log(selected)}>Save</Button>
      </ModalFooter>
    </Modal>
  );
}

export default NewGroup;
