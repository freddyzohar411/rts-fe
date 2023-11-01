import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fieldLocation, fieldSize } from "./constant";
// i want to import actions from account module
import { fetchParentCompany } from "../../../store/actions";

const AccountParentElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const dispatch = useDispatch();
  const [parentCompanyData, setParentCompanyData] = useState([]);

  const parentCompany = useSelector(
    (state) => state.ParentCompanyReducer.parentCompany
  );

  useEffect(() => {
    dispatch(fetchParentCompany());
  }, []);

  useEffect(() => {
    if (parentCompany) {
      setParentCompanyData(parentCompany);
    }
  }, [parentCompany]);

  console.log("parentCompany", parentCompanyData);
  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <select
        id={field.name}
        name={field.name}
        className={`form-select ${fieldSize[field.fieldSize]}`}
        onChange={formik.handleChange}
        value={formik?.values?.[field.name]}
        placeholder={field.placeholder}
        disabled={formState === "view" ? true : false}
      >
        <option value="">{field.placeholder}</option>
        {parentCompanyData?.map((option) => (
          <option value={option.name}>{option.name}</option>
        ))}
      </select>
    </div>
  );
};

export default AccountParentElement;
