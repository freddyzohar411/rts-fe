import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import Select, { components } from "react-select";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const SelectNoBorder = ({
  defaultFirstValue, // Default first value of the option
  width = "auto",
  end, // Justify content end
  value, // Use this to set a value
  flexGrow = false,
  addMore = false,
  addMoreLabel = "Label",
  addMoreRender = null,
  addMoreStart = false,
  selectRender = null,
  placeholder = "Select an option",
  options = [],
  ...props
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [optionSelected, setOptionSelected] = useState(null);

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
      width: width,
      border: "none", // Remove border
      boxShadow: "none", // Remove focus shadow
      padding: "0px", // Remove padding
      margin: "0px", // Remove margin
      minHeight: "0px", // Remove min height
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "black !important" : provided.color,
    }),
  };

  const handleChange = (selectedOptions) => {
    setOptionSelected(selectedOptions);
    if (props?.onChange) {
      props.onChange(selectedOptions);
    } else {
      // If no template is selected
      props.onChange(null);
    }
  };

  const formatOptionLabel = ({ value, label, id, data }) => {
    if (value === "addMore") {
      return addMoreRender ? addMoreRender : "";
    }
    if (selectRender) {
      return selectRender({ value, label, id, data });
    }
    return label;
  };

  // Customize how the selected option is displayed in the input field
  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {props.data.label}
    </components.SingleValue>
  );

  return (
    <>
      <div className={`${flexGrow ? "flex-grow-1" : ""}`}>
        {props?.label && (
          <Label
            className="form-label"
            htmlFor={props?.htmlFor ?? "input-field"}
          >
            {props?.label}
          </Label>
        )}
        <Select
          value={value}
          styles={customStyles}
          onChange={handleChange}
          onInputChange={(inputValue) => {
            setSearch(inputValue);
          }}
          inputValue={search}
          menuShouldScrollIntoView={false}
          isClearable
          isSearchable
          placeholder={placeholder}
          options={options}
          formatOptionLabel={formatOptionLabel}
          components={{ SingleValue }}
        />
        {props?.error && (
          <FormFeedback type="invalid">{props?.error}</FormFeedback>
        )}
      </div>
    </>
  );
};

export default SelectNoBorder;
