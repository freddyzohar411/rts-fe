import React, { useEffect, useState } from "react";

const IndustrySelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const [industry, setIndustry] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8200/industries/parent").then((res) => {
      res.json().then((data) => {
        setIndustry(data.data);
      });
    });
  }, []);

  // console.log("Industry", industry)

  return (
    <div>
      {industry && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          value={formik?.values?.[field.name]}
          onBlur={formik.handleBlur}
          className="form-select"
          disabled={formState === "view" ? true : false}
        >
          <option value="">{field.placeholder}</option>
          {industry.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default IndustrySelectElement;
