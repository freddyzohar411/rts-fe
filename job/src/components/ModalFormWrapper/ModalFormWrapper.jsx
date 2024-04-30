import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

const ModalFormWrapper = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <Modal
      isOpen={isModalOpen}
      closeModal={() => {
        closeModal();
      }}
      centered
      scrollable
      size="xl"
    >
      <ModalHeader
        className="bg-primary pb-3"
        toggle={() => {
          closeModal();
        }}
      >
        <h3>Header</h3>
      </ModalHeader>
      <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
        <div className="d-flex justify-content-end gap-3">
          <Button className="btn-danger" onClick={() => closeModal()}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalFormWrapper;
