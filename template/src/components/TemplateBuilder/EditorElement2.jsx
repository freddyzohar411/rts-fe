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

  return (
    <>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        // initialValue={formik?.values?.[name] || ""}
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
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help |" +
            "table | emoticons | code | fullscreen | preview",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
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
