import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import axios from "axios";

const SearchSelect = ({ formik, field, ...props }) => {
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search === "") {
      setOptions([]);
    } else {
      const dynamicQuery = search === "" ? `` : `?query=name=${search}`;
      // Convert to URI encoded string
      const encodedQuery = setLoading(true);
      axios
        .get(`http://localhost:8100/api/accounts/search${dynamicQuery}`)
        .then((res) => {
          setLoading(false);
          setOptions(mapToOptionFormat(res.data));
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [search]);

  const mapToOptionFormat = (data) => {
    return data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
  };

  const handleInputChange = (inputValue) => {
    setSearch(inputValue);
  };

  const sortbyname = [
    { label: "Alabama", value: "AL" },
    { label: "Madrid", value: "MA" },
    { label: "Toronto", value: "TO" },
    { label: "London", value: "LO" },
    { label: "Wyoming", value: "WY" },
  ];

  const isValid = !props?.error;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused ? "#ddd" : isValid ? "#ddd" : "red",
      // overwrittes hover style
      "&:hover": {
        borderColor: state.isFocused ? "#ddd" : isValid ? "#ddd" : "red",
      },
    }),
  };

  const noOptionsMessage = () => null; // Return null to prevent the message from showing

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}

      <Select
        styles={customStyles}
        onInputChange={handleInputChange}
        inputValue={search}
        isClearable
        isSearchable
        placeholder="Search..."
        options={options}
        noOptionsMessage={noOptionsMessage}
      />

      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );
};

export default SearchSelect;
