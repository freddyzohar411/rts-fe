import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { fetchIndustry } from "../../../store/industry/action";
import { fetchDepartment } from "../../../store/actions";
import { fetchCountryCurrency } from "../../../store/countrycurrency/action";
import { getSubIndustries, getCities } from "../../../helpers/backend_helper";

const MultiSelectAPIElement = ({ formik, field, formStateHook, ...props }) => {
  const { formState } = formStateHook;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  function getExistingDataOptions(Data) {
    if (!Data) return [];

    const existingData = Data.split(",");
    if (existingData.length === 0) return [];
    return existingData.map((itemLabel) => {
      return options?.find((option) => option.label === itemLabel);
    });
  }

  // Helper Functions
  function mapToOptionFormat(apiData) {
    return apiData.map((item) => ({
      label: item?.name,
      value: item?.name,
    }));
  }

  function getIdFromName(parentData, name) {
    if (!parentData) return undefined;
    const data = parentData.find((item) => item.name === name);
    if (!data) return undefined;
    return parseInt(data.id);
  }

  // Get Data for API calls if it does not exist in the store
  useEffect(() => {
    if (!apiData || apiData.length === 0) {
      if (field.list === "industry" || field.list === "subIndustry") {
        dispatch(fetchIndustry());
      }
      if (field.list === "department") {
        dispatch(fetchDepartment());
      }
      if (field.list === "country" || field.list === "city") {
        dispatch(fetchCountryCurrency());
      }
    }
  }, []);

  // Select to return parent API data
  const parentAPIData = useSelector((state) => {
    if (field.list === "subIndustry") {
      return state.IndustryReducer.industry;
    }
    if (field.list === "city") {
      return state.CountryCurrencyReducer.countryCurrency;
    }
  });

  // Select to return API data
  const apiData = useSelector((state) => {
    if (field.list === "industry") {
      return state.IndustryReducer.industry;
    }
    if (field.list === "department") {
      return state.DepartmentReducer.department;
    }
    if (field.list === "country") {
      return state.CountryCurrencyReducer.countryCurrency;
    }
  });

  // Get Data for normal API calls without parents
  useEffect(() => {
    if (apiData && !field.parent) {
      setOptions(mapToOptionFormat(apiData));
    }
  }, [apiData]);

  // Get Data for data based on parents
  useEffect(() => {
    setSelectedOptions(null);
    if (formik?.values?.[field.parent] && parentAPIData) {
      if (field.list === "subIndustry") {
        getSubIndustries(
          getIdFromName(parentAPIData, formik?.values?.[field.parent])
        ).then((res) => {
          setOptions(mapToOptionFormat(res.data));
        });
      }

      if (field.list === "city") {
        getCities(
          getIdFromName(parentAPIData, formik?.values?.[field.parent])
        ).then((res) => {
          setOptions(mapToOptionFormat(res.data));
        });
      }
    }
  }, [formik?.values?.[field.parent], parentAPIData]);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const labelsArray = selectedOptions.map((option) => option.label);
    formik.setFieldValue(field.name, labelsArray.join(","));
  };

  useEffect(() => {
    if (formik?.values?.[field?.name]) {
      const updateData = formik?.values[field.name];
      setSelectedOptions(getExistingDataOptions(updateData));
    }
  }, [formik?.values?.[field?.name]]);

  const isValid = !props?.error;

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, 
    }),
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#8AAED6" : isValid ? "#8AAED6" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#8AAED6" : isValid ? "#8AAED6" : "red",
      },
    }),
  };

  const noOptionsMessage = () => null; // Return null to prevent the message from showing

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Select
        isMulti
        styles={customStyles}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={search}
        menuShouldScrollIntoView={false}
        closeMenuOnSelect={false}
        isClearable
        isSearchable
        placeholder={field.placeholder ?? "Search..."}
        options={options}
        noOptionsMessage={noOptionsMessage}
        isDisabled={formState === "view" ? true : false}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default MultiSelectAPIElement;
