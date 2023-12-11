import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Label } from "reactstrap";
import "./DroppableList.scss";
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import {
  generateFormField,
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkVisibleOnGlobalCountry,
  checkAccessible,
} from "../../formelements/formElements_helper";
import Setting from "./Setting";
import DnDWrapper from "../dragndrop/DnDWrapper";

const DroppableList = ({
  row,
  formik,
  handleFormFieldEdit,
  handleFormFieldDelete,
  formFields,
  setRowtitle,
  handleDeleteLayoutAndField,
  toggleRowLayoutTitle,
  addDropzoneToRowLayout,
  deleteColumn,
  setUnusedFieldIsUsed,
  deleteTableData,
  setFormState,
  userDetails,
  country,
  showAll,
  removeUnusedFieldFromSchema,
  formOptions,
  buttonNameHook,
  formStateHook,
  formFieldsHook,
}) => {
  const { rowId, title, isTitle } = row;

  // Generate JSX for row section with droppable zones and draggable items(fields)
  const rowSection = row.droppableZones.map((zone, i) => {
    return (
      <DnDWrapper
        droppableType={`col`}
        droppableId={`col-${rowId}_${i}`}
        draggablePrefix="draggable-col-"
        draggableId={`${rowId}_${i}`}
        index={i}
        flex
        direction="horizontal"
      >
        <Droppable
          key={`field-${i}`}
          droppableId={`${rowId}_${i}`}
          type="field"
        >
          {(provided, snapshot) => {
            return (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`droppable-container ${
                  snapshot.isDraggingOver ? "droppable-drag-over" : ""
                }`}
              >
                <TiDelete
                  className="column-delete"
                  onClick={() => deleteColumn(rowId - 1, i)}
                />
                {zone.fieldIds.map((fieldId, index) => {
                  const field = formFields.find(
                    (field) => field.fieldId === fieldId
                  );
                  if (
                    !showAll
                      ? checkVisibleConditions(field, formik) &&
                        checkAccessible(field, userDetails) &&
                        (field?.countryOptions?.countryField === ""
                          ? checkVisibleOnGlobalCountry(field, country)
                          : checkVisibleOnCountry(field, formik)) &&
                        field.isUsed
                      : true
                  ) {
                    return (
                      <Draggable
                        draggableId={`field-${rowId}_${i}_${index}`}
                        index={index}
                        type="NIL"
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="draggable-item"
                          >
                            <div className="mb-4">
                              <div className="d-flex justify-content-between align-items-center mb-2 ">
                                <label
                                  htmlFor={field.name}
                                  className="form-label"
                                >
                                  {field.label}
                                </label>
                                <div className="editable">
                                  <div className={`d-flex gap-2`}>
                                    {(field?.fieldType === "custom" ||
                                      formOptions.formType === "base") && (
                                      <button
                                        className="btn btn-custom-primary"
                                        style={{ fontSize: "0.8rem" }}
                                        onClick={() =>
                                          handleFormFieldEdit(field.fieldId)
                                        }
                                      >
                                        <AiFillEdit />
                                      </button>
                                    )}
                                    {field?.fieldType === "predefined" && (
                                      <button
                                        className="btn btn-custom-primary"
                                        style={{ fontSize: "0.8rem" }}
                                        onClick={() => {
                                          setUnusedFieldIsUsed(
                                            field.fieldId,
                                            false
                                          );
                                          removeUnusedFieldFromSchema(
                                            field.fieldId
                                          );
                                        }}
                                      >
                                        {/* <i className="ri-edit-2-line"></i> */}
                                        <i className="ri-arrow-go-back-line"></i>
                                      </button>
                                    )}
                                    {((field?.fieldType !== "static" &&
                                      field?.fieldType !== "predefined") ||
                                      formOptions.formType === "base") && (
                                      <button
                                        className="btn btn-custom-primary"
                                        style={{ fontSize: "0.8rem" }}
                                        onClick={() => {
                                          handleFormFieldDelete(
                                            field.fieldId,
                                            `${rowId}_${i}`
                                          );
                                        }}
                                      >
                                        <i className="ri-delete-bin-line"></i>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              {generateFormField(
                                field,
                                formik,
                                deleteTableData,
                                buttonNameHook,
                                formStateHook,
                                formFieldsHook
                              )}
                              {formik.errors[field.name] &&
                              formik.touched[field.name] ? (
                                <div style={{ color: "red" }}>
                                  {formik.errors[field.name]}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </DnDWrapper>
      // </div>
      //   )}
      // </Draggable>
    );
  });

  return (
    <div className="border border-dotted border-dark p-3 m-2 droppable-list">
      <div
        className={`d-flex align-items-center ${
          isTitle ? "justify-content-between" : "justify-content-end"
        }`}
      >
        {isTitle && (
          <input
            type="text"
            value={title}
            className="mb-3 fw-bold h6 form-control"
            style={{borderColor: "lightgrey"}}
            onChange={(e) => setRowtitle(row, e.target.value)}
          />
        )}

        <div className="setting-container mb-2">
          <Setting>
            <div className="setting-menu">
              <div
                className="p-2 cursor-pointer text-center border-bottom border-muted hover:bg-gray-200 setting-text"
                onClick={() => toggleRowLayoutTitle(row)}
              >
                Toggle Title
              </div>
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    className="p-1 cursor-pointer text-center border-bottom border-muted setting-text"
                    onClick={() => addDropzoneToRowLayout(row, index + 1)}
                  >
                    {`${index + 1} Column`}
                  </div>
                ))}
              <div
                className="p-1 cursor-pointer text-center border-bottom border-muted setting-text"
                onClick={() => handleDeleteLayoutAndField(row)}
              >
                Delete
              </div>
            </div>
          </Setting>
        </div>
      </div>
      <div className="d-flex gap-3">{rowSection}</div>
    </div>
  );
};

export default DroppableList;
