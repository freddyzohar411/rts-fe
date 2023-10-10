import React from "react";
import { fieldLocation } from "./constant";

const ButtonUpdateElement = ({ field, formik, buttonNameHook, formStateHook }) => {
  const {buttonName, setButtonName} = buttonNameHook;
  const {formState, setFormState} = formStateHook;

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
    <div className={fieldLocation[field.fieldLocation]}>
      {(formState === "create" || formState === "update") && buttonJsx}
      {formState === "tableUpdate" && updateButtonJsx}
    </div>
  );
};

export default ButtonUpdateElement;
