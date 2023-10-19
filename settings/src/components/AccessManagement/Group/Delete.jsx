import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

function Delete(props) {
  return (
    <Modal isOpen={props.show} toggle={props.cancel} centered>
      <ModalHeader>Are you sure?</ModalHeader>

      <ModalBody>Are you sure you would like to delete: {props.groupName}?</ModalBody>
      <ModalFooter>
        <Button>Delete</Button>
        <Button>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Delete;
