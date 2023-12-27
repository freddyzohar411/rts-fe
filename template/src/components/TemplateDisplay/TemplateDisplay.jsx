import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";

const TemplateDisplay = ({ content, mappedVariableData }) => {
  // Function to replace variables with actual values
  function replaceVariables(html, variableData) {
    return html?.replace(/\${(.*?)}/g, (match, variableName) => {
      const keys = variableName.split(".");
      let value = variableData;
      value = mappedVariableData?.[keys[0]]?.[keys[1]] || "-";
      return value;
    });
  }

  let parsedContent = replaceVariables(content, mappedVariableData);

  return <div>{ReactHtmlParser(parsedContent)}</div>;
};

export default TemplateDisplay;
