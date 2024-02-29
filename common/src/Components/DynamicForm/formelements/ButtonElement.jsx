import React from "react";
import { fieldLocation } from "./constant";

const ButtonElement = ({ field, buttonNameHook, tabIndexData }) => {
  const { buttonName, setButtonName } = buttonNameHook;



  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <button
        onClick={(e) => setButtonName(field.buttonName)}
        type={field.buttonType}
        className={`${field.buttonClass}`}
        name={field.buttonName}
        tabIndex={tabIndexData?.[field?.fieldId]}
      >
        {field.buttonText}
      </button>
    </div>
  );
};

export default ButtonElement;
