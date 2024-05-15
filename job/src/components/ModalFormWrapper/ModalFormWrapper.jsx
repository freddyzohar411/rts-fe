import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobForm, tagJob } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import {
  PRF_REJ_CLIENT_FORM_INDEX,
  PRF_REJ_SALES_FORM_INDEX,
  PRF_WTDWN_FORM_INDEX,
  UNTAG_FORM_INDEX,
  ACCEPTED_FORM_INDEX,
  REJECTED_FORM_INDEX,
  jobTimelineType,
} from "../JobOverview/JobOverviewConstants";

const ModalFormWrapper = ({
  activeStep = 0,
  header = "header",
  isFormModalOpen,
  setIsFormModalOpen,
  jobTimeLineData,
  modalFormName,
  setModalFormName,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  const jobTimelineMeta = useSelector(
    (state) => state.JobStageReducer.jobTimelineMeta
  );

  useEffect(() => {
    if (activeStep === UNTAG_FORM_INDEX) {
      dispatch(fetchJobForm("job_untag"));
    } else if (activeStep === PRF_WTDWN_FORM_INDEX) {
      dispatch(fetchJobForm("profile_withdrawn_job"));
    } else if (activeStep === PRF_REJ_SALES_FORM_INDEX) {
      dispatch(fetchJobForm("submit_to_sales_rejection"));
    } else if (activeStep === PRF_REJ_CLIENT_FORM_INDEX) {
      dispatch(fetchJobForm("submit_to_client_rejection"));
    } else if (modalFormName?.formName === "approve_tos") {
      dispatch(fetchJobForm("approve_tos"));
    } else if (modalFormName?.formName === "rejected_tos") {
      dispatch(fetchJobForm("rejected_tos"));
    } else if (activeStep === ACCEPTED_FORM_INDEX) {
      dispatch(fetchJobForm("conditional_offer_accepted"));
    } else if (activeStep === REJECTED_FORM_INDEX) {
      dispatch(fetchJobForm("conditional_offer_rejected"));
    }
  }, [activeStep]);

  useEffect(() => {
    if (jobTimelineMeta?.isSuccess) {
      setIsFormModalOpen(false);
    }
  }, [jobTimelineMeta?.isSuccess]);

  // Handle form submit
  const handleFormSubmit = async (event, values, newValues) => {
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

    // Approve TOS
    if (activeStep === 21 && modalFormName?.formName === "approve_tos") {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.TOS_ACCEPTED_OR_DECLINED,
        status: JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: "tos_approval",
      };
      dispatch(tagJob({ payload, navigate }));
    }

    // Reject TOS
    if (activeStep === 21 && modalFormName?.formName === "rejected_tos") {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.TOS_ACCEPTED_OR_DECLINED,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: "tos_approval",
      };
      dispatch(tagJob({ payload, navigate }));
    }

    // Conditional Offer Accepted
    if (activeStep === 22) {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER_APPROVAL,
        status: JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.CONDITIONAL_OFFER_APPROVAL,
      };
      dispatch(tagJob({ payload, navigate }));
    }

    // Conditional Offer Rejected
    if (activeStep === 23) {
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER_APPROVAL,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.CONDITIONAL_OFFER_APPROVAL,
      };
      dispatch(tagJob({ payload, navigate }));
    }
  };

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  const closeModal = () => {
    setIsFormModalOpen(false);
    setModalFormName("");
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
        <h5>
          {modalFormName
            ? modalFormName?.header
            : modalName || header || "Header"}
        </h5>
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
          <Button
            className="btn btn-white border-dark fw-semibold"
            style={{ borderRadius: "8px" }}
            onClick={() => closeModal()}
          >
            Cancel
          </Button>
          <Button
            className="btn-danger fw-semibold"
            style={{ borderRadius: "8px" }}
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
