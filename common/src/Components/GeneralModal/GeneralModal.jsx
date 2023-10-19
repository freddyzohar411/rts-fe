import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./GeneralModal.scss";

const GeneralModal = ({ isOpen, setIsOpen, children }) => {
  console.log("GeneralModal", isOpen, setIsOpen, children);

  return (
    <Modal
      isOpen={isOpen}
      centered
      backdropClassName="modal"
      toggle={() => setIsOpen(!isOpen)}
    >
      {/* <ModalHeader className="modal-title">{header}</ModalHeader> */}

      <ModalBody>
        {/* <div className="d-flex flex-column gap-4"> */}
        {children}
        {/* </div> */}
      </ModalBody>
    </Modal>
  );
};

export default GeneralModal;
