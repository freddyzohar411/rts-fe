import React, { useEffect, useState } from "react";

const IndustrySelectElement = ({ formik, field }) => {
  const [industry, setIndustry] = useState([]);
  useEffect(() => {
    // Fetch data from API
    // console.log("Fetching data from API")
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
          onBlur={formik.handleBlur}
          className="form-select"
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
