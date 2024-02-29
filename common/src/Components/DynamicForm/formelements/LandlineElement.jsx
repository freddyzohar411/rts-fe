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

const LandlineElement = ({ field, formik, formStateHook, tabIndexData }) => {
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

  /**
   * Get Initial Landline State
   * @returns
   */
  const getInitialLandline = () => {
    if (countryData) {
      if (
        formik?.values?.[field?.subName] === "" ||
        formik?.values?.[field?.subName] === null ||
        formik?.values?.[field?.subName] === undefined
      ) {
        setSelectedLandline((prev) => "Phone Code");
        return;
      }

      const country = countryData.find(
        (country) =>
          `${country?.phoneCode.charAt(0) == "+" ? "" : "+"} ${
            country?.phoneCode
          }` === formik?.values?.[field?.subName]
      );

      if (country) {
        setSelectedLandline(
          (prev) =>
            `${country?.phoneCode.charAt(0) == "+" ? "" : "+"} ${
              country?.phoneCode
            }`
        );
      }
    }
  };

  // Landline and Filter
  const [landlineDropdown, setLandlineDropdown] = useState(false);
  const [selectedLandline, setSelectedLandline] = useState("Phone Code");

  /**
   * Set Landline Country state
   */
  useEffect(() => {
    if (countryData) {
      getInitialLandline();
    }
  }, [formik?.values?.[field?.subName]]);

  /**
   * Set Landline Country to formik
   */
  useEffect(() => {
    if (selectedLandline && formik) {
      try {
        formik?.setFieldValue?.(field.subName, selectedLandline);
      } catch {}
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
      <DropdownToggle
        as="button"
        className="btn btn-custom-primary arrow-none border border"
        disabled={formState === "view" ? true : false}
        color="primary"
        tabIndex={tabIndexData?.[field?.fieldId]}
      >
        <span>{selectedLandline}</span>
      </DropdownToggle>
      <Input
        type="number"
        id={field.name}
        name={field.name}
        className="form-control rounded"
        placeholder={field.placeholder}
        onChange={formik.handleChange}
        value={formik?.values?.[field.name]}
        disabled={formState === "view" ? true : false}
        tabIndex={tabIndexData?.[field.fieldId]}
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
              key={country.id}
              as="li"
              onClick={() =>
                setSelectedLandline(
                  (prev) =>
                    `${country.phoneCode.charAt(0) == "+" ? "" : "+"} ${
                      country.phoneCode
                    }`
                )
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
