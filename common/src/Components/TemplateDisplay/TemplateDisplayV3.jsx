import React, { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import useMutationObserver from "./useMutationObserverHook";
import ReactHtmlParser from "react-html-parser";
import * as TemplateDisplayHelper from "./templateDisplayHelper";
import { ExportHelper } from "@workspace/common";
import { generateOptions } from "./pdfOption";
import { TemplateAdvanceExportModal } from "@workspace/common";
import "./TinyCME.scss";

const TemplateDisplayV3 = ({
  content,
  allData, // All data by TemplateModule Hook
  isView, // If true, display only
  handleOutputContent,
  processContent = true, // Insert variables and templates
  cleanContent = true, // Remove contenteditable and styles
  recursive = false,
  minHeight,
  height = "100%",
  autoResize = false,
  onChange,
  value, // Value - Used with formik
  initialValues,
}) => {
  const [mappedVariableData, setMappedVariableData] = useState(allData || null);
  const [parsedContent, setParsedContent] = useState(content || "");
  const [fullHtmlString, setFullHtmlString] = useState("");
  const displayRef = useRef(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [editorContent, setEditorContent] = useState("");
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
      if (!processContent) return;
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

  /**
   * Function to set the new content (either clean or not)
   * @param {*} content
   */
  function setNewContent(content) {
    if (handleOutputContent) {
      if (cleanContent) {
        handleOutputContent(
          TemplateDisplayHelper.removeContentEditableAndStyles(content)
        );
        setEditorContent(
          TemplateDisplayHelper.removeContentEditableAndStyles(content)
        );
      } else {
        handleOutputContent(parsedContent);
      }
    }
  }

  // Set Plugins
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
    "pagebreak",
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
        <>
          <TemplateAdvanceExportModal
            content={editorContent}
            showInsertModal={showExportModal}
            setShowInsertModal={setShowExportModal}
            toExport={true}
          />
          <Editor
            tinymceScriptSrc={
              process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
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

                editor.ui.registry.addIcon(
                  "exportPreviewIcon",
                  '<i style="font-size:1.2rem": class="ri-file-download-line"></i>'
                );

                //ADD BUTTONS

                // Export pdf button
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

                // Export Preview Button
                editor.ui.registry.addButton("exportPreviewButton", {
                  icon: "exportPreviewIcon", // Use the custom icon
                  tooltip: "Preview and Export to Docx/PDF",
                  onAction: function () {
                    const content = editor.getContent();
                    setShowExportModal(true);

                    // Code to toggle the extended toolbar
                    const moreToolbar = document.querySelector(
                      ".tox-toolbar__overflow"
                    );
                    if (moreToolbar) {
                      moreToolbar.style.display =
                        moreToolbar.style.display === "none" ? "" : "none";
                    }

                    // Update the toggle button state
                    const toggleButton =
                      document.querySelector(".tox-tbtn--enabled"); // Adjust selector as necessary
                    if (toggleButton) {
                      toggleButton.classList.remove("tox-tbtn--enabled"); // Adjust class as necessary
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
                "undo redo | myEnableButton myDisableButton myEditableButton |  blocks fontfamily fontsizeinput styles | " +
                "bold italic underline forecolor backcolor | align lineheight |" +
                "bullist numlist outdent indent | hr | pagebreak |" +
                "removeformat | searchreplace |" +
                "table | code codesample | emoticons charmap | image | fullscreen | preview | exportPreviewButton | help",
              content_style:
                "body { font-family:Arial,sans-serif; padding: 0; margin: 0;box-sizing: border-box; font-size: 12pt; } ul{ margin:0;} ",
              style_formats: [
                {
                  title: "Styles",
                  block: "p",
                },
                {
                  title: "No Spacing",
                  block: "p",
                  styles: { margin: "0 0 0.01mm 0" },
                },
                {
                  title: "0.5mm Spacing",
                  block: "p",
                  styles: { margin: "0 0 0.5mm 0" },
                },
                {
                  title: "1mm Spacing",
                  block: "p",
                  styles: { margin: "0 0 1mm 0" },
                },
                {
                  title: "2mm Spacing",
                  block: "p",
                  styles: { margin: "0 0 2mm 0" },
                },
                {
                  title: "3mm Spacing",
                  block: "p",
                  styles: { margin: "0 0 3mm 0" },
                },
                {
                  title: "4mm Spacing",
                  block: "p",
                  styles: { margin: "0 0 4mm 0" },
                },
                {
                  title: "Bullet No Spacing",
                  selector: "li",
                  styles: { margin: "0 0 0.01mm 0" },
                },
                {
                  title: "Bullet 0.5mm Spacing",
                  selector: "li",
                  styles: { margin: "0 0 0.5mm 0" },
                },
                {
                  title: "Bullet 1mm Spacing",
                  selector: "li",
                  styles: { margin: "0 0 1mm 0" },
                },
                {
                  title: "Bullet 2mm Spacing",
                  selector: "li",
                  styles: { margin: "0 0 2mm 0" },
                },
                {
                  title: "Bullet 3mm Spacing",
                  selector: "li",
                  styles: { margin: "0 0 3mm 0" },
                },
                {
                  title: "Bullet 4mm Spacing",
                  selector: "li",
                  styles: { margin: "0 0 4mm 0" },
                },
              ],
              image_title: true,
              automatic_uploads: true,
              file_picker_types: "image",
              file_picker_callback: function (cb, value, meta) {
                var input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = function () {
                  var file = this.files[0];
                  var reader = new FileReader();

                  reader.onload = function () {
                    // Instead of using the Blob URL, use the reader's result directly
                    cb(reader.result, { title: file.name });
                  };
                  reader.readAsDataURL(file);
                };

                input.click();
              },
            }}
            onEditorChange={(value) => {
              setNewContent(value);
              if (onChange) {
                onChange(value);
              }
            }}
          />
        </>
      )}
    </>
  );
};

export default TemplateDisplayV3;
