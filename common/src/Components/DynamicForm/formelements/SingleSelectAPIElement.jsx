import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { fetchIndustry } from "../../../store/industry/action";
import { fetchDepartment } from "../../../store/actions";
import { fetchCountryCurrency } from "../../../store/countrycurrency/action";
import { fetchSubIndustry } from "../../../store/industry/action";

const SingleSelectAPIElement = ({ formik, field, formStateHook, ...props }) => {
  const dispatch = useDispatch();
  const { formState } = formStateHook;
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [optionsNew, setOptionsNew] = useState([]);
  const prevParentValue = useRef(formik?.values?.[field.parent]);

  console.log("Field Parent: ", field.parent);

  const parentAPIData = useSelector((state) => {
    if (field.list === "subIndustry") {
      return state.IndustryReducer.industry;
    }
  });

  const apiData = useSelector((state) => {
    if (field.list === "industry") {
      const mappedData = state.IndustryReducer.industry?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      return mappedData;
    }
    if (field.list === "department") {
      const mappedData = state.DepartmentReducer.department?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      return mappedData;
    }
    if (field.list === "country") {
      const mappedData = state.CountryCurrencyReducer.countryCurrency?.map(
        (item) => ({
          label: item?.name,
          value: item?.name,
        })
      );
      return mappedData;
    }
    if (field.list === "subIndustry") {
      const mappedData = state.IndustryReducer.subIndustry?.map((item) => ({
        label: item?.name,
        value: item?.name,
      }));
      return mappedData;
    }
  });

  useEffect(() => {
    if (apiData && JSON.stringify(apiData) !== JSON.stringify(options)) {
      if (
        !field.parent ||
        (field.parent &&
          formik?.values?.[field.parent] !== prevParentValue.current)
      ) {
        setOptions(apiData);
        prevParentValue.current = formik?.values?.[field.parent];
      }
    }
  }, [apiData, formik?.values?.[field.parent]]);

  // How do i set apiData into options without unlimited loop?
  useEffect(() => {
    if (
      apiData &&
      JSON.stringify(apiData) !== JSON.stringify(options) &&
      !field.parent
    ) {
      setOptions(apiData);
    }
  }, [apiData]);

  useEffect(() => {
    if (!apiData || apiData.length === 0) {
      if (field.list === "industry" || field.list === "subIndustry") {
        dispatch(fetchIndustry());
      }
      if (field.list === "department") {
        dispatch(fetchDepartment());
      }
      if (field.list === "country") {
        dispatch(fetchCountryCurrency());
      }
    }
  }, []);

  const getIdFromName = (parentData, name) => {
    if (!parentData) return undefined;
    const data = parentData.find((item) => item.name === name);
    if (!data) return undefined;
    return parseInt(data.id);
  };

  useEffect(
    () => {
      if (formik?.values?.[field.parent] && parentAPIData) {
        if (field.list === "subIndustry") {
          console.log("PP Field Name: ", field.name);
          console.log("PP Field Parent: ", field.parent);
          console.log("PP Field Values: ", formik?.values[field.parent]);
          console.log("PP Parent Date: ", parentAPIData);
          console.log(
            "PP Parent ID: ",
            getIdFromName(parentAPIData, formik?.values?.[field.parent])
          );
          dispatch(
            fetchSubIndustry(
              getIdFromName(parentAPIData, formik?.values?.[field.parent])
            )
          );
        }
      }
    },
    [formik?.values?.[field.parent]],
    parentAPIData
  );

  console.log("API Data: ", apiData);

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
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#8AAED6" : isValid ? "#8AAED6" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#8AAED6" : isValid ? "#8AAED6" : "red",
      },
    }),
  };

  const noOptionsMessage = () => null; // Return null to prevent the message from showing

  const getOptions = () => {
    if (field.parent) {
      if (!formik?.values?.[field.parent]) {
        return [];
      } else {
        return [...(apiData ?? [])];
      }
    } else {
      return [...(apiData ?? [])];
    }
  };

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
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default SingleSelectAPIElement;
