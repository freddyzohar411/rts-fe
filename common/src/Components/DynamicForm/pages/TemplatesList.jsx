import React from "react";
import { Link } from "react-router-dom";

const TemplatesList = () => {
  const templateList = [
    { name: "Template 1", json: "template1" },
    { name: "Template 2", json: "template2" },
    { name: "Template 3", json: "template3" },
    { name: "Template 4", json: "template4" },
    { name: "Template 5", json: "template5" },
    { name: "Template 6", json: "template6"},
    { name: "Account", json: "Account"},
    { name: "Contact", json: "Contact"},
    { name: "Demo1", json: "Demo 1"},
  ];
  return (
    <div className="container">
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Template Name</th>
            <th>Template JSON</th>
            <th>Template Edit</th>
            <th>Template View</th>
          </tr>
        </thead>
        <tbody>
          {templateList.map((template, index) => (
            <tr key={index}>
              <td>{template.name}</td>
              <td>{template.json}</td>
              <td>
                <Link to={`/form/${template.json}`}>Edit</Link>
              </td>
              <td>
                <Link to={`/form-display/${template.json}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemplatesList;
