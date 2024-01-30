import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Ckeditor as ClassicEditor } from "@workspace/common";

const EditorElement = ({ field, formik, formStateHook }) => {
  const { formState } = formStateHook;
  return (
    <div className="">
      <CKEditor
        id="editor"
        editor={ClassicEditor}
        data={formik?.values?.[field.name] || ""}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          const data = editor?.getData();
          if (field.name != null) {
            try {
              formik?.setFieldValue(field?.name, data);
            } catch (error) {
            }
          }
        }}
        disabled={formState === "view" ? true : false}
      />
    </div>
  );
};

export default EditorElement;
