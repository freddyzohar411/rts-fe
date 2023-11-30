import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCity } from "../../../store/actions";

const CitySelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const dispatch = useDispatch();
  const cityData = useSelector((state) => state.CityReducer.city);
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );

  const [fetchedData, setFetchData] = useState([]);

  const getIdfromCountry = (countryName) => {
    const country = countryData.find((country) => country.name === countryName);
    return parseInt(country.id);
  };

  useEffect(() => {
    if (formik?.values?.[field.parent]) {
      dispatch(fetchCity(getIdfromCountry(formik?.values?.[field.parent])));
    }
  }, [formik?.values?.[field.parent]]);

  useEffect(() => {
    if (cityData) {
      setFetchData(cityData);
    } else {
      setFetchData([]);
    }
  }, [cityData]);

  return (
    <div>
      {fetchedData && (
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
        >
          <option value="">{field.placeholder}</option>
          {fetchedData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CitySelectElement;
