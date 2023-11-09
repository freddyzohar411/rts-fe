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
  formStateHook,
}) => {
  const { formState } = formStateHook;
  const { formFields, setFormFields } = formFieldsHook;
  const [tableConfig, setTableConfig] = useState(
    field?.tableConfig ? field.tableConfig : []
  );
  const [tableSetting, setTableSetting] = useState(
    field?.tableSettings ? field.tableSettings : {}
  );
  const [table, setTable] = useState(field.tableData || []);

  useEffect(() => {
    setFormFieldTableData(table);
  }, [table]);

  useEffect(() => {
    setTableConfig(field.tableConfig);
    setTableSetting(field.tableSetting);
  }, [
    field.tableConfig,
    field.tableSettings,
    field.tableSetting.tableRerender,
  ]);

  // API Services
  // Get
  const getTableData = () => {
    if (tableSetting.tableGetAPI) {
      axios
        .get(tableSetting.tableGetAPI)
        .then((data) => {
          const formDataList = data.data;
          setTable(mapTableData(formDataList));
        })
        .catch((error) => {});
    }
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

  // Get data on load
  useEffect(() => {
    if (tableSetting) {
      if (
        tableSetting.tableUseAPI === "true" ||
        tableSetting.tableUseAPI === true
      ) {
        getTableData();
      }
      setTableConfig([...field.tableConfig]);
    }
  }, [
    field,
    tableSetting.tableGetAPI,
    tableSetting.tableDeleteAPI,
    field.tableSetting.tableRerender,
  ]);

  const mapTableData = (dataList) => {
    const tableData = dataList?.map((data) => {
      return {
        id: data.id,
        data: JSON.parse(data.submissionData),
      };
    });
    return tableData;
  };

  const handleEdit = (row) => {
    // Set formik values based on row value and config
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
      axios.delete(`${tableSetting.tableDeleteAPI}/${id}`).then((data) => {
        getTableData();
      });
    }
  };

  return (
    <div className="table-responsive mb-3" style={{ maxHeight: "200px" }}>
      <Table className="table-bordered align-middle table-nowrap mb-0">
        <thead className="table-secondary">
          <tr>
            {tableConfig &&
              tableConfig.map((item, index) => (
                <th key={index}>{item.label}</th>
              ))}
            {tableSetting.tableEdit === "true" ||
              (tableSetting.tableEdit === true && formState !== "view" && (
                <th>Edit</th>
              ))}
            {tableSetting.tableDelete === "true" ||
              (tableSetting.tableDelete === true && formState !== "view" && (
                <th>Delete</th>
              ))}
          </tr>
        </thead>
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
                    (tableSetting.tableEdit === true &&
                      formState !== "view" && (
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
                    (tableSetting.tableDelete === true &&
                      formState !== "view" && (
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
      </Table>
    </div>
  );
};

export default TableElement;
