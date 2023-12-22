import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGroup } from "../../../store/usergroup/action";

const UserGroupSelectField = ({ setData, field }) => {
  const dispatch = useDispatch();
  const userGroupData = useSelector(
    (state) => state.UserGroupReducer.userGroups
  );

  const [fetchData, setFetchData] = useState([]);

  useEffect(() => {
    dispatch(fetchUserGroup());
  }, []);

  useEffect(() => {
    if (userGroupData) {
      setFetchData(
        userGroupData.map((item) => ({ id: item.id, name: item.userGroupName }))
      );
    }
  }, [userGroupData]);

  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={(e) => {
            setData(e.target.value);
          }}
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

export default UserGroupSelectField;
