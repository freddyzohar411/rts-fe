import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const MultiFileInputElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const [files, setFiles] = useState([]); //
  const [existingFiles, setExistingFiles] = useState([]); // formik?.values?.[field.name
  const [showFiles, setShowFiles] = useState(false); // formik?.values?.[field.name
  const [deletedFiles, setDeletedFiles] = useState([]); // formik?.values?.[field.name
  const fileInputRef = useRef();

  console.log(files);
  console.log("MULTI FILE INPUT values: ", formik?.values?.[field.name]);

//   useEffect(() => {
//     if (
//       formik?.values?.[field.name] &&
//       typeof formik?.values?.[field.name] === "string"
//     ) {
//       setExistingFiles([formik?.values?.[field.name].split(",")]);
//     }
//   }, [formik?.values?.[field.name]]);



  const truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const handleFileChange = (e) => {
    formik.setFieldTouched(field.name, "");
    if (e.target.files.length > 0) {
      setFiles([...files, e.target.files[0]]);
    }
    e.target.value = null;
  };

  useEffect(() => {
    formik.setFieldValue(field.name, files);
  }, [files]);

  useEffect(() => {
    formik.setFieldValue("deletedFiles", [...deletedFiles]);
  },[deletedFiles])

  return (
    <>
      <input
        ref={fileInputRef}
        id={field.name}
        name={field.name}
        type="file"
        className="form-control"
        style={{ display: "none" }}
        onChange={handleFileChange}
        placeholder={field.placeholder}
      />
      {/* Create a similar file input to replace the actual file input */}
      <div style={{ position: "relative" }}>
        <div className="d-flex align-items-center w-100 h-100">
          <button
            type="button"
            className="btn btn-primary"
            style={{
              borderTopRightRadius: "0px",
              borderBottomRightRadius: "0px",
              minWidth: "90px",
            }}
            onClick={() => {
              console.log("Clicked");
              console.log(fileInputRef.current);
              fileInputRef.current.click();
            }}
            disabled={formState === "view" ? true : false}
          >
            <span>Add Files</span>
          </button>
          <div
            className={`w-100 border-primary border border-1 ${
              !formik?.values?.[field.name] &&
              !formik?.values?.[field.name]?.name
                ? "text-muted"
                : ""
            }`}
            style={{
              // border: "1px solid grey",
              padding: "8px 15px",
              position: "relative",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
              maxHeight: "38px",
              overflow: "hidden",
              backgroundColor: formState === "view" ? "#EFF2F7" : "",
            }}
          >
            {!showFiles && files.length > 0 && (
              <IoIosArrowBack
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: `translateY(-50%)`,
                }}
                className="cursor-pointer"
                onClick={() => setShowFiles(!showFiles)}
              />
            )}
            {showFiles && files.length > 0 && (
              <IoIosArrowDown
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: `translateY(-50%)`,
                }}
                className="cursor-pointer"
                onClick={() => setShowFiles(!showFiles)}
              />
            )}

            {files?.length > 0 && `Files: ${files?.length}`}
            {formik?.values?.[field.name]?.length === 0 && "No file chosen"}
            {formik?.values?.[field.name]?.length !== 0 &&
              formState !== "view" && (
                <span
                  className="cursor-pointer"
                  style={{ position: "absolute", right: "30px" }}
                  onClick={() => {
                    setFiles([]);
                    setShowFiles(false);
                    //   formik.setFieldValue(field.name, null);
                  }}
                >
                  x
                </span>
              )}
          </div>
        </div>
        <div className="w-100" style={{ position: "absolute", right: "0px" }}>
          {files.length > 0 && showFiles && (
            <div className="d-flex flex-column border">
              {files.map((file, index) => (
                <div
                  className="d-flex flex-row gap-2  border-2 p-2 bg-white"
                  key={index}
                >
                  <span className="flex-grow-1">
                    {truncateString(file.name, 10)}
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const newFiles = files.filter((f, i) => i !== index);
                      setDeletedFiles(prev => [...prev, file.name]);
                      setFiles(newFiles);
                      if (newFiles.length === 0) {
                        setShowFiles(false);
                      }
                    }}
                  >
                    x
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MultiFileInputElement;
