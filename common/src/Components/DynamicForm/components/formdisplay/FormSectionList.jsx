import React from "react";
import {
  generateFormField,
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkVisibleOnGlobalCountry,
  checkAccessible,
} from "../../formelements/formElements_helper";

const FormSectionList = ({
  row,
  formik,
  formFields,
  deleteTableData,
  setFormState,
  userDetails,
  country,
}) => {
  const { rowId, title, isTitle } = row;
  const col = row.droppableZones.length;

  let lists = [];
  for (let i = 0; i < col; i++) {
    lists.push(
      <div className={`flex-fill w-100`}>
        {row.droppableZones[i].fieldIds.map((fieldId, index) => {
          const field = formFields.find((field) => field.fieldId === fieldId);
          if (
            checkVisibleConditions(field, formik) &&
            checkAccessible(field, userDetails) &&
            (field?.countryOptions?.countryField === ""
              ? checkVisibleOnGlobalCountry(field, country)
              : checkVisibleOnCountry(field, formik))
          ) {
            return (
              <div className="draggable-item">
                <div className="mb-4">
                  <label htmlFor={field.name} className="form-label">
                    {field.label}
                  </label>
                  {generateFormField(
                    field,
                    formik,
                    deleteTableData,
                    setFormState
                  )}
                  <div style={{ minHeight: "25px" }}>
                    {formik.errors[field.name] && formik.touched[field.name] ? (
                      <div style={{ color: "red", fontSize: "0.9rem" }}>
                        {formik.errors[field.name]}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }

  return (
    <div>
      {isTitle && <h3>{title}</h3>}
      <div className="d-flex gap-3">{lists}</div>
    </div>
  );
};

export default FormSectionList;
