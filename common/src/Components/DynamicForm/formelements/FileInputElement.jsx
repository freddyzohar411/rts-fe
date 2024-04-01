import React, { useRef, useState } from "react";
import { Button } from "reactstrap";
import axios from "axios";

const FileInputElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  const fileInputRef = useRef();
  const truncateString = (str, num) => {
    if (str) {
      return str;
    }
    if (str?.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const [fileData, setFileData] = useState({
    fileUrl: "",
    fileName: "",
  });


  // #New Check show all entity type and id
  console.log("File field: ", field);

  function downloadBase64File(base64Data, fileName) {
    const link = document.createElement("a");
    link.href = `data:application/octet-stream;base64,${base64Data}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Handle File Download
  const handleDownload = (entityInfo) => {
    console.log("Entity Info", entityInfo);
    if (entityInfo?.entityType && entityInfo?.entityId) {
      console.log(
        "FFFFF:" +
          `http://localhost:8500/api/documents/download/entity/${entityInfo?.entityType}/${entityInfo?.entityId}`
      );
      axios
        .get(
          `http://localhost:8500/api/documents/download/entity/${entityInfo?.entityType}/${entityInfo?.entityId}`
        )
        .then((res) => {
          console.log("Download Response", res);
          const documentData = res.data;
          downloadBase64File(documentData?.encodedFile, documentData?.fileName);
        })
        .catch((error) => {
          console.log("Error downloading file", error);
        });
    } else {
      console.log("Download Using document ID", entityInfo?.entityId);
      axios
        .get(
          `http://localhost:8500/api/documents/download/${entityInfo?.entityId}`
        )
        .then((res) => {
          console.log("Download Response", res);
          const documentData = res.data;
          downloadBase64File(documentData?.encodedFile, documentData?.fileName);
        })
        .catch((error) => {
          console.log("Error downloading file", error);
        });
    }
  };

  // File Download from fileURl
  const handleDownloadURL = () => {
    const link = document.createElement("a");
    link.href = fileData?.fileUrl;
    link.download = fileData?.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



  return (
    <>
      <input
        ref={fileInputRef}
        id={field.name}
        name={field.name}
        type={field.type}
        className="form-control"
        style={{ display: "none" }}
        onChange={(e) => {
          formik.setFieldTouched(field.name, "");
          formik.setFieldValue(field.name, e.target.files[0]);
          // Set file URL for file download
          setFileData({
            fileUrl: URL.createObjectURL(e.target.files[0]),
            fileName: e.target.files[0].name,
          });
          e.target.value = null;
        }}
        placeholder={field.placeholder}
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
          disabled={formState === "view" ? true : false}
          tabIndex={tabIndexData?.[field?.fieldId]}
        >
          Add File
        </button>
        <div
          className={`w-100 border-primary border border-1 ${
            !formik?.values?.[field.name] && !formik?.values?.[field.name]?.name
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
          {formik?.values?.[field.name]?.name
            ? truncateString(formik?.values?.[field.name]?.name, 15)
            : formik?.values?.[field.name] &&
              truncateString(formik?.values?.[field.name], 15)}
          {!formik?.values?.[field.name] &&
            !formik?.values?.[field.name]?.name &&
            "No file chosen"}
          {(formik?.values?.[field.name]?.name ||
            formik?.values?.[field.name]) &&
            formState !== "view" && (
              <span
                className="cursor-pointer"
                style={{ position: "absolute", right: "10px" }}
                onClick={() => formik.setFieldValue(field.name, null)}
              >
                x
              </span>
            )}
          {/* {formik?.values?.[field.name]?.name && <Button>DL</Button>} */}
          {formik?.values?.[field.name] &&
            !(formik?.values?.[field.name] instanceof File) && (
              <span
                className="mx-3 ri-download-line cursor-pointer"
                onClick={() => handleDownload(field?.entityInfo)}
              ></span>
            )}

            {
              formik?.values?.[field.name] &&
              (formik?.values?.[field.name] instanceof File) && (
                <span
                  className="mx-3 ri-download-line cursor-pointer"
                  onClick={handleDownloadURL}
                ></span>
              )
            }
        </div>
        {}
      </div>
    </>
  );
};

export default FileInputElement;
