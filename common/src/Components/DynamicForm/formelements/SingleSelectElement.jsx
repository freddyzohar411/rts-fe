import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { Lists } from "./listOptions";

const SingleSelectElement = ({
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
    } else if (field.options) {
      return field.options;
    } else {
      return null;
    }
  };
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState(getInitialOptions(field));
  const [selectedOptions, setSelectedOptions] = useState([]);

  function getSingleExistingDataOptions(data) {
    if (!data) return undefined;
    return options?.find((option) => option.label === data);
  }

  const mapToOptionFormat = (data) => {
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    if (selectedOptions === null) {
      formik?.setFieldValue(field.name, "");
    } else {
      formik?.setFieldValue(field.name, selectedOptions.label);
    }
  };

  useEffect(() => {
    if (formik?.values?.[field.name] && formik?.values?.[field.name] !== "") {
      setSelectedOptions(
        getSingleExistingDataOptions(formik?.values?.[field.name])
      );
    } else {
      setSelectedOptions(null);
    }
  }, [formik?.values?.[field.name]]);

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
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "black !important" : provided.color,
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
        styles={customStyles}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={search}
        menuShouldScrollIntoView={false}
        isClearable
        isSearchable
        placeholder={field.placeholder ?? "Search..."}
        options={options}
        noOptionsMessage={noOptionsMessage}
        isDisabled={formState === "view" ? true : false}
        tabIndex={tabIndexData?.[field.fieldId]}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default SingleSelectElement;
