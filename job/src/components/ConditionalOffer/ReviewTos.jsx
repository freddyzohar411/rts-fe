import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Input } from "reactstrap";
import { fetchJobForm } from "../../store/actions";
import { CONDITIONAL_OFFER, REVIEW_TOS } from "./constants";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserAuth } from "@workspace/login";
import { Form } from "@workspace/common";

function ReviewTos() {
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
    dispatch(fetchJobForm(REVIEW_TOS));
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
            <div className="d-flex justify-content-end">
              <Button className="btn btn-custom-primary">Save</Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ReviewTos;
