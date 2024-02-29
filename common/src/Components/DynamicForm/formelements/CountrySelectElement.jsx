import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountryCurrency } from "../../../store/actions";

const CountrySelectElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchCountryCurrency());
  }, []);

  useEffect(() => {
    if (countryData) {
      setFetchData(countryData);
    }
  }, [countryData]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-select ${
            formik?.values?.[field.name] === "" ||
            formik?.values?.[field.name] === undefined
              ? "text-muted"
              : ""
          }`}
          value={formik?.values?.[field.name]}
          disabled={formState === "view" ? true : false}
          tabIndex={tabIndexData?.[field?.fieldId]}
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
