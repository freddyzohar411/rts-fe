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
import {
  fetchJobTimelineFormSubmission,
  fetchJobTimelineFormSubmissionReset,
} from "../../store/jobStage/action";

const CulturalFitTest = forwardRef(
  (
    { closeOffcanvas, jobId, candidateId, readOnly = false, jobTimeLineData },
    parentRef
  ) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);

    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);
    const { getAllUserGroups } = useUserAuth();
    // const formSubmissionData = useSelector(
    //   (state) => state.JobStageReducer.jobTimelineFormSubmission
    // );
    const [formSubmissionData, setFormSubmissionData] = useState(null);

    useEffect(() => {
      dispatch(fetchJobForm("cultural_fit_test"));
    }, []);

    useEffect(() => {
      if (jobTimeLineData && jobTimeLineData?.timeline?.["Cultural Fit Test"]) {
        if (
          jobTimeLineData?.timeline?.["Cultural Fit Test"]?.status ===
          "REJECTED"
        ) {
          setFormSubmissionData({
            culturalFitTestResults: false,
          });
        } else if (
          jobTimeLineData?.timeline?.["Cultural Fit Test"]?.status ===
          "COMPLETED"
        ) {
          setFormSubmissionData({
            culturalFitTestResults: true,
          });
        }
      }
      return () => {
        dispatch(fetchJobTimelineFormSubmissionReset());
      };
    }, [jobTimeLineData]);

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
      const payload = {
        jobId: jobId,
        jobStageId: JOB_STAGE_IDS?.CULTURAL_FIT_TEST,
        status:
          values?.culturalFitTestResults === "true"
            ? JOB_STAGE_STATUS?.COMPLETED
            : JOB_STAGE_STATUS?.REJECTED,
        candidateId,
        formData: JSON.stringify(values),
        formId: parseInt(form.formId),
        jobType: "cultural_fit_test",
        stepName: "Odin",
        subStepName: "Cultural Fit Test",
      };
      dispatch(tagJob({ payload, navigate }));
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
          className="d-flex flex-column justiy-content-between h-100 p-2"
          style={{ height: "500px" }}
        >
          <Row>
            <Col>
              <div>
                <Form
                  template={formTemplate}
                  userDetails={getAllUserGroups()}
                  country={null}
                  editData={formSubmissionData ? formSubmissionData : null}
                  onSubmit={handleFormSubmit}
                  onFormFieldsChange={null}
                  errorMessage={null}
                  view={readOnly}
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

export default CulturalFitTest;
