import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TemplateAPIList = () => {
  const [templateList, setTemplateList] = useState([]);
  useEffect(() => {
    fetchTemplateList();
  }, []);

  const fetchTemplateList = () => {
    fetch("http://localhost:9400/forms")
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data.data);
        setTemplateList(data.data);
      });
  };

  /**
   * Handle form delete
   */
  const handleFormDelete = (formId) => {
    fetch(`http://localhost:9400/forms/${formId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        fetchTemplateList();
      });
  };

  return (
    <div className="container">
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Edit</th>
            <th>View</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {templateList.map((template, index) => (
            <tr key={index}>
              <td>{template.formName}</td>
              <td>
                <Link to={`/form-api/${template.formId}`}>Edit</Link>
              </td>
              <td>
                <Link to={`/form-display-api/${template.formId}`}>View</Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleFormDelete(template.formId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplateAPIList;
