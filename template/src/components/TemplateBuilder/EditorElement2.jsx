import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

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
    axios
      .delete(API.deleteDraftMedia)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Upload image handler
  const imageUploadHandler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      // Check if file exist
      if (!blobInfo.blob()) {
        reject("No file received");
        return;
      }
      // Check if the file is an image.
      if (blobInfo.blob().type.indexOf("image") === -1) {
        reject("Unsupported file type");
        return;
      }

      // Create a new FormData object.
      const formData = new FormData();
      formData.append("mediaName", blobInfo.filename());
      formData.append("mediaFile", blobInfo.blob());

      // Send the formData to your server. Axios call
      axios
        .post(API.addMedia, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res.data.mediaUrl);
        })
        .catch((err) => {
          console.log("err", err);
          reject("Upload failed");
        });
    });

  const videoUploadHandler = (blobInfo, file) =>
    new Promise((resolve, reject) => {
      // Check if file exist
      if (!blobInfo.blob()) {
        reject("No file received");
        return;
      }
      // Check if the file is an image.
      if (blobInfo.blob().type.indexOf("video") === -1) {
        reject("Unsupported file type");
        return;
      }

      // Create a new FormData object.
      const formData = new FormData();
      formData.append("mediaName", file.name);
      formData.append("mediaFile", blobInfo.blob());

      // Send the formData to your server. Axios call
      axios
        .post("http://localhost:8181/media/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res.data.mediaUrl);
        })
        .catch((err) => {
          console.log("err", err);
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
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

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

          videoUploadHandler(blobInfo, file).then((res) => {
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
  }, [setEditorRef]);

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={formik?.values?.[name]}
        init={{
          setup: (editor) => {
            editor.on("keydown", (event) => handleNodeChange(event, editor));
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
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | hr |" +
            "removeformat | " +
            "table | emoticons | code | charmap | image | media | fullscreen | preview | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_callback: handleFilePickerCallback,
          images_upload_handler: imageUploadHandler,
          file_picker_types: "media",
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
