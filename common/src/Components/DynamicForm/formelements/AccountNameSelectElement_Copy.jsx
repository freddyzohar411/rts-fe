import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccountContacts,
  fetchAccountNames,
} from "../../../store/actions";

const AccountNameSelectElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const accountNamesData = useSelector(
    (state) => state.AccountNamesReducer.accountNames
  );
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchAccountNames());
  }, []);

  useEffect(() => {
    if (accountNamesData) {
      setFetchData(accountNamesData);
    }
  }, [accountNamesData]);

  // Handle Account Change, get account contact details
  const handleAccountChange = (e) => {
    if (e.target.value) {
      formik.handleChange(e);
      dispatch(fetchAccountContacts(parseInt(e.target.value)));
    }
  };

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={handleAccountChange}
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
            <option key={index} value={item?.id}>
              {item?.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AccountNameSelectElement;