import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
// import "./EditorElement2.scss";

const EditorElement2 = () => {
  const editorRef = useRef(null);
  const log = () => {
    // if (editorRef.current) {
    //   console.log(editorRef.current.getContent());
    // }
  };

  const handleEditorChange = (content, editor) => {
    // Do something with the updated content
    console.log(content);
  };

  const handleButtonClick = () => {
    const variableString = "Hello, this is the injected string!";
    // Get the current editor instance
    const editor = window.tinymce.activeEditor;

    // Check if there is a selection
    if (editor.selection) {
      // Insert the variableString at the selection's end position
      editor.selection.setContent(variableString);
    } else {
      // If no selection, insert the variableString at the end of the document
      editor.setContent(editor.getContent() + variableString);
    }
  };

  return (
    <>
      <button onClick={handleButtonClick}>Inject String at Cursor</button>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
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
            "emoticons"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help |" +
            "table | emoticons",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          setup: (editor) => {
            // You can add additional setup configurations here
            editor.on("Change", (e) => {
              handleEditorChange(editor.getContent(), editor);
            });
          },
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
};

export default EditorElement2;
