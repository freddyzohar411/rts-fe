import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchAccountsFields } from "../../../../account/src/store/account/action";
import { fetchJobListsFields } from "../../../../job/src/store/jobList/action";
import { fetchCandidatesFields } from "../../../../candidate/src/store/candidate/action";

const SelectAPIElement = ({
  setSelectedOptionData,
  value,
  placeholder,
  module,
  editorRef,
  ...props
}) => {
  const dispatch = useDispatch();
  const fieldsData = useSelector((state) => {
    if (module?.label === "Accounts") {
      return state.AccountReducer.accountsFields;
    }
    if (module?.label === "Jobs") {
      return state.JobListReducer.jobsFields;
    }
    if (module?.label === "Candidates") {
      return state.CandidateReducer.candidatesFields;
    }
  });

  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (module?.label === "Accounts") {
      dispatch(fetchAccountsFields());
    }
    if (module?.label === "Jobs") {
      dispatch(fetchJobListsFields());
    }
    if (module?.label === "Candidates") {
      dispatch(fetchCandidatesFields());
    }
    setSelectedOptions(null);
    setSelectedOptionData(null);
  }, [module]);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    setSelectedOptionData(selectedOptions);
  };

  useEffect(() => {
    if (fieldsData) {
      const options = fieldsData.map((item) => {
        if (item.value.split(".").length > 1) {
          return {
            label: item.label,
            value: item.value.split(".")[1],
          };
        } else {
          return {
            label: item.label,
            value: item.value,
          };
        }
      });
      setOptions(options);
    }
  }, [fieldsData]);

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
        value={value}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={search}
        menuShouldScrollIntoView={false}
        isClearable
        isSearchable
        placeholder={placeholder}
        options={options}
        noOptionsMessage={noOptionsMessage}
        // onMenuOpen={() =>  editorRef?.current?.editor.editing.view.focus()}
        // onMenuClose={() =>  editorRef?.current?.editor.editing.view.focus()}
        // isDisabled={formState === "view" ? true : false}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default SelectAPIElement;
