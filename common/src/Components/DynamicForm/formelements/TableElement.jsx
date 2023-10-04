import React, { useState, useEffect } from "react";

const TableElement = ({ formik, field, deleteTableData, setFormState }) => {
  console.log("TableElement", field);
  const [config, setConfig] = useState(
    field?.tableConfig ? field.tableConfig : []
  );
  const [table, setTable] = useState(field.tableData);

  // API Services
  // Get
  const getTableData = () => {
    fetch(field.tableAPIURL).then((response) => {
      response.json().then((data) => {
        // console.log("data", data);
        setTable(data);
      });
    });
  };

  console.log("TABBLE RENDER", field.tableRerender)

  // Get data on load
  useEffect(() => {
    console.log("Table rerender", field.tableRerender);
    if (field.tableAPI === "true") {
      // Get and set data if API is required
      getTableData();
    } else {
      setTable([...field.tableData]);
    }
    setConfig([...field.tableConfig]);
  }, [field]);

  console.log("table", table);
  console.log("config", config);

  const handleEdit = (row) => {
    // Set formik values based on row value and config
    console.log("row", row);
    config.forEach((item) => {
      formik.setFieldValue(item.name, row[item.name]);
    });
    setFormState("update");
  };

  // Delete from formfields
  const handleDelete = (row, rowIndex) => {
    if (field.tableAPI === "true") {
      console.log("Deleting", row);
      // Delete from API
      fetch(`${field.tableAPIURL}/${row.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          getTableData();
        });
    } else {
      deleteTableData(rowIndex);
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="table-secondary">
          <tr>
            {config.map((item, index) => (
              <th key={index}>{item.label}</th>
            ))}
            {field.tableEdit === "true" && <th>Edit</th>}
            {field.tableDelete === "true" && <th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {table.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {config.map((item, index) => (
                  <td key={index}>{row[item.name]}</td>
                ))}
                {field.tableEdit === "true" && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleEdit(row)}
                    >
                      Edit
                    </button>
                  </td>
                )}
                {field.tableDelete === "true" && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(row, rowIndex)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableElement;
