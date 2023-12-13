import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAccountContacts,
  fetchAccountNamesAll
} from "../../../store/actions";

const AccountNameSelectElementAll = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const accountNamesData = useSelector(
    (state) => state.AccountNamesReducer.accountNames
  );
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchAccountNamesAll());
  }, []);

  useEffect(() => {
    if (accountNamesData) {
      setFetchData(accountNamesData);
    }
  }, [accountNamesData]);

  const namesToid = (name) => {
    const account = accountNamesData.find((account) => account.name === name);
    return account?.id;
  };

  useEffect(() => {
    if (formik?.values?.[field.name]) {
      dispatch(
        fetchAccountContacts(parseInt(namesToid(formik?.values?.[field.name])))
      );
    }
  }, [formik?.values?.[field.name], accountNamesData]);

  // Handle Account Change, get account contact details
  const handleAccountChange = (e) => {
    if (e.target.value) {
      formik.handleChange(e);
      dispatch(fetchAccountContacts(parseInt(namesToid(e.target.value))));
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
            <option key={index} value={item?.name}>
              {item?.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AccountNameSelectElementAll;
