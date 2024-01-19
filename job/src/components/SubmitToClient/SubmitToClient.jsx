import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { SUBMIT_TO_CLIENT } from "./constants";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Input, Button, Tooltip } from "reactstrap";
import { EmailComponent } from "../EmailComponent";

function SubmitToClient({ closeOffcanvas, onPreviewCVClick }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const linkState = location.state;
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();

  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  const toggleFormViewState = () => {
    setView(!view);
  };

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  useEffect(() => {
    dispatch(fetchJobForm(SUBMIT_TO_CLIENT));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  const [sendEmailModal, setSendEmailModal] = useState(false);

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
              onSubmit={null}
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
                <span className="text-muted">Time To Take Action*</span>

                <div className="d-flex flex-row gap-2 flex-nowrap">
                  <Input
                    placeholder="30 Min"
                    type="text"
                    className="form-control"
                    style={{ width: "200px" }}
                  />
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
                    onClick={closeOffcanvas}
                  >
                    Update
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
