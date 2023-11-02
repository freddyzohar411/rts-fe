import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./GeneralModal.scss";

const GeneralModal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      centered
      backdropClassName="modal"
      toggle={() => setIsOpen(!isOpen)}
      size="xl"
    >
      {/* <ModalHeader className="modal-title">{header}</ModalHeader> */}
      <ModalBody style={{height:'500px'}}>
        {/* <div className="d-flex flex-column gap-4"> */}
        {children}
        {/* </div> */}
      </ModalBody>
    </Modal>
  );
};

export default GeneralModal;
