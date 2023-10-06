import React, { useState, useEffect } from "react";
import { Dropdown, DropdownToggle, Input, DropdownMenu, DropdownItem } from "reactstrap";
import { fetchCountryCurrency } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const CurrencyElement = ({ field, formik }) => {
  const dispatch = useDispatch();
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );
  const [countryCurrency, setCountryCurrency] = useState([]);

  // Fetch country currency
  useEffect(() => {
    dispatch(fetchCountryCurrency());
  }, []);

  useEffect(() => {
    if (countryData) {
      setCountryCurrency(countryData);
    }
  }, [countryData]);

  // Currency & Filter
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    currency: "Currency",
    currencyId: null,
  });

  useEffect(() => {
    if (selectedCurrency.currencyId) {
      formik.setFieldValue(field.subName, selectedCurrency.currencyId);
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
      <DropdownToggle as="button" className="btn btn-primary arrow-none">
        <span>{selectedCurrency.currency}</span>
      </DropdownToggle>

      <Input
        type="number"
        className="form-control"
        id={field.name}
        name={field.name}
        placeholder={field.placeholder}
        onChange={formik.handleChange}
        value={formik.values[field.name]}
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
              as="li"
              onClick={() =>
                setSelectedCurrency((prev) => ({
                  ...prev,
                  currency: `${country.currency} ${country.currencySymbol}`,
                  currencyId: country.id,
                }))
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
