import React, { useRef } from "react";

const FileInputElement = ({ formik, field, formStateHook }) => {
  const { formState } = formStateHook;
  const fileInputRef = useRef();
  const truncateString = (str, num) => {
    if (str?.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

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
          e.target.value = null;
        }}
        placeholder={field.placeholder}
      />
      {/* Create a similar file input to replace the actual file input */}
      <div className="d-flex align-items-center w-100 h-100">
        <button
          type="button"
          className="btn btn-secondary"
          style={{
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          onClick={() => {
            fileInputRef.current.click();
          }}
          disabled={formState === "view" ? true : false}
        >
          ChooseFile
        </button>
        <div
          className="w-100 border-secondary border"
          style={{
            // border: "1px solid grey",
            padding: "8px 15px",
            position: "relative",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
            maxHeight: "38px",
            overflow: "hidden",
          }}
        >
          {formik?.values?.[field.name]?.name
            ? truncateString(formik?.values?.[field.name]?.name, 15)
            : formik?.values?.[field.name] &&
              truncateString(formik?.values?.[field.name], 15)}
          {!formik?.values?.[field.name] &&
            !formik?.values?.[field.name]?.name &&
            "No file chosen"}
          {(formik?.values?.[field.name]?.name || formik?.values?.[field.name]) &&
            formState !== "view" && (
              <span
                className="cursor-pointer"
                style={{ position: "absolute", right: "10px" }}
                onClick={() => formik.setFieldValue(field.name, null)}
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
