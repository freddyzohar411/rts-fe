import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import ReactHtmlParser from "react-html-parser";
import "./TinyCME.scss";

const TemplateDisplay = ({ content, allData, isView, getNewContent }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");

  useEffect(() => {
    if (content) {
      setParsedContent(content);
    }
  }, [content]);

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

  function removeContentEditableAndStyles(htmlString) {
    // Remove contenteditable attribute
    const withoutContentEditable = htmlString?.replace(
      / contenteditable="true"| contenteditable="false"/g,
      ""
    );

    // const withoutContentEditable = htmlString;

    // Remove styles added when contenteditable is true
    const withoutStyles = withoutContentEditable?.replace(
      / style="border: 1px solid #2196F3; background-color: #e3f2fd;"/g,
      ""
    );

    return withoutStyles;
  }

  useEffect(() => {
    if (mappedVariableData) {
      setParsedContent(replaceVariables(content, mappedVariableData));
      getNewContent(
        removeContentEditableAndStyles(
          replaceVariables(content, mappedVariableData)
        )
      );
      return;
    }
    getNewContent(removeContentEditableAndStyles(content));
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
              "codesample",
            ],
            toolbar:
              "undo redo | blocks fontfamily fontsizeinput | " +
              "bold italic underline forecolor backcolor | align lineheight |" +
              "bullist numlist outdent indent | hr |" +
              "removeformat | searchreplace |" +
              "table | code codesample | emoticons charmap | fullscreen | preview | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(value) => {
            setParsedContent(value);
            if (getNewContent){
              const cleanHTML = removeContentEditableAndStyles(value);
              getNewContent(removeContentEditableAndStyles(value));
            }
          }}
        />
      )}
    </div>
  );
};

export default TemplateDisplay;
