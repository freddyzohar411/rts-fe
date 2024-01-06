import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
// import "./EditorElement2.scss";

const EditorElement2 = ({
  name,
  formik,
  injectVariable,
  setEditorRef,
  setEditorContent,
  setDeletedImagesURL,
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
    deleteDraftImages();
    return () => {
      // Remove all draft by this person
      deleteDraftImages();
    };
  }, []);

  // Delete all draft images
  const deleteDraftImages = () => {
    axios
      .delete(`http://localhost:8181/images/delete/user-draft`)
      .then((res) => {})
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Upload image handler
  const image_upload_handler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      // console.log("blobInfo", blobInfo);
      // console.log("progress", progress);
      // console.log("blobInfo.blob", blobInfo.blob());

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
      formData.append("imageName", blobInfo.filename());
      formData.append("imageFile", blobInfo.blob());

      // Send the formData to your server. Axios call
      axios
        .post("http://localhost:8181/images/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res.data.imageUrl);
        })
        .catch((err) => {
          console.log("err", err);
          reject("Upload failed");
        });
    });

  const handleVideoUpload = (blobInfo) =>
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
      formData.append("imageName", blobInfo.filename());
      formData.append("imageFile", blobInfo.blob());

      // Send the formData to your server. Axios call
      axios
        .post("http://localhost:8181/images/add", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          resolve(res.data.imageUrl);
        })
        .catch((err) => {
          console.log("err", err);
          reject("Upload failed");
        });
    });

  //   // Get the selected node and the pressed key
  //   const selectedNode = e.element;
  //   const pressedKey = e;
  //   // console.log("imageSrc", selectedNode.src);
  //   // console.log("pressedKey",  e);
  //   // Check if the selected node is an image and the pressed key is delete or backspace
  //   console.log("e", e.lastRng)
  //   if (e.lastRng){
  //     console.log("e.lastRng", "IN");
  //   }
  //   if (
  //     selectedNode &&
  //     selectedNode.nodeName === "IMG" &&
  //     (pressedKey === "Delete" || pressedKey === "Backspace")
  //   ) {
  //     // Get the image source
  //     const imageSrc = selectedNode.src;

  //     // // Use axios to send a DELETE request to your server or storage service
  //     // axios.delete('deleteImage.php', {data: {src: imageSrc}})
  //     //   .then(function (response) {
  //     //     // Handle success
  //     //     console.log('Image deleted:', response.data);
  //     //   })
  //     //   .catch(function (error) {
  //     //     // Handle error
  //     //     console.log('Image deletion failed:', error.message);
  //     //   });
  //   }
  // };

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={formik?.values?.[name]}
        init={{
          setup: (editor) => {
            editor.on("keydown", (e) => {
              console.log("Key down event", e.keyCode);
              let node = editor.selection.getNode();
              console.log("Node", node);
              console.log("Node Name", node.nodeName);
              // Check if the selected node is an image

              if (node.nodeName === "IMG") {
                // Handle Delete (Backspace or Delete key)
                if (e.keyCode === 8 || e.keyCode === 46) {
                  // Handle delete logic for the selected image
                  setDeletedImagesURL((prev) => [...prev, node.src]);
                } else {
                  // Prevent TinyMCE default behavior for non-delete keys when an image is selected
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              }

              if (node.nodeName === "SPAN") {
                // Check if the span contains a video element
                const videoElement = node.querySelector("video");
                console.log("videoElement", videoElement);
                if (videoElement) {
                  if (e.keyCode === 8 || e.keyCode === 46) {
                    // Handle delete logic for the selected image
                    let sourceElement = videoElement.querySelector('source');
                    console.log("sourceElement", sourceElement.src);
                    setDeletedImagesURL((prev) => [...prev, sourceElement.src]);
                  } else {
                    // Prevent TinyMCE default behavior for non-delete keys when an image is selected
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }
              }
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
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | hr |" +
            "removeformat | " +
            "table | emoticons | code | charmap | image | media | fullscreen | preview | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          file_picker_callback: (cb, value, meta) => {
            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");

            input.addEventListener("change", (e) => {
              const file = e.target.files[0];
              console.log("File In Event", file);

              const reader = new FileReader();
              reader.addEventListener("load", () => {
                /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                  */
                const id = "blobid" + new Date().getTime();
                const blobCache = tinymce.activeEditor.editorUpload.blobCache;
                const base64 = reader.result.split(",")[1];
                const blobInfo = blobCache.create(id, file, base64);
                blobCache.add(blobInfo);

                console.log("Blob Info", blobInfo.blob().type);
                // Handle Video Upload
                handleVideoUpload(blobInfo).then((res) => {
                  cb(res, { title: file.name });
                });
              });
              reader.readAsDataURL(file);
            });

            input.click();
          },
          images_upload_handler: image_upload_handler,
          file_picker_types: "media",
        }}
        onEditorChange={(value) => {
          console.log("Value", value);
          formik.setFieldValue(name, value);
        }}
        // onNodeChange={handleNodeChange} // This is for deleting image
        onBlur={(event, editor) => {
          formik.handleBlur({ target: { name } });
        }}
      />
    </>
  );
};

export default EditorElement2;
