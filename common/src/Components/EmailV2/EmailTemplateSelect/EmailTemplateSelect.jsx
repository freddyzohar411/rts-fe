import React from "react";
import { Button, Spinner } from "reactstrap";
import SelectTemplateNoBorder from "./SelectTemplateNoBorder";

const EmailTemplateSelect = ({
  icon,
  setTemplateData,
  category,
  value,
  addMoreOptions,
  selectRender,
  isLoading = false,
  placeholder,
}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <Button
        className="d-flex align-items-center justify-content-center"
        style={{
          height: "30px",
          width: "30px",
          backgroundColor: "#F5F5F5",
          border: "1px solid #A8A8A8",
          color: "#7A7A7A",
        }}
      >
        {icon}
      </Button>
      {isLoading ? (
        <div className="flex-grow-1 d-flex justify-content-center gap-2 align-items-center">
          <span>Attaching file</span>
          <Spinner size="sm" />
        </div>
      ) : (
        <SelectTemplateNoBorder
          onChange={(value) => {
            setTemplateData(value);
          }}
          categoryName={category}
          width="100%"
          flexGrow={true}
          value={value}
          selectRender={selectRender}
          addMore={addMoreOptions?.addMore}
          addMoreLabel={addMoreOptions?.addMoreLabel}
          addMoreRender={addMoreOptions?.render}
          addMoreStart={addMoreOptions?.addMoreStart}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default EmailTemplateSelect;
