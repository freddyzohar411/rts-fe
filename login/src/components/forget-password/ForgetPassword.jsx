import PropTypes from "prop-types";
import React, { useEffect } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  FormFeedback,
  Input,
  Label,
  Form,
  Spinner,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import {
  userForgetPassword,
  resetForgetPasswordMeta,
} from "../../store/actions";

// import images
import PulseLogo from "@workspace/common/src/assets/images/logo-pulse.png";

import ParticlesAuth from "../../ParticlesAuth";
import { createSelector } from "reselect";
import { withRouter } from "@workspace/common";

const ForgetPasswordPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onForgotPassSubmit = (values) => {
    dispatch(userForgetPassword(values, navigate));
  };
  const forgetPasswordData = useSelector((state) => state.ForgetPassword);

  useEffect(() => {
    return () => {
      dispatch(resetForgetPasswordMeta());
    };
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Please Enter Your Email")
        .email("Please enter valid Email"),
    }),
    onSubmit: onForgotPassSubmit,
  });

  const selectLayoutState = (state) => state.ForgetPassword;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    forgetError: state.forgetError,
    forgetSuccessMsg: state.forgetSuccessMsg,
  }));
  // Inside your component
  const { forgetError, forgetSuccessMsg } = useSelector(selectLayoutProperties);

  document.title = "Reset Password | RTS";

  return (
    <ParticlesAuth>
      <div className="auth-page-content d-flex justify-content-center align-items-center">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-4 text-white-50">
                <div>
                  <Link to="/login" className="d-inline-block auth-logo">
                    <img src={PulseLogo} alt="" height="130" />
                  </Link>
                </div>
                <p className="fs-5 fw-medium text-white">
                  Talent and Recruitment Services to clients across the world.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Forgot Password?</h5>
                    <p className="text-muted">Reset password with Avensys.</p>
                  </div>
                  {!forgetSuccessMsg && !forgetError && (
                    <Alert
                      className="border-0 alert-warning text-center mb-2 mx-2"
                      role="alert"
                    >
                      Enter your email and instructions will be sent to you!
                    </Alert>
                  )}
                  <div className="p-2">
                    {forgetError && forgetError ? (
                      <Alert color="danger">{forgetError}</Alert>
                    ) : null}
                    {forgetSuccessMsg ? (
                      <Alert color="success">{forgetSuccessMsg}</Alert>
                    ) : null}
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        formik.handleSubmit();
                        return false;
                      }}
                    >
                      <div className="mb-4">
                        <Label className="form-label">Email</Label>
                        <Input
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email || ""}
                          invalid={
                            formik.touched.email && formik.errors.email
                              ? true
                              : false
                          }
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <FormFeedback type="invalid">
                            <div>{formik.errors.email}</div>
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="text-center mt-4">
                        <button
                          className="btn btn-success w-100"
                          type="submit"
                          disabled={forgetPasswordData?.isLoading}
                        >
                          {forgetPasswordData.isLoading ? (
                            <>
                              <span style={{ marginRight: "10px" }}>
                                Sending Link
                              </span>
                              <Spinner size="sm">Loading...</Spinner>
                            </>
                          ) : (
                            "Send Reset Password Link"
                          )}
                        </button>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>

              <div className="mt-4 text-center">
                <p className="mb-0">
                  Wait, I remember my password...{" "}
                  <Link
                    to="/login"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Click here
                  </Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

ForgetPasswordPage.propTypes = {
  history: PropTypes.object,
};

export default withRouter(ForgetPasswordPage);
