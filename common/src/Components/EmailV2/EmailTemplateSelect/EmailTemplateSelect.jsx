import React from "react";
import { Button } from "reactstrap";
import SelectTemplateNoBorder from "./SelectTemplateNoBorder";

const EmailTemplateSelect = ({icon}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <Button className="px-1 py-0">
        {icon}
      </Button>
      <SelectTemplateNoBorder
        categoryName="Email Templates"
        width="100%"
        flexGrow={true}
      />
    </div>
  );
};

export default EmailTemplateSelect;
