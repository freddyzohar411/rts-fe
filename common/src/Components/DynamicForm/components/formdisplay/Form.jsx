import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
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
  populateInitialValues,
} from "../../helpers/formik_helper";
import { Col, Row, Alert, Container } from "reactstrap";

const Form = forwardRef(
  (
    {
      template,
      userDetails,
      country,
      editData,
      showFormName,
      onFormikChange,
      onSubmit,
      onFormFieldsChange,
      errorMessage,
      view,
    },
    ref
  ) => {
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
    const [tabIndexData, setTabIndexData] = useState({});

    // 'fieldTabIndex' is now your desired object
    useEffect(() => {
      if (formLayoutSchema) {
        const formSchemaList = formLayoutSchema;

        const fieldTabIndex = {};

        // Iterate through each section and assign tab indexes
        formSchemaList.forEach((section) => {
          // Find the maximum number of fields in any droppable zone for this section
          const maxFieldsInZone = Math.max(
            ...section.droppableZones.map((zone) => zone.fieldIds.length)
          );

          // Assign tab indexes, going horizontally across columns (zones)
          for (let rowIndex = 0; rowIndex < maxFieldsInZone; rowIndex++) {
            section.droppableZones.forEach((zone) => {
              // If there is a field at the current row index in this zone, assign it the next tabIndex
              if (rowIndex < zone.fieldIds.length) {
                const fieldId = zone.fieldIds[rowIndex];
                fieldTabIndex[fieldId] = Object.keys(fieldTabIndex).length + 1;
              }
            });
          }
        });

        // 'fieldTabIndex' now contains the field IDs as keys and their tab order as values
        setTabIndexData(fieldTabIndex);
      }
    }, [formLayoutSchema]);

    // Reset button name and form state when form name changes in case user did not cancel the form
    useEffect(() => {
      if (formState === "tableUpdate") {
        setButtonName("");
        setFormState("create");
      }
    }, [formName]);

    useEffect(() => {
      if (onFormFieldsChange) {
        onFormFieldsChange(formFields);
      }
    }, [formFields]);

    /**
     * Set Form state
     */
    useEffect(() => {
      if (view) {
        setFormState("view");
        setEditDataValues(editData);
        return;
      }

      if (editData !== null) {
        setFormState("update");
        setEditDataValues(editData);
      } else {
        setFormState("create");
        setEditDataValues(null);
      }
    }, [editData, view]);

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

    useEffect(() => {
      if (
        formState === "create" ||
        formState === "tableUpdate" ||
        !editData ||
        view
      ) {
        setFormikInitialValues(generateInitialValues(formFields));
        setFormikValidationSchema(generateValidationSchema2(formFields));
      } else {
        setFormikInitialValues(
          populateInitialValues(formFields, editDataValues)
        );
        setFormikValidationSchema(generateValidationSchema2(formFields));
      }
    }, [formFields, editDataValues]);

    // =====================================================
    /**
     * Delete Table data by index
     */
    const deleteTableData = (index) => {
      const newFormFields = JSON.parse(JSON.stringify(formFields));
      // const newFormFields = [...formFields];
      newFormFields.forEach((field) => {
        if (field.type === "table") {
          field.tableData.splice(index, 1);
        }
      });
      setFormFields(newFormFields);
    };

    const rerenderTable = () => {
      let newFormFields = JSON.parse(JSON.stringify(formFields));
      newFormFields.forEach((field) => {
        if (field.type === "table") {
          field.tableSetting = {
            ...field.tableSetting,
            tableRerender: !field.tableSetting.tableRerender,
          };
        }
      });
      setFormFields(newFormFields);
    };

    /**
     * Handle Form Submit
     * @param {*} values
     */
    const handleFormSubmit = async (values, event) => {
      // Remove fields that are not visible or accessible
      const newValues = { ...values };
      formFields.forEach((field) => {
        // A Fix for present date (31052024)
        if (!checkVisibleConditions(field, formik)) {
          if (field.type === "date") {
            newValues[field.name] = "present";
          }
        } else if (
          !checkVisibleConditions(field, formik) ||
          !checkAccessible(field, userDetails) ||
          (field.countryOptions?.countryField === ""
            ? !checkVisibleOnGlobalCountry(field, country)
            : !checkVisibleOnCountry(field, formik))
        ) {
          delete newValues[field.name];
        }
      });

      // Remove empty fields
      Object.keys(newValues).forEach((key) => {
        if (key === "") {
          delete newValues[key];
        }
      });

      await onSubmit(
        event,
        values,
        newValues,
        {
          buttonName,
          setButtonName,
        },
        {
          formState,
          setFormState,
        },
        rerenderTable
      );
    };

    /**
     * Check which field with tableData and  add it to the array
     */
    const setTableData = (formFields, values) => {
      formFields.forEach((field) => {
        if (field.type === "table") {
          field.tableData = [...field.tableData, values];
        }
      });
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
        setFormikValidationSchema(
          generateValidationSchema2(formFields, formik)
        );
      } else {
        setFormikInitialValues(
          populateInitialValues(formFields, editDataValues)
        );
        setFormikValidationSchema(
          generateValidationSchema2(formFields, formik)
        );
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
        if (onFormikChange) {
          onFormikChange(formik);
        }
      }
    }, [formik.values]);

    const clearForm = () => {
      Object.keys(formik.values).forEach((key) => {
        formik.setFieldValue(key, "");
      });
    };

    /**
     * Declare imperative Handle for formik hook to be used by parent
     */
    useImperativeHandle(
      ref,
      () => ({
        formik: formik,
        clearForm: clearForm,
      }),
      [formik]
    );

    return (
      <div>
        <Container fluid>
          <div>
            <Row>
              <Col>
                <div>
                  {formik && (
                    <FormikProvider value={formik}>
                      {showFormName && (
                        <Row>
                          <Col>
                            <div className="d-flex gap-2 mb-4">
                              <h1>{formName}</h1>
                            </div>
                          </Col>
                        </Row>
                      )}
                      <Row>
                        <Col>
                          <form
                            onSubmit={formik.handleSubmit}
                            className="drag-zone"
                          >
                            {formLayoutSchema.map((row, index) => (
                              <Row key={index}>
                                <FormSectionList
                                  key={row.rowId}
                                  row={row}
                                  formik={formik}
                                  formFields={formFields}
                                  formFieldsHook={{
                                    formFields,
                                    setFormFields,
                                  }}
                                  deleteTableData={deleteTableData}
                                  setFormState={setFormState}
                                  userDetails={userDetails}
                                  country={country}
                                  buttonNameHook={{
                                    buttonName,
                                    setButtonName,
                                  }}
                                  formStateHook={{
                                    formState,
                                    setFormState,
                                  }}
                                  tabIndexData={tabIndexData}
                                />
                              </Row>
                            ))}
                          </form>
                        </Col>
                      </Row>
                    </FormikProvider>
                  )}
                </div>
                {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
);

export default Form;
