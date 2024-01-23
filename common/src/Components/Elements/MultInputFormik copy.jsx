import React from "react";
import CreatableSelect from "react-select/creatable";

const MultInputFormik = ({
  name,
  formik,
  placeholder = "Enter input",
  ...props
}) => {
  const handleChange = (selectedOptions, name) => {
    formik.setFieldValue(name, selectedOptions);
  };

  const handleCreateOption = (inputValue, name) => {
    const newOption = { value: inputValue, label: inputValue };
    formik.setFieldValue(name, [...formik.values[name], newOption]);
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
      value={formik?.values?.[name]}
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

export default MultInputFormik;
