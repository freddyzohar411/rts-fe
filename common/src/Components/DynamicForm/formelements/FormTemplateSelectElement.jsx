import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getFormsByCategories } from "../../../helpers/backend_helper";

const FormTemplateSelectElement = ({
  formik,
  field,
  formStateHook,
  tabIndexData,
  ...props
}) => {
  const { formState } = formStateHook;
  const [fetchData, setFetchData] = useState([]);
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchFormByCategories = async (category) => {
      const response = await getFormsByCategories(category || "ALL");
      setFetchData(response?.data);
    };

    if (field?.formCategorySelect) {
      fetchFormByCategories(field?.formCategorySelect);
    }
  }, [field?.formCategorySelect]);

  // Helper Functions
  function mapToOptionFormat(apiData) {
    return apiData.map((item) => ({
      label: item?.formName,
      value: item?.formName,
    }));
  }

  function getSingleExistingDataOptions(data) {
    if (!data) return undefined;
    return options?.find((option) => option.label === data);
  }

  // Get Data for normal API calls without parents
  useEffect(() => {
    if (fetchData && fetchData?.category === field.formCategorySelect) {
      setOptions(mapToOptionFormat(fetchData?.formTemplateNamesList));
    }
    if (fetchData && field.formCategorySelect === "") {
      setOptions(mapToOptionFormat(fetchData?.formTemplateNamesList));
    }
  }, [fetchData]);

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    if (selectedOptions == null) {
      formik?.setFieldValue(field.name, "");
    } else {
      formik?.setFieldValue(field.name, selectedOptions.label);
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

export default FormTemplateSelectElement;
