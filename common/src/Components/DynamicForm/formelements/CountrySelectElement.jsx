import React, { useEffect, useState } from "react";

const CountrySelectElement = ({ formik, field }) => {
  const [fetchData, setFetchData] = useState([]);
  useEffect(() => {
    // Fetch data from API
    fetch("http://localhost:8600/geo/country-currency").then((res) => {
      res.json().then((data) => {
        setFetchData(data.data);
      });
    });
  }, []);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
        >
          <option value="">{field.placeholder}</option>
          {fetchData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CountrySelectElement;
