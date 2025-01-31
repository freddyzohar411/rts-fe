import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import CreatableSelect from "react-select/creatable";

const CreateSelectElement = ({
  optionsData,
  setSelectedOptionData = null,
  value,
  placeholder,
  editorRef,
  clearable = true,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState(optionsData);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (optionsData) {
      setOptions(optionsData);
    }
  }, [optionsData]);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    if (setSelectedOptionData) {
      setSelectedOptionData(selectedOptions);
    }
  };

  const handleCreateOption = (inputValue) => {
    const newOption = { value: inputValue, label: inputValue };
    setSelectedOptions(newOption);
    // Update options state to include the new option
    if (setSelectedOptionData) {
      setSelectedOptionData(newOption);
    }
  };

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
    options: (provided) => ({
      ...provided,
      zIndex: 999999999,
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
      <CreatableSelect
        styles={customStyles}
        value={value}
        onChange={handleChange}
        onCreateOption={(e) => handleCreateOption(e)}
        onInputChange={handleInputChange}
        inputValue={search}
        menuShouldScrollIntoView={false}
        isClearable={clearable}
        isSearchable
        placeholder={placeholder}
        options={options}
        noOptionsMessage={noOptionsMessage}
        // onMenuOpen={() =>  editorRef?.current.editor.editing.view.focus()}
        // onMenuClose={() =>  editorRef?.current.editor.editing.view.focus()}
        // isDisabled={formState === "view" ? true : false}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default CreateSelectElement;
