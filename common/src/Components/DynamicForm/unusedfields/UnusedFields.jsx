import React from "react";
import DraggableBox from "../components/formbuilder/DraggableBox";

const UnusedFields = ({ unusedFields }) => {
  return (
    <div>
      {unusedFields.map((field) => {
        if (!field.isUsed) {
          return (
            <DraggableBox
              draggableLabel={field.label}
              draggablePrefix="unused"
              draggableId={field.fieldId}
              type="field"
            />
          );
        }
      })}
    </div>
  );
};

export default UnusedFields;
