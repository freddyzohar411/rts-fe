import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import Select from "react-select";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

const TemplateSelectByCategoryElement = ({
  categoryName = null,
  subCategoryName = null,
  defaultFirstValue, // Default first value of the option
  width = "auto",
  end, // Justify content end
  value, // Use this to set a value
  flexGrow = false,
  addMore = false,
  addMoreLabel = "Label",
  addMoreRender = null,
  ...props
}) => {
  const navigate = useNavigate();
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
      });
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
      dispatch(TemplateActions.fetchTemplateByCategory(categoryName));
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
      const templateMapped = templatesByCategory.map((item) => {
        if (item.category !== categoryName) return null;
        return {
          value: item.id,
          label: item.name,
        };
      });
      if (addMore) {
        templateMapped.push({
          value: "addMore",
          label: addMoreLabel,
        });
      }
      setTemplateList(
        // templatesByCategory.map((item) => {
        //   if (item.category !== categoryName) return null;
        //   return {
        //     value: item.id,
        //     label: item.name,
        //   };
        // })
        templateMapped
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

  const formatOptionLabel = ({ value, label }) => {
    if (value === "addMore") {
      return addMoreRender ? addMoreRender : "";
    }
    return label;
  };

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
          formatOptionLabel={formatOptionLabel}
        />
        {props?.error && (
          <FormFeedback type="invalid">{props?.error}</FormFeedback>
        )}
      </div>
    </>
  );
};

export default TemplateSelectByCategoryElement;
