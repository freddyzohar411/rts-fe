import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { fetchJobForm } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";

function CulturalFitTest({ closeOffCanvas }) {
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
    dispatch(fetchJobForm("cultural_fit_test"));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);

  const handleFormSubmit = () => {
    console.log("Form Submitted");
  };

  const handleCancel = () => {
    closeOffCanvas();
    console.log("Cancel Clicked");
  };
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
        <Row>
          <Col>
            <div className="d-flex justify-content-end gap-2">
              <Button
                type="button"
                className="btn btn-danger"
                onClick={() => handleCancel()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="btn btn-custom-primary"
                onClick={() => {
                  formikRef?.current?.formik?.submitForm();
                }}
              >
                Update
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default CulturalFitTest;
