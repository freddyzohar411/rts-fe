import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import useMutationObserver from "./useMutationObserverHook";
import ReactHtmlParser from "react-html-parser";
import * as TemplateDisplayHelper from "./templateDisplayHelper";

import "./TinyCME.scss";

const TemplateDisplayV2 = ({ content, allData, isView, getNewContent }) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");
  const [fullHtmlString, setFullHtmlString] = useState("");
  const [templateData, setTemplateData] = useState({});
  const displayRef = useRef(null);

  /**
   * Set the parsedContent when  content props changes
   */
  useEffect(() => {
    if (content) {
      setParsedContent(content);
    }
  }, [content]);

  /**
   * Set the mappedVariableData when allData props changes
   */
  useEffect(() => {
    if (allData) {
      setMappedVariableData(allData);
    }
  }, [allData, content]);

  /**
   * This is the custom hook that replaces the useEffect() that uses the MutationObserver
   * It tracks changes to the displayRef.current and calls the callback function so user
   * can get the new content
   */
  const observer = useMutationObserver(
    displayRef,
    () => {
      const htmlString = displayRef.current.innerHTML;
      setFullHtmlString(TemplateDisplayHelper.removeContentEditableAndStyles(htmlString));
      if (getNewContent)
        getNewContent(TemplateDisplayHelper.removeContentEditableAndStyles(htmlString));
    },
    { attributes: true, childList: true, subtree: true, characterData: true }
  );


  /**
   * Get all the template list to render from the HTML string and make a 
   * POST request to get the data
   */
  useEffect(() => {
    if (content) {
      const templateCriteriaList =
        TemplateDisplayHelper.getAllTemplatesToRenderFromHTML(content);
      if (templateCriteriaList.length > 0) {
        axios
          .post(
            "http://localhost:8181/api/template/categories-names",
            templateCriteriaList
          )
          .then((res) => {
            const { data } = res;
            const mappedData = {};
            data.forEach((item) => {
              mappedData[item.category] = {
                ...mappedData[item.category],
                [item.name]: item.content,
              };
            });
            setTemplateData(mappedData);
          });
      }
    }
  }, [content]);

  /**
   * Effects used for processing the content to replace the variables and templates
   */
  useEffect(() => {
    const runEffects = async () => {
      // Effect 1: Replace variables with mappedVariableData
      let updatedContent = content;
      if (mappedVariableData) {
        const replacedContent = TemplateDisplayHelper.replaceVariables(
          content,
          mappedVariableData
        );
        updatedContent = replacedContent;
        setParsedContent(updatedContent);
        getNewContent(updatedContent);
      }

      // Effect 2: Replace templateListCriteria without data
      if (templateData) {
        updatedContent = TemplateDisplayHelper.replaceTemplate(
          updatedContent,
          templateData,
          mappedVariableData
        );
        setParsedContent(updatedContent);
        getNewContent(updatedContent);
      }

      // Effect 3: Replace templateListCriteria with data
      if (templateData && mappedVariableData) {
        updatedContent = TemplateDisplayHelper.replaceTemplateArray(
          updatedContent,
          templateData,
          mappedVariableData
        );
        setParsedContent(updatedContent);
        getNewContent(updatedContent);
      }
    };

    runEffects();
  }, [mappedVariableData, content, templateData]);

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
          }}
        />
      )}
    </div>
  );
};

export default TemplateDisplayV2;
