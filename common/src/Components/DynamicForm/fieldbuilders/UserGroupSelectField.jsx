import React, { useState, useEffect} from "react";

const UserGroupSelectField = ({ setData, field }) => {
  // const [fetchData, setFetchData] = useState([]);
  // useEffect(() => {
  //   // Fetch data from API
  //   fetch("http://localhost:8600/geo/country-currency").then((res) => {
  //     res.json().then((data) => {
  //       setFetchData(data.data);
  //     });
  //   });
  // }, []);

  const fetchData = [
    {
      id:1,
      name:"Sales"
    },
    {
      id:2,
      name:"Recruiters"
    },
    {
      id:3,
      name:"Account Manager"
    },
  ]
  
  return (
    <div>
      {fetchData && (
        <select
          name={field.name}
          onChange={(e) => {
            setData(e.target.value)
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
