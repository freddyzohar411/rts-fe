import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";

const MultiInputElement = ({
  formik,
  isString = true,
  formStateHook,
  field,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState("");
  const convertOptionsToCommaseparatedString = (options) => {
    let string = "";
    options.forEach((option) => {
      string += option.value + ",";
    });
    return string.slice(0, -1);
  };

  const convertStringToOptions = (string) => {
    if (!string) return [];
    const options = [];
    console.log("string", string.split(","));
    string.split(",").forEach((element) => {
      options.push({ value: element, label: element });
    });
    return options;
  };

  const handleChange = (selectedOptions, name) => {
    if (isString) {
      formik.setFieldValue(
        name,
        convertOptionsToCommaseparatedString(selectedOptions)
      );
    } else {
      formik.setFieldValue(name, selectedOptions);
    }
  };

  const handleCreateOption = (inputValue, name) => {
    const newOption = { value: inputValue, label: inputValue };
    if (isString) {
      const arrayValues = convertStringToOptions(formik?.values?.[name]);
      formik.setFieldValue(
        name,
        convertOptionsToCommaseparatedString([...arrayValues, newOption])
      );
    } else {
      formik.setFieldValue(name, [...formik.values[name], newOption]);
    }
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: props.containerWidth,
    }),
    indicatorsContainer: () => ({ display: "none" }), // Hide indicators container
    control: (provided) => ({
      ...provided,
      borderColor: "#8AAED6",
      "&:hover": {
        borderColor: "#8AAED6",
      },
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: props?.placeholderAlign || "left",
    }),
  };

  const DropdownIndicator = () => null;
  const Menu = () => null;

  return (
    <CreatableSelect
      isMulti
      name={field?.name}
      value={convertStringToOptions(formik?.values?.[field?.name]) ?? ""}
      onChange={(e) => handleChange(e, field?.name)}
      onCreateOption={(e) => handleCreateOption(e, field?.name)}
      isClearable={true}
      placeholder={field.placeholder ?? "Enter..."}
      onBlur={formik.handleBlur}
      styles={customStyles}
      components={{ DropdownIndicator, Menu }} // Override dropdown indicator and menu
    />
  );
};

export default MultiInputElement;
