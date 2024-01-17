import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useMutationObserver from "./useMutationObserverHook";
import ReactHtmlParser from "react-html-parser";
import * as TemplateDisplayHelper from "./templateDisplayHelper";
// import { runEffects } from "./templateDisplayHelper";
import { ExportHelper } from "@workspace/common";
import { generateOptions } from "./pdfOption";

import "./TinyCME.scss";

const TemplateDisplayV3 = ({
  content,
  allData,
  isView,
  handleOutputContent,
  processContent = true,
  cleanContent = true,
  recursive = false,
  minHeight,
  height = "100%",
  autoResize = false,
  onChange,
  value,
  initialValues,
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
    if (content === null || content === "") {
      setParsedContent("");
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
    const applyEffects = async () => {
      if (!content) return;
      try {
        const result = await TemplateDisplayHelper.runEffects(
          content,
          null,
          mappedVariableData,
          recursive
        );
        setParsedContent(result);
      } catch (error) {
        console.error("Error applying effects:", error);
      }
    };

    applyEffects();
  }, [mappedVariableData, content]);

  /**
   * Set Get new content everytime parsedContent changes
   */
  useEffect(() => {
    setNewContent(parsedContent);
  }, [parsedContent]);

  // Set New content to be outputted
  function setNewContent(content) {
    if (handleOutputContent) {
      if (cleanContent) {
        handleOutputContent(
          TemplateDisplayHelper.removeContentEditableAndStyles(content)
        );
      } else {
        handleOutputContent(parsedContent);
      }
    }
  }

  // Set Plugin
  let plugins = [
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
  ];

  if (autoResize) {
    plugins = [...plugins, "autoresize"];
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
          initialValue={initialValues && parsedContent}
          value={value}
          init={{
            setup: (editor) => {
              // Register Icons
              editor.ui.registry.addIcon(
                "addEditIcon",
                '<i style="font-size:1.2rem": class="ri-edit-box-line"></i>'
              );
              editor.ui.registry.addIcon(
                "removeEditIcon",
                '<i style="font-size:1.2rem": class="ri-edit-box-fill"></i>'
              );

              editor.ui.registry.addIcon(
                "exportDocxIcon",
                '<i style="font-size:1.2rem": class="ri-file-word-line"></i>'
              );

              editor.ui.registry.addIcon(
                "exportPDFIcon",
                '<i style="font-size:1.2rem": class="bx bxs-file-pdf"></i>'
              );

              editor.ui.registry.addButton("exportPDFButton", {
                icon: "exportPDFIcon", // Use the custom icon
                tooltip: "Export to PDF",
                onAction: function () {
                  const content = editor.getContent();
                  ExportHelper.generatePDFCustom(
                    content,
                    generateOptions({
                      filename: "test.pdf",
                    })
                  );
                },
              });

              editor.ui.registry.addButton("exportDocxButton", {
                icon: "exportDocxIcon", // Use the custom icon
                tooltip: "Export to Docx",
                onAction: function () {
                  const content = editor.getContent();
                  ExportHelper.generateDocxCustom(content, {
                    filename: "test.docx",
                  });
                },
              });

              // Add a button for enabling
              editor.ui.registry.addButton("myEnableButton", {
                icon: "addEditIcon", // Use the custom icon
                tooltip: "Make Editable",
                onAction: function () {
                  var selectedText = editor.selection.getContent();
                  var range = editor.selection.getRng();

                  // If currently non-editable, wrap the selected text with a span and apply a class
                  editor.selection.setContent(
                    `<span style="border: 1px solid #2196F3; background-color: #E3F2FD;" contenteditable="true">${selectedText}</span>`
                  );

                  // Move the cursor to the end of the inserted content
                  range.setStartAfter(range.endContainer);
                  range.collapse(true);
                  editor.selection.setRng(range);
                },
              });

              // Add a button for disabling
              editor.ui.registry.addButton("myDisableButton", {
                // text: "Disable",
                icon: "removeEditIcon",
                tooltip: "Make Non-Editable",
                onAction: function () {
                  var selectedText = editor.selection.getContent();
                  var range = editor.selection.getRng();

                  const span = editor.selection.getNode();
                  if (span && span.tagName === "SPAN") {
                    const selectedRange = editor.selection.getRng();
                    const selectedText =
                      selectedRange.cloneContents().textContent;

                    // Create a new span for the selected text
                    const nonEditableSpan = document.createElement("span");
                    nonEditableSpan.textContent = selectedText;
                    nonEditableSpan.style =
                      "border: none; background-color: initial;"; // Override the parent style

                    // Split the span into three parts: before, selected, and after
                    const before = span.textContent.substring(
                      0,
                      selectedRange.startOffset
                    );
                    const after = span.textContent.substring(
                      selectedRange.endOffset
                    );

                    // Create a new span for the third section (the text after the selection)
                    const afterSpan = document.createElement("span");
                    afterSpan.textContent = after;
                    afterSpan.style = span.style.cssText; // Match the style of the first section
                    afterSpan.contentEditable = "true"; // Set contenteditable to true

                    // Replace the original span with the three new parts
                    span.textContent = before;
                    span.after(nonEditableSpan);
                    nonEditableSpan.after(afterSpan);

                    // Move the cursor to the end of the inserted content
                    range.setStartAfter(nonEditableSpan);
                    range.collapse(true);
                    editor.selection.setRng(range);
                  }
                },
              });
            },
            height: height, // Set the initial height to 100% of the parent container
            min_height: minHeight,
            botton_margin: 10,
            menubar: false,
            plugins: plugins,
            toolbar:
              "undo redo | myEnableButton myDisableButton myEditableButton |  blocks fontfamily fontsizeinput | " +
              "bold italic underline forecolor backcolor | align lineheight |" +
              "bullist numlist outdent indent | hr |" +
              "removeformat | searchreplace |" +
              "table | code codesample | emoticons charmap | fullscreen | preview | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
          onEditorChange={(value) => {
            // setParsedContent(value);
            setNewContent(value);
            if (onChange) {
              onChange(value);
            }
          }}
        />
      )}
    </>
  );
};

export default TemplateDisplayV3;
