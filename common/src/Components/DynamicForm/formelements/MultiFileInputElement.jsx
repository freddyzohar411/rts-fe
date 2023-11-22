import React, { useRef, useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const MultiFileInputElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const [files, setFiles] = useState([]); //
  const [existingFiles, setExistingFiles] = useState([]); // formik?.values?.[field.name
  const [showFiles, setShowFiles] = useState(false); // formik?.values?.[field.name
  const [deletedFiles, setDeletedFiles] = useState([]); // formik?.values?.[field.name
  const fileInputRef = useRef();

  useEffect(() => {
    if (
      formik?.values?.[field.name] === "" ||
      formik?.values?.[field.name] === null ||
      formik?.values?.[field.name] === undefined
      // typeof formik?.values?.[field.name] !== "object"
    ) {
      setFiles([]);
      setExistingFiles([]);
    }
  }, [formik?.values?.[field.name]]);

  useEffect(() => {
    if (field?.multiFileEnity) {
      const { entityType, entityId } = field?.multiFileEnity;
      axios
        .get(`http://localhost:8500/documents/entity/${entityType}/${entityId}`)
        .then((data) => {
          setExistingFiles(data.data);
          setFiles([]);
        })
        .catch((error) => {
          console.log("MULTI FILE INPUT error: ", error);
        });
    }
  }, [field?.multiFileEnity]);

  const truncateString = (str, num) => {
    if (str === undefined || str === null || str === "") {
      return "";
    }
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
    if (formik?.values?.[field.name]) {
      formik.setFieldValue(field?.name, files);
    }
  }, [files]);

  useEffect(() => {
    if (existingFiles.length > 0 && files.length === 0) {
      formik.setFieldValue(field.name, existingFiles?.join(","));
    }
  }, [existingFiles]);

  const handleDeleteAllFiles = async () => {
    setFiles([]);
    // Loop Through all the existing files and delete them
    await existingFiles.forEach((file) => {
      deleteFile(file.id);
    });
    // Set Existing files to empty array
    setExistingFiles([]);
    setShowFiles(false);
  };

  const checkifFileExists = () => {
    return files.length > 0 || existingFiles.length > 0;
  };

  const checkFileLength = () => {
    return files?.length + existingFiles?.length;
  };

  useEffect(() => {
    if (!checkifFileExists()) {
      setShowFiles(false);
    }
  }, [files, existingFiles]);

  const handleDeleteSingleExistingFile = async (file, index) => {
    try {
      await deleteFile(file.id);
      const newFiles = existingFiles.filter((f, i) => i !== index);
      setExistingFiles(newFiles);
      if (!checkifFileExists()) {
        setShowFiles(false);
      }
    } catch (error) {
      console.log("Error deleting file: ", error);
    }
  };

  // Delete a single file
  const deleteFile = async (id) => {
    await axios.delete(`http://localhost:8500/documents/${id}`);
  };

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
            {!showFiles && checkifFileExists() && (
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
            {showFiles && checkifFileExists() && (
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
            {checkifFileExists() && (
              <span style={{ position: "absolute", right: "28px" }}>|</span>
            )}
            {/* {files?.length > 0 && `Files: ${files?.length}`} */}
            {checkifFileExists() && `${checkFileLength()} files selected`}
            {!checkifFileExists() && "No file chosen"}
            {checkifFileExists() && formState !== "view" && (
              <span
                className="cursor-pointer"
                style={{ position: "absolute", right: "40px" }}
                onClick={handleDeleteAllFiles}
              >
                x
              </span>
            )}
          </div>
        </div>
        {showFiles && (
          <div
            className="w-100 border"
            style={{
              position: "absolute",
              right: "0px",
              borderRadius: "3px",
              zIndex: 9999,
            }}
          >
            {files.length > 0 && showFiles && (
              <div className="">
                {files.map((file, index) => (
                  <div
                    className="d-flex flex-row gap-2  border-2 p-2 bg-white"
                    key={index}
                  >
                    <span className="flex-grow-1">
                      {truncateString(file.name, 45)}
                    </span>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="cursor-pointer"
                      onClick={() => {
                        const newFiles = files.filter((f, i) => i !== index);
                        setDeletedFiles((prev) => [...prev, file.name]);
                        setFiles(newFiles);
                        if (!checkifFileExists()) {
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

            {existingFiles.length > 0 && showFiles && (
              <div className="">
                {existingFiles.map((file, index) => (
                  <div
                    className="d-flex flex-row gap-2  border-2 p-2 bg-white"
                    key={index}
                  >
                    <span className="flex-grow-1">
                      {truncateString(file?.title, 45)}
                    </span>
                    <span
                      style={{ fontWeight: "bold" }}
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteSingleExistingFile(file, index)
                      }
                    >
                      x
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MultiFileInputElement;
