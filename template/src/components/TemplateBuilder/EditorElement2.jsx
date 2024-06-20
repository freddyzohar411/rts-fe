import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { toast } from "react-toastify";
import { ExportHelper } from "@workspace/common";
import { generateOptions } from "./pdfOption";
import { TemplateAdvanceExportModal } from "@workspace/common";
import AvensysLogo from "../../../assets/images/AvensysLogo.png";
import EditorDataAttributeModal from "./EditorDataAttributeModal";
import { v4 as uuid } from "uuid";

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
  const [base64ImgLogo, setBase64ImgLogo] = useState(null);
  const [editorAtrributeModalOpen, setEditorAtrributeModalOpen] =
    useState(false);
  const [editorAttributesData, setEditorAttributesData] = useState({});

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
      // Also add a data attribute to the inserted element for tracking use the injected variable name
      const insertedElement = editor.selection.getNode();
      insertedElement.setAttribute(`data-variable`, injectVariable);
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
    axios.delete(API.deleteDraftMedia()).catch(() => {});
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
          // reject("Upload failed");
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
    if (meta.filetype === "media") {
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
    }

    if (meta.filetype === "image") {
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
    }
  };

  // Set editor ref
  useEffect(() => {
    if (!setEditorRef) return;
    setEditorRef(editorRef);
  }, [setEditorRef, editorRef]);

  // Function to add the 'active-header' class
  const addHeaderStyle = (editor) => {
    const header = editor.getBody().querySelector('div[title="header"]');
    if (header) {
      header.classList.add("active-header");
    }
  };

  // Function to remove the 'active-header' class
  const removeHeaderStyle = (editor) => {
    const header = editor.getBody().querySelector('div[title="header"]');
    if (header) {
      header.classList.remove("active-header");
    }
  };

  useEffect(() => {
    // Define custom styles for the active header
    const style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = `.active-header { background-color: #f0f0f0; }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Remove header style
  useEffect(() => {
    const imageUrl = "/AvensysLogo.png"; // It is in main public file
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = function () {
          const base64data = reader.result;
          setBase64ImgLogo(base64data);
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) =>
        console.error("Error converting image to Base64:", error)
      );
  }, []);

  function getLogoBase64Data() {
    const imageUrl = "/AvensysLogo.png"; // Adjust the path as necessary
    return fetch(imageUrl) // Return the fetch promise
      .then((response) => response.blob())
      .then((blob) => {
        return new Promise((resolve, reject) => {
          // Return a new promise that resolves with the Base64 data
          const reader = new FileReader();
          reader.onloadend = function () {
            resolve(reader.result); // Resolve the promise with the Base64 data
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      })
      .catch((error) => {
        console.error("Error converting image to Base64:", error);
        throw error; // Ensure errors are propagated
      });
  }

  const insertLogo = async (editor, position) => {
    let existingHeader = editor.getContent().includes('title="header"');
    if (!existingHeader) {
      let base64ImgLogoData;
      try {
        base64ImgLogoData = await getLogoBase64Data();
      } catch (error) {
        console.error("Error converting image to Base64:", error);
        return;
      }
      let headerHtml;
      // Insert an empty header section with a placeholder
      // if (position === "center") {
      //   headerHtml = `<div title="header" contenteditable="true" style="background-color: #f0f0f0;"><div style="text-align: center;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      // } else if (position === "right") {
      //   headerHtml = `<div title="header" contenteditable="true" style="background-color: #f0f0f0;"><div style="text-align: right;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      // } else {
      //   headerHtml = `<div title="header" contenteditable="true" style="background-color: #f0f0f0;"><div style="text-align: left;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      // }

      if (position === "center") {
        headerHtml = `<div title="header" contenteditable="true"><div style="text-align: center;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      } else if (position === "right") {
        headerHtml = `<div title="header" contenteditable="true"><div style="text-align: right;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      } else {
        headerHtml = `<div title="header" contenteditable="true"><div style="text-align: left;"> <img src="${base64ImgLogoData}" alt="Avensys Logo" width="150"/></div></div>`;
      }

      // Insert the header at the beginning of the content
      var content = editor.getContent();

      // Insert the header at the beginning of the content
      var content = editor.getContent();
      editor.setContent(headerHtml + content);
    }

    // Focus the editor on the header section for immediate editing
    editor.focus();

    // If a header already exists, move the cursor to it
    var headerSection = editor.getBody().querySelector('div[title="header"] p');
    if (headerSection) {
      editor.selection.select(headerSection, true);
      editor.selection.collapse(false);
    }
  };

  const addAttributeToElement = (editor) => {
    var selectedText = editor.selection.getContent();
    var range = editor.selection.getRng();

    // If currently non-editable, wrap the selected text with a span and apply a class
    editor.selection.setContent(
      `<span style="border: 2px solid #D6CE0B; background-color: 	rgb(214, 206, 11, 0.2);" data-type="data-attribute" data-section="${
        editorAttributesData?.section
      }" data-label="${
        editorAttributesData?.label
      }" data-key="${uuid()}">${selectedText}</span>`
    );

    // Move the cursor to the end of the inserted content
    range.setStartAfter(range.endContainer);
    range.collapse(true);
    editor.selection.setRng(range);
    setEditorAttributesData({});
    setEditorAtrributeModalOpen(false);
  };

  const createMarginDropdown = (editor) => {
    editor.ui.registry.addMenuButton("marginDropdown", {
      text: "Margins",
      fetch: function (callback) {
        const items = [
          {
            type: "nestedmenuitem",
            text: "Set Margin",
            getSubmenuItems: () => [
              {
                type: "menuitem",
                text: "No Margin",
                onAction: () => setMargins(editor, "0px"),
              },
              {
                type: "menuitem",
                text: "5px",
                onAction: () => setMargins(editor, "5px"),
              },
              {
                type: "menuitem",
                text: "10px",
                onAction: () => setMargins(editor, "10px"),
              },
              {
                type: "menuitem",
                text: "15px",
                onAction: () => setMargins(editor, "15px"),
              },
              {
                type: "menuitem",
                text: "20px",
                onAction: () => setMargins(editor, "20px"),
              },
              {
                type: "menuitem",
                text: "30px",
                onAction: () => setMargins(editor, "30px"),
              },
            ],
          },
        ];
        callback(items);
      },
    });
  };

  const setMargins = (editor, value) => {
    const identifier = "custom-margin-div";
    let content = editor.getContent({ format: "html" });

    // Parse the content using DOMParser
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    let existingDiv = doc.body.querySelector(`div[data-id="${identifier}"]`);

    if (existingDiv) {
      if (value === "0px") {
        // Remove the existing div and keep its inner content
        doc.body.innerHTML = existingDiv.innerHTML;
      } else {
        // Update the existing div's margin
        existingDiv.style.margin = value;
      }
    } else {
      if (value !== "0px") {
        const newDiv = document.createElement("div");
        newDiv.style.margin = value;
        newDiv.setAttribute("data-id", identifier);
        newDiv.innerHTML = doc.body.innerHTML;
        doc.body.innerHTML = "";
        doc.body.appendChild(newDiv);
      }
    }

    // Serialize the document back to HTML
    const updatedContent = doc.body.innerHTML;
    editor.setContent(updatedContent);
  };

  const setInitialMargin = (editor, value) => {
    if (value === "0" || value === "0px") return;
    const identifier = "custom-margin-div";
    const initialContent = `<div style="margin: ${value};" data-id="${identifier}">${editor.getContent()}</div>`;
    editor.setContent(initialContent);
  };

  // New
  function removeUnwantedStylesFromContent(content) {
    // Function to remove specific styles from a style string
    function cleanStyle(style) {
      return style
        .replace(/-webkit-user-drag: none;/g, "")
        .replace(/-webkit-tap-highlight-color: transparent;/g, "");
    }

    // Create a temporary container to parse the content
    const container = document.createElement("div");
    container.innerHTML = content;

    // Find all elements with inline styles
    const elementsWithStyles = container.querySelectorAll("[style]");

    elementsWithStyles.forEach((element) => {
      const cleanedStyle = cleanStyle(element.getAttribute("style"));
      element.setAttribute("style", cleanedStyle.trim());
    });

    return container.innerHTML;
  }

  function removeLiDisplayBlock(content) {
    var div = document.createElement("div");
    div.innerHTML = content;

    // Find all <li> elements
    var liElements = div.getElementsByTagName("li");

    for (var i = 0; i < liElements.length; i++) {
      var li = liElements[i];
      var style = li.getAttribute("style");

      // If there is a style attribute and it contains 'display: block'
      if (style && style.includes("display: block")) {
        // Remove 'display: block' from the style attribute
        style = style.replace(/display:\s*block;?/gi, "").trim();

        // If the style attribute is empty after removal, remove the attribute
        if (style) {
          li.setAttribute("style", style);
        } else {
          li.removeAttribute("style");
        }
      }
    }

    return div.innerHTML;
  }

  // Clean up content to remove invisible space characters.
  function cleanUpContent(content) {
    // Replace invisible space characters with a regular space
    return content.replace(/[\u00A0\u200B\u200C\u200D\u202F\uFEFF]/g, " ");
  }

  // Code to identify the character codes of the content (For debugging purposes)
  // function logCharacterCodes(content) {
  //   let codes = [];
  //   for (let i = 0; i < content.length; i++) {
  //     codes.push(content.charCodeAt(i));
  //   }
  //   console.log("Character Codes: ", codes);
  // }

  return (
    <>
      <EditorDataAttributeModal
        isModalOpen={editorAtrributeModalOpen}
        setIsModalOpen={setEditorAtrributeModalOpen}
        data={editorAttributesData}
        setData={setEditorAttributesData}
        action={() => addAttributeToElement(editorRef.current)}
      />
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
            // Set Initial Margin when editor load
            editor.on("init", () => {
              setInitialMargin(editor, "0px"); // Set the initial margin to 10px or any desired value
            });

            // Add a margin dropdown
            createMarginDropdown(editor);

            // Add a 1px to borderwidth if empty
            editor.on("OpenWindow", () => {
              const setBorderWidth = () => {
                const formGroups =
                  document.querySelectorAll(".tox-form__group");
                formGroups.forEach((group) => {
                  const label = group.querySelector("label");
                  if (label && label.textContent === "Border width") {
                    const borderWidthInput = group.querySelector("input");
                    if (borderWidthInput && !borderWidthInput.value) {
                      borderWidthInput.value = "1px";
                    }
                  }
                });
              };

              // Listen for tab changes
              const tabButtons = document.querySelectorAll(".tox-tab");
              tabButtons.forEach((tab) => {
                tab.addEventListener("click", () => {
                  setTimeout(setBorderWidth, 100); // Adjust timeout as needed
                });
              });

              // Set default value if the second tab is already active
              setTimeout(setBorderWidth, 100);
            });
            editor.on("focusin", () => addHeaderStyle(editor));
            editor.on("focusout", () => removeHeaderStyle(editor));
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

            editor.ui.registry.addMenuButton("insertLogo", {
              text: "Insert Logo",
              fetch: function (callback) {
                var items = [
                  {
                    type: "menuitem",
                    text: "Left",
                    onAction: function () {
                      insertLogo(editor, "left");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "Center",
                    onAction: function () {
                      insertLogo(editor, "center");
                    },
                  },
                  {
                    type: "menuitem",
                    text: "Right",
                    onAction: function () {
                      insertLogo(editor, "right");
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

            editor.ui.registry.addButton("insertHeader", {
              text: "Insert Header",
              onAction: function () {
                // Check if a header already exists
                var existingHeader = editor
                  .getContent()
                  .includes('title="header"');

                if (!existingHeader) {
                  // Insert an empty header section with a placeholder
                  var headerHtml =
                    '<div title="header" contenteditable="true" style="background-color: #f0f0f0;"><p>Insert your header content here...</p></div>';

                  // Insert the header at the beginning of the content
                  var content = editor.getContent();

                  // Insert the header at the beginning of the content
                  var content = editor.getContent();
                  editor.setContent(headerHtml + content);
                }

                // Focus the editor on the header section for immediate editing
                editor.focus();

                // If a header already exists, move the cursor to it
                var headerSection = editor
                  .getBody()
                  .querySelector('div[title="header"] p');
                if (headerSection) {
                  editor.selection.select(headerSection, true);
                  editor.selection.collapse(false);
                }
              },
            });

            editor.ui.registry.addButton("exitHeader", {
              text: "Exit Header",
              onAction: function () {
                // Check if we're currently in the header
                var headerSection = editor
                  .getBody()
                  .querySelector('div[title="header"]');
                if (headerSection) {
                  // Create a new paragraph element outside the header
                  var newParagraph = document.createElement("p");
                  newParagraph.innerHTML = "&nbsp;"; // Optional placeholder text

                  // Insert the new paragraph after the header div
                  headerSection.parentNode.insertBefore(
                    newParagraph,
                    headerSection.nextSibling
                  );

                  // Move the cursor to the new paragraph
                  editor.selection.select(newParagraph, true);
                  editor.selection.collapse(true);
                }
              },
            });

            editor.ui.registry.addButton("removeHeader", {
              text: "Remove Header",
              onAction: function () {
                // Check if we're currently in the header
                var headerSection = editor
                  .getBody()
                  .querySelector('div[title="header"]');
                if (headerSection) {
                  // Remove the header section
                  headerSection.remove();
                }
              },
            });

            // Add Attribute Button
            editor.ui.registry.addButton("myAddAttributeButton", {
              text: "Add Attribute",
              onAction: function () {
                setEditorAtrributeModalOpen(true);
              },
            });

            // Remove Attribute Button
            editor.ui.registry.addButton("myRemoveAttributeButton", {
              text: "Remove Attribute",
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

            // editor.on("GetContent", function (e) {
            //   var content = e.content;
            //   // A simple example to add inline style to paragraphs
            //   e.content = content.replace(
            //     /<p>/g,
            //     '<p style="margin-bottom: 0in;">'
            //   );
            // });

            // Event listener to clean up content before saving or submitting
            editor.on("SaveContent", function (e) {
              e.content = cleanUpContent(e.content);
            });

            // Event listener to clean up content before getting content
            editor.on("GetContent", function (e) {
              e.content = cleanUpContent(e.content);
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
            "marginDropdown | myAddAttributeButton myRemoveAttributeButton | undo redo | changeSize zoom | myEnableButton myDisableButton myEditableButton |  blocks fontfamily fontsize styles | " +
            "bold italic underline forecolor backcolor | align lineheight |" +
            "bullist numlist outdent indent | hr | pagebreak | insertLogo insertHeader exitHeader removeHeader |" +
            "removeformat | searchreplace |" +
            "table | code codesample | emoticons charmap image media | fullscreen | preview | exportPreviewButton | help",
          // newline_behavior: "invert",
          content_style:
            "body { font-family:Arial,sans-serif; padding: 0; margin: 0;box-sizing: border-box; font-size: 12pt; } ul{ margin:0;} p { margin: 0px 0px 0.01mm; } table td, table th { vertical-align: top; }",
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
          file_picker_callback: handleFilePickerCallback,
          font_size_input_default_unit: "point",
          font_size_formats:
            "6pt 8pt 9pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 18pt 20pt 22pt 24pt 26pt 28pt 30pt 32pt 34pt 36pt 38pt 40pt 42pt 44pt 46pt 48pt 50pt 55pt 60pt 65pt 70pt 75pt 80pt 85pt 90pt 95pt 100pt",
          // images_upload_handler: imageUploadHandler,
          file_picker_types: "image, media",
          table_use_colgroups: false,
          link_assume_external_targets: true,
          // New 19062024
          table_appearance_options: false,
          paste_enable_default_filters: false,
          paste_webkit_styles: "all", // This is rendering the pasted content with the same styles as the original content
          paste_preprocess: function (plugin, args) {
            // Remove unwanted styles from the pasted content
            args.content = removeUnwantedStylesFromContent(args.content);
          },

          // Remove display Block to show the list properly
          paste_preprocess: function (plugin, args) {
            args.content = removeLiDisplayBlock(args.content);
          },
        }}
        onEditorChange={(value) => {
          // logCharacterCodes(value);
          formik.setFieldValue(name, cleanUpContent(value));
          if (setEditorContent) setEditorContent(cleanUpContent(value));
        }}
        onBlur={(event, editor) => {
          formik.handleBlur({ target: { name } });
        }}
      />
    </>
  );
};

export default EditorElement2;
