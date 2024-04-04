import React, { useRef, useState } from "react";
import * as BackendHelper from "../../../helpers/backend_helper";
import * as FileHelper from "../../../helpers/file_helper";
import { toast } from "react-toastify";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import FilePreview from "../../FilePreview/FilePreview";

const FileInputElement = ({ formik, field, formStateHook, tabIndexData }) => {
  const { formState } = formStateHook;
  const fileInputRef = useRef();
  const [fileData, setFileData] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const truncateString = (str, num) => {
    if (str) {
      return str;
    }
    if (str?.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  // Handle File Download
  const handleDownload = async (entityInfo) => {
    console.log("entityInfo", entityInfo)
    let documentData = null;
    if (entityInfo?.entityType && entityInfo?.entityId) {
      const res = await BackendHelper.downloadDocumentByEntityAndId(entityInfo);
      documentData = res.data;
    } else {
      const res = await BackendHelper.downloadDocumentById(
        entityInfo?.entityId
      );
      documentData = res.data;
    }

    if (!documentData?.encodedFile) {
      toast.error("File not found.");
      return;
    }

    FileHelper.downloadBase64File(
      documentData?.encodedFile,
      documentData?.fileName
    );
  };

  // File Download from fileURl
  const handleDownloadURL = () => {
    const link = document.createElement("a");
    link.href = fileData?.fileUrl;
    link.download = fileData?.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle File Preview
  const handlePreview = async (entityInfo) => {
    let documentData = null;
    if (entityInfo?.entityType && entityInfo?.entityId) {
      const res = await BackendHelper.downloadDocumentByEntityAndId({
        entityType: entityInfo?.entityType,
        entityId: entityInfo?.entityId,
      });
      documentData = res.data;
    } else {
      const res = await BackendHelper.downloadDocumentById(
        entityInfo?.entityId
      );
      documentData = res.data;
    }
    const ext = documentData?.fileName.split(".").pop();

    if (ext == "docx" || ext == "doc" || ext == "xlsx" || ext == "xls") {
      // Convert to formdata
      const formData = new FormData();
      formData.append(
        "docFile",
        FileHelper.base64ToFile(
          documentData?.encodedFile,
          documentData?.fileName
        )
      );

      const convertedData = await BackendHelper.convertMsDocToPdf(formData);
      const docData = convertedData.data;
      const pdfName = docData?.fileName?.split(".")[0] + ".pdf";
      const file = await FileHelper.base64ToFile(docData?.encodedFile, pdfName);
      setFilePreview(file);
      setShowPreviewModal(true);
      return;
    }

    if (ext == "pdf") {
      const file = FileHelper.base64ToFile(
        documentData?.encodedFile,
        documentData?.fileName
      );
      setFilePreview(file);
      setShowPreviewModal(true);
      return;
    }

    toast.error("File format not supported for preview.");
  };

  // File Preview from fileURl
  const handlePreviewURL = async () => {
    console.log("fileData", fileData);
    const ext = fileData?.fileName?.split(".").pop();
    if (ext == "docx" || ext == "doc" || ext == "xlsx" || ext == "xls") {
      // Convert to formdata
      const formData = new FormData();
      formData.append("docFile", fileData?.file);
      const res = await BackendHelper.convertMsDocToPdf(formData);
      const docData = res.data;
      const pdfName = docData?.fileName?.split(".")[0] + ".pdf";
      const file = FileHelper.base64ToFile(docData?.encodedFile, pdfName);
      setFilePreview(file);
      setShowPreviewModal(true);
      return;
    }

    if (ext == "pdf") {
      setFilePreview(fileData?.file);
      setShowPreviewModal(true);
      return;
    }

    toast.error("File format not supported for preview.");
  };

  return (
    <>
      <Modal
        isOpen={showPreviewModal}
        closeModal={() => {
          setShowPreviewModal(false);
        }}
        centered
        scrollable
        size="xl"
      >
        <ModalHeader
          className="bg-primary pb-3"
          toggle={() => setShowPreviewModal(false)}
        >
          <div className="d-flex flex-column text-dark">
            <span className="h5 fw-bold">Document Preview</span>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <FilePreview file={filePreview} />
        </ModalBody>
      </Modal>
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
          setFileData({
            file: e.target.files[0],
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
          {formik?.values?.[field.name] &&
            !(formik?.values?.[field.name] instanceof File) && (
              <span
                className="mx-3 ri-download-line cursor-pointer"
                onClick={() => handleDownload(field?.entityInfo)}
              ></span>
            )}
          {formik?.values?.[field.name] &&
            !(formik?.values?.[field.name] instanceof File) && (
              <span
                className="ri-eye-line cursor-pointer"
                onClick={() => handlePreview(field?.entityInfo)}
              ></span>
            )}

          {formik?.values?.[field.name] &&
            formik?.values?.[field.name] instanceof File && (
              <span
                className="mx-3 ri-download-line cursor-pointer"
                onClick={handleDownloadURL}
              ></span>
            )}
          {formik?.values?.[field.name] &&
            formik?.values?.[field.name] instanceof File && (
              <span
                className="ri-eye-line cursor-pointer"
                onClick={() => handlePreviewURL(field?.entityInfo)}
              ></span>
            )}
        </div>
      </div>
    </>
  );
};

export default FileInputElement;
