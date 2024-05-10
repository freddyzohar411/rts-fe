import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobForm, tagJob, tagJobAttachment } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { jobTimelineType } from "../JobOverview/JobOverviewConstants";

const ModalFormWrapper = ({
  activeStep = 0,
  header = "header",
  isFormModalOpen,
  setIsFormModalOpen,
  jobTimeLineData,
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
  const jobTimelineMeta = useSelector(
    (state) => state.JobStageReducer.jobTimelineMeta
  );

  useEffect(() => {
    if (jobTimelineMeta?.isSuccess) {
      setIsFormModalOpen(false);
    }
  }, [jobTimelineMeta?.isSuccess]);

  // Handle form submit
  const handleFormSubmit = async (event, values, newValues) => {
    console.log("Form values", newValues);
    // Submit to sale profile rejected
    if (activeStep === 99) {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.SUBMIT_TO_SALES,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.SUBMIT_TO_SALES,
      };
      dispatch(tagJob({ payload, navigate }));
    }

    // Submit to client profile rejected
    if (activeStep === 98) {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.SUBMIT_TO_CLIENT,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.SUBMIT_TO_CLIENT,
      };
      dispatch(tagJob({ payload, navigate }));
    }
  };

  useEffect(() => {
    if (activeStep === 99) {
      dispatch(fetchJobForm("submit_to_sales_rejection"));
    }
    if (activeStep === 98) {
      dispatch(fetchJobForm("submit_to_client_rejection"));
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
            {jobTimelineMeta?.isLoading ? <Spinner size="sm" /> : "Confirm"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalFormWrapper;
