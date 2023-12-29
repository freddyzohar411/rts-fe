import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { fetchAccountData } from "../../../../account/src/store/account/action";
import { fetchJobListsFields } from "../../../../job/src/store/jobList/action";
import { fetchCandidatesFields } from "../../../../candidate/src/store/candidate/action";
import "./TemplateDisplay.scss";

const TemplateDisplay = ({ content, allData, isView }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || {});
  const [parsedContent, setParsedContent] = useState("");
  //   const [isView, setIsView] = useState(true);
  const dispatch = useDispatch();
  const accountData = useSelector((state) => state.AccountReducer.accountData);

  useEffect(() => {
    if (allData) {
      setMappedVariableData(allData);
    }
  }, [allData, content]);

  console.log("mappedVariableData FF", mappedVariableData);
  console.log("Content FF", content);

  //   useEffect(() => {
  //     if (accountData) {
  //       const obj = JSON.parse(JSON.stringify(mappedVariableData2));
  //       obj["Accounts"] = flattenObject(accountData);
  //       setMappedVariableData2(obj);
  //     }
  //   }, [accountData]);

  //   console.log("mappedVariableData2", mappedVariableData2);

  //   function flattenObject(obj) {
  //     let flattened = {};

  //     function recursiveFlatten(currentObj) {
  //       for (const key in currentObj) {
  //         if (currentObj.hasOwnProperty(key)) {
  //           if (typeof currentObj[key] === "object" && currentObj[key] !== null) {
  //             // Recursively flatten nested objects
  //             recursiveFlatten(currentObj[key]);
  //           } else {
  //             flattened[key] = currentObj[key];
  //           }
  //         }
  //       }
  //     }

  //     recursiveFlatten(obj);
  //     return flattened;
  //   }

  //   useEffect(() => {
  //     dispatch(fetchAccountData(1001));
  //   }, []);
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
    if (mappedVariableData) {
      setParsedContent(replaceVariables(content, mappedVariableData));
    }
  }, [mappedVariableData, content]);

  return (
    <div>
      {isView ? (
        <div style={{ margin: 0, padding: 0 }}>
          {ReactHtmlParser(parsedContent)}
        </div>
      ) : (
        <CKEditor
          id="editor"
          editor={ClassicEditor}
          config={{
            toolbar: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "bold",
              "italic",
              "link",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "blockQuote",
              "insertTable",
              "|",
              "indent",
              "outdent",
            ],
          }}
          data={parsedContent || ""}
          onReady={(editor) => {}}
          //   ref={editorRef}
          onChange={(event, editor) => {
            const data = editor?.getData();
            setParsedContent(data);
          }}
          onError={(error) => console.error("CKEditor Error:", error)}
          // disabled={formState === "view" ? true : false}
        />
      )}
    </div>
  );
};

export default TemplateDisplay;
