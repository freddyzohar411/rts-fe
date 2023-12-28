import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { fetchAccountData } from "../../../../account/src/store/account/action";
import { fetchJobListsFields } from "../../../../job/src/store/jobList/action";
import { fetchCandidatesFields } from "../../../../candidate/src/store/candidate/action";

const TemplateDisplay = ({ content, mappedVariableData }) => {
  const [mappedVariableData2, setMappedVariableData2] = useState({});
  const [parsedContent, setParsedContent] = useState("");
  const dispatch = useDispatch();
  const accountData = useSelector((state) =>
    state.AccountReducer.accountData
  );

  useEffect(() => {
    if (accountData) {
      const obj = JSON.parse(JSON.stringify(mappedVariableData2));
      obj["Accounts"] = flattenObject(accountData);
      setMappedVariableData2(obj);
    }
  }, [accountData]);

  console.log("mappedVariableData2", mappedVariableData2);

  function flattenObject(obj) {
    let flattened = {};

    function recursiveFlatten(currentObj) {
      for (const key in currentObj) {
        if (currentObj.hasOwnProperty(key)) {
          if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
            // Recursively flatten nested objects
            recursiveFlatten(currentObj[key]);
          } else {
            flattened[key] = currentObj[key];
          }
        }
      }
    }

    recursiveFlatten(obj);
    return flattened;
  }

  useEffect(() => {
    dispatch(fetchAccountData(192));
  }, []);
  // Function to replace variables with actual values
  function replaceVariables(html, variableData) {
    return html?.replace(/\${(.*?)}/g, (match, variableName) => {
      const keys = variableName.split(".");
      let value = variableData;
      console.log("keys", keys);
      value = variableData?.[keys[0]]?.[keys[1]] || "-";
      return value;
    });
  }

  useEffect(() => {
    if (mappedVariableData2) {
      setParsedContent(replaceVariables(content, mappedVariableData2));
    }
  }, [mappedVariableData2, content]);

  return <div>{ReactHtmlParser(parsedContent)}</div>;
};

export default TemplateDisplay;
