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
import {
  fetchJobForm,
  tagJob,
  untagJob,
  tagJobFiles,
} from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import {
  APPROVE_TOS_FORM_INDEX,
  PRF_REJ_CLIENT_FORM_INDEX,
  PRF_REJ_SALES_FORM_INDEX,
  PRF_WTDWN_FORM_INDEX,
  UNTAG_FORM_INDEX,
  ACCEPTED_FORM_INDEX,
  REJECTED_FORM_INDEX,
  jobTimelineType,
  BACKOUT_CANDIE_FORM_INDEX,
  REJECTED_INTRW_FORM_INDEX,
  CANCL_BY_CLIENT_FORM_INDEX,
} from "../JobOverview/JobOverviewConstants";

const ModalFormWrapper = ({
  originalOrder,
  activeStep = 0,
  header = "header",
  isFormModalOpen,
  closeModal,
  jobTimeLineData,
  modalFormName,
  isLoading,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getAllUserGroups } = useUserAuth();

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  const getStringNameCommaSeperated = (filesData) => {
    if (!filesData || filesData?.length == 0) return "";
    return filesData.map((fileData) => fileData?.name).join(",");
  };

  useEffect(() => {
    if (activeStep === UNTAG_FORM_INDEX) {
      dispatch(fetchJobForm("job_untag"));
    } else if (
      activeStep === PRF_WTDWN_FORM_INDEX ||
      activeStep === BACKOUT_CANDIE_FORM_INDEX
    ) {
      dispatch(fetchJobForm("profile_withdrawn_job"));
    } else if (
      activeStep === PRF_REJ_SALES_FORM_INDEX ||
      activeStep === REJECTED_INTRW_FORM_INDEX ||
      activeStep === CANCL_BY_CLIENT_FORM_INDEX
    ) {
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
  }, [activeStep, modalFormName]);

  // Handle form submit
  const handleFormSubmit = async (event, values, newValues) => {
    // Job Stage Id and Type for Interview module -- Start
    let stageId = JOB_STAGE_IDS?.FIRST_INTERVIEW_SCHEDULED;
    if (originalOrder === JOB_STAGE_IDS.SECOND_INTERVIEW_SCHEDULED) {
      stageId = JOB_STAGE_IDS.SECOND_INTERVIEW_SCHEDULED;
    } else if (originalOrder === JOB_STAGE_IDS.THIRD_INTERVIEW_SCHEDULED) {
      stageId = JOB_STAGE_IDS.THIRD_INTERVIEW_SCHEDULED;
    }

    // Job Stage Id and Type for Interview module -- End
    if (activeStep === UNTAG_FORM_INDEX) {
      // Untag candidate
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        candidateId: jobTimeLineData?.candidate?.id,
      };
      dispatch(untagJob(payload));
    } else if (activeStep === PRF_WTDWN_FORM_INDEX) {
      // Profile withdrawn
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.ASSOCIATE,
        status: JOB_STAGE_STATUS?.WITHDRAWN,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.ASSOCIATE,
      };
      dispatch(tagJob({ payload, navigate }));
    } else if (activeStep === PRF_REJ_SALES_FORM_INDEX) {
      // Submit to sale profile rejected
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
    } else if (activeStep === PRF_REJ_CLIENT_FORM_INDEX) {
      // Submit to client profile rejected
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
    } else if (activeStep === BACKOUT_CANDIE_FORM_INDEX) {
      // Profile backout by candidate
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: stageId,
        status: JOB_STAGE_STATUS?.WITHDRAWN,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.INTERVIEW_BACKOUT,
      };
      dispatch(tagJob({ payload, navigate }));
    } else if (
      activeStep === REJECTED_INTRW_FORM_INDEX ||
      activeStep === CANCL_BY_CLIENT_FORM_INDEX
    ) {
      // Profile rejected or cancelled by the client
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: stageId,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.INTERVIEW_REJECTED,
      };
      dispatch(tagJob({ payload, navigate }));
    } else if (
      activeStep === APPROVE_TOS_FORM_INDEX &&
      modalFormName?.formName === "approve_tos"
    ) {
      // Approve TOS
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.TOS_APPROVAL,
        status: JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: "tos_approval",
      };
      dispatch(tagJob({ payload, navigate }));
    } else if (
      activeStep === APPROVE_TOS_FORM_INDEX &&
      modalFormName?.formName === "rejected_tos"
    ) {
      // Reject TOS
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.TOS_APPROVAL,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: "tos_approval",
      };
      dispatch(tagJob({ payload, navigate }));
    } else if (activeStep === ACCEPTED_FORM_INDEX) {
      // Conditional Offer Accepted
      const filesData = newValues?.files;
      const fileNames = getStringNameCommaSeperated(filesData);
      const updatedValues = { ...newValues, files: fileNames };
      // Transform file (key = "files" because in dynamic form key is "files" for file upload)
      const newFilesData = filesData.map((fileData) => {
        if (fileData instanceof File) {
          return {
            file: fileData,
            fileKey: "files",
          };
        } else {
          return null;
        }
      });
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER_APPROVAL,
        status: JOB_STAGE_STATUS?.COMPLETED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formData: JSON.stringify(updatedValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.CONDITIONAL_OFFER_APPROVAL,
      };
      const formData = new FormData();
      for (const key in payload) {
        formData.append(key, payload[key]);
      }

      if (newFilesData.length > 0) {
        newFilesData?.forEach((fileData, index) => {
          formData.append(`files[${index}].fileKey`, fileData?.fileKey);
          if (fileData?.file) {
            formData.append(`files[${index}].file`, fileData?.file);
          }
        });
      }
      dispatch(
        tagJobFiles({
          formData,
          config: {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
          jobType: jobTimelineType.CONDITIONAL_OFFER_APPROVAL,
          navigate,
        })
      );
    } else if (activeStep === REJECTED_FORM_INDEX) {
      // Conditional Offer Rejected
      const payload = {
        jobId: jobTimeLineData?.job?.id,
        jobStageId: JOB_STAGE_IDS?.CONDITIONAL_OFFER_APPROVAL,
        status: JOB_STAGE_STATUS?.REJECTED,
        candidateId: jobTimeLineData?.candidate?.id,
        formData: JSON.stringify(newValues),
        formId: parseInt(form?.formId),
        jobType: jobTimelineType.CONDITIONAL_OFFER_REJECTED,
      };
      dispatch(tagJob({ payload, navigate }));
    }
    closeModal();
  };

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

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
        <h5>{modalFormName ? modalFormName?.header : header || "Header"}</h5>
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
            {isLoading ? <Spinner size="sm" /> : "Confirm"}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ModalFormWrapper;
