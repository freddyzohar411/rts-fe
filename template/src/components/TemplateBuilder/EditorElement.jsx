import React, { useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const EditorElement = ({ name, formik, injectVariable, setEditorRef, setEditorContent }) => {
  const editorRef = useRef();
  useEffect(() => {
    // Get the CKEditor instance from the editorRef
    const editor = editorRef.current.editor;

    // Get the current selection from the editor
    const selection = editor?.model.document.selection;

    // Check if there is a selection
    if (injectVariable) {
      // Insert the variableString at the selection's end position
      editor.model.change((writer) => {
        writer.insertText(injectVariable, selection.getLastPosition());
      });
    } else {
      // If no selection, insert the variableString at the end of the document
      editor?.model.insertContent(injectVariable);
    }
  }, [injectVariable]);

  useEffect(() => {
    setEditorRef(editorRef);
  }, [setEditorRef]);

  return (
    <CKEditor
      id="editor"
      editor={ClassicEditor}
      config={{
        toolbar: [
          "undo",
          "redo",
          "|",
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "|",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "|",
          "indent",
          "outdent",
        ],
      }}
      data={formik?.values?.[name] || ""}
      onReady={(editor) => {}}
      ref={editorRef}
      onChange={(event, editor) => {
        const data = editor?.getData();
        if (name != null) {
          try {
            formik?.setFieldValue(name, data);
          } catch (error) {}
        }
      }}
      onBlur={() => {
        formik.handleBlur({ target: { name } });
      }}
      onError={(error) => console.error("CKEditor Error:", error)}
      // disabled={formState === "view" ? true : false}
    />
  );
};

export default EditorElement;
