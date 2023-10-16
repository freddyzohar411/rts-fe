import React from "react";
import classnames from "classnames";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Col,
  Row,
  ModalFooter,
} from "reactstrap";
function NewPermissions(props) {
  return (
    <Modal
      isOpen={props.show}
      toggle={props.cancel}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader className="modal-title">Create New Permissions</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={12}>
            
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}

export default NewPermissions;
