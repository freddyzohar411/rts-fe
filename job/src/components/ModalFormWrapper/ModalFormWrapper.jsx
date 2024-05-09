import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJob, fetchJobForm, tagJob } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import "./ModalFormWrapper.scss";

const ModalFormWrapper = ({
  activeStep = 0,
  header = "header",
  isFormModalOpen,
  setIsFormModalOpen,
  modalFormName,
  setModalFormName,
}) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [editData, setEditData] = useState({});

  // Handle form submit
  const handleFormSubmit = async (event, values, newValues) => {};

  useEffect(() => {
    if (activeStep === 99) {
      dispatch(fetchJobForm(form));
    } else if (Object.keys(modalFormName).length > 0) {
      dispatch(fetchJobForm(modalFormName?.formName));
    }
  }, [modalFormName, activeStep]);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  const closeModal = () => {
    setIsFormModalOpen(false);
  };

  return (
    <Modal
      isOpen={isFormModalOpen}
      closeModal={closeModal}
      centered
      scrollable
      size="md"
    >
      <ModalHeader
        toggle={closeModal}
        style={{
          paddingBottom: "0px",
        }}
      >
        <span className="fw-bold fs-5 text-black">{modalFormName?.header}</span>
      </ModalHeader>
      <ModalBody className="px-2 pb-1 pt-2">
        <Form
          template={formTemplate}
          userDetails={getAllUserGroups()}
          country={null}
          editData={null}
          onSubmit={handleFormSubmit}
          onFormFieldsChange={null}
          errorMessage={null}
          view={false}
          ref={formikRef}
        />
      </ModalBody>
      <ModalFooter className="pt-0">
        <div className="d-flex justify-content-end gap-2">
          <Button
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E7EAEE",
              color: "#000000",
              fontWeight: "500",
              borderRadius: "8px",
            }}
            onClick={() => {
              closeModal();
              setModalFormName({});
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#D92D20",
              color: "#FFFFFF",
              fontWeight: "500",
              borderRadius: "8px",
            }}
            onClick={() => {
              formikRef.current.formik?.submitForm();
              setModalFormName({});
            }}
          >
            Confirm
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalFormWrapper;
