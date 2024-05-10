import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "@workspace/common";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

const ApproveTOS = forwardRef(
  (
    {
      closeOffCanvas,
      jobId,
      candidateId,
      setOffcanvasForm,
      setIsFormModalOpen,
      setModalFormName,
    },
    parentRef
  ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);
    const { getAllUserGroups } = useUserAuth();

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    const linkState = location.state;
    const [view, setView] = useState(
      linkState?.view !== null && linkState?.view !== undefined
        ? linkState?.view
        : false
    );

    useEffect(() => {
      dispatch(fetchJobForm("review_tos"));
    }, []);

    useEffect(() => {
      if (form) {
        setFormTemplate(form);
      }
    }, [form]);

    const handleFormSubmit = async (
      event,
      values,
      newValues,
      buttonNameHook,
      formStateHook,
      rerenderTable
    ) => {
      if (values?.skillAssessmentResults === "false") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.SKILLS_ASSESSMENT,
          status: JOB_STAGE_STATUS?.REJECTED,
          candidateId,
          jobType: "skills_assessment",
        };
        dispatch(tagJob({ payload, navigate }));
      } else if (values?.skillAssessmentResults === "true") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.CODING_TEST,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "coding_test",
        };
        dispatch(tagJob({ payload, navigate }));
        if (values?.scheduleForCodingTest === "true") {
          window.open("https://app.hackerearth.com/recruiter/", "_blank");
        }
      }
      closeOffcanvas();
    };

    const handleCancel = () => {
      setOffcanvasForm(false);
    };

    const approveTos = () => {
      console.log("Approved TOS");
      setIsFormModalOpen(true);
      setModalFormName({ header: "Confirmation", formName: "approve_tos" });
      setOffcanvasForm(false);
    };
    const rejectTos = () => {
      console.log("Rejected TOS");
      setIsFormModalOpen(true);
      setModalFormName({ header: "TOS Rejected", formName: "rejected_tos" });
      setOffcanvasForm(false);
    };

    useImperativeHandle(parentRef, () => ({
      handleCancel,
      approveTos,
      rejectTos,
    }));

    return (
      <React.Fragment>
        <div
          className="d-flex flex-column justiy-content-between h-100"
          style={{ height: "500px" }}
        >
          <Row>
            <Col>
              <div>
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
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
);

export default ApproveTOS;
