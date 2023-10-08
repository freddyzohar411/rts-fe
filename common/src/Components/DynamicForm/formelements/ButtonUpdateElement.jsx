import React from "react";

const ButtonUpdateElement = ({ field, formik, buttonNameHook, formStateHook }) => {
  const {buttonName, setButtonName} = buttonNameHook;
  const {formState, setFormState} = formStateHook;

  const buttonLocation = {
    left: "d-flex justify-content-start",
    center: "d-flex justify-content-center",
    right: "d-flex justify-content-end",
  };

  const buttonJsx = (
    <button
      onClick={(e) => setButtonName(field.buttonName)}
      type={field.buttonType}
      className={`${field.buttonClass}`}
      name={field.buttonName}
    >
      {field.buttonText}
    </button>
  );

  const updateButtonJsx = (
    <div className="d-flex gap-3 align-items-center">
      <button
        onClick={(e) => setButtonName("tableUpdate")}
        type={`submit`}
        className="btn btn-secondary"
        name="updateButton"
      >
        Update
      </button>
      <button
        type={`submit`}
        className="btn btn-danger"
        name="cancelButton"
        onClick={(e) => setButtonName("cancel")}
      >
        Cancel
      </button>
    </div>
  );

  return (
    <div className={buttonLocation[field.buttonLocation]}>
      {(formState === "create" || formState === "update") && buttonJsx}
      {formState === "tableUpdate" && updateButtonJsx}
    </div>
  );
};

export default ButtonUpdateElement;
