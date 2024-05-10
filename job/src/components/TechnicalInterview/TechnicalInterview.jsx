import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { fetchJobForm, tagJob } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

const TechnicalInterview = forwardRef(
  ({ closeOffcanvas, jobId, candidateId }, parentRef) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
      dispatch(fetchJobForm("technical_interview"));
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
      if (values?.technicalInterviewResults === "false") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.TECHNICAL_INTERVIEW,
          status: JOB_STAGE_STATUS?.REJECTED,
          candidateId,
          jobType: "technical_interview",
        };
        dispatch(tagJob({ payload, navigate }));
      } else if (values?.technicalInterviewResults === "true") {
        const payload = {
          jobId: jobId,
          jobStageId: JOB_STAGE_IDS?.CULTURAL_FIT_TEST,
          status: JOB_STAGE_STATUS?.IN_PROGRESS,
          candidateId,
          formData: JSON.stringify(values),
          formId: parseInt(form.formId),
          jobType: "cultural_fit_test",
        };
        dispatch(tagJob({ payload, navigate }));
        if (values?.scheduleForCulturalFitTest === "true") {
          window.open(
            "https://app.hackerearth.com/recruiter/interview/",
            "_blank"
          );
        }
      }
      closeOffcanvas();
    };

    const handleCancel = () => {
      closeOffcanvas();
    };

    useImperativeHandle(parentRef, () => ({
      submitForm: () => {
        formikRef?.current?.formik?.submitForm();
      },
      handleCancel,
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

export default TechnicalInterview;
