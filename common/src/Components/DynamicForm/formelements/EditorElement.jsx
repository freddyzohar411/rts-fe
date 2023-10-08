import React from 'react'
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Label,
} from "reactstrap";

const EditorElement = ({field, formik}) => {
  return (
    <div className="">
    {/* <Label htmlFor="editor">
      {field.label}
    </Label> */}
        <CKEditor
          id="editor"
          editor={ClassicEditor}
          data={formik.values[field.name]}
          onReady={(editor) => {}}
          onChange={(event, editor) => {
            const data = editor.getData();
            formik.setFieldValue(field.name, data)
          }}
        />
  </div>
  )
}

export default EditorElement