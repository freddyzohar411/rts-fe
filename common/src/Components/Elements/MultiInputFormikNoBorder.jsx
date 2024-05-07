import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";

const MultiInputFormikNoBorder = ({
  name,
  formik,
  placeholder = "Enter input",
  isString,
  ...props
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
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
    // Check if string has comma separated values first
    // if (string.includes(",")) {
      string.split(",").forEach((element) => {
        options.push({ value: element, label: element });
      });
      return options;
    // }
    // return [
    //   {
    //     value: string,
    //     label: string,
    //   },
    // ];
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


  // Check if formik value changes, add it to value
  useEffect(() => {
    if (formik.values[name] && isString) {
      formik.setFieldValue(name, convertStringToOptions(formik.values[name]));
    } else {
      formik.setFieldValue(name, formik.values[name]);
    }
  }, [formik.values[name]]);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: props.containerWidth,
    }),
    indicatorsContainer: () => ({ display: "none" }), // Hide indicators container
    control: (provided) => ({
      ...provided,
      border: "none", // Remove border
      boxShadow: "none", // Remove focus shadow
      padding: "0px", // Remove padding
      margin: "0px", // Remove margin
      minHeight: "0px", // Remove min height
    }),
    placeholder: (provided) => ({
      ...provided,
      textAlign: props?.placeholderAlign || "center", // Align the placeholder text to the left
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0", // Removes padding inside the input container
      margin: "0", // Removes margin inside the input container
      // minHeight: "20px", // Removes min height
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px", // Removes any default margins that might affect the inner spacing
      padding: "0px", // Ensures the input itself has no padding
    }),
    multiValue: (provided) => ({
      ...provided,
      margin: "0px 5px 5px 0px", // Adds a small margin between tags
      paddingLeft: "2px", // Removes default padding
      paddingRight: "2px", // Removes default padding
      borderRadius: "100vh", // Removes default border radius
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      ":hover": {
        // Use default hover effect defult red color with opacity
        backgroundColor: "rgba(220, 53, 69, 0.5)",
        borderRadius: "100vh", // Makes the remove button circular on hover
      },
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

export default MultiInputFormikNoBorder;
