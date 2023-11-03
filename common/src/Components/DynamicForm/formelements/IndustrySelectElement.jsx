import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIndustry } from "../../../store/industry/action";

const IndustrySelectElement = ({ formik, field, formStateHook }) => {
  // const dispatch = useDispatch();
  // const industryData = useSelector((state) => state.IndustryReducer.industry);
  const { formState } = formStateHook;
  const [industry, setIndustry] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8200/industries/parent").then((res) => {
      res.json().then((data) => {
        setIndustry(data.data);
      });
    });
    console.log('FormState: ', formState)
    if (formState === "create") {
      formik.setFieldValue(field.name, "");
    }
    // dispatch(fetchIndustry());
  }, []);

  // useEffect(() => {
  //   if (industryData) {
  //     setIndustry(industryData);
  //   }
  // },[industryData])


  // console.log("Industry", industry)
  console.log("Industry Formik: ",formik?.values?.[field.name])
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
        >
          <option value="">{field.placeholder}</option>
          {industry.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default IndustrySelectElement;
