import React from "react";

const ButtonElement = ({ field, buttonNameHook }) => {
  const {buttonName, setButtonName} = buttonNameHook;
  const buttonLocation = {
    left: "d-flex justify-content-start",
    center: "d-flex justify-content-center",
    right: "d-flex justify-content-end",
  };
  
  return (
    <div className={buttonLocation[field.buttonLocation]}>
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
