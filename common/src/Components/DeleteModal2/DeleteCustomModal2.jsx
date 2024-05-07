import React from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import "./DeleteCustomModal2.scss";

const DeleteCustomModal2 = ({
  isOpen,
  setIsOpen,
  confirmDelete,
  header,
  deleteText,
  confirmButtonText = "Confirm",
  isLoading,
  width = "auto",
  toggle = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      centered
      backdropClassName="modal"
      style={{
        width: width,
      }}
      className="delete-modal2"
    >
      <ModalHeader
        className="modal-title"
        toggle={toggle ? () => setIsOpen(false) : false}
      >
        {header}
      </ModalHeader>

      <ModalBody>
        <div className="d-flex flex-column gap-4">
          <span>{deleteText}</span>
          <div className="d-flex flex-row gap-3">
            <Button
              type="button"
              className="btn btn-white border-2 border-light-grey  flex-grow-1"
              onClick={() => setIsOpen(false)}
              style={{
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="btn btn-danger flex-grow-1"
              onClick={confirmDelete}
              style={{
                borderRadius: "8px",
              }}
            >
              {isLoading ? "loading..." : confirmButtonText}
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default DeleteCustomModal2;
