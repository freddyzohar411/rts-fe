import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Progress,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import classnames from "classnames";
import InterviewPopUp from "../InterviewPopUp/InterviewPopUp";

function TimelineStepper({ step, setStep }) {
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [toggleInterview, setToggleInterview] = useState(false);

  useEffect(() => {
    setProgressBarValue(step * (100 / 7));
  }, [step]);

  return (
    <React.Fragment>
      <div className="progress-nav">
        <Progress
          value={progressBarValue}
          className="mt-0"
          style={{ height: "1px", width: "100%" }}
        />
        <Nav style={{ width: "100%" }}>
          {/* Tag */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(0)}
                id="pills-gen-info-tab-0"
                className={classnames(
                  {
                    active: step === 0,
                    done: step <= 7 && step >= 0,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>

          {/* Associate */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(1)}
                id="pills-gen-info-tab-1"
                className={classnames(
                  {
                    active: step === 1,
                    done: step <= 7 && step >= 1,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Submit to Sales */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(2)}
                id="pills-gen-info-tab-2"
                className={classnames(
                  {
                    active: step === 2,
                    done: step <= 7 && step >= 2,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Submit to Client */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(3)}
                id="pills-gen-info-tab-3"
                className={classnames(
                  {
                    active: step === 3,
                    done: step <= 7 && step >= 3,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Profile Feedback Pending */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(4)}
                id="pills-gen-info-tab-4"
                className={classnames(
                  {
                    active: step === 4,
                    done: step <= 7 && step >= 4,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Interviews */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => {
                  setStep && setStep(5);
                  setToggleInterview(!toggleInterview);
                }}
                id="pills-gen-info-tab-5"
                className={classnames(
                  {
                    active: step === 5,
                    done: step <= 7 && step >= 5,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              >
                <i className="ri-add-fill"></i>
              </NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Conditional Offer Sent */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(6)}
                id="pills-gen-info-tab-6"
                className={classnames(
                  {
                    active: step === 6,
                    done: step <= 7 && step >= 6,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
          {/* Conditional Offer Accepted */}
          <NavItem>
            <div className="d-flex flex-column gap-2 align-items-center justify-content-center">
              <NavLink
                onClick={() => setStep && setStep(7)}
                id="pills-gen-info-tab-7"
                className={classnames(
                  {
                    active: step === 7,
                    done: step <= 7 && step >= 7,
                  },
                  "rounded-pill border border-secondary"
                )}
                style={{ width: "18px", height: "18px" }}
                color="custom-button"
                tag="button"
              ></NavLink>
              <div className="text-center">
                <span>09/01/2023</span>
              </div>
            </div>
          </NavItem>
        </Nav>
      </div>
    </React.Fragment>
  );
}

export default TimelineStepper;
