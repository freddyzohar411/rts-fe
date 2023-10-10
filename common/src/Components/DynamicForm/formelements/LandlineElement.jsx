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

const LandlineElement = ({ field, formik }) => {
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

  // Landline and Filter
  const [landlineDropdown, setLandlineDropdown] = useState(false);
  const [selectedLandline, setSelectedLandline] = useState({
    landlineCountry: "Phone Code",
    landlineCountryId: null,
  });

  useEffect(() => {
    if (formik.values[field.subName] && countryData) {
      const country = countryData.find(
        (country) => country.id === formik.values[field.subName]
      );
      setSelectedLandline({
        landlineCountry: `${country?.phoneCode.charAt(0) == "+" ? "" : "+"} ${
          country?.phoneCode
        } (${country?.name})`,
        landlineCountryId: formik.values[field.subName],
      });
    }
  }, [formik.values[field.subName]]);

  useEffect(() => {
    if (selectedLandline.landlineCountryId) {
      formik.setFieldValue(field.subName, selectedLandline.landlineCountryId);
    }
  }, [selectedLandline]);

  const toggleLandlineDropdown = () =>
    setLandlineDropdown((prevState) => !prevState);
  const [landlineSearchTerm, setLandlineSearchTerm] = useState("");

  const filteredLandlines = landlineSearchTerm
    ? countryCurrency.filter((country) => {
        let countryCodeName = `${
          country.phoneCode.charAt(0) == "+" ? "" : "+"
        } ${country.phoneCode} (${country.name})`;
        return countryCodeName
          .toLowerCase()
          .includes(landlineSearchTerm.toLowerCase());
      })
    : countryCurrency;

  return (
    <Dropdown
      className="input-group"
      isOpen={landlineDropdown}
      toggle={toggleLandlineDropdown}
    >
      <DropdownToggle as="button" className="btn btn-primary arrow-none">
        <span>{selectedLandline.landlineCountry}</span>
      </DropdownToggle>
      <Input
        type="number"
        id={field.name}
        name={field.name}
        className="form-control"
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
          placeholder="Search landline..."
          value={landlineSearchTerm}
          style={{ width: "95%" }}
          onChange={(e) => setLandlineSearchTerm(e.target.value)}
        />
        {filteredLandlines &&
          filteredLandlines.map((country) => (
            <DropdownItem
              as="li"
              onClick={() =>
                setSelectedLandline((prev) => ({
                  ...prev,
                  landlineCountry: `${
                    country.phoneCode.charAt(0) == "+" ? "" : "+"
                  } ${country.phoneCode}`,
                  landlineCountryId: country.id,
                }))
              }
              className="dropdown-item d-flex"
            >
              <div className="flex-grow-1">
                <div className="d-flex">
                  <span className="text-muted">
                    {country.phoneCode.charAt(0) == "+" ? "" : "+"}
                    {country.phoneCode} {`(${country.name})`}
                  </span>
                </div>
              </div>
            </DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default LandlineElement;
