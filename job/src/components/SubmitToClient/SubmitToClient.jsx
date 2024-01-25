import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SUBMIT_TO_CLIENT } from "./constants";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Input, Button, Tooltip } from "reactstrap";
import { EmailComponent } from "../EmailComponent";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";

function SubmitToClient({
  closeOffcanvas,
  onPreviewCVClick,
  jobId,
  candidateId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const formikRef = useRef(null);
  const linkState = location.state;
  const { getAllUserGroups } = useUserAuth();

  const form = useSelector((state) => state.JobFormReducer.form);

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );
  const [formTemplate, setFormTemplate] = useState(null);
  const [sendEmailModal, setSendEmailModal] = useState(false);

  useEffect(() => {
    dispatch(fetchJobForm(SUBMIT_TO_CLIENT));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  const toggleFormViewState = () => {
    setView(!view);
  };

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
      jobStageId: JOB_STAGE_IDS?.SUBMIT_TO_CLIENT,
      status: JOB_STAGE_STATUS?.COMPLETED,
      candidateId,
      formData: JSON.stringify(values),
      formId: parseInt(form.formId),
      jobType: "submit_to_client",
    };
    dispatch(tagJob({ payload, navigate }));
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
                      setSendEmailModal(true);
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
                  <EmailComponent
                    isOpen={sendEmailModal}
                    toggle={() => {
                      setSendEmailModal(!sendEmailModal);
                      closeOffcanvas;
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default SubmitToClient;
