import React from "react";
import { fieldLocation } from "./constant";

const ButtonElement = ({ field, buttonNameHook }) => {
  const {buttonName, setButtonName} = buttonNameHook;
  
  return (
    <div className={fieldLocation[field.fieldLocation]}>
      <button
        onClick={(e) => setButtonName(field.buttonName)}
        type={field.buttonType}
        className={`${field.buttonClass}`}
        name={field.buttonName}
      >
        {field.buttonText}
      </button>
    </div>
  );
};

export default ButtonElement;
