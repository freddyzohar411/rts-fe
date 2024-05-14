import React, { useState, useEffect } from "react";
import { Button, Input } from "reactstrap";
const EmailDateTime = ({ formik, period, name }) => {
  const getPeriod = (period) => {
    if (period === "To") {
      return "To";
    } else if (period === "From") {
      return "From";
    } else {
      return null;
    }
  };
  return (
    <div className="d-flex flex-row align-items-center justify-content-start gap-1">
      <div>
        <span style={{ fontWeight: "100", marginRight: "5px" }}>{getPeriod(period)}</span>
      </div>
      <div>
        <Input
          type="date"
          name={getPeriod(period)}
          value={formik?.values?.[name]}
          onChange={(event) => formik.setFieldValue(name, event.target.value)}
          style={{ border: "1px solid #d1d1d1ce", backgroundColor: "#ffffff" }}
        />
      </div>
      <div>
        <Input
          type="time"
          name={getPeriod(period)}
          value={formik?.values?.[name]}
          onChange={(event) => formik.setFieldValue(name, event.target.value)}
          style={{ border: "1px solid #d1d1d1ce", backgroundColor: "#ffffff" }}
        />
      </div>
    </div>
  );
};

export default EmailDateTime;
