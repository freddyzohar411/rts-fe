import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubIndustry } from "../../../store/industry/action";

const SubIndustrySelectElement = ({ formik, field, formStateHook }) => {
  const dispatch = useDispatch();
  const { formState } = formStateHook;
  const [subIndustry, setSubIndustry] = useState([]);
  const industryParentData = useSelector(
    (state) => state.IndustryReducer.industry
  );
  const subIndustryData = useSelector(
    (state) => state.IndustryReducer.subIndustry
  );

  function getIdFromParentIndustries(parentName) {
    if (!industryParentData) return undefined;
    const industry = industryParentData.find(
      (item) => item.name === parentName
    );
    if (!industry) return undefined;
    return parseInt(industry.id);
  }

  useEffect(() => {
    if (formik?.values?.[field.parent]) {
      setSubIndustry([]);
      dispatch(
        fetchSubIndustry(
          getIdFromParentIndustries(formik?.values?.[field.parent])
        )
      );
    }
  }, [formik?.values?.[field.parent]]);

  useEffect(() => {
    setSubIndustry(subIndustryData || []);
  }, [subIndustryData]);

  return (
    <div>
      {subIndustry && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          value={formik?.values?.[field.name]}
          onBlur={formik.handleBlur}
          className={`form-select ${
            formik?.values?.[field.name] === "" ||
            formik?.values?.[field.name] === undefined
              ? "text-muted"
              : ""
          }`}
          disabled={formState === "view" ? true : false}
        >
          <option value="">{field.placeholder}</option>
          {subIndustry.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default SubIndustrySelectElement;
