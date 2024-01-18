import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, Link } from "react-router-dom";
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
  Container,
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
        <Container fluid>
          <Row className="mb-3">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/dashboard">Dashboard </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>Pre-Offer Verification</BreadcrumbItem>
            </Breadcrumb>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row className="my-3">
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
                  <Row>
                    <Col>
                      <div className="d-flex align-items-center justify-content-end pe-2">
                        <Button className="btn btn-danger" type="button">
                          Cancel
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default PreOfferVerification;
