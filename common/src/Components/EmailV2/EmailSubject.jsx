import React from "react";
import { Button, Input } from "reactstrap";

const EmailSubject = ({
  formik,
  name,
  icon,
  placeholder = "Enter Subject",
}) => {
  return (
    <div className="d-flex align-items-center gap-2 ">
      <div
        style={{
          width: "40px",
        }}
      >
        <Button
          className="px-1 py-0"
          style={{
            height: "28px",
            width: "28px",
            backgroundColor: "#F5F5F5",
            border: "1px solid #A8A8A8",
            color: "#7A7A7A",
          }}
        >
          {icon && icon}
        </Button>
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
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default EmailSubject;
