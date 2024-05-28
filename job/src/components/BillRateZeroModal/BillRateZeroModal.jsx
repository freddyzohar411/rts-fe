import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./BillRateZeroModal.scss";

const BillRateZeroModal = ({ isOpen, closeModal, header, body }) => {
  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      centered
      backdropClassName="modal"
    >
      <ModalHeader toggle={closeModal}>
        <h5>{header}</h5>
      </ModalHeader>
      <ModalBody>
        <div className="d-flex flex-column gap-4">
          <span>{body}</span>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default BillRateZeroModal;
