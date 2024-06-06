import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Row,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { fetchJobForm, updateBillRate } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Form } from "@workspace/common";

function BillRateSalaryEditModal({
  isOpen,
  closeModal,
  option,
  jobId,
  candidateId,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const formikRef = useRef(null);

  const form = useSelector((state) => state.JobFormReducer.form);

  const updateBillrateMeta = useSelector(
    (state) => state.JobStageReducer.updateBillrateMeta
  );

  const [formTemplate, setFormTemplate] = useState(null);

  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();
  const [view] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  const [header, setHeader] = useState("");

  useEffect(() => {
    if (option === "billRate") {
      dispatch(fetchJobForm("billrate_form"));
      setHeader("Edit Job Bill Rate");
    } else if (option === "salary") {
      dispatch(fetchJobForm("expected_salary_form"));
      setHeader("Edit Candidate Expected Salary");
    }
  }, [isOpen, option]);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  useEffect(() => {
    if (updateBillrateMeta?.isSuccess) {
      handleModal();
    }
  }, [updateBillrateMeta]);

  const handleFormSubmit = async (
    event,
    values,
    newValues,
    buttonNameHook,
    formStateHook,
    rerenderTable
  ) => {
    // Add payload function to submit new values.
    const payload = {
      jobId,
      candidateId,
      ...values,
    };
    dispatch(updateBillRate({ payload }));
  };

  const handleModal = () => {
    closeModal();
    setHeader("");
  };

  return (
    <Modal isOpen={isOpen} centered toggle={handleModal}>
      <ModalHeader toggle={handleModal}>
        <span className="fw-semibold fs-5">{header}</span>
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
              onClick={() => formikRef.current.formik.submitForm()}
              style={{
                backgroundColor: "#10B967",
                borderRadius: "8px",
                color: "white",
              }}
              disabled={updateBillrateMeta?.isLoading}
            >
              {updateBillrateMeta?.isLoading ? <Spinner size="sm" /> : "Save"}
            </Button>
          </div>
        </Row>
      </ModalFooter>
    </Modal>
  );
}

export default BillRateSalaryEditModal;
