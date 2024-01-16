import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useMutationObserver from "./useMutationObserverHook";
import ReactHtmlParser from "react-html-parser";
import * as TemplateDisplayHelper from "./templateDisplayHelper";

import "./TinyCME.scss";

const TemplateDisplayV3 = ({
  content,
  allData,
  isView,
  getNewContent,
  processContent = true,
  cleanContent = true,
  recursive = false,
}) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");
  const [fullHtmlString, setFullHtmlString] = useState("");
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
      setFullHtmlString(
        TemplateDisplayHelper.removeContentEditableAndStyles(htmlString)
      );
      setNewContent(htmlString);
    },
    { attributes: true, childList: true, subtree: true, characterData: true }
  );

  /**
   * Run effects to process the content and replace variables and templates
   */
  useEffect(() => {
    const runEffects = async (htmlString) => {
      if (!htmlString) {
        return;
      }
      const templateListCriteria =
        TemplateDisplayHelper.getAllTemplatesToRenderFromHTML(htmlString);

      // Effect 1: Replace variables with mappedVariableData
      let updatedContent = htmlString;
      if (mappedVariableData) {
        updatedContent = TemplateDisplayHelper.replaceVariables(
          htmlString,
          mappedVariableData
        );
      }

      if (templateListCriteria.length > 0) {
        // Effect 2: Replace templateListCriteria without data
        updatedContent = await TemplateDisplayHelper.replaceTemplate(
          updatedContent,
          mappedVariableData
        );

        // Effect 3: Replace templateListCriteria with data
        if (mappedVariableData) {
          updatedContent = await TemplateDisplayHelper.replaceTemplateArray(
            updatedContent,
            mappedVariableData
          );
        }
      }

      setParsedContent((prevContent) => {
        if (prevContent !== updatedContent) {
          return updatedContent;
        }
        return prevContent;
      });

      // Recursive call for nested templates (Remove this if it is too dangerous)
      if (recursive) {
        const nestedTemplates =
          TemplateDisplayHelper.getAllTemplatesToRenderFromHTML(updatedContent);
        if (nestedTemplates.length > 0) {
          runEffects(updatedContent);
        }
      }
    };

    if (content && processContent) {
      runEffects(content);
    }
  }, [mappedVariableData, content]);

  /**
   * Set Get new content everytime parsedContent changes
   */
  useEffect(() => {
    setNewContent(parsedContent);
  }, [parsedContent]);

  // Set New content to be outputted
  function setNewContent(content) {
    if (getNewContent) {
      if (cleanContent) {
        getNewContent(
          TemplateDisplayHelper.removeContentEditableAndStyles(content)
        );
      } else {
        getNewContent(parsedContent);
      }
    }
  }

  return (
    <>
      {isView ? (
        <div className="tinyCME">
          <div ref={displayRef}> {ReactHtmlParser(parsedContent)}</div>
        </div>
      ) : (
        <Editor
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
          value={parsedContent}
          init={{
            height: "100%", // Set the initial height to 100% of the parent container
            botton_margin: 10,
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
    </>
  );
};

export default TemplateDisplayV3;
