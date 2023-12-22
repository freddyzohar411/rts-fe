import React, { useEffect, useState } from "react";
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

const Stepper = ({ step }) => {
  const [progressBarValue, setProgressBarValue] = useState(0);

  useEffect(() => {
    setProgressBarValue(step * (100 / 6));
  }, [step]);

  return (
    <Container className="p-4">
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
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 0,
                      done: step <= 6 && step >= 0,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                  color="custom-button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-account mt-2"></i>
                    <p className="h6">Basic Info</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/contact-creation"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 1,
                      done: step <= 6 && step > 1,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-badge-account-horizontal-outline mt-2"></i>
                    <p className="h6">Documents</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 2,
                      done: step <= 6 && step > 2,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-file-document-outline mt-2"></i>
                    <p className="h6">Work Experience</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 3,
                      done: step <= 6 && step > 3,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-note-multiple mt-2"></i>
                    <p className="h6 text-nowrap">Education Details</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 4,
                      done: step <= 6 && step > 4,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-file-document-edit mt-2"></i>
                    <p className="h6">Certification</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 5,
                      done: step <= 7 && step > 5,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-calculator mt-2"></i>
                    <p className="h6">Languages</p>
                  </div>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  to="#"
                  id="pills-gen-info-tab"
                  className={classnames(
                    {
                      active: step === 6,
                      done: step <= 7 && step > 5,
                    },
                    "rounded-pill"
                  )}
                  tag="button"
                >
                  <div className="d-flex flex-column row-gap-2 justify-content-center align-items-center">
                    <i className="mdi mdi-calculator mt-2"></i>
                    <p className="h6">Employer Details</p>
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

export default Stepper;
