import React, { useState, useEffect } from "react";

const SubIndustrySelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const [subIndustry, setSubIndustry] = useState([]);
  useEffect(() => {
    if (formik?.values?.[field.parent]) {
      // Fetch data from API
      setSubIndustry([]);
      fetch(
        `http://localhost:8200/industries/${parseInt(
          formik?.values?.[field.parent]
        )}/sub`
      ).then((res) => {
        res.json().then((data) => {
          setSubIndustry(data.data);
        });
      });
    }
  }, [formik?.values?.[field.parent]]);
  return (
    <div>
      {subIndustry && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          value={formik?.values?.[field.name]}
          onBlur={formik.handleBlur}
          className={`form-select ${
            formik?.values?.[field.name] === "" ||
            formik?.values?.[field.name] === undefined
              ? "text-muted"
              : ""
          }`}
          disabled={formState === "view" ? true : false}
        >
          <option value="">{field.placeholder}</option>
          {subIndustry.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SubIndustrySelectElement;
