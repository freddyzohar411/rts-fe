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
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Field, Formik, Form } from "formik";
import { initialValues, schema } from "./constants";
import logo_big from "@workspace/common/src/assets/images/logo_big.svg";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, login1FA } from "../../store/actions";
import { withRouter } from "@workspace/common";
import { useSelector } from "react-redux";

const Login = (props) => {
  document.title = "Login | RTS";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [passwordShow, setPasswordShow] = useState(false);

  const handleFormSubmit = async (values) => {
    const is2FAEnabled = process.env.REACT_APP_ENABLE_2FA;
    if (is2FAEnabled === "true") {
      dispatch(login1FA(values, navigate));
    } else {
      dispatch(loginUser(values, props.router.navigate));
    }
  };

  let loginMeta = null;
  if (process.env.REACT_APP_ENABLE_2FA === "true") {
    loginMeta = useSelector((state) => state.Login.login1FAMeta);
  } else {
    loginMeta = useSelector((state) => state.Login.loginMeta);
  }

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
                    <CardBody className="p-3">
                      <div className="text-center mt-2">
                        <h3 className="text-dark">Welcome back!</h3>
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
                              disabled={loginMeta?.isLoading}
                            >
                              <span style={{ marginRight: "5px" }}>
                                Sign In
                              </span>
                              {loginMeta?.isLoading && (
                                <Spinner size="sm">Loading...</Spinner>
                              )}
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
