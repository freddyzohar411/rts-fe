import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import Select from "react-select";

const TemplateSelectByCategoryElement = ({
  categoryName = null,
  subCategoryName = null,
  defaultFirstValue, // Default first value of the option
  width = "auto",
  end, // Justify content end
  value, // Use this to set a value
  fetchSingleTemplate,
  ...props
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(value ?? null);
  const [storeTemplatesByCategory, setStoreTemplatesByCategory] = useState([]); // Store templates by category
  const templatesByCategory = useSelector(
    (state) => state.TemplateReducer.templatesByCategory
  );

  useEffect(() => {
    if (value == null) {
      setTemplateSelected("");
    }
    if (value) {
      setTemplateSelected({
        value: value.id,
        label: value.name,
        id: value?.id,
        data: value?.data,
      });
      props.onChange(value);
    }
  }, [value, categoryName, templatesByCategory]);

  useEffect(() => {
    if (categoryName == null || categoryName == "") {
      setTemplateList([]);
      setTemplateSelected("");
    }
    if (categoryName && subCategoryName) {
      setTemplateSelected("");
      dispatch(
        TemplateActions.fetchTemplateByCategoryAndSubCategory(
          categoryName,
          subCategoryName
        )
      );
      return;
    }
    if (categoryName) {
      setTemplateSelected("");
      if (fetchSingleTemplate?.template) {
        dispatch(
          TemplateActions.fetchSingleTemplateByCategory({
            category: "Email Templates",
            template: "Associate",
          })
        );
      } else {
        dispatch(TemplateActions.fetchTemplateByCategory(categoryName));
      }
      return;
    }
  }, [categoryName]);

  useEffect(() => {
    if (templatesByCategory) {
      const checkCategory = templatesByCategory.every(
        (template) => template.category === categoryName
      );
      if (!checkCategory) {
        return;
      }
      setTemplateList(
        templatesByCategory.map((item) => {
          if (item.category !== categoryName) return null;
          return {
            value: item.id,
            label: item.name,
          };
        })
      );
      setStoreTemplatesByCategory(templatesByCategory);
      if (defaultFirstValue && templatesByCategory.length > 0) {
        setTemplateSelected({
          value: templatesByCategory[0].id,
          label: templatesByCategory[0].name,
        });
        props.onChange(templatesByCategory[0]);
      }
    }
  }, [templatesByCategory]);

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
      // height: '30px', // Example height, adjust this value as needed
      // minHeight: '30px', // Ensures the minimum height is respected
      // padding: '0px 0px', // Reduces padding, adjust as necessary
      // margin: "0px",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "black !important" : provided.color,
      // margin: "0px",
    }),
    // valueContainer: (provided, state) => ({
    //   ...provided,
    //   padding: "0px 10px",
    //   margin: "10px",
    // }),
    // input: (provided, state) => ({
    //   ...provided,
    //   padding: "0px 10px",
    //   margin: "0px",
    // }),
  };

  const handleChange = (selectedOptions) => {
    setTemplateSelected(selectedOptions);
    if (props?.onChange && storeTemplatesByCategory && selectedOptions?.value) {
      const filteredTemplate = storeTemplatesByCategory.filter(
        (template) => template.id === selectedOptions?.value
      )[0];

      props.onChange(filteredTemplate ?? null);
    } else {
      // If no template is selected
      props.onChange(null);
    }
  };

  return (
    <div className={` d-flex ${end ? "justify-content-end" : ""}`}>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Select
        value={templateSelected}
        styles={customStyles}
        onChange={handleChange}
        onInputChange={(inputValue) => {
          setSearch(inputValue);
        }}
        inputValue={search}
        menuShouldScrollIntoView={false}
        isClearable
        isSearchable
        placeholder={props.placeholder ?? "Select an option"}
        options={templateList}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default TemplateSelectByCategoryElement;
