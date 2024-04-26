import React from "react";
import { Button } from "reactstrap";
import SelectTemplateNoBorder from "./SelectTemplateNoBorder";

const EmailTemplateSelect = ({ icon, setTemplateData, category, value}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <Button className="px-1 py-0">{icon}</Button>
      <SelectTemplateNoBorder
        onChange={(value) => {
          setTemplateData(value);
        }}
        categoryName={category}
        width="100%"
        flexGrow={true}
        value={value}
      />
    </div>
  );
};

export default EmailTemplateSelect;
