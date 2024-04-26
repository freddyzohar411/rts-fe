import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Alert,
  Card,
  CardBody,
  Container,
  Spinner,
  Button,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { login2FA, resendOTP } from "../../store/auth/login/actions";

// import images
import PulseLogo from "@workspace/common/src/assets/images/logo-pulse.png";

import ParticlesAuth from "../../ParticlesAuth";
import OTPDigitInput from "./OTPDigitInput";

const LoginOTP = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const loginMeta = useSelector((state) => state.Login.login2FAMeta);
  const state = location?.state;

  useEffect(() => {
    if (!state) {
      navigate("/login");
    }
  }, [state]);

  /**
   * OTP and User Submit
   * @param {*} values
   */
  const onOTPAndUserSubmit = (values) => {
    const optRequest = {
      otp: values.otp,
      refreshToken: state?.refreshToken,
    };
    dispatch(login2FA(optRequest, state, navigate));
  };

  /**
   * Formik Initialization and Validation
   */
  const formik = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .required("OTP is required")
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(6, "Invalid OTP, must be 6 digits")
        .max(6, "Invalid OTP, must be 6 digits"),
    }),
    onSubmit: onOTPAndUserSubmit,
  });

  /**
   * Timer helper function
   * @param {*} timeout
   * @param {*} ms
   */
  const handleTimer = (timeout, ms) => {
    setTimer(timeout);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
        }
        return prev - 1;
      });
    }, ms);
  };

  /**
   * Handle resend OTP and timer
   */
  const handleResendOTP = () => {
    dispatch(resendOTP(state));
    handleTimer(30, 1000);
  };

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
                  <div className="mb-2">
                    <div className="avatar-lg mx-auto">
                      <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                        <i className="ri-mail-line"></i>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="text-muted text-center mb-2 mx-lg-3">
                      <h4 className="">Verify Your Login</h4>
                      <p>
                        6 digits OTP code sent to <i><b>{state?.email}</b></i>
                      </p>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                      <Row>
                        <OTPDigitInput
                          noOfOtp={6}
                          setOTP={(otp) => formik.setFieldValue("otp", otp)}
                        />
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
                        <Button
                          color="success"
                          className="btn btn-next-button border-next-button-border w-100 py-2 fw-semibold fs-5"
                          type="submit"
                          disabled={loginMeta?.isLoading}
                        >
                          <span style={{ marginRight: "5px" }}>Confirm</span>
                          {loginMeta?.isLoading && (
                            <Spinner size="sm">Loading...</Spinner>
                          )}
                        </Button>
                      </div>
                      <Link
                        color="secondary"
                        to="/login"
                        className="mx-auto d-flex justify-content-center mt-3 text-dark fs-6"
                      >
                        <span className="fw-semibold">Back to Login</span>
                      </Link>
                    </form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Didn't receive a code ?{" "}
                  <span
                    className={
                      timer > 0
                        ? `cursor-not-allowed disabled`
                        : `cursor-pointer`
                    }
                    style={{
                      textDecoration: "underline",
                      color: "blue",
                      pointerEvents: timer > 0 ? "none" : "auto",
                      opacity: timer > 0 ? 0.65 : 1,
                    }}
                    onClick={handleResendOTP}
                  >
                    Resend
                  </span>
                  {timer > 0 && <span> in {timer} seconds</span>}
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
