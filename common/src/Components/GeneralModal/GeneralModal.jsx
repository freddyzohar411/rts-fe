import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./GeneralModal.scss";

const GeneralModal = ({ isOpen, setIsOpen, children, size= "xl", height="500px"}) => {
  return (
    <Modal
      isOpen={isOpen}
      centered
      backdropClassName="modal"
      toggle={() => setIsOpen(!isOpen)}
      size={size}
    >
      {/* <ModalHeader className="modal-title">{header}</ModalHeader> */}
      <ModalBody style={{height:height}}>
        {/* <div className="d-flex flex-column gap-4"> */}
        {children}
        {/* </div> */}
      </ModalBody>
    </Modal>
  );
};

export default GeneralModal;
