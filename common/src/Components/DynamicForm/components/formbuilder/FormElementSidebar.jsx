import React, { useState } from "react";
import DraggableBox from "./DraggableBox";
import { Input } from "reactstrap";
import UnusedFields from "../../unusedfields/UnusedFields";
import SimpleBar from "simplebar-react";
// import "./FormElementSidebar.scss";

const FormElementSidebar = ({ unusedFields }) => {
  const [isListOpen, setIsListOpen] = useState({
    unusedFields: false,
    elements: false,
    customElements: false,
    layout: true,
  });

  const [searchQuery, setSearchQuery] = useState("");
  // Element List
  const elementLists = [
    {
      draggableLabelIcon: "mdi mdi-text-recognition",
      draggableLabel: "Text Input",
      draggablePrefix: "element",
      draggableId: "text",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-numeric",
      draggableLabel: "Number Input",
      draggablePrefix: "element",
      draggableId: "number",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-lock-outline",
      draggableLabel: "Password Input",
      draggablePrefix: "element",
      draggableId: "password",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-email-outline",
      draggableLabel: "Email Input",
      draggablePrefix: "element",
      draggableId: "email",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-file-outline",
      draggableLabel: "File Input",
      draggablePrefix: "element",
      draggableId: "file",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-form-textbox",
      draggableLabel: "Text Area",
      draggablePrefix: "element",
      draggableId: "textarea",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-form-select",
      draggableLabel: "Select",
      draggablePrefix: "element",
      draggableId: "select",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-card-search-outline",
      draggableLabel: "Multi Input",
      draggablePrefix: "element",
      draggableId: "multiinput",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-radiobox-marked",
      draggableLabel: "Radio",
      draggablePrefix: "element",
      draggableId: "radio",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-checkbox-marked-outline",
      draggableLabel: "Checkbox",
      draggablePrefix: "element",
      draggableId: "checkbox",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-calendar-month-outline",
      draggableLabel: "Date",
      draggablePrefix: "element",
      draggableId: "date",
      type: "field",
    },

    {
      draggableLabelIcon: "mdi mdi-table",
      draggableLabel: "Table",
      draggablePrefix: "element",
      draggableId: "table",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-text-shadow",
      draggableLabel: "Editor",
      draggablePrefix: "element",
      draggableId: "editor",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-format-size",
      draggableLabel: "Text",
      draggablePrefix: "element",
      draggableId: "word",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-shape-circle-plus",
      draggableLabel: "Button",
      draggablePrefix: "element",
      draggableId: "button",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-refresh-circle",
      draggableLabel: "Button-Update",
      draggablePrefix: "element",
      draggableId: "buttonupdate",
      type: "field",
    },
  ];

  // Custom Element List
  const customElementLists = [
    {
      draggableLabelIcon: "ri-building-2-line",
      draggableLabel: "Industry Select",
      draggablePrefix: "element",
      draggableId: "selectindustry",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-building-2-fill",
      draggableLabel: "Sub Industry Select",
      draggablePrefix: "element",
      draggableId: "selectsubindustry",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-bank-line",
      draggableLabel: "Department Select",
      draggablePrefix: "element",
      draggableId: "selectdepartment",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-earth",
      draggableLabel: "Country Select",
      draggablePrefix: "element",
      draggableId: "selectcountry",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-road-map-line",
      draggableLabel: "State Select",
      draggablePrefix: "element",
      draggableId: "selectstate",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-road-map-fill",
      draggableLabel: "City Select",
      draggablePrefix: "element",
      draggableId: "selectcity",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-currency-usd",
      draggableLabel: "Currency Select",
      draggablePrefix: "element",
      draggableId: "selectcurrency",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-phone-outline",
      draggableLabel: "Landline Select",
      draggablePrefix: "element",
      draggableId: "selectlandline",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-office-building",
      draggableLabel: "Parent Company",
      draggablePrefix: "element",
      draggableId: "parentcompany",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-select",
      draggableLabel: "Single Select",
      draggablePrefix: "element",
      draggableId: "singleselect",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-select",
      draggableLabel: "Single Select API",
      draggablePrefix: "element",
      draggableId: "singleselectapi",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-select-multiple",
      draggableLabel: "Multi Select",
      draggablePrefix: "element",
      draggableId: "multiselect",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-select-multiple",
      draggableLabel: "Multi Select API",
      draggablePrefix: "element",
      draggableId: "multiselectapi",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-card-search-outline",
      draggableLabel: "Search Select",
      draggablePrefix: "element",
      draggableId: "searchselect",
      type: "field",
    },
    {
      draggableLabelIcon: "mdi mdi-file-document-multiple-outline",
      draggableLabel: "Multi File Input",
      draggablePrefix: "element",
      draggableId: "multifile",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-account-box-fill",
      draggableLabel: "Account Name Select",
      draggablePrefix: "element",
      draggableId: "selectaccountname",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-account-box-fill",
      draggableLabel: "Account Name All Select",
      draggablePrefix: "element",
      draggableId: "selectaccountnameall",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-contacts-fill",
      draggableLabel: "Account Contact Select",
      draggablePrefix: "element",
      draggableId: "selectaccountcontact",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-file-text-line",
      draggableLabel: "Form Template Select",
      draggablePrefix: "element",
      draggableId: "selectformtemplate",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-file-text-line",
      draggableLabel: "Candidate Status Select",
      draggablePrefix: "element",
      draggableId: "selectcandidatestatus",
      type: "field",
    },
    {
      draggableLabelIcon: "ri-account-box-fill",
      draggableLabel: "Account Owner",
      draggablePrefix: "element",
      draggableId: "accountowner",
      type: "field",
    },
  ];

  // Layout List
  const layoutLists = [
    {
      draggableLabelIcon: "mdi mdi-rectangle-outline",
      draggableLabel: "Section",
      draggablePrefix: "layout",
      draggableId: "section",
      type: "row",
    },
    {
      draggableLabelIcon: "mdi mdi-format-align-justify",
      draggableLabel: "1 Column",
      draggablePrefix: "layout",
      draggableId: "1",
      type: "row",
    },
    {
      draggableLabelIcon: "mdi mdi-format-columns",
      draggableLabel: "2 Columns",
      draggablePrefix: "layout",
      draggableId: "2",
      type: "row",
    },
    {
      draggableLabelIcon: "mdi mdi-view-week-outline",
      draggableLabel: "3 Columns",
      draggablePrefix: "layout",
      draggableId: "3",
      type: "row",
    },
    {
      draggableLabelIcon: "mdi mdi-rectangle-outline",
      draggableLabel: "Column",
      draggablePrefix: "layout",
      draggableId: "Column",
      type: "col",
    },
  ];

  const unusedFieldsLength = (unusedFields) =>
    unusedFields.filter((field) => field.isUsed === false).length;

  return (
    <div className="mt-2">
      {/* Unused Fields */}
      <div className="d-flex justify-content-center align-items-baseline gap-2">
        <span
          className="bg-white d-flex align-items-center justify-content-center"
          style={{
            color: "#405189",
            width: "25px",
            height: "25px",
            borderRadius: "100%",
          }}
        >
          {unusedFieldsLength(unusedFields)}
        </span>
        <span
          onClick={() => {
            setIsListOpen({
              ...isListOpen,
              unusedFields: !isListOpen.unusedFields,
            });
          }}
          className="cursor-pointer h6 fw-bold text-white"
        >
          UNUSED FIELDS
        </span>
      </div>
      {isListOpen.unusedFields && unusedFields?.length > 0 && (
        <UnusedFields unusedFields={unusedFields} />
      )}
      <hr style={{ border: "1px dashed #fff" }} />
      <div className="d-flex flex-column gap-3">
        <div>
          <span className="h6 fw-bold text-white">SEARCH ALL ELEMENTS</span>
        </div>
        <div className="search-box">
          <Input
            className="form-control"
            type="text"
            placeholder="Search for elements.."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <i className="ri-search-line search-icon"></i>
        </div>
      </div>

      <hr style={{ border: "1px dashed #fff" }} />

      {/* Elements */}
      <span
        onClick={() => {
          setIsListOpen({
            ...isListOpen,
            elements: !isListOpen.elements,
          });
        }}
        className="cursor-pointer h6 fw-bold text-white"
      >
        ELEMENTS
      </span>

      {isListOpen.elements && (
        <div>
          <SimpleBar style={{ maxHeight: `calc(100vh - 350px)` }}>
            {elementLists
              .filter((element) =>
                element.draggableLabel
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((element) => (
                <DraggableBox
                  key={element.draggableId}
                  draggableLabelIcon={element.draggableLabelIcon}
                  draggableLabel={element.draggableLabel}
                  draggablePrefix={element.draggablePrefix}
                  draggableId={element.draggableId}
                  type={element.type}
                />
              ))}
            {elementLists.filter((element) =>
              element.draggableLabel
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="text-start text-white my-4">
                <span>No elements found.</span>
              </div>
            )}
          </SimpleBar>
        </div>
      )}
      <hr style={{ border: "1px dashed #fff" }} />

      {/* Custom Elements */}
      <span
        onClick={() => {
          setIsListOpen({
            ...isListOpen,
            customElements: !isListOpen.customElements,
          });
        }}
        className="cursor-pointer h6 fw-bold text-white"
      >
        CUSTOM ELEMENTS
      </span>

      {isListOpen.customElements && (
        <div>
          <SimpleBar style={{ maxHeight: `calc(100vh - 350px)` }}>
            {customElementLists
              .filter((customElement) =>
                customElement.draggableLabel
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((customElement) => (
                <DraggableBox
                  key={customElement.draggableId}
                  draggableLabelIcon={customElement.draggableLabelIcon}
                  draggableLabel={customElement.draggableLabel}
                  draggablePrefix={customElement.draggablePrefix}
                  draggableId={customElement.draggableId}
                  type={customElement.type}
                />
              ))}
            {customElementLists.filter((customElement) =>
              customElement.draggableLabel
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ).length === 0 && (
              <div className="text-start text-white my-4">
                <span>No custom elements found.</span>
              </div>
            )}
          </SimpleBar>
        </div>
      )}
      <hr style={{ border: "1px dashed #fff" }} />

      {/* Layout */}
      <span
        onClick={() => {
          setIsListOpen({
            ...isListOpen,
            layout: !isListOpen.layout,
          });
        }}
        className="cursor-pointer h6 fw-bold text-white"
      >
        LAYOUT
      </span>
      {isListOpen.layout && (
        <div className="mt-1">
          {layoutLists.map((layout) => (
            <DraggableBox
              draggableLabelIcon={layout.draggableLabelIcon}
              draggableLabel={layout.draggableLabel}
              draggablePrefix={layout.draggablePrefix}
              draggableId={layout.draggableId}
              type={layout.type}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FormElementSidebar;
