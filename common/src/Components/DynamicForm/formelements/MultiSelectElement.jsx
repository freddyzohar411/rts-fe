import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { Lists } from "./listOptions";
import CreatableSelect from "react-select/creatable";

const MultiSelectElement = ({
  formik,
  field,
  formStateHook,
  tabIndexData,
  ...props
}) => {
  const { formState } = formStateHook;
  const getInitialOptions = (field) => {
    if (!field) return [];
    if (field.list) {
      return Lists[field.list];
    } else {
      return [];
    }
  };
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState(getInitialOptions(field));
  const [selectedOptions, setSelectedOptions] = useState([]);

  function getExistingDataOptions(data) {
    if (!data) return [];
    const existingData = data.split(",");
    if (existingData.length === 0) return [];
    return existingData.map((itemLabel) => {
      return (
        options?.find((option) => option.label === itemLabel) || {
          label: itemLabel,
          value: itemLabel,
        }
      );
    });
  }

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
    if (formik?.values?.[field?.name] === "") {
      setSelectedOptions([]);
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
      backgroundColor: state.isDisabled ? "#EFF2F7" : base.backgroundColor,
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
      {/* <Select
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
        tabIndex={tabIndexData?.[field?.fieldId]}
      /> */}
      <CreatableSelect
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
        tabIndex={tabIndexData?.[field?.fieldId]}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default MultiSelectElement;
