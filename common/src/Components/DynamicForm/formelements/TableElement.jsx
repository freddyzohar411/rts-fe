import React, { useState, useEffect } from "react";

const TableElement = ({ formik, field, deleteTableData, setFormState, formFieldsHook }) => {
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

  useEffect(() => {
    setFormFieldTableData(table)
  }, [table]);

  useEffect(() => {
    setTableConfig(field.tableConfig);
    setTableSetting(field.tableSetting);
    // setFormFieldTableData(table);
  }, [field.tableConfig, field.tableSettings, field.tableRerender]);

  console.log("tableConfig", tableConfig);
  console.log("tableSettings", tableSetting);

  // API Services
  // Get
  const getTableData = () => {
    fetch(tableSetting.tableGetAPI).then((response) => {
      response.json().then((data) => {
        const formDataList = data.data;
        console.log("formDataList", formDataList);
        setTable(mapTableData(formDataList));
        // setFormFieldTableData(mapTableData(formDataList));
      });
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
  }

  console.log("TABBLE RENDER", field.tableRerender);

  // Get data on load
  useEffect(() => {
    if (tableSetting) {
      if (
        tableSetting.tableUseAPI === "true" ||
        tableSetting.tableUseAPI === true
      ) {
        getTableData();
      }
      // } else {
      //   setTable([...field.tableData]);
      // }
      setTableConfig([...field.tableConfig]);
    }
  }, [field, tableSetting]);

  console.log("table", table);
  console.log("config", tableConfig);

  const mapTableData = (dataList) => {
    const tableData = dataList.map((data) => {
      return {
        id: data.id,
        data: JSON.parse(data.submissionData),
      };
    });
    return tableData;
  };

  const handleEdit = (row) => {
    // Set formik values based on row value and config
    console.log("row", row);
    tableConfig.forEach((item, index) => {
      // console.log(index)
      // console.log("Item Name: ", item.name)
      // console.log("Item Value: ", row.data[item.name])
      formik.setFieldValue(item.name, row.data[item.name]);
    });
    setFormState("tableUpdate");
  };

  // Delete from formfields
  const handleDelete = (id) => {
    if (tableSetting.tableUseAPI === "true" || tableSetting.tableUseAPI === true) {
      // Delete from API
      console.log("Deleteing from table")
      console.log(`${tableSetting.tableDeleteAPI}/${id}`)
      fetch(`${tableSetting.tableDeleteAPI}/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          getTableData();
        });
    }

    // } else {
    //   deleteTableData(rowIndex);
    // }
  };

  return (
    <div>
      <table className="table">
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
        {table && table.length > 0 && (
          <tbody>
            {table.map((row, rowIndex) => {
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
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TableElement;
