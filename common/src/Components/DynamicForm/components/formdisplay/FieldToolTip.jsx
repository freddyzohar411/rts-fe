import React, { useState, useId } from "react";
import { Tooltip } from "reactstrap";

const FieldToolTip = ({ field }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [targetId, setTargetId] = useState(generateRandomString(18));

  const toggle = () => setTooltipOpen(!tooltipOpen);

  function generateRandomString(length) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      randomString += alphabet.charAt(randomIndex);
    }
    return randomString;
  }

  return (
    <div>
      <span className="ri-information-line cursor-pointer" id={targetId}></span>
      <Tooltip
        placement="top"
        isOpen={tooltipOpen}
        autohide={false}
        target={targetId}
        toggle={toggle}
      >
        Try to select this text!
      </Tooltip>
    </div>
  );
};

export default FieldToolTip;
