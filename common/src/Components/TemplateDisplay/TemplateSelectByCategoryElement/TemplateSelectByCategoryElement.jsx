import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TemplateActions from "../../../../../template/src/store/template/action";
import Select from "react-select";

const TemplateSelectByCategoryElement = ({
  categoryName = null,
  defaultFirstValue,
  width = "auto",
  end,
  value,
  ...props
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [templateList, setTemplateList] = useState([]);
  const [templateSelected, setTemplateSelected] = useState(value ?? null);
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
    if (categoryName) {
      setTemplateSelected("");
      dispatch(TemplateActions.fetchTemplateByCategory(categoryName));
    }
  }, [categoryName]);

  useEffect(() => {
    if (templatesByCategory) {
      setTemplateList(
        templatesByCategory.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
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
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.isDisabled ? "black !important" : provided.color,
    }),
  };

  const handleChange = (selectedOptions) => {
    setTemplateSelected(selectedOptions);
    if (props?.onChange && templatesByCategory && selectedOptions?.value) {
      const filteredTemplate = templatesByCategory.filter(
        (template) => template.id === selectedOptions?.value
      )[0];
      props.onChange(filteredTemplate ?? null);
    } else {
      console.log("no template selected");
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
