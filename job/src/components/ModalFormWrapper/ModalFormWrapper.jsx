import React, { useEffect, useState, useRef } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobForm, tagJob } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";

const ModalFormWrapper = ({
  activeStep = 0,
  header = "header",
  isFormModalOpen,
  setIsFormModalOpen,
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
  const handleFormSubmit = async (event, values, newValues) => {
    console.log("Form values", newValues);
  };

  useEffect(() => {
    if (activeStep === 99) {
      dispatch(fetchJobForm("rejection"));
    }
  }, [activeStep]);

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
        <h3>{header || "Header"}</h3>
      </ModalHeader>
      <ModalBody>
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
      <ModalFooter>
        <div className="d-flex justify-content-end gap-2">
          <Button className="btn-danger" onClick={() => closeModal()}>
            Cancel
          </Button>
          <Button
            className="btn-danger"
            onClick={() => {
              formikRef.current.formik?.submitForm();
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
