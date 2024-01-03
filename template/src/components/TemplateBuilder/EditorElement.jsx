import React, { useRef, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Ckeditor as ClassicEditor } from "@workspace/common";
import "./CkCss.scss";

const EditorElement = ({
  name,
  formik,
  injectVariable,
  setEditorRef,
  setEditorContent,
}) => {
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
    <div className="ck-content">
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        config={{
          toolbar: [
            // 'ckbox',
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "outdent",
            "indent",
            "|",
            // 'imageUpload',
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "undo",
            "redo",
            "codeBlock",
            "code",
            "findAndReplace",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "horizontalLine",
            "fontSize",
            "highlight",
            "htmlEmbed",
            // 'imageInsert',
            "pageBreak",
            "removeFormat",
            "selectAll",
            "showBlocks",
            "specialCharacters",
            "strikethrough",
            "style",
            "subscript",
            "superscript",
            "textPartLanguage",
            "todoList",
            "underline",
            "alignment",
          ],
          removePlugins: ["Title", "UploadImage"],
        }}
        // plugins={[Alignment]}
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
    </div>
  );
};

export default EditorElement;
