import React, { useState, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import FormSectionList from "./FormSectionList";
import {
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkAccessible,
  checkVisibleOnGlobalCountry,
} from "../../formelements/formElements_helper";
import {
  generateInitialValues,
  generateValidationSchema2,
} from "../../helpers/formik_helper";

const Form = ({ template, userDetails, country, editData }) => {
  const [formState, setFormState] = useState("create");
  const [formFields, setFormFields] = useState(template?.formSchema || []);
  const [formLayoutSchema, setFormLayoutSchema] = useState(
    template?.formLayoutSchema || []
  );
  const [formikInitialValues, setFormikInitialValues] = useState({});
  const [formikValidationSchema, setFormikValidationSchema] = useState({});
  const [formName, setFormName] = useState(template?.formName || "");

  /**
   * Set Form state
   */
  useEffect(() => {
    if (editData) {
      setFormState("update");
    }
  }, [editData]);

  /**
   * Set template data
   */
  useEffect(() => {
    if (template) {
      setFormFields(template?.formSchema);
      setFormName(template?.formName);
      setFormLayoutSchema(template?.formLayoutSchema);
    } else {
      setFormFields([]);
      setFormName("");
      setFormLayoutSchema([]);
    }
  }, [template]);

  console.log("Form State: ", formState);

  useEffect(() => {
    if (formState === "create") {
      setFormikInitialValues(generateInitialValues(formFields));
      setFormikValidationSchema(generateValidationSchema2(formFields));
    } else {
      setFormikInitialValues(editData);
      setFormikValidationSchema(generateValidationSchema2(formFields));
    }
  }, [formFields, editData]);

  // =====================================================
  /**
   * Delete Table data by index
   */
  const deleteTableData = (index) => {
    console.log("Delete table row: ", index);
    const newFormFields = JSON.parse(JSON.stringify(formFields));
    // const newFormFields = [...formFields];
    newFormFields.forEach((field) => {
      if (field.type === "table") {
        field.tableData.splice(index, 1);
      }
    });
    setFormFields(newFormFields);
  };

  /**
   * Handle Form Submit
   * @param {*} values
   */
  const handleFormSubmit = (values) => {
    console.log("values", values);

    // Remove fields that are not visible or accessible
    const newValues = { ...values };
    formFields.forEach((field) => {
      if (
        !checkVisibleConditions(field, formik) ||
        !checkAccessible(field, userDetails) ||
        (field.countryOptions?.countryField === ""
          ? !checkVisibleOnGlobalCountry(field, country)
          : !checkVisibleOnCountry(field, formik))
      ) {
        console.log("Delete Field: ", field.name);
        delete newValues[field.name];
      }
    });

    // Remove empty fields
    Object.keys(newValues).forEach((key) => {
      if (newValues[key] === "") {
        delete newValues[key];
      }
    });

    // Set table data and toggle rerender
    let newFormFields = JSON.parse(JSON.stringify(formFields));
    newFormFields = setTableData(newFormFields, newValues);
    newFormFields.forEach((field) => {
      if (field.type === "table") {
        field.tableRerender = !field.tableRerender;
      }
    });
    setFormFields(newFormFields);

    console.log("FormDataOut: ", newValues);

    // Download the form data as JSON
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(newValues, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${formName}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    // remove it once done
    document.body.removeChild(element);
  };

  /**
   * Check which field with tableData and  add it to the array
   */
  const setTableData = (formFields, values) => {
    // const newFormFields = JSON.parse(JSON.stringify(formFields));
    formFields.forEach((field) => {
      if (field.type === "table") {
        field.tableData = [...field.tableData, values];
      }
    });
    // setFormFields(newFormFields);
    return formFields;
  };

  /**
   * Initialize Formik (useFormik Hook)
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValues,
    validationSchema: formikValidationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    if (formState === "create") {
      setFormikInitialValues(generateInitialValues(formFields));
      setFormikValidationSchema(generateValidationSchema2(formFields, formik));
    } else {
      setFormikInitialValues(editData);
      setFormikValidationSchema(generateValidationSchema2(formFields, formik));
    }
  }, [formik.values, editData]);

  return (
    <div className="">
      {formik && (
        <FormikProvider value={formik}>
          <div className="d-flex gap-2 mb-4">
            <h1>{formName}</h1>
          </div>
          <hr />
          <div className="mt-4">
            <form onSubmit={formik.handleSubmit} className="drag-zone">
              <div className="lists-container">
                {formLayoutSchema.map((row) => (
                  <FormSectionList
                    key={row.rowId}
                    row={row}
                    formik={formik}
                    formFields={formFields}
                    deleteTableData={deleteTableData}
                    setFormState={setFormState}
                    userDetails={userDetails}
                    country={country}
                  />
                ))}
              </div>
              {formFields.length > 0 && (
                <button type="submit" className="btn btn-primary mt-3">
                  {formState === "create" ? "Create" : "Update"}
                </button>
              )}
              {/* // Need a cancel button */}
              {formState === "update" && (
                <button
                  type="button"
                  className="btn btn-danger mt-3 ms-3"
                  onClick={() => {
                    setFormState("create");
                    // Reset formik values
                    formik.resetForm();
                  }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </FormikProvider>
      )}
    </div>
  );
};

export default Form;
