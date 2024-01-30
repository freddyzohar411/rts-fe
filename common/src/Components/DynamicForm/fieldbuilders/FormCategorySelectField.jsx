import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFormCategories } from "../../../store/form/action";

const FormCategorySelectField = ({ setData, field, value }) => {
  const dispatch = useDispatch();
  const formCategoriesData = useSelector(
    (state) => state.FormCommonReducer?.formCategories
  );

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchFormCategories());
  }, []);

  useEffect(() => {
    if (formCategoriesData) {
      const formCategoriesCleaned = formCategoriesData.filter(
        (item) => item !== ""
      );
      setFetchData(
        formCategoriesCleaned.map((item, i) => ({ id: i, name: item }))
      );
    }
  }, [formCategoriesData]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={(e) => {
            setData(e.target.value);
          }}
          value={value}
          className="form-select"
        >
          <option value="">{field.placeholder}</option>
          {fetchData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FormCategorySelectField;
