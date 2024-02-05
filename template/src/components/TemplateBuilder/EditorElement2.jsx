import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ExportHelper } from "@workspace/common";
import { generateOptions } from "./pdfOption";
import { TemplateAdvanceExportModal } from "@workspace/common";

const EditorElement2 = ({
  name,
  formik,
  injectVariable,
  setEditorRef = null,
  setEditorContent = null,
  setDeletedMediaURL,
  API = {
    addMedia: null,
    deleteDraftMedia: null,
  },
}) => {
  const editorRef = useRef(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Apply canvas style
  function applyCanvasStyle(editor, size, orientation) {
    const sizes = {
      A4: { width: "8.27in", height: "11.69in" },
      A3: { width: "11.69in", height: "16.54in" },
      Letter: { width: "8.5in", height: "11in" },
    };

    let { width, height } = sizes[size];

    if (orientation === "landscape") {
      [width, height] = [height, width];
    }

    editor.dom.setStyle(editor.getBody(), "width", width);
    editor.dom.setStyle(editor.getBody(), "minHeight", height);
    editor.dom.setStyle(editor.getBody(), "margin", "60px auto 100px auto");
    editor.dom.setStyle(editor.getBody(), "border", "1px solid black");
    editor.dom.setStyle(editor.getBody(), "padding", "0px");
    editor.dom.setStyle(editor.getBody(), "boxSizing", "border-box");
  }

  // Reset canvas to normal style
  function revertToNormalStyle(editor) {
    editor.dom.setStyle(editor.getBody(), "width", "");
    editor.dom.setStyle(editor.getBody(), "minHeight", "");
    editor.dom.setStyle(editor.getBody(), "margin", "");
    editor.dom.setStyle(editor.getBody(), "border", "");
    editor.dom.setStyle(editor.getBody(), "padding", "");
    editor.dom.setStyle(editor.getBody(), "boxSizing", "");
  }

  // Inject variable when it changes
  useEffect(() => {
    // Get the current editor instance
    const editor = editorRef?.current;
    // const editor = window?.tinymce?.activeEditor;

    // Check if there is a selection
    if (editor?.selection) {
      // Insert the variableString at the selection's end position
      editor.selection.setContent(injectVariable);
    } else {
      // If no selection, insert the variableString at the end of the document
      editor?.setContent(editor.getContent() + injectVariable);
    }
  }, [injectVariable]);

  // Clear all previous draft images on mount and unmount
  useEffect(() => {
    deleteDraftMedia();
    return () => {
      // Remove all draft by this person
      deleteDraftMedia();
    };
  }, []);

  // Delete all draft media
  const deleteDraftMedia = () => {
    axios.delete(API.deleteDraftMedia());
  };

  // Upload image handler
  const imageUploadHandler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const cancelBtnEl = document.querySelector('[title="Cancel"]');
      // Check if file exist
      if (!blobInfo.blob()) {
        reject("No file received");
        return;
      }
      // Check if the file is an image.
      if (blobInfo.blob().type.indexOf("image") === -1) {
        toast.error("Unsupported file type. Please upload an image file");
        // reject("Unsupported file type");
        return;
      }

      // Create a new FormData object.
      const formData = new FormData();
      formData.append("mediaName", blobInfo.filename());
      formData.append("mediaFile", blobInfo.blob());

      // Send the formData to your server. Axios call
      axios
        .post(API.addMedia(), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          cancelBtnEl.setAttribute("disabled", "disabled");
          resolve(res.data.mediaUrl);
        })
        .catch((err) => {
          reject("Upload failed");
        });
    });

  // Upload video handler
  const videoUploadHandler = (
    blobInfo,
    file,
    cancelBtnEl,
    saveBtnEl,
    dialogEl
  ) =>
    // Disable save button
    new Promise((resolve, reject) => {
      // Check if file exist
      if (!blobInfo.blob()) {
        reject("No file received");
        return;
      }
      // Check if the file is an image.
      if (blobInfo.blob().type.indexOf("video") === -1) {
        toast.error("Unsupported file type. Please upload a video file");
        return;
      }
      // Set button text save to saving... and disabled
      saveBtnEl.setAttribute("disabled", "disabled");
      saveBtnEl.innerHTML = "Saving...";
      // Disable cancel button
      cancelBtnEl.setAttribute("disabled", "disabled");
      // Set Div opacity to 0.5 and pointer-events to none
      dialogEl.style.pointerEvents = "none";

      // Create a new FormData object.
      const formData = new FormData();
      formData.append("mediaName", file.name);
      formData.append("mediaFile", blobInfo.blob());
      // Send the formData to your server. Axios call
      axios
        .post(API.addMedia(), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // Set Save button enabled and set text to save
          saveBtnEl.removeAttribute("disabled");
          saveBtnEl.innerHTML = "Save";
          // Set dialog div opacity to 1 and pointer-events to auto
          dialogEl.style.pointerEvents = "auto";
          resolve(res.data.mediaUrl);
        })
        .catch((err) => {
          // Set dialog div opacity to 1 and pointer-events to auto
          dialogEl.style.pointerEvents = "auto";
          cancelBtnEl.removeAttribute("disabled");
          reject("Upload failed");
        });
    });

  // Delete media handler
  const handleDelete = (node, setDeletedMediaURL) => {
    if (node.nodeName === "IMG") {
      setDeletedMediaURL((prev) => [...prev, node.src]);
    } else if (node.nodeName === "SPAN") {
      const videoElement = node.querySelector("video");
      if (videoElement) {
        const sourceElement = videoElement.querySelector("source");
        setDeletedMediaURL((prev) => [...prev, sourceElement.src]);
      }
    }
  };

  const handleNodeChange = (e, editor) => {
    const node = editor.selection.getNode();
    if (
      node.nodeName === "IMG" ||
      (node.nodeName === "SPAN" && node.querySelector("video"))
    ) {
      if (e.keyCode === 8 || e.keyCode === 46) {
        handleDelete(node, setDeletedMediaURL);
      } else {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  };

  // Handle file Picker callback
  const handleFilePickerCallback = (cb, value, meta) => {
    const cancelBtnEl = document.querySelector('[title="Cancel"]');
    const saveBtnEl = document.querySelector('[title="Save"]');
    const dialogEl = document.querySelector('[role="dialog"]');

    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "video/*");

    input.addEventListener("change", (e) => {
      const file = e.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);

          videoUploadHandler(
            blobInfo,
            file,
            cancelBtnEl,
            saveBtnEl,
            dialogEl
          ).then((res) => {
            cb(res, { title: file.name });
          });
        });
        reader.readAsDataURL(file);
      }
    });
    input.click();
  };

  // Set editor ref
  useEffect(() => {
    if (!setEditorRef) return;
    setEditorRef(editorRef);
  }, [setEditorRef, editorRef]);

  //   function zoomEditorContent(editor, scale) {
  //     var contentArea = editor.getContentAreaContainer();
  //     var contentDocument = editor.getDoc();
  //     var contentBody = contentDocument.body;

  //     // contentArea.style.overflow = 'auto';

  //     // Apply scale transform
  //     contentBody.style.transform = 'scale(' + scale + ')';
  //     contentBody.style.transformOrigin = 'center center'; // Adjust as needed
  // }

  // function zoomEditorContent(editor, scale) {
  //   var contentArea = editor.getContentAreaContainer();
  //   var contentDocument = editor.getDoc();
  //   var contentBody = contentDocument.body;

  //   // Calculate the center of the content area
  //   var centerX = contentArea.clientWidth / 2;

  //   // Calculate the fixed top position
  //   var fixedTop = 50; // Set the fixed top value in pixels

  //   // Apply scale transform
  //   contentBody.style.transform = `scale(${scale})`;

  //   // Calculate the translation value to center the content horizontally
  //   var translateX = (centerX * (1 - scale)).toFixed(2); // Round to two decimal places

  //   // Apply translation transform to center the content horizontally and keep it fixed from the top
  //   contentBody.style.transform += ` translate(${translateX}px, ${fixedTop}px)`;

  //   // Adjust the transformation origin to the center
  //   contentBody.style.transformOrigin = 'top left'; // Keep the center fixed
  // }

  return (
    <>
      <TemplateAdvanceExportModal
        content={formik?.values?.[name]}
        showInsertModal={showExportModal}
        setShowInsertModal={setShowExportModal}
        toExport={true}
      />
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={formik?.values?.[name]}
        init={{
          setup: (editor) => {
            // On Init setup
            editor.on("init", function () {
              applyCanvasStyle(editor, "A4", "portrait"); // Set default to A4 portrait
            });
            // editor.ui.registry.addMenuButton("zoom", {
            //   text: "Zoom",
            //   fetch: function (callback) {
            //     var items = [
            //       { text: "50%", value: "0.5" },
            //       { text: "75%", value: "0.75" },
            //       { text: "100%", value: "1" },
            //       // Add more zoom levels as needed
            //     ];
            //     callback(
            //       items.map(function (item) {
            //         return {
            //           type: "menuitem",
            //           text: item.text,
            //           onAction: function () {
            //             zoomEditorContent(editor, item.value);
            //           },
            //         };
            //       })
            //     );
            //   },
            // });

            editor.ui.registry.addMenuButton("changeSize", {
              text: "Page Size",
              fetch: function (callback) {
                var items = [
                  {
                    type: "menuitem",
                    text: "Default",
                    onAction: function () {
                      revertToNormalStyle(editor);
                    },
                  },
                  {
                    type: "menuitem",
                    text: "A4 Portrait",
                    onAction: function () {
                      applyCanvasStyle(editor, "A4", "portrait");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "A4 Landscape",
                    onAction: function () {
                      applyCanvasStyle(editor, "A4", "landscape");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "A3 Portrait",
                    onAction: function () {
                      applyCanvasStyle(editor, "A3", "portrait");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "A3 Landscape",
                    onAction: function () {
                      applyCanvasStyle(editor, "A3", "landscape");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "Letter Portrait",
                    onAction: function () {
                      applyCanvasStyle(editor, "A3", "portrait");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "Letter Landscape",
                    onAction: function () {
                      applyCanvasStyle(editor, "Letter", "landscape");
                    },
                  },
                  // ... similarly for A3 and other sizes
                ];
                callback(items);
              },
            });
            editor.on("keydown", (event) => handleNodeChange(event, editor));
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
            "pagebreak",
          ],
          toolbar:
            "undo redo | changeSize zoom | myEnableButton myDisableButton myEditableButton |  blocks fontfamily fontsize | " +
            "bold italic underline forecolor backcolor | align lineheight |" +
            "bullist numlist outdent indent | hr | pagebreak |" +
            "removeformat | searchreplace |" +
            "table | code codesample | emoticons charmap image media | fullscreen | preview | exportPreviewButton | help",
          content_style:
            "body { font-family:Arial,sans-serif; padding: 0; margin: 0;box-sizing: border-box; font-size: 12pt; }",
          file_picker_callback: handleFilePickerCallback,
          font_size_input_default_unit: "point",
          font_size_formats:
            "6pt 8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt 42pt 44pt 46pt 48pt 50pt 55pt 60pt 65pt 70pt 75pt 80pt 85pt 90pt 95pt 100pt",
          images_upload_handler: imageUploadHandler,
          file_picker_types: "media",
          // table_default_styles: {
          //   width: "300px",
          // },
          // Set colgroup for table to false
          table_use_colgroups: false,
        }}
        onEditorChange={(value) => {
          formik.setFieldValue(name, value);
          if (setEditorContent) setEditorContent(value);
        }}
        onBlur={(event, editor) => {
          formik.handleBlur({ target: { name } });
        }}
      />
    </>
  );
};

export default EditorElement2;
