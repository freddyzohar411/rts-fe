import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  Progress,
} from "reactstrap";
import classnames from "classnames";

const InterviewPopUp = ({ step, setStep }) => {
  const [progressBarValue, setProgressBarValue] = useState(0);
  useEffect(() => {
    setProgressBarValue(step * (100 / 3));
  }, [step]);

  return (
    <React.Fragment>
      <div className="p-1">
        <Row>
          <div>
            <div className="progress-nav">
              <Progress value={progressBarValue} style={{ height: "1px" }} />
              <Nav>
                <NavItem>
                  <div className="d-flex flex-column gap-3 justify-content-top">
                    <NavLink
                      onClick={() => setStep && setStep(0)}
                      id="pills-gen-info-tab-0"
                      className={classnames(
                        {
                          active: step === 0,
                          done: step <= 3 && step >= 0,
                        },
                        "rounded-pill small-circle"
                      )}
                      style={{ width: "18px", height: "18px" }}
                      color="custom-button"
                      tag="button"
                    ></NavLink>
                    <span>First Interview Scheduled</span>
                  </div>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => setStep && setStep(1)}
                    id="pills-gen-info-tab-2"
                    className={classnames(
                      {
                        active: step === 1,
                        done: step <= 3 && step >= 1,
                      },
                      "rounded-pill small-circle"
                    )}
                    style={{ width: "18px", height: "18px" }}
                    color="custom-button"
                    tag="button"
                  ></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => setStep && setStep(2)}
                    id="pills-gen-info-tab-2"
                    className={classnames(
                      {
                        active: step === 2,
                        done: step <= 3 && step >= 2,
                      },
                      "rounded-pill small-circle"
                    )}
                    style={{ width: "18px", height: "18px" }}
                    color="custom-button"
                    tag="button"
                  ></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => setStep && setStep(3)}
                    id="pills-gen-info-tab-3"
                    className={classnames(
                      {
                        active: step === 3,
                        done: step <= 3 && step >= 3,
                      },
                      "rounded-pill small-circle"
                    )}
                    style={{ width: "18px", height: "18px" }}
                    color="custom-button"
                    tag="button"
                  ></NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
};
export default InterviewPopUp;
