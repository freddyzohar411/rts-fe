import React, { useEffect, useState } from "react";
import { Label, FormFeedback } from "reactstrap";
import Select from "react-select";
import { Lists } from "./listOptions";
import axios from "axios";

const MultiSelectElement = ({ formik, field, formStateHook, ...props }) => {
  //   console.log("Lists: ", Lists[field.list]);
  //   console.log("field: ", field.list);
  const getInitialOptions = (field) => {
    if (!field) return [];
    if (field.list) {
      return Lists[field.list];
    } else {
      return [];
    }
  };
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState(getInitialOptions(field));
  const [selectedOptions, setSelectedOptions] = useState([]);

  function getExistingDataOptions(uData) {
    console.log("Udata: ", uData);
    if (!uData) return [];

    const existingData = uData.split(",");
    if (existingData.length === 0) return [];
    return existingData.map((itemLabel) => {
      return options?.find((option) => option.label === itemLabel);
    });
  }

  // useEffect(() => {
  //   const updateData =
  //     "London,Toronto,Paris,Berlin,Sydney,Rio de Janeiro,Dubai,Cairo,Wyoming,Tokyo,New York,Mumbai,Seoul,Barcelona,Amsterdam,Singapore,Rome,San Francisco,Madrid,Istanbul,Montreal,Buenos Aires,Alabama,Cape Town,Helsinki";
  //   formik.setFieldValue(field.name, updateData);
  // }, []);

  //   console.log("selectedOptions: ", selectedOptions);
  //   console.log("Field List Type: ", field.list);

  //   useEffect(() => {
  //     if (search === "") {
  //       setOptions([]);
  //     } else {
  //       const dynamicQuery = search === "" ? `` : `?query=name=${search}`;
  //       // Convert to URI encoded string
  //       const encodedQuery = setLoading(true);
  //       axios
  //         .get(`http://localhost:8100/accounts/search${dynamicQuery}`)
  //         .then((res) => {
  //           setLoading(false);
  //           setOptions(mapToOptionFormat(res.data));
  //         })
  //         .catch((err) => {
  //           setLoading(false);
  //         });
  //     }
  //   }, [search]);

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

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
    const labelsArray = selectedOptions.map((option) => option.label);
    // console.log("labelsArray: ", labelsArray.join(","));
    // setSelectedFormikOptions(labelsArray.join(","));
    formik.setFieldValue(field.name, labelsArray.join(","));
  };

  // console.log("formik?.values[field.name]: ", formik?.values[field.name]);
  useEffect(() => {
    // console.log("formik?.values[field.name]:OUT ", formik?.values[field.name]);
    if (
      formik?.values?.[field?.name] 
    ) {
      // console.log("formik?.values[field.name]: IN ", formik?.values[field.name]);
      const updateData = formik?.values[field.name];
      //   console.log("updateData: ", getExistingDataOptions(updateData));
      setSelectedOptions(getExistingDataOptions(updateData));
      // console.log("formik?.values[field.name]:IN ", formik?.values[field.name]);
    }
  }, [formik?.values?.[field?.name]]);

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
    // valueContainer: (provided) => ({
    //   ...provided,
    //   maxHeight: "60px", // Adjust maxHeight as needed
    //   overflow: "auto",
    //   display: "flex",
    //   flexWrap: "wrap",
    //   scrollBehavior: "smooth", // Add this line for smoother scrolling
    // }),
  };

  const noOptionsMessage = () => null; // Return null to prevent the message from showing

  //   const customValueContainerStyles = {
  //     customValueContainer: {
  //       display: "flex",
  //       flexWrap: "wrap",
  //       alignItems: "center",
  //       //   paddingRight: "8px", // Adjust padding as needed
  //       color: "#333", // Text color
  //       //   borderRadius: '4px',
  //       //   border: '1px solid #ccc', // Border color
  //       backgroundColor: "#fff", // Background color
  //       width: "85%",
  //       maxHeight: "50px", // Adjust height as needed
  //       overflow: "auto",
  //       paddingLeft: "8px",
  //     },
  //   };

  return (
    <div>
      {props?.label && (
        <Label className="form-label" htmlFor={props?.htmlFor ?? "input-field"}>
          {props?.label}
        </Label>
      )}
      <Select
        isMulti
        styles={customStyles}
        value={selectedOptions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        inputValue={search}
        menuShouldScrollIntoView={false}
        closeMenuOnSelect={false}
        isClearable
        isSearchable
        placeholder={field.placeholder ?? "Search..."}
        options={options}
        noOptionsMessage={noOptionsMessage}
        // components={{
        //   ValueContainer: CustomValueContainer,
        // }}
      />
      {props?.error && (
        <FormFeedback type="invalid">{props?.error}</FormFeedback>
      )}
    </div>
  );

  //   function CustomValueContainer({ children }) {
  //     return (
  //       <div
  //         // className={`custom-value-container ${isExpanded ? 'expanded' : ''}`}
  //         // onClick={toggleExpansion}
  //         onClick={() => setToggleExpansion(!toggleExpansion)}
  //         style={customValueContainerStyles.customValueContainer}
  //       >
  //         <div onClick={(event) => event.stopPropagation()}> {children}</div>
  //       </div>
  //     );
  //   }
};

export default MultiSelectElement;
