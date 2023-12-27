import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  FormFeedback,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { TemplateBuilder } from "../../components";

const TemplateBuilderPage = () => {
  const formikRef = useRef(null);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/settings/access">Templates</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Create</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fw-bold fs-5 text-dark">
                      Template Builder
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      Begin by creating a new template
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <TemplateBuilder ref={formikRef} />
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Button
                      type="button"
                      className="btn btn-custom-primary"
                      onClick={() => handleResetForm(resetForm)}
                    >
                      Reset
                    </Button>
                    <div className="d-flex flex-row gap-2">
                      <Link to="/settings/access" state={{ ugTab: "2" }}>
                        <Button
                          type="button"
                          className="btn btn-custom-primary"
                          onClick={() => handleResetForm(resetForm)}
                        >
                          Cancel
                        </Button>
                      </Link>
                      <Button
                        type="submit"
                        className="btn btn-custom-primary"
                        onClick={() => formikRef.current.formik.submitForm()}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TemplateBuilderPage;
