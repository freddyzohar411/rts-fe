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
}) => {
  return (
    <div className="d-flex gap-2 align-items-center">
      <Button className="px-1 py-0 d-flex">{icon}</Button>

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
        />
      )}
    </div>
  );
};

export default EmailTemplateSelect;
