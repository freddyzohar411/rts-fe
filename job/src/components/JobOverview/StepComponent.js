import React, { useState } from "react";
import { Progress, Popover, PopoverBody } from "reactstrap";
import Moment from "react-moment";
import InterviewPopUp from "../InterviewPopUp/InterviewPopUp";
import "./StepComponent.scss";

function StepComponent({ index, maxOrder, data }) {
  const [toggleInterview, setToggleInterview] = useState(false);
  const date = data?.date;
  const status = data?.status;
  const inProgress = maxOrder + 1;

  const getBulletBgColor = () => {
    let customCSS = "bg-primary border-light";
    switch (status) {
      case "COMPLETED":
        customCSS = "bg-black border-black";
        break;
      case "SKIPPED":
        customCSS = "bg-gray border-gray";
        break;
      case "REJECTED":
        customCSS = "bg-danger border-danger";
        break;
      default:
        break;
    }
    return customCSS;
  };

  return (
    <React.Fragment>
      <div id={`Popover-${index}`} className="step-component pt-2">
        <div className="d-flex gap-2 flex-column justify-content-center align-items-center gap-1">
          <div className="d-flex flex-row justify-content-center align-items-center w-100">
            {index !== 0 ? (
              <Progress
                animated={false}
                value={0}
                style={{ height: "4px", width: "100%" }}
                className={`no-transition ${
                  index < inProgress
                    ? "bg-black border-black"
                    : "border-primary"
                }`}
              />
            ) : (
              <div style={{ height: "4px", width: "100%" }}></div>
            )}

            <div
              className={`rounded-pill border border-primary ${
                index === maxOrder
                  ? "bg-warning border-warning"
                  : getBulletBgColor()
              }`}
              color="custom-button"
              style={{
                width: "22px",
                height: "22px",
                flexShrink: 0,
                flexGrow: 0,
                flexBasis: "auto",
              }}
              onClick={() => {
                setToggleInterview(!toggleInterview);
              }}
            >
              {index === 5 && (
                <span>
                  <i
                    className="ri-add-fill text-white fw-bold cursor-pointer"
                    onClick={() => {
                      setToggleInterview(!toggleInterview);
                    }}
                  ></i>
                </span>
              )}
            </div>
            {index !== 7 ? (
              <Progress
                animated={false}
                value={0}
                style={{ height: "4px", width: "100%" }}
                color="black"
                className={`no-transition ${
                  index < maxOrder ? "bg-black border-black" : "border-primary"
                }`}
              />
            ) : (
              <div style={{ height: "4px", width: "100%" }}></div>
            )}
          </div>
          {date && (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <Moment format="DD/MM/YYYY">{date}</Moment>
            </div>
          )}
        </div>
      </div>
      {/* Interview Schedule Pop Up */}
      {index === 5 && (
        <Popover
          className="custom-popover"
          placement="bottom"
          isOpen={toggleInterview}
          target={`Popover-${index}`}
          trigger="legacy"
          toggle={() => setToggleInterview(!toggleInterview)}
        >
          <PopoverBody>
            <InterviewPopUp currentStep={0} />
          </PopoverBody>
        </Popover>
      )}
    </React.Fragment>
  );
}

export default StepComponent;
