import React, { useRef } from "react";
import { toast } from "react-toastify";

const FileInputElement = ({
  setFile,
  placeholder,
  fileSelected,
  disabled,
  width,
}) => {
  const fileInputRef = useRef();
  const truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const handleFileChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    // Check if file is a docx file type
    // if (
    //   e.target.files[0].type !==
    //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
    //   e.target.files[0].type !== "application/pdf" &&  //Excel
    //   e.target.files[0].type !== "application/vnd.ms-excel" //Excel
    // ) {
    //   toast.error("Please upload a valid docx or PDF file");
    //   return;
    // }
    setFile(e.target.files[0]);
    e.target.value = null;
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        className="form-control"
        style={{ display: "none" }}
        onChange={handleFileChange}
        placeholder={placeholder}
      />
      {/* Create a similar file input to replace the actual file input */}
      <div className="d-flex align-items-center w-100 h-100">
        <button
          type="button"
          className="btn btn-custom-primary"
          style={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
            whiteSpace: "nowrap",
          }}
          onClick={() => {
            fileInputRef.current.click();
          }}
          disabled={disabled}
        >
          Add File
        </button>
        <div
          className={`w-100 border-primary border border-1 ${
            !fileSelected ? "text-muted" : ""
          }`}
          style={{
            padding: "8px 15px",
            position: "relative",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            maxHeight: "38px",
            overflow: "hidden",
            backgroundColor: disabled ? "#EFF2F7" : "",
            width: width ? width : "100%",
          }}
        >
          {fileSelected
            ? truncateString(fileSelected.name, 15)
            : "No file chosen"}
          {fileSelected && !disabled && (
            <span
              className="cursor-pointer"
              style={{ position: "absolute", right: "10px" }}
              onClick={() => setFile(null)}
            >
              x
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default FileInputElement;
