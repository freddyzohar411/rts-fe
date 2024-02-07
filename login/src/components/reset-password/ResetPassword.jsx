import React from "react";
import { Field, Formik, Form } from "formik";
import {
  Row,
  Col,
  Container,
  Card,
  CardBody,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import logo_big from "@workspace/common/src/assets/images/logo_big.svg";
import ParticlesAuth from "../../ParticlesAuth";

function ResetPassword() {
  document.title = "Reset Password | RTS";

  return (
    <ParticlesAuth>
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-4 text-white-50">
                <div>
                  <Link to="/login" className="d-inline-block auth-logo">
                    <img src={logo_big} alt="" height="80" />
                  </Link>
                </div>
                <p className="fs-5 fw-medium text-white">
                  Talent and Recruitment Services to clients across the world.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center pt-4">
            <Col lg={8}>
              <Card>
                <CardBody className="p-4">
                  <div className="text-center my-2">
                    <h5>First Time Login</h5>
                    <div className="d-flex flex-column text-muted mb-2">
                      <span>Please create a new password.</span>
                      <span>
                        Your new password must be different from previous used
                        passwords.
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="mb-3">
                      <Label className="form-label" htmlFor="password-input">
                        Password
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password"
                        id="password-input"
                      />
                      <div>
                        <span id="password-info-text" className="form-text">
                          Must be at least 8 characters.
                        </span>
                      </div>
                    </div>
                    <div>
                      <Label
                        className="form-label"
                        htmlFor="confirm-password-input"
                      >
                        Confirm Password
                      </Label>
                      <Input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        id="confirm-password-input"
                      />
                    </div>
                    <div className="mt-4">
                      <Button
                        className="btn btn-custom-primary w-100"
                        type="submit"
                      >
                        Create New Password
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
}

export default ResetPassword;
