import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AccountContactSelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const data = useSelector(
    (state) => state.AccountContactReducer.accountContacts
  );
  const [fetchData, setFetchData] = useState([]);
  console.log("ACCOUNT CONTACT", data);

  useEffect(() => {
    if (data) {
      setFetchData(data);
    }
  }, [data]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-select ${
            formik?.values?.[field.name] === "" ||
            formik?.values?.[field.name] === undefined
              ? "text-muted"
              : ""
          }`}
          value={formik?.values?.[field.name]}
          disabled={formState === "view" ? true : false}
        >
          <option value="">{field.placeholder}</option>
          {fetchData?.map((item, index) => (
            <option key={index} value={item?.fullName}>
              {item?.fullName}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AccountContactSelectElement;
