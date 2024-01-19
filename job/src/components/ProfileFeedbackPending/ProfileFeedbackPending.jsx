import { Form } from "@workspace/common";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_FEEDBACK_PENDING, SCHEDULE_INTERVIEW } from "./constants";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Input, Button } from "reactstrap";

function ProfileFeedbackPending() {
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
    dispatch(fetchJobForm(PROFILE_FEEDBACK_PENDING));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

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
                  <Button type="submit" className="btn btn-custom-primary">
                    Update
                  </Button>
                  <Button type="button" className="btn btn-danger">
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ProfileFeedbackPending;