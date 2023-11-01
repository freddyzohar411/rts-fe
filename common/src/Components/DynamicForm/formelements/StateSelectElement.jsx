import React, { useState, useEffect } from "react";

const StateSelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const [fetchedData, setFetchData] = useState([]);
  useEffect(() => {
    if (formik.values[field.parent]) {
      // Fetch data from API
      setFetchData([])
      fetch(
        `http://localhost:8600/geo/states/${parseInt(
          formik.values[field.parent]
        )}`
      ).then((res) => {
        res.json().then((data) => {
          setFetchData(data.data);
        });
      });
    }
  }, [formik.values[field.parent]]);
  return (
    <div>
      {fetchedData && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
          disabled={formState === "view" ? true : false}
        >
          <option value="">{field.placeholder}</option>
          {fetchedData.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default StateSelectElement;
