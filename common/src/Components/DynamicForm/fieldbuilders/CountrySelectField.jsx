import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBusinessCountries } from "../../../store/countrycurrency/action";

const CountrySelectField = ({ setData, field }) => {
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.businessCountries
  );

  useEffect(() => {
    // Fetch data from API
    // fetch("http://localhost:8600/geo/country-currency").then((res) => {
    //   res.json().then((data) => {
    //     setFetchData(data.data);
    //   });
    // });
    dispatch(fetchBusinessCountries());
  }, []);

  useEffect(() => {
    if (countryData) {
      setFetchData(countryData);
    }
  },[countryData]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={(e) => {
            setData(e.target.value)
        }}
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

export default CountrySelectField;
