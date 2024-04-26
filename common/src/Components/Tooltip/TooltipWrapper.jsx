import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipWrapper = ({
  children,
  tooltipText,
  color = "black",
  backgroundColor = "white",
  fontSize = "0.8rem",
  delayShow = 250,
  delayHide = 0,
  placement = "top", // Default placement
  boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px",
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const tooltipId = React.useMemo(
    () => `tooltip-${Math.random().toString(36).substring(2, 9)}`,
    []
  );

  const child = React.Children.only(children);

  const childWithProps = React.cloneElement(child, {
    id: tooltipId, // Ensure every wrapped component has a unique ID
  });

  return (
    <>
      {childWithProps}
      <Tooltip
        placement={placement} // Customizable placement
        isOpen={tooltipOpen}
        target={tooltipId}
        toggle={toggle}
        style={{
          color: color,
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          fontSize: fontSize,
          boxShadow: boxShadow,
        }} // Custom style
        delay={{ show: delayShow, hide: delayHide }}
      >
        {tooltipText}
      </Tooltip>
      <style>
        {`.tooltip-arrow::before {
            border-top-color: ${backgroundColor} !important;
        }`}
      </style>
    </>
  );
};

export default TooltipWrapper;
