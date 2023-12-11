import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownToggle,
  Input,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { fetchCountryCurrency } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const CurrencyElement = ({ field, formik, formStateHook }) => {
  const { formState } = formStateHook;
  const dispatch = useDispatch();
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );
  const [countryCurrency, setCountryCurrency] = useState([]);

  // Fetch country currency
  useEffect(() => {
    if (!countryData) {
      dispatch(fetchCountryCurrency());
    }
  }, []);

  useEffect(() => {
    if (countryData) {
      setCountryCurrency(countryData);
    }
  }, [countryData]);

  // Currency & Filter
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("Currency");

  useEffect(() => {
    if (formik?.values?.[field?.subName] && countryData) {
      const country = countryData.find(
        (country) =>
          `${country?.currency} ${country?.currencySymbol}` ===
          formik?.values?.[field.subName]
      );
      if (country) {
        setSelectedCurrency(`${country?.currency} ${country?.currencySymbol}`);
      }
    }
  }, [formik?.values?.[field.subName]]);

  useEffect(() => {
    if (selectedCurrency && formik) {
      try {
        formik?.setFieldValue?.(field.subName, selectedCurrency);
      } catch {}
    }
  }, [selectedCurrency]);

  const [currencySearchTerm, setCurrencySearchTerm] = useState("");
  const toggleCurrencyDropdown = () =>
    setCurrencyDropdown((prevState) => !prevState);

  const filteredCurrencies = currencySearchTerm
    ? countryCurrency.filter((country) => {
        let currency = `${country.currency} ${country.name}`;
        return currency
          .toLowerCase()
          .includes(currencySearchTerm.toLowerCase());
      })
    : countryCurrency;

  return (
    <Dropdown
      className="input-group"
      isOpen={currencyDropdown}
      toggle={toggleCurrencyDropdown}
    >
      <DropdownToggle
        as="button"
        className="btn btn-custom-primary arrow-none border border-primary"
        disabled={formState === "view" ? true : false}
        color="primary"
      >
        <span>{selectedCurrency}</span>
      </DropdownToggle>

      <Input
        type="number"
        className="form-control rounded"
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        onChange={formik.handleChange}
        value={formik?.values?.[field.name]}
        disabled={formState === "view" ? true : false}
      />

      <DropdownMenu
        as="ul"
        className="list-unstyled w-100 dropdown-menu-list mb-0 overflow-auto"
        style={{ maxHeight: "240px" }}
      >
        <Input
          type="text"
          className="form-control search m-auto"
          placeholder="Search currency..."
          value={currencySearchTerm}
          style={{ width: "95%" }}
          onChange={(e) => setCurrencySearchTerm(e.target.value)}
        />
        {filteredCurrencies &&
          filteredCurrencies.map((country) => (
            <DropdownItem
              key={country.id}
              as="li"
              onClick={() =>
                setSelectedCurrency(
                  (prev) => `${country.currency} ${country.currencySymbol}`
                )
              }
              className="dropdown-item d-flex"
            >
              <div className="flex-grow-1">
                <div className="d-flex">
                  <span>
                    {country.currency} {country.currencySymbol}{" "}
                    {`(${country.name})`}
                  </span>
                </div>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default CurrencyElement;
