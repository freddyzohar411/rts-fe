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
  Button,
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
import logoLight from "@workspace/common/src/assets/images/logo-light.png";

import ParticlesAuth from "../../ParticlesAuth";
import { createSelector } from "reselect";
import OTPDigitInput from "./OTPDigitInput";

const LoginOTP = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onOTPAndUserSubmit = (values) => {
    console.log("values", values);
    // dispatch(userForgetPassword(values, navigate));
  };
  const forgetPasswordData = useSelector((state) => state.ForgetPassword);

  useEffect(() => {
    return () => {
      dispatch(resetForgetPasswordMeta());
    };
  }, []);

  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Invalid OTP, must be 6 digits")
        .max(6, "Invalid OTP, must be 6 digits"),
    }),
    onSubmit: onOTPAndUserSubmit,
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
      <div className="auth-page-content">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mt-sm-5 mb-4 text-white-50">
                <div>
                  <Link to="/" className="d-inline-block auth-logo">
                    <img src={logoLight} alt="" height="50" />
                  </Link>
                </div>
                <p className="mt-3 fs-15 fw-medium">
                  Talent and Recruitment Services to clients across the world.
                </p>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="mt-4">
                <CardBody className="p-4">
                  <div className="mb-4">
                    <div className="avatar-lg mx-auto">
                      <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                        <i className="ri-mail-line"></i>
                      </div>
                    </div>
                  </div>

                  <div className="p-2 mt-4">
                    <div className="text-muted text-center mb-4 mx-lg-3">
                      <h4 className="">Verify Your Login</h4>
                      <p>6 digits OTP code sent to your email</p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                      <Row>
                        <OTPDigitInput
                          noOfOtp={6}
                          setOTP={(otp) => formik.setFieldValue("otp", otp)}
                        />
                        {/* <Col className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit1-input"
                              className="visually-hidden"
                            >
                              Digit 1
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              maxLength="1"
                              id="digit1-input"
                              onKeyUp={() => moveToNext(1)}
                            />
                          </div>
                        </Col>

                        <Col className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit2-input"
                              className="visually-hidden"
                            >
                              Digit 2
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              maxLength="1"
                              id="digit2-input"
                              onKeyUp={() => moveToNext(2)}
                            />
                          </div>
                        </Col>

                        <Col className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit3-input"
                              className="visually-hidden"
                            >
                              Digit 3
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              maxLength="1"
                              id="digit3-input"
                              onKeyUp={() => moveToNext(3)}
                            />
                          </div>
                        </Col>

                        <Col className="col-3">
                          <div className="mb-3">
                            <label
                              htmlFor="digit4-input"
                              className="visually-hidden"
                            >
                              Digit 4
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg bg-light border-light text-center"
                              maxLength="1"
                              id="digit4-input"
                              onKeyUp={() => moveToNext(4)}
                            />
                          </div>
                        </Col> */}
                      </Row>

                      {formik.touched.otp && formik.errors.otp ? (
                        <Alert
                          className="border-0 alert-danger text-center mb-2 mx-2"
                          role="alert"
                        >
                          {formik.errors.otp}
                        </Alert>
                      ) : null}

                      <div className="mt-3">
                        <Button type="submit" color="success" className="w-100">
                          Confirm
                        </Button>
                      </div>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Didn't receive a code ?{" "}
                  <Link
                    to="/auth-pass-reset-basic"
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Resend
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </ParticlesAuth>
  );
};

export default LoginOTP;
