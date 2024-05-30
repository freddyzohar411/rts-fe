import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Form } from "@workspace/common";

function BillRateSalaryEditModal({ isOpen, closeModal }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const formikRef = useRef(null);

  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  useEffect(() => {
    dispatch(fetchJobForm("billrate_salary"));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  const handleFormSubmit = async (values) => {
    // Add payload function to submit new values.
    closeModal();
  };

  const handleModal = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} centered toggle={handleModal}>
      <ModalHeader toggle={handleModal}>
        <span className="fw-semibold fs-5">Candidate Bill Rate & Salary</span>
      </ModalHeader>
      <ModalBody>
        <Row>
          <div className="p-0">
            <Form
              template={formTemplate}
              userDetails={getAllUserGroups()}
              country={null}
              editData={null}
              onSubmit={handleFormSubmit}
              onFormFieldsChange={null}
              errorMessage={null}
              view={view}
              ref={formikRef}
            />
          </div>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Row className="w-100">
          <div className="d-flex flex-row gap-2 p-0">
            <Button
              className="w-50 fw-semibold"
              type="button"
              onClick={handleModal}
              style={{
                borderRadius: "8px",
                border: "1px solid #DFE2E6",
                backgroundColor: "white",
              }}
            >
              Cancel
            </Button>
            <Button
              className="w-50 fw-semibold"
              type="button"
              onClick={() => handleFormSubmit()}
              style={{
                backgroundColor: "#10B967",
                borderRadius: "8px",
                color: "white",
              }}
            >
              Save
            </Button>
          </div>
        </Row>
      </ModalFooter>
    </Modal>
  );
}

export default BillRateSalaryEditModal;
