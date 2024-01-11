import React, { useEffect, useState, useRef } from "react";
import ReactDOMServer from "react-dom/server";
import { Editor } from "@tinymce/tinymce-react";

import ReactHtmlParser from "react-html-parser";
import "./TinyCME.scss";

const TemplateDisplay = ({ content, allData, isView, getNewContent }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");
  const [fullHtmlString, setFullHtmlString] = useState("");
  const displayRef = useRef(null);
  const observer = useRef(null);

  useEffect(() => {
    if (displayRef.current) {
      observer.current = new MutationObserver((mutations) => {
        const htmlString = displayRef.current.innerHTML;
        setFullHtmlString(removeContentEditableAndStyles(htmlString));
        getNewContent(removeContentEditableAndStyles(htmlString));
      });

      observer.current.observe(displayRef.current, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [displayRef.current, parsedContent]);

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

  // Remove contenteditable attribute and style attribute from HTML string
  function removeContentEditableAndStyles(htmlString) {
    // Identify elements with contenteditable attribute
    const contentEditableRegex = /<([a-z][a-z0-9]*)([^>]*contenteditable="[^"]*"[^>]*)>/gi;
    let match;
    if (!htmlString) return;
    while ((match = contentEditableRegex.exec(htmlString)) !== null) {
      // For each matched element, remove the style attribute
      const styleRegex = new RegExp(` style="[^"]*"`, 'g');
      const elementWithoutStyle = match[0].replace(styleRegex, '');
      // Replace the original element with the element without style in the HTML string
      const elementRegex = new RegExp(match[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      htmlString = htmlString.replace(elementRegex, elementWithoutStyle);
    }
  
    // Remove contenteditable attribute
    const withoutContentEditable = htmlString.replace(
      / contenteditable="true"| contenteditable="false"/g,
      ''
    );
  
    return withoutContentEditable;
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
    // getNewContent(removeContentEditableAndStyles(content));
  }, [mappedVariableData, content]);

  return (
    <div>
      {isView ? (
        <div className="tinyCME">
          <div ref={displayRef}> {ReactHtmlParser(parsedContent)}</div>
        </div>
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
            // if (getNewContent) {
            //   const cleanHTML = removeContentEditableAndStyles(value);
            //   getNewContent(removeContentEditableAndStyles(value));
            // }
          }}
        />
      )}
    </div>
  );
};

export default TemplateDisplay;
