import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import "./DragDropFilesElements.scss";
import { truncate } from "@workspace/common/src/helpers/string_helper";

const DragDropFilesElement = ({
  formik,
  field,
  formStateHook,
  formFieldsHook,
}) => {
  const { formFields, setFormFields } = formFieldsHook;
  const { formState } = formStateHook;
  const [files, setFiles] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const fileInputRef = useRef();

  useEffect(() => {
    const fieldValue = formik?.values?.[field.name];
    if (fieldValue === "" || fieldValue === null || fieldValue === undefined) {
      if (files.length > 0) {
        setFiles([]);
      }
    }
  }, [formik?.values?.[field.name]]);

  console.log()

  const handleFileUpload = (e) => {
    console.log("e", e)
    // Add new files to the existing array
    formik.setFieldTouched(field.name, "");
    if (e.length > 0) {
      setFiles([...files, ...e]);
    }
    console.log("files", files)
    setFilesData([
      ...filesData,
      {
        file: e.target.files[0],
        fileName: e.target.files[0].name,
      },
    ]);
    console.log("filesData", filesData)
    console.log("field.name", field.name) 
    formik.setFieldValue(field.name, newFiles);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    formik.setFieldValue(field.name, newFiles);
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log("Accepted files", acceptedFiles)
    handleFileUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="mb-3">
        <div {...getRootProps()} className="dropzone dropzone-custom">
          {isDragActive ? (
            <div>
              <div className="upload-div">
                <span className="mdi mdi-cloud-upload-outline upload-icon fs-4"></span>
              </div>

              <span>
                <span className="upload-span">Drag and drop</span> into this
                area to upload files.
              </span>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center">
              <div className="upload-div">
                <span className="mdi mdi-cloud-upload-outline upload-icon fs-4"></span>
              </div>
              <div>
                <span className="upload-span">Click to upload</span> or drag and
                drop.
              </div>
              <div>
                <span className="form-text">PDF, DOC or DOCx files.</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        {files &&
          files.map((file, index) => (
            <div key={index} className="uploaded-files-div">
              <div className="d-flex flex-row justify-content-between align-items-top w-100">
                <div className="d-flex flex-row gap-2">
                  <div>
                    <span className="mdi mdi-file-pdf-box fs-3"></span>
                  </div>
                  <div className="d-flex flex-column">
                    <span>{truncate(file?.name, 30)}</span>
                    <span>{Math.floor(file?.size / 1000)}kb</span>
                  </div>
                </div>

                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteFile(index)}
                >
                  <span className="mdi mdi-close"></span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DragDropFilesElement;
