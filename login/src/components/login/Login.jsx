import React, { useState } from "react";
import ParticlesAuth from "../../ParticlesAuth";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { initialValues, schema } from "./constants";
import logoLight from "@workspace/common/src/assets/images/logo-light.png";
import logo_big from "@workspace/common/src/assets/images/logo_big.svg";

import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions";
import { withRouter } from "@workspace/common";

const Login = (props) => {
  document.title = "Login | RTS";

  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  const handleFormSubmit = async (values) => {
    dispatch(loginUser(values, props.router.navigate));
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
                  <div className="text-center mt-sm-5 text-white-50">
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
                {/* <Col md={8} lg={6} xl={5}> */}
                <Col lg={8} >
                  <Card>
                    <CardBody className="p-3">
                      <div className="text-center mt-2">
                        <h2 className="text-dark">Welcome back!</h2>
                        <p className="text-muted size fs-5">
                          Sign in to continue with Avensys.
                        </p>
                      </div>
                      <div className="p-2">
                        <Form>
                          <div className="mb-3">
                            <Label htmlFor="email" className="form-label">
                              Email
                            </Label>
                            <Field name="username">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Enter email"
                                  className={`form-control ${
                                    touched.username && errors.username
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              )}
                            </Field>
                            {touched.username && errors.username && (
                              <FormFeedback type="invalid">
                                {errors.username}
                              </FormFeedback>
                            )}
                          </div>
                          <div className="mb-3">
                            <div className="float-end">
                              <Link
                                to="/forget-password"
                                className="text-muted"
                              >
                                Forgot password?
                              </Link>
                            </div>
                            <Label htmlFor="password" className="form-label">
                              Password
                            </Label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Field name="password">
                                {({ field }) => (
                                  <Input
                                    {...field}
                                    type={passwordShow ? "text" : "password"}
                                    placeholder="Enter password"
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
                          <div className="form-check">
                            <Input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="auth-remember-check"
                            />
                            <Label
                              className="form-check-label"
                              htmlFor="auth-remember-check"
                            >
                              Remember me
                            </Label>
                          </div>
                          <div className="mt-3">
                            <Button
                              color="success"
                              className="btn btn-next-button border-next-button-border w-100 py-3 fw-semibold fs-5"
                              type="submit"
                            >
                              Sign In
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

export default withRouter(Login);
