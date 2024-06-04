import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { fetchUsers } from "../../../store/actions";

const CandidateOwnerSelectElement = ({
  formik,
  field,
  formStateHook,
  tabIndexData,
  ...props
}) => {
  const { formState } = formStateHook;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.UserGroupReducer.users);

  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Helper Functions
  function mapToOptionFormat(apiData) {
    return apiData?.map((item) => ({
      label: `${item?.firstName} ${item?.lastName} (${item?.email})`,
      value: item?.id,
    }));
  }

  function getSingleExistingDataOptions(data) {
    if (!data) return undefined;
    return options?.find((option) => option.label === data);
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // Get Data for normal API calls without parents
  useEffect(() => {
    if (data?.length > 0) {
      setOptions(mapToOptionFormat(data));
    }
  }, [data]);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    if (selectedOptions == null) {
      formik?.setFieldValue(field.name, "");
      formik?.setFieldValue("candidateOwnerId", null);
    } else {
      formik?.setFieldValue(field.name, selectedOptions.label);
      formik?.setFieldValue("candidateOwnerId", selectedOptions.value);
    }
  };

  useEffect(() => {
    setSelectedOptions(null);
    if (
      formik?.values?.[field.name] &&
      formik?.values?.[field.name] !== "" &&
      options
    ) {
      const setOption = getSingleExistingDataOptions(
        formik?.values?.[field.name]
      );
      if (setOption) {
        setSelectedOptions(setOption);
      } else {
        setSelectedOptions(null);
      }
    } else {
      setSelectedOptions(null);
    }
  }, [formik?.values?.[field.name], options]);

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
        tabIndex={tabIndexData?.[field?.fieldId]}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default CandidateOwnerSelectElement;
