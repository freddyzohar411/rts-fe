import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "./EditorElement2.scss";

const EditorElement2 = ({ field, formik, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  return (
    <div className={formState === "view" ? "tinymce-disabled" : ""}>
      <Editor
        tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
        // onInit={(evt, editor) => (editorRef.current = editor)}
        value={formik?.values?.[field.name]}
        onEditorChange={(value) => {
          if (field.name != null) {
            try {
              formik?.setFieldValue(field?.name, value);
            } catch (error) {}
          }
        }}
        disabled={formState === "view" ? true : false}
        init={{
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
            "marginDropdown | undo redo | changeSize zoom |  blocks fontfamily fontsize styles | " +
            "bold italic underline forecolor backcolor | align lineheight |" +
            "bullist numlist outdent indent | hr |" +
            "removeformat | searchreplace |" +
            "table | code codesample | emoticons charmap image media | fullscreen | preview | help",
          // newline_behavior: "invert",
        }}
      />
    </div>
  );
};

export default EditorElement2;
