import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./DeleteCustomModal.scss";

const DeleteCustomModal = ({
  isOpen,
  setIsOpen,
  confirmDelete,
  header,
  deleteText,
  confirmButtonText = "Confirm",
}) => {
  return (
    <Modal isOpen={isOpen} centered backdropClassName="modal">
      <ModalHeader className="modal-title">{header}</ModalHeader>

      <ModalBody>
        <div className="d-flex flex-column gap-4">
          <span>{deleteText}</span>
          <div className="d-flex flex-row gap-3">
            <Button
              type="button"
              className="btn btn-danger"
              onClick={confirmDelete}
            >
              {confirmButtonText}
            </Button>

            <Button
              type="button"
              className="btn btn-dark"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCustomModal;
