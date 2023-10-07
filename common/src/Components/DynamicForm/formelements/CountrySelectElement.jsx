import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCountryCurrency } from "../../../store/actions";

const CountrySelectElement = ({ formik, field }) => {
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
          className="form-select"
          value={formik.values[field.name]}
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
