import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Col,
  Container,
  Row,
  Progress,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";

const AccountStepper = ({ step, setStep }) => {
  const MAX_STEPS = 4;
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    setProgressBarValue(step * (100 / 4));
  }, [step]);

  return (
    <Container fluid className="p-4">
      <Row>
        <Col xl={12}>
          <div className="progress-nav mb-5">
            <Progress value={progressBarValue} style={{ height: "1px" }} />
            <Nav
              className="nav-pills progress-bar-tab custom-nav"
              role="tablist"
            >
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(0)}
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 0,
                      done: step <= MAX_STEPS && step >= 0,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                  color="custom-button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-account mt-2"></i>
                    <p className="h6">Account</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(1)}
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 1,
                      done: step <= MAX_STEPS && step > 1,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-contacts mt-2"></i>
                    <p className="h6">Contacts</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(2)}
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 2,
                      done: step <= MAX_STEPS && step > 2,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-file-document-outline mt-2"></i>
                    <p className="h6">Documents</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(3)}
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 3,
                      done: step <= MAX_STEPS && step > 3,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-file-document-multiple-outline mt-2"></i>
                    <p className="h6 text-nowrap"> Client Instructions</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(4)}
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 4,
                      done: step <= MAX_STEPS && step > 4,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-calculator mt-2"></i>
                    <p className="h6">Commercial</p>
                  </div>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AccountStepper;
