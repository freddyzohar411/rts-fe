import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndustry, resetMetaData } from "../../../store/industry/action";
import { useNavigate } from "react-router-dom";
const IndustrySelectElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formState } = formStateHook;
  const [industry, setIndustry] = useState([]);
  const industryParentData = useSelector(
    (state) => state.IndustryReducer.industry
  );

  useEffect(() => {
    if (!industryParentData || industryParentData.length === 0) {
      dispatch(fetchIndustry());
    }
    return () => {
      dispatch(resetMetaData());
    }
  }, []);

  useEffect(() => {
    if (industryParentData) {
      setIndustry(industryParentData);
    }
  }, [industryParentData]);

  return (
    <div>
      {industry && (
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
          tabIndex={tabIndexData?.[field?.fieldId]}
        >
          <option value="">{field.placeholder}</option>
          {industry.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default IndustrySelectElement;
