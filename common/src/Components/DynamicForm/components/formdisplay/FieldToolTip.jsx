import React, { useState, useId } from "react";
import { Tooltip } from "reactstrap";
import { generateRandomString } from "../../../../helpers/string_helper";

const FieldToolTip = ({ field }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [targetId, setTargetId] = useState(generateRandomString(18));

  const toggle = () => setTooltipOpen(!tooltipOpen);

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
        {field.informationText}
      </Tooltip>
    </div>
  );
};

export default FieldToolTip;
