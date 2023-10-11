import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Label,
  Col,
  Row,
  Input,
  Button,
  Table,
  FormFeedback,
  Alert,
} from "reactstrap";

const TableElement = ({
  formik,
  field,
  deleteTableData,
  setFormState,
  formFieldsHook,
}) => {
  const { formFields, setFormFields } = formFieldsHook;
  console.log("TableElement", field);
  const [tableConfig, setTableConfig] = useState(
    field?.tableConfig ? field.tableConfig : []
  );
  const [tableSetting, setTableSetting] = useState(
    field?.tableSettings ? field.tableSettings : {}
  );
  const [table, setTable] = useState(field.tableData);

  console.log("table Field in Table Element", field);
  console.log("TABLE: ", table);

  useEffect(() => {
    setFormFieldTableData(table);
  }, [table]);

  useEffect(() => {
    setTableConfig(field.tableConfig);
    setTableSetting(field.tableSetting);
    // setFormFieldTableData(table);
  }, [
    field.tableConfig,
    field.tableSettings,
    field.tableSetting.tableRerender,
  ]);

  console.log("tableConfig", tableConfig);
  console.log("tableSettings", tableSetting);

  // API Services
  // Get
  const getTableData = () => {
    axios
      .get(tableSetting.tableGetAPI)
      .then((data) => {
        console.log("data", data);
        const formDataList = data.data;
        console.log("formDataList", formDataList);
        console.log("mapTableData", mapTableData(formDataList));
        console.log("FLOP", mapTableData(formDataList));
        setTable(mapTableData(formDataList));
        // setFormFieldTableData(mapTableData(formDataList));
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const setFormFieldTableData = (data) => {
    const newFormFields = [...formFields];
    newFormFields.forEach((formField) => {
      if (formField.name === field.name) {
        formField.tableData = data;
      }
    });
    setFormFields(newFormFields);
  };

  console.log("TABBLE RENDER", field.tableRerender);

  // Get data on load
  useEffect(() => {
    if (tableSetting) {
      if (
        tableSetting.tableUseAPI === "true" ||
        tableSetting.tableUseAPI === true
      ) {
        console.log("Fetch API URL: ", tableSetting.tableGetAPI);
        getTableData();
      }
      // } else {
      //   setTable([...field.tableData]);
      // }
      setTableConfig([...field.tableConfig]);
    }
  }, [
    field,
    tableSetting.tableGetAPI,
    tableSetting.tableDeleteAPI,
    field.tableSetting.tableRerender,
  ]);

  console.log("table", table);
  console.log("config", tableConfig);

  const mapTableData = (dataList) => {
    const tableData = dataList?.map((data) => {
      return {
        id: data.id,
        data: JSON.parse(data.submissionData),
      };
    });
    return tableData;
  };

  // const handleEdit = (row) => {
  //   // Set formik values based on row value and config
  //   console.log("row", row);
  //   tableConfig.forEach((item, index) => {
  //     // console.log(index)
  //     // console.log("Item Name: ", item.name)
  //     // console.log("Item Value: ", row.data[item.name])
  //     formik.setFieldValue(item.name, row.data[item.name]);
  //   });
  //   setFormState("tableUpdate");
  // };

  const handleEdit = (row) => {
    // Set formik values based on row value and config
    console.log("row", row);
    console.log("Check field", field.name);
    // Set all the formik values in this table based on the API
    for (const [key, value] of Object.entries(row.data)) {
      formik.setFieldValue(key, value);
    }
    // Set tabled edit id in form field
    // const newFormFields = [...formFields];
    const newFormFields = JSON.parse(JSON.stringify(formFields));
    newFormFields.forEach((formField) => {
      if (formField.name === field.name) {
        formField.tableSetting = {
          ...formField.tableSetting,
          tableEditId: row.id,
        };
      }
    });
    setFormFields(newFormFields);
    setFormState("tableUpdate");
  };

  // Delete from formfields
  const handleDelete = (id) => {
    if (
      tableSetting.tableUseAPI === "true" ||
      tableSetting.tableUseAPI === true
    ) {
      // Delete from API
      console.log("Deleteing from table");
      console.log(`${tableSetting.tableDeleteAPI}/${id}`);
      axios.delete(`${tableSetting.tableDeleteAPI}/${id}`).then((data) => {
        getTableData();
      });
    }

    // } else {
    //   deleteTableData(rowIndex);
    // }
  };

  return (
    // <div>
    //   <table className="table">
    <div className="table-responsive mb-3" style={{ maxHeight: "200px" }}>
      <Table className="table-bordered align-middle table-nowrap mb-0">
        <thead className="table-secondary">
          <tr>
            {tableConfig &&
              tableConfig.map((item, index) => (
                <th key={index}>{item.label}</th>
              ))}
            {tableSetting.tableEdit === "true" ||
              (tableSetting.tableEdit === true && <th>Edit</th>)}
            {tableSetting.tableDelete === "true" ||
              (tableSetting.tableDelete === true && <th>Delete</th>)}
          </tr>
        </thead>
        {/* {table && table.length > 0 && ( */}
        <tbody>
          {table?.length === 0 ? (
            <tr>
              <td colSpan="5">
                No documents added yet, please add one to view.
              </td>
            </tr>
          ) : (
            table?.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {tableConfig.map((item, index) => (
                    <td key={index}>{row.data[item.name]}</td>
                  ))}
                  {tableSetting.tableEdit === "true" ||
                    (tableSetting.tableEdit === true && (
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleEdit(row)}
                        >
                          Edit
                        </button>
                      </td>
                    ))}
                  {tableSetting.tableDelete === "true" ||
                    (tableSetting.tableDelete === true && (
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </td>
                    ))}
                </tr>
              );
            })
          )}
        </tbody>
        {/* )} */}
      </Table>
    </div>
    //   </table>
    // </div>
  );
};

export default TableElement;
