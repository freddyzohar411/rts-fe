import React from "react";
import DraggableBox from "./DraggableBox";
import UnusedFields from "../../unusedfields/UnusedFields";

const FormElementSidebar = ({ unusedFields }) => {
  // Element List
  const elementLists = [
    {
      draggableLabel: "Text Input",
      draggablePrefix: "element",
      draggableId: "text",
      type: "field",
    },
    {
      draggableLabel: "Number Input",
      draggablePrefix: "element",
      draggableId: "number",
      type: "field",
    },
    {
      draggableLabel: "Password Input",
      draggablePrefix: "element",
      draggableId: "password",
      type: "field",
    },
    {
      draggableLabel: "Email Input",
      draggablePrefix: "element",
      draggableId: "email",
      type: "field",
    },
    {
      draggableLabel: "File Input",
      draggablePrefix: "element",
      draggableId: "file",
      type: "field",
    },
    {
      draggableLabel: "Text Area",
      draggablePrefix: "element",
      draggableId: "textarea",
      type: "field",
    },
    {
      draggableLabel: "Select",
      draggablePrefix: "element",
      draggableId: "select",
      type: "field",
    },
    {
      draggableLabel: "Radio",
      draggablePrefix: "element",
      draggableId: "radio",
      type: "field",
    },
    {
      draggableLabel: "Checkbox",
      draggablePrefix: "element",
      draggableId: "checkbox",
      type: "field",
    },
    {
      draggableLabel: "Date",
      draggablePrefix: "element",
      draggableId: "date",
      type: "field",
    },
    {
      draggableLabel: "Industry Select",
      draggablePrefix: "element",
      draggableId: "selectindustry",
      type: "field",
    },
    {
      draggableLabel: "Sub Industry Select",
      draggablePrefix: "element",
      draggableId: "selectsubindustry",
      type: "field",
    },
    {
      draggableLabel: "Department Select",
      draggablePrefix: "element",
      draggableId: "selectdepartment",
      type: "field",
    },
    {
      draggableLabel: "Country Select",
      draggablePrefix: "element",
      draggableId: "selectcountry",
      type: "field",
    },
    {
      draggableLabel: "State Select",
      draggablePrefix: "element",
      draggableId: "selectstate",
      type: "field",
    },
    {
      draggableLabel: "City Select",
      draggablePrefix: "element",
      draggableId: "selectcity",
      type: "field",
    },
    {
      draggableLabel: "Currency Select",
      draggablePrefix: "element",
      draggableId: "selectcurrency",
      type: "field",
    },
    {
      draggableLabel: "Landline Select",
      draggablePrefix: "element",
      draggableId: "selectlandline",
      type: "field",
    },
    {
      draggableLabel: "Table",
      draggablePrefix: "element",
      draggableId: "table",
      type: "field",
    },
    {
      draggableLabel: "Editor",
      draggablePrefix: "element",
      draggableId: "editor",
      type: "field",
    },
    {
      draggableLabel: "Text",
      draggablePrefix: "element",
      draggableId: "word",
      type: "field",
    },
    {
      draggableLabel: "Button",
      draggablePrefix: "element",
      draggableId: "button",
      type: "field",
    },
    {
      draggableLabel: "Button-Update",
      draggablePrefix: "element",
      draggableId: "buttonupdate",
      type: "field",
    },
    {
      draggableLabel: "Parent Company",
      draggablePrefix: "element",
      draggableId: "parentcompany",
      type: "field",
    }
  ];

  // Layout List
  const layoutLists = [
    {
      draggableLabel: "Section",
      draggablePrefix: "layout",
      draggableId: "section",
      type: "row",
    },
    {
      draggableLabel: "Column 1",
      draggablePrefix: "layout",
      draggableId: "1",
      type: "row",
    },
    {
      draggableLabel: "Column 2",
      draggablePrefix: "layout",
      draggableId: "2",
      type: "row",
    },
    {
      draggableLabel: "Column 3",
      draggablePrefix: "layout",
      draggableId: "3",
      type: "row",
    },
    {
      draggableLabel: "Column",
      draggablePrefix: "layout",
      draggableId: "Column",
      type: "col",
    },
  ];

  const unusedFieldsLength = (unusedFields) =>
    unusedFields.filter((field) => field.isUsed === false).length;

  return (
    <div>
      <h3>Elements</h3>
      <div>
        {elementLists.map((element) => (
          <DraggableBox
            draggableLabel={element.draggableLabel}
            draggablePrefix={element.draggablePrefix}
            draggableId={element.draggableId}
            type={element.type}
          />
        ))}
      </div>

      <h3>Layout</h3>
      <div className="mt-1">
        {layoutLists.map((layout) => (
          <DraggableBox
            draggableLabel={layout.draggableLabel}
            draggablePrefix={layout.draggablePrefix}
            draggableId={layout.draggableId}
            type={layout.type}
          />
        ))}
      </div>

      <div className="d-flex gap-2 align-item-center justify-content-center">
        <h4>Unused Fields</h4>
        <span
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: "grey",
            borderRadius: "100%",
            fontSize: "15px",
          }}
          className="d-flex align-items-center justify-content-center"
        >
          {unusedFieldsLength(unusedFields)}
        </span>
      </div>
      {unusedFields?.length > 0 && <UnusedFields unusedFields={unusedFields} />}
    </div>
  );
};

export default FormElementSidebar;
