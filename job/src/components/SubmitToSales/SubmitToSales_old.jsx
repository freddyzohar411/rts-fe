import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SUBMIT_TO_SALES } from "./constants";
import { fetchJobForm, tagJob } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Button, Tooltip } from "reactstrap";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { Actions } from "@workspace/common";
import { UseTemplateModuleDataHook } from "@workspace/common";

function SubmitToSales({
  closeOffcanvas,
  onPreviewCVClick,
  templateData,
  candidateId,
  jobId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const formikRef = useRef(null);

  const form = useSelector((state) => state.JobFormReducer.form);

  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );
  const [formTemplate, setFormTemplate] = useState(null);
  UseTemplateModuleDataHook.useTemplateModuleData({
    candidateId: candidateId,
    jobId: jobId,
  });

  const toggleFormViewState = () => {
    setView(!view);
  };

  useEffect(() => {
    dispatch(fetchJobForm(SUBMIT_TO_SALES));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(form);
    }
  }, [form]);

  // Handle form submit
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
      jobStageId: JOB_STAGE_IDS?.SUBMIT_TO_SALES,
      status: values?.candidateStatus ?? JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: "submit_to_sales",
    };
    dispatch(tagJob({ payload, navigate }));
    closeOffcanvas();
  };

  const handleCancel = () => {
    closeOffcanvas();
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
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
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-row justify-content-end gap-4 m-2">
              <div className="d-flex flex-column flex-nowrap">
                <div className="d-flex flex-row gap-2 flex-nowrap">
                  <Button
                    type="button"
                    className="btn btn-custom-primary"
                    onClick={onPreviewCVClick}
                  >
                    Preview CV
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-custom-primary"
                    onClick={() => {
                      dispatch(
                        Actions.setEmailOpen({
                          category: "Email Templates",
                          attachmentCategory: "CV",
                        })
                      );
                    }}
                  >
                    Send Email
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-custom-primary"
                    id="update-btn"
                    onClick={() => {
                      formikRef?.current?.formik?.submitForm();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </Button>
                  <Tooltip
                    target="update-btn"
                    isOpen={tooltipOpen}
                    toggle={() => setTooltipOpen(!tooltipOpen)}
                    placement="bottom"
                  >
                    <span>Update without Email</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default SubmitToSales;
