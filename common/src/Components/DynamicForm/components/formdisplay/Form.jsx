import React, { useState, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import FormSectionList from "./FormSectionList";
import {
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkAccessible,
  checkVisibleOnGlobalCountry,
  checkCopyFieldConditions,
} from "../../formelements/formElements_helper";
import {
  generateInitialValues,
  generateValidationSchema2,
} from "../../helpers/formik_helper";
import {
  Label,
  Row,
  Col,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormFeedback,
  Button,
  Alert,
  Container,
} from "reactstrap";

const Form = ({
  template,
  userDetails,
  country,
  editData,
  showFormName,
  onFormikChange,
  onSubmit,
  onFormFieldsChange
}) => {
  const [formState, setFormState] = useState("create");
  const [formFields, setFormFields] = useState(template?.formSchema || []);
  const [formLayoutSchema, setFormLayoutSchema] = useState(
    template?.formLayoutSchema || []
  );
  const [formikInitialValues, setFormikInitialValues] = useState({});
  const [formikValidationSchema, setFormikValidationSchema] = useState({});
  const [formName, setFormName] = useState(template?.formName || "");
  const [buttonName, setButtonName] = useState("");
  const [editDataValues, setEditDataValues] = useState(null);

  console.log("Form Fields: ", formFields);

  useEffect(() => {
    onFormFieldsChange(formFields)
  },[formFields])

  /**
   * Set Form state
   */
  useEffect(() => {
    if (editData !== null) {
      setFormState("update");
      setEditDataValues(editData);
    } else {
      setFormState("create");
      setEditDataValues(null);
    }
  }, [editData]);

  console.log("editDataValues", editDataValues)

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
    if (formState === "create" || formState === "tableUpdate") {
      setFormikInitialValues(generateInitialValues(formFields));
      setFormikValidationSchema(generateValidationSchema2(formFields));
    } else {
      setFormikInitialValues(editDataValues);
      setFormikValidationSchema(generateValidationSchema2(formFields));
    }
  }, [formFields, editDataValues]);

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
  const handleFormSubmit = async (values, event) => {
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
      if (key === "") {
        delete newValues[key];
      }
    });

    // Set table data and toggle rerender
    let newFormFields = JSON.parse(JSON.stringify(formFields));
    // newFormFields = setTableData(newFormFields, newValues);
    newFormFields.forEach((field) => {
      if (field.type === "table") {
        field.tableRerender = !field.tableRerender;
      }
    });
    setFormFields(newFormFields);

    // Reset formik values

    await onSubmit(event, values, newValues, buttonName, {
      formState,
      setFormState,
    });
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
    if (formState === "create" || formState === "tableUpdate") {
      setFormikInitialValues(generateInitialValues(formFields));
      setFormikValidationSchema(generateValidationSchema2(formFields, formik));
    } else {
      setFormikInitialValues(editDataValues);
      setFormikValidationSchema(generateValidationSchema2(formFields, formik));
    }
  }, [formik.values, editDataValues]);

  // Handle copy field options if exist for fields
  useEffect(() => {
    if (formik.values) {
      // Check whether copy options is selected based on condition copy over the value
      formFields.forEach((field) => {
        if (!field?.copyFields?.copyField) return;
        if (checkCopyFieldConditions(field, formik)) {
          const copyField = formik.values[field.copyFields.copyField];
          formik.setFieldValue(field.name, copyField);
        }
      });
    }
  }, [formik.values]);

  /**
   * onFormikChange
   */
  useEffect(() => {
    if (onFormikChange) {
      onFormikChange(formik);
    }
  }, [onFormikChange]);

  return (
    <Container style={{ paddingRight: "40px" }}>
      <div className="">
        {formik && (
          <FormikProvider value={formik}>
            {showFormName && (
              <>
                <div className="d-flex gap-2 mb-4">
                  <h1>{formName}</h1>
                </div>
                <hr />
              </>
            )}
            <div>
              <form onSubmit={formik.handleSubmit} className="drag-zone">
                {/* <div className="lists-container"> */}
                {formLayoutSchema.map((row) => (
                  <Row>
                    <FormSectionList
                      key={row.rowId}
                      row={row}
                      formik={formik}
                      formFields={formFields}
                      formFieldsHook={{ formFields, setFormFields }}
                      deleteTableData={deleteTableData}
                      setFormState={setFormState}
                      userDetails={userDetails}
                      country={country}
                      buttonNameHook={{ buttonName, setButtonName }}
                      formStateHook={{ formState, setFormState }}
                    />
                  </Row>
                ))}
                {/* </div> */}

                {/* {formFields.length > 0 && (
              <button type="submit" className="btn btn-primary mt-3">
                {formState === "create" ? "Create" : "Update"}
              </button>
            )} */}

                {/* {formState === "update" && (
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
            )} */}
              </form>
            </div>
          </FormikProvider>
        )}
      </div>
    </Container>
  );
};

export default Form;
