import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PREOFFER_VERIFICATION } from "./constants";
import { fetchJobForm } from "../../store/actions";
import { Form } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import {
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
} from "reactstrap";

function PreOfferVerification() {
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
    dispatch(fetchJobForm(PREOFFER_VERIFICATION));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);
  return (
    <React.Fragment>
      <div className="page-content">
        <Row>
          <Breadcrumb>
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Pre-Offer Verification</BreadcrumbItem>
          </Breadcrumb>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
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
                </Row>
                <Row className="d-flex justify-content-end">
                  <Button className="btn btn-danger" type="button">
                    Cancel
                  </Button>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default PreOfferVerification;
