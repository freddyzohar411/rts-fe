import React, { useState, useEffect } from "react";

const SubIndustrySelectElement = ({ formik, field }) => {
  const [subIndustry, setSubIndustry] = useState([]);
  useEffect(() => {
    console.log("Parent",formik.values[field.parent])
    if (formik.values[field.parent]) {
      // Fetch data from API
      setSubIndustry([])
      fetch(
        `http://localhost:8200/industries/${parseInt(
          formik.values[field.parent]
        )}/sub`
      ).then((res) => {
        res.json().then((data) => {
          setSubIndustry(data.data);
        });
      });
    }
  }, [formik.values[field.parent]]);
  return (
    <div>
      {subIndustry && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
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
