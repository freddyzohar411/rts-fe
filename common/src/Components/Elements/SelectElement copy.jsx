import React, { useEffect, useState, useRef } from "react";
import { Label, FormFeedback, Tooltip } from "reactstrap";
import Select from "react-select";

const SingleSelectElement = ({
  optionsData,
  setSelectedOptionData,
  value,
  placeholder,
  editorRef,
  clearable = true,
  enableTooltip = false,
  ...props
}) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState(optionsData);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false); // State to track if menu is open
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const singleValueRef = useRef(null);

  const uniqueId = useRef(
    `select-${Math.random().toString(36).substring(2, 10)}`
  ).current;

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const checkTruncation = () => {
    if (singleValueRef.current) {
      const singleValueDiv = singleValueRef.current.querySelector(
        ".react-select__single-value"
      );
      if (singleValueDiv) {
        const isTruncated =
          singleValueDiv.scrollWidth > singleValueDiv.clientWidth;
        setTooltipOpen(isTruncated);
      } else {
        setTooltipOpen(false);
      }
    }
  };

  useEffect(() => {
    checkTruncation();
  }, [value, menuIsOpen]);

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
    setSelectedOptionData(selectedOptions);
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

  const handleMouseEnter = () => {
    if (!menuIsOpen) {
      checkTruncation();
    }
  };

  const handleMouseLeave = () => {
    setTooltipOpen(false);
  };

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <div
        id={uniqueId}
        ref={singleValueRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Select
          styles={customStyles}
          value={value}
          onChange={handleChange}
          onInputChange={handleInputChange}
          inputValue={search}
          menuShouldScrollIntoView={false}
          isClearable={clearable}
          isSearchable
          placeholder={placeholder}
          options={options}
          noOptionsMessage={noOptionsMessage}
          onMenuOpen={() => {
              setMenuIsOpen(true);
              setTooltipOpen(false);
          }}
          onMenuClose={() => setMenuIsOpen(false)}
          // onMenuOpen={() =>  editorRef?.current.editor.editing.view.focus()}
          // onMenuClose={() =>  editorRef?.current.editor.editing.view.focus()}
          // isDisabled={formState === "view" ? true : false}
        />
        {enableTooltip && value?.label && !menuIsOpen && (
          // Conditionally render the tooltip
          <Tooltip
            placement="top"
            isOpen={tooltipOpen}
            target={uniqueId}
            toggle={toggleTooltip}
          >
            {value?.label}
          </Tooltip>
        )}
      </div>
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default SingleSelectElement;
