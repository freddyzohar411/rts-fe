import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Ckeditor as ClassicEditor } from "@workspace/common";

const EditorElement = ({ field, formik, formStateHook, tabIndexData }) => {
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
          // Get the data from the editor and set it to the formik field
          // get HTML
          if (field.name != null) {
            try {
              formik?.setFieldValue(field?.name, data);
            } catch (error) {}
          }
        }}
        config={{
          removePlugins: ["Title"], // Replace 'PluginName' with the name of the plugin you wish to disable
          placeholder: field?.placeholder,
          tabIndex: tabIndexData?.[field?.fieldId],
        }}
        disabled={formState === "view" ? true : false}
      />
    </div>
  );
};

export default EditorElement;
