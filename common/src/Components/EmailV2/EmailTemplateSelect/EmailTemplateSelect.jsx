import React from "react";
import { Button } from "reactstrap";
import SelectTemplateNoBorder from "./SelectTemplateNoBorder";

const EmailTemplateSelect = ({ icon, setTemplateData, category, value, addMoreOptions, selectRender}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <Button className="px-1 py-0" style={{height: "28px",
            width: "28px",
            backgroundColor: "#F5F5F5",
            border: "1px solid #A8A8A8",
            color: "#7A7A7A",}}>{icon}</Button>
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
      />
    </div>
  );
};

export default EmailTemplateSelect;
