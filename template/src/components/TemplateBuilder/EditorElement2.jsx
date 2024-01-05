import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import "./EditorElement2.scss";

const EditorElement2 = ({
  name,
  formik,
  injectVariable,
  setEditorRef,
  setEditorContent,
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

  const handleFileUpload = (file) => {
    console.log("File", file);
  };

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={formik?.values?.[name]}
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
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | hr |" +
            "removeformat | " +
            "table | emoticons | code | charmap | image | media | fullscreen | preview | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          // file_picker_callback: (cb, value, meta) => {
          //   const input = document.createElement("input");
          //   input.setAttribute("type", "file");
          //   input.setAttribute("accept", "image/*");

          //   input.addEventListener("change", (e) => {
          //     const file = e.target.files[0];
          //     console.log("File In Event", file)

          //     const reader = new FileReader();
          //     reader.addEventListener("load", () => {
          //       /*
          //           Note: Now we need to register the blob in TinyMCEs image blob
          //           registry. In the next release this part hopefully won't be
          //           necessary, as we are looking to handle it internally.
          //         */
          //       const id = "blobid" + new Date().getTime();
          //       const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          //       const base64 = reader.result.split(",")[1];
          //       const blobInfo = blobCache.create(id, file, base64);
          //       blobCache.add(blobInfo);

          //       /* call the callback and populate the Title field with the file name */
          //       // cb(blobInfo.blobUri(), { title: file.name });
          //       handleFileUpload(file);
          //     });
          //     reader.readAsDataURL(file);
          //   });

          //   input.click();
          // },
          // file_picker_types: "image",
        }}
        onEditorChange={(value) => {
          console.log("Value", value);
          formik.setFieldValue(name, value);
        }}
        onBlur={(event, editor) => {
          formik.handleBlur({ target: { name } });
        }}
      />
    </>
  );
};

export default EditorElement2;
