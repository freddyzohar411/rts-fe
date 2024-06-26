import React, { useState, useRef, useEffect } from 'react';
import { components } from 'react-select';
import { Tooltip } from 'reactstrap';

const CustomSingleValue = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const singleValueRef = useRef(null);
  const uniqueId = `single-value-${props.data.value}-${Math.random()}`;

  const toggle = () => setTooltipOpen(!tooltipOpen);

  const isTruncated = () => {
    if (singleValueRef.current) {
      return singleValueRef.current.scrollWidth > singleValueRef.current.clientWidth;
    }
    return false;
  };

  useEffect(() => {
    if (isTruncated()) {
      setTooltipOpen(false);
    }
  }, [singleValueRef]);

  return (
    <div>
      <components.SingleValue {...props} innerRef={singleValueRef} innerProps={{ ...props.innerProps, id: uniqueId }}>
        <div
          ref={singleValueRef}
          style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
        >
          {props.children}
        </div>
      </components.SingleValue>
      {isTruncated() && (
        <Tooltip
          placement="top"
          isOpen={tooltipOpen}
          target={uniqueId}
          toggle={toggle}
        >
          {props.children}
        </Tooltip>
      )}
    </div>
  );
};

export default CustomSingleValue;
