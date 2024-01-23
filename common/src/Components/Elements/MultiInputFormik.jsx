import React from "react";
import CreatableSelect from "react-select/creatable";

const MultiInputFormik = ({
  name,
  formik,
  placeholder = "Enter input",
  isString,
  ...props
}) => {
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

  const returnValues = () => {
    if (isString) {
      return convertStringToOptions(formik?.values?.[name]);
    } else {
      return formik.values[name];
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
      borderColor: "#8AAED6", // Remove border
      "&:hover": {
        borderColor: "#8AAED6",
      },
      boxShadow: "none", // Remove focus shadow
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: props?.placeholderAlign || "center", // Align the placeholder text to the left
    }),
  };

  const DropdownIndicator = () => null;
  const Menu = () => null;

  return (
    <CreatableSelect
      isMulti
      name={name}
      value={returnValues()}
      onChange={(e) => handleChange(e, name)}
      onCreateOption={(e) => handleCreateOption(e, name)}
      isClearable={true}
      placeholder={placeholder}
      onBlur={formik.handleBlur}
      styles={customStyles}
      components={{ DropdownIndicator, Menu }} // Override dropdown indicator and menu
    />
  );
};

export default MultiInputFormik;
