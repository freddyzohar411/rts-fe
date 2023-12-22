import React from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { clearJobFormSubmission, deleteJobList } from "../../store/actions";

const DeleteDraftModal = ({ modal, setModal, deleteId }) => {
  const dispatch = useDispatch();

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
    dispatch(deleteJobList({ deleteId, isDraft: true }));
    dispatch(clearJobFormSubmission());
    toggle();
  };

  return (
    <Modal size="sm" isOpen={modal} centered>
      <ModalHeader>Are you sure?</ModalHeader>
      <ModalBody>
        <div className="modal-title">Do you want to delete the draft data?</div>
      </ModalBody>
      <ModalFooter
        as="div"
        className="d-flex justify-content-end align-items-center"
      >
        <Button
          className="btn btn-custom-primary"
          onClick={() => {
            toggle();
          }}
        >
          Close
        </Button>
        <Button
          className="btn btn-success"
          type="button"
          onClick={() => {
            handleDelete();
          }}
        >
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteDraftModal;
