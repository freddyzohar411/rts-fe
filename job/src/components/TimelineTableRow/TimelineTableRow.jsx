import React, { useState, useEffect } from "react";
import {
  Progress,
  Nav,
  NavItem,
  NavLink,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import classnames from "classnames";
const TimelineTableRow = ({ candidateName, recruiterName, step, setStep }) => {
  const [progressBarValue, setProgressBarValue] = useState(0);
  useEffect(() => {
    setProgressBarValue(step * (100 / 7));
  }, [step]);
  return (
    <React.Fragment>
      <tr>
        <td>{candidateName}</td>
        <td>{recruiterName}</td>
        <div className="progress-nav">
          <Progress value={progressBarValue} style={{ height: "1px" }} />
          <Nav>
            <td>
              {/* Tag */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-0`}
                  className={classnames(
                    {
                      active: step === 0,
                      done: step <= 7 && step >= 0,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-1`}
                  className={classnames(
                    {
                      active: step === 1,
                      done: step <= 7 && step >= 1,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Submitted to Sales */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-2`}
                  className={classnames(
                    {
                      active: step === 2,
                      done: step <= 7 && step >= 2,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Submit to Client */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-3`}
                  className={classnames(
                    {
                      active: step === 3,
                      done: step <= 7 && step >= 3,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Profile Feedback Pending */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-4`}
                  className={classnames(
                    {
                      active: step === 4,
                      done: step <= 7 && step >= 4,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Interviews */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-5`}
                  className={classnames(
                    {
                      active: step === 5,
                      done: step <= 7 && step >= 5,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Conditional Offer Sent */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-6`}
                  className={classnames(
                    {
                      active: step === 6,
                      done: step <= 7 && step >= 6,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
            <td>
              {/* Conditional Offer Accepted */}
              <NavItem>
                <NavLink
                  onClick={() => setStep && setStep(index)}
                  id={`pills-gen-info-tab-7`}
                  className={classnames(
                    {
                      active: step === 7,
                      done: step <= 7 && step >= 7,
                    },
                    "rounded-pill small-circle"
                  )}
                  style={{ width: "18px", height: "18px" }}
                  color="custom-button"
                  tag="button"
                ></NavLink>
              </NavItem>
            </td>
          </Nav>
        </div>
        <td>
          <i className="ri-share-forward-fill fs-5 text-custom-primary cursor-pointer"></i>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TimelineTableRow;
