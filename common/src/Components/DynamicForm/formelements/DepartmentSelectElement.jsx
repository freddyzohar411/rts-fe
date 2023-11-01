import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDepartment } from "../../../store/actions";

const DepartmentSelectElement = ({ field, formik, formStateHook }) => {
  const { formState } = formStateHook;
  const departmentData = useSelector(
    (state) => state.DepartmentReducer.department
  );
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, []);

  useEffect(() => {
    if (departmentData) {
      setFetchData(departmentData);
    }
  }, [departmentData]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-select"
          value={formik?.values?.[field.name]}
          disabled={formState === "view" ? true : false}
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

export default DepartmentSelectElement;
