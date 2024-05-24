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
  const [existingFiles, setExistingFiles] = useState([]);

  console.log("Field", field);
  const splitCommaSeparatedText = (text) => {
    if (!text) return [];
    // If no comma is found, return the text as the only item in the array
    if (text.indexOf(",") === -1) return [text];
    // Split the text by commas and remove any whitespace
    return text.split(",").map((item) => item.trim());
  };

  useEffect(() => {
    if (formik?.values?.[field.name]) {
      setExistingFiles(splitCommaSeparatedText(formik?.values?.[field.name]));
    }
  }, [formik?.values?.[field.name]]);

  useEffect(() => {
    const fieldValue = formik?.values?.[field.name];
    if (fieldValue === "" || fieldValue === null || fieldValue === undefined) {
      if (files.length > 0) {
        setFiles([]);
      }
    }
  }, [formik?.values?.[field.name]]);

  const handleFileUpload = (e) => {
    formik.setFieldTouched(field.name, "");
    if (e.length > 0) {
      setFiles([...files, ...e]);
    }
    formik.setFieldValue(field.name, [...files, ...e]);
  };

  const handleDeleteFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    formik.setFieldValue(field.name, newFiles);
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleFileUpload(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {!formState === "view" && (
        <div className="mb-3">
          <div
            {...getRootProps()}
            className="dropzone dropzone-custom"
            id={field.name}
            name={field.name}
            style={{ height: "200px" }}
          >
            {isDragActive ? (
              <div className="d-flex flex-column align-items-center justify-content-center">
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
                  <span className="upload-span">Click to upload</span> or drag
                  and drop.
                </div>
                <div>
                  <span className="form-text">PDF, DOC or DOCx files.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
        {existingFiles.length > 0 &&
          existingFiles.map((file, index) => (
            <div className="uploaded-files-div">
              <div className="d-flex flex-row justify-content-between align-items-top w-100">
                <div className="d-flex flex-row gap-2 align-items-center">
                  <div>
                    <span className="mdi mdi-file-pdf-box fs-3"></span>
                  </div>
                  <div className="d-flex flex-column">
                    <span>{truncate(file, 30)}</span>
                  </div>
                </div>
                {/* <div className="cursor-pointer">
                <span className="mdi mdi-close"></span>
              </div> */}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DragDropFilesElement;
