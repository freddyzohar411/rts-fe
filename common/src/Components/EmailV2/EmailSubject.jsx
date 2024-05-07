import React from "react";
import { Button, Input } from "reactstrap";

const EmailSubject = ({ formik, name, icon }) => {
  return (
    <div className="d-flex align-items-center gap-2 ">
      <div
        style={{
          width: "40px",
        }}
      >
        <Button className="px-1 py-0">{icon && icon}</Button>
      </div>
      <div className="d-flex gap-3 w-100">
        <Input
          type="text"
          className="border-0 w-100 m-0 p-0"
          name="subject"
          value={formik?.values?.[name]}
          onChange={(event) => {
            formik.setFieldValue(name, event.target.value);
          }}
          onBlur={formik.handleBlur}
          placeholder="Enter Subject"
        />
      </div>
    </div>
  );
};

export default EmailSubject;
