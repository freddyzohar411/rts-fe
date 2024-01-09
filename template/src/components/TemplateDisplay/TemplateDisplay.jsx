import React, { useEffect, useState } from "react";
import { Ckeditor as ClassicEditor } from "@workspace/common";
import { Editor } from "@tinymce/tinymce-react";

import ReactHtmlParser from "react-html-parser";
import "./TinyCME.scss";


const TemplateDisplay = ({ content, allData, isView, getNewContent }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content|| "");

  useEffect(() => {
    if (content) {
      setParsedContent(content);
    }
  },[content])

  useEffect(() => {
    if (allData) {
      setMappedVariableData(allData);
    }
  }, [allData, content]);

  function replaceVariables(html, variableData) {
    return html?.replace(/\${(.*?)}/g, (match, variableName) => {
      const keys = variableName.split(".");
      let value = variableData;
      value = variableData?.[keys[0]]?.[keys[1]] || "-";
      return value;
    });
  }

  useEffect(() => {
    if (mappedVariableData) {
      setParsedContent(replaceVariables(content, mappedVariableData));
      if (getNewContent)
        getNewContent(replaceVariables(content, mappedVariableData));
    }
  }, [mappedVariableData, content]);

  return (
    <div>
      {isView ? (
        <div className="tinyCME">{ReactHtmlParser(parsedContent)}</div>
      ) : (
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          value={parsedContent}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
              "table",
              "emoticons",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsizeinput | " +
              "bold italic underline forecolor backcolor | align lineheight |" +
              "bullist numlist outdent indent | hr |" +
              "removeformat | searchreplace |" +
              "table | code | emoticons charmap | fullscreen | preview | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(value) => {
            setParsedContent(value);
            if (getNewContent) getNewContent(value);
          }}
        />
      )}
    </div>
  );
};

export default TemplateDisplay;
