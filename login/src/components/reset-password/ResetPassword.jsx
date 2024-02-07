import React, { useState } from "react";
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
  FormFeedback,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import logo_big from "@workspace/common/src/assets/images/logo_big.svg";
import ParticlesAuth from "../../ParticlesAuth";
import { initialValues, schema } from "./constants";
import { useDispatch } from "react-redux";
import { loginResetPassword } from "../../store/actions";

const ResetPassword = () => {
  document.title = "Reset Password | RTS";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const handleFormSubmit = async (values) => {
    const authUser = JSON.parse(sessionStorage.getItem("authUser"));
    const payload = {
      userId: authUser?.user?.id,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    dispatch(loginResetPassword(payload, navigate));
  };

  return (
    <Formik
      validateOnBlur
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
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
                      Talent and Recruitment Services to clients across the
                      world.
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
                            Your new password must be different from previous
                            used passwords.
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <Form>
                          <div className="mb-3">
                            <Label
                              className="form-label"
                              htmlFor="password-input"
                            >
                              Password
                            </Label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Field name="password">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    type={passwordShow ? "text" : "password"}
                                    placeholder="Enter Password"
                                    className={`form-control ${
                                      touched.password && errors.password
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                id="password-addon"
                                onClick={() => setPasswordShow(!passwordShow)}
                              >
                                <i className="ri-eye-fill align-middle"></i>
                              </button>
                              {touched.password && errors.password && (
                                <FormFeedback type="invalid">
                                  {errors.password}
                                </FormFeedback>
                              )}
                            </div>
                          </div>
                          <div>
                            <Label
                              className="form-label"
                              htmlFor="confirm-password-input"
                            >
                              Confirm Password
                            </Label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Field name="confirmPassword">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    type={
                                      confirmPasswordShow ? "text" : "password"
                                    }
                                    placeholder="Enter Confirm Password"
                                    className={`form-control ${
                                      touched.confirmPassword &&
                                      errors.confirmPassword
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                )}
                              </Field>
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                                type="button"
                                id="password-addon"
                                onClick={() =>
                                  setConfirmPasswordShow(!confirmPasswordShow)
                                }
                              >
                                <i className="ri-eye-fill align-middle"></i>
                              </button>
                              {touched.confirmPassword &&
                                errors.confirmPassword && (
                                  <FormFeedback type="invalid">
                                    {errors.confirmPassword}
                                  </FormFeedback>
                                )}
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button
                              className="btn btn-custom-primary w-100"
                              type="submit"
                            >
                              Create New Password
                            </Button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </ParticlesAuth>
      )}
    </Formik>
  );
};

export default ResetPassword;
