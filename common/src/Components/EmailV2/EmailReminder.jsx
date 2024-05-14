import React from "react";
import { Input } from "reactstrap";

const EmailReminder = ({ formik, name }) => {
  return (
    <div className="w-100">
      <Input
        type="select"
        style={{ border: "1px solid #d1d1d1ce", backgroundColor: "#ffffff" }}
        name={name}
        value={formik?.values?.[name]}
        onChange={(event) => formik.setFieldValue(name, event.target.value)}
      >
        <option value="">Reminder</option>
        <option value="Does not repeat">Does not repeat</option>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
      </Input>
    </div>
  );
};

export default EmailReminder;
