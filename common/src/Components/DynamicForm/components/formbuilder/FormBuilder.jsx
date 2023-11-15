import React, { useState, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DroppableList from "./DroppableList";
import "./FormBuilder.scss";
import Modal from "../modal/Modal";
import {
  generateInitialValues,
  generateValidationSchema2,
} from "../../helpers/formik_helper";
import FieldBuilder from "./FieldBuilder";
import Form from "../formdisplay/Form";
import FormElementSidebar from "./FormElementSidebar";
import DnDWrapper from "../dragndrop/DnDWrapper";
import {
  checkVisibleConditions,
  checkVisibleOnCountry,
  checkAccessible,
  checkVisibleOnGlobalCountry,
  checkCopyFieldConditions,
} from "../../formelements/formElements_helper";
import BaseFormSelectElement from "./BaseFormSelectElement";
import SimpleBar from "simplebar-react";

const FormBuilder = ({
  onSubmit,
  userDetails,
  template,
  fields,
  onSave,
  initialFormState,
}) => {
  const [buttonName, setButtonName] = useState("");
  const [baseFormTemplate, setBaseFormTemplate] = useState(null);
  const [formOptions, setFormOptions] = useState({
    formType: template?.formType || "",
    entityType: template?.entityType || "",
    baseFormId: template?.baseFormId || 0,
    stepperNumber: template?.stepperNumber || 0,
    formCategory: template?.formCategory || "",
  });
  const [showAll, setShowAll] = useState(true);
  const [country, setCountry] = useState("");
  const [formState, setFormState] = useState(initialFormState);
  const [formFields, setFormFields] = useState(template?.formSchema || []);
  const [formikInitialValues, setFormikInitialValues] = useState({});
  const [formikValidationSchema, setFormikValidationSchema] = useState({});
  const [formBuilderType, setFormBuilderType] = useState(null);
  const [formBuilderUpdateData, setFormBuilderUpdateData] = useState(null);
  const [formName, setFormName] = useState(template?.formName || "");
  const [formLayoutSchema, setFormLayoutSchema] = useState(
    template?.formLayoutSchema || []
  );
  const [formLayoutId, setFormLayoutId] = useState({
    zoneId: null,
    index: null,
  });
  const [unusedFields, setUnusedFields] = useState(fields ? [...fields] : []);
  const [showModal, setShowModal] = useState(false);
  const [showModalSchema, setShowModalSchema] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [showJsonModal, setShowJsonModal] = useState(false);

  /**
   * Set form state
   */

  useEffect(() => {
    if (template) {
      setFormState("update");
    } else {
      setFormState("create");
    }
  }, [template, baseFormTemplate]);

  /**
   * Set template data
   */
  useEffect(() => {
    if (baseFormTemplate && formState === "create") {
      setFormFields(baseFormTemplate?.formSchema);
      setFormLayoutSchema(baseFormTemplate?.formLayoutSchema);
      return;
    }

    if (template && formState === "update" && formOptions.baseFormId === 0) {
      setFormOptions({
        formType: template?.formType,
        entityType: template?.entityType,
        baseFormId: template?.baseFormId,
        stepperNumber: template?.stepperNumber,
        formCategory: template?.formCategory,
      });
      setFormFields(template?.formSchema);
      setFormName(template?.formName);
      setFormLayoutSchema(template?.formLayoutSchema);
      return;
    }

    if (template && formState === "update" && template?.baseFormId !== 0) {
      setFormOptions({
        formType: template?.formType,
        entityType: template?.entityType,
        baseFormId: template?.baseFormId,
        stepperNumber: template?.stepperNumber,
        formCategory: template?.formCategory,
      });

      setFormFields(template?.formSchema);
      setFormName(template?.formName);
      setFormLayoutSchema(template?.formLayoutSchema);
      return;
    }

    setFormFields([]);
    setFormName("");
    setFormLayoutSchema([]);
  }, [template, formState]);

  /**
   * Set base form template data
   */
  useEffect(() => {
    if (baseFormTemplate) {
      setFormFields(baseFormTemplate?.formSchema);
      // setFormName(baseFormTemplate?.formName);?
      setFormLayoutSchema(baseFormTemplate?.formLayoutSchema);
    }
  }, [formOptions.baseFormId]);

  /**
   * Set unused fields
   */
  // useEffect(() => {
  //   if (fields && formFields) {
  //     const newFields = [...fields];
  //     // Let find from form fields and set isUsed to true
  //     newFields.forEach((field) => {
  //       const index = formFields.findIndex((formField) => {
  //         return formField.fieldId === field.fieldId;
  //       });
  //       if (index !== -1 && formFields[index].isUsed) {
  //         field.isUsed = true;
  //       }
  //     });
  //     setUnusedFields(newFields);
  //   } else {
  //     setUnusedFields([]);
  //   }
  // }, [fields, formFields]);
  useEffect(() => {
    // Get all the prederfined field from form fields
    if (formFields) {
      const predefinedFields = formFields.filter(
        (field) => field.fieldType === "predefined"
      );
      // Set unused fields
      setUnusedFields([...predefinedFields]);
    } else {
      setUnusedFields([]);
    }
  }, [formFields]);

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

  // =====================================================
  /**
   * Formik Initial Values
   * Formik Validation Schema
   */
  let formik = null;
  useEffect(() => {
    setFormikInitialValues(generateInitialValues(formFields, formik));
    setFormikValidationSchema(
      generateValidationSchema2(formFields, formik, userDetails)
    );
  }, [formFields]);

  //======================================================
  /**
   * Check for conditions in form
   */

  // =====================================================
  /**
   * Handle Form Submit
   * @param {*} values
   */
  const handleFormSubmit = async (values, event) => {
    const clickedButtonId = event?.nativeEvent?.submitter?.id;
    if (clickedButtonId) {
      console.log("Submit button clicked with id:", clickedButtonId);
    }
    await onSubmit(values, formFields, formState);

    // Remove fields that are not visible or accessible
    const newValues = { ...values };
    if (!showAll) {
      formFields.forEach((field) => {
        if (
          !checkVisibleConditions(field, formik) ||
          !checkAccessible(field, userDetails) ||
          (field.countryOptions?.countryField === ""
            ? !checkVisibleOnGlobalCountry(field, country)
            : !checkVisibleOnCountry(field, formik)) ||
          !field.isUsed
        ) {
          delete newValues[field.name];
        }
      });
    }

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

    const formData = {
      formName,
      formSchema: formFields,
      formData: newValues,
      formLayoutSchema,
    };

    console.log("formData", formData);
  };

  /**
   * Check which field with tableData and  add it to the array
   */
  const setTableData = (formFields, values) => {
    // const newFormFields = JSON.parse(JSON.stringify(formFields));
    formFields.forEach((field) => {
      if (field.type === "table") {
        if (!field.tableData) field.tableData = [];
        field.tableData = [...field?.tableData, values];
      }
    });
    // setFormFields(newFormFields);
    return formFields;
  };

  /**
   * Initialize Formik (useFormik Hook)
   */
  formik = useFormik({
    enableReinitialize: true,
    initialValues: formikInitialValues,
    validationSchema: formikValidationSchema,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    setFormikInitialValues(generateInitialValues(formFields, formik));
    setFormikValidationSchema(
      generateValidationSchema2(formFields, formik, userDetails)
    );
  }, [formik.values]);

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

  // =====================================================
  /**
   * Form Field Operations
   * @param {*} newformData
   */
  // Form Field Operations
  const addFormField = (newformData) => {
    setFormFields([...formFields, newformData]);
  };

  // Form Field Update Operation
  const updateFormField = (updatedFormData) => {
    const newFormFields = [...formFields];
    const index = newFormFields.findIndex(
      (field) => field.fieldId === updatedFormData.fieldId
    );
    newFormFields[index] = updatedFormData;
    setFormFields(newFormFields);
  };

  // Handle single form field delete
  const handleFormFieldDelete = (fieldId, rowId) => {
    deleteFormFieldId(fieldId, rowId);
    setFormFields(formFields.filter((field) => fieldId !== field.fieldId));
  };

  // Handle single form field edit
  const handleFormFieldEdit = (fieldId) => {
    const field = formFields.find((field) => field.fieldId === fieldId);
    setFormBuilderType(field.type);
    const updateFormSchema = {
      ...field,
    };
    setFormBuilderUpdateData(updateFormSchema);
    setShowModalSchema(true);
  };

  // =====================================================
  /**
   * Form Layout Operations
   * @param {*} col
   * @returns
   */

  // Generate Row col 1,2,3 layout
  const generateRowSchema = (col, id) => {
    // Get Col == 0
    let droppableZones = [];
    if (col === 0) {
      return {
        isTitle: false,
        title: "title",
        rowId: id,
        droppableZones: droppableZones,
      };
    } else {
      for (let i = 0; i < col; i++) {
        droppableZones = [
          ...droppableZones,
          { id: `${id}_${i}`, fieldIds: [] },
        ];
      }
      return {
        isTitle: true,
        title: "title",
        rowId: id,
        droppableZones: droppableZones,
      };
    }
  };

  // Generate Row Section layout
  const generateRowSectionSchema = (col) => {
    // Get Row id
    // if (!col) return;
    const id = formLayoutSchema.length + 1;
    let droppableZones = [];
    for (let i = 0; i < col; i++) {
      droppableZones = [...droppableZones, { id: `${id}_${i}`, fieldIds: [] }];
    }

    // Get Row
    const row = {
      isTitle: false,
      title: "title",
      rowId: id,
      droppableZones: droppableZones,
    };
    return row;
  };

  // Set form field id in droppable zone
  const setFormFieldId = (formFieldId) => {
    // Find droppable zone id and input the form field id
    const { zoneId, index } = formLayoutId;
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        if (zone.id === zoneId) {
          zone.fieldIds.splice(index, 0, formFieldId);
        }
      });
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  //Delete form field id from droppable zone
  const deleteFormFieldId = (formFieldId, rowId) => {
    // Find droppable zone id and input the form field id
    // const droppableZoneId = formLayoutId;
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        if (zone.id === rowId) {
          zone.fieldIds = zone.fieldIds.filter((id) => id !== formFieldId);
        }
      });
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  // Set Row title for each row layout
  const setRowtitle = (row, title) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((r) => {
      if (r.rowId === row.rowId) {
        r.title = title;
      }
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  // Handle delete entire row layout and field (Like never use at all. Re check this function)
  const handleDeleteLayoutAndField = (row) => {
    // Get array of form field id
    const formFieldIds = [];
    formLayoutSchema.forEach((r) => {
      if (r.rowId === row.rowId) {
        r.droppableZones.forEach((zone) => {
          formFieldIds.push(...zone.fieldIds);
        });
      }
    });

    // Delete form field id from form field array
    const newFormFields = formFields.filter(
      (field) => !formFieldIds.includes(field.fieldId)
    );
    setFormFields(newFormFields);

    // Delete row layout
    const newFormLayoutSchema = formLayoutSchema.filter(
      (r) => r.rowId !== row.rowId
    );
    // setFormLayoutSchema(newFormLayoutSchema);
    setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
  };

  // Toggle Title for row layout
  const toggleRowLayoutTitle = (row) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((r) => {
      if (r.rowId === row.rowId) {
        r.isTitle = !r.isTitle;
      }
    });
    // setFormLayoutSchema(newFormLayoutSchema);
    setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
  };

  // Add dropzone to row layout
  const addDropzoneToRowLayout = (row, number) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((r) => {
      if (r.rowId === row.rowId) {
        r.droppableZones = [];
        for (let i = 0; i < number; i++) {
          r.droppableZones.push({ id: `${r.rowId}_${i}`, fieldIds: [] });
        }
      }
    });
    // setFormLayoutSchema(newFormLayoutSchema);
    setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
  };

  // Delete Column
  const deleteColumn = (row, col) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    // Get all the target ids
    const targetIds = newFormLayoutSchema[row].droppableZones[col].fieldIds;
    // Delete all the target ids from form field array
    const newFormFields = formFields.filter(
      (field) => !targetIds.includes(field.fieldId)
    );
    setFormFields(newFormFields);
    newFormLayoutSchema[row].droppableZones.splice(col, 1);
    setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
  };

  // =====================================================
  /**
   * React Dnd Methods
   * @param {*} result
   * @returns
   */
  // React beautiful dnd - ON DRAG END
  const onDragEnd = (result) => {
    // Handle the drag end event if needed
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const { droppableId } = destination;
    console.log("=========================");
    console.log("Drag End", result);
    console.log("=========================");

    // If drag into sidebar, return and do not allowed
    if (destination.droppableId.includes("sidebar")) return;

    // If drag from sidebar to the row droppable zone
    if (draggableId.includes("layout") && result.type === "row") {
      console.log("Layout Drag and Drop");
      const layoutType = draggableId.split("-")[1];
      const destinationIndex = parseInt(destination.index);
      let row = null;
      if (layoutType === "section") {
        row = generateRowSectionSchema(0, destinationIndex + 1);
      } else {
        row = generateRowSchema(parseInt(layoutType), destinationIndex + 1);
      }
      // Set at the index
      const newFormLayoutSchema = [...formLayoutSchema];
      newFormLayoutSchema.splice(destinationIndex, 0, row);
      setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
      return;
    }

    //If drag sidebar to the add a column in row
    if (draggableId.includes("layout") && result.type === "col") {
      const rowCol = destination.droppableId.split("-")[1].split("_");
      const row = parseInt(rowCol[0]) - 1;
      const col = parseInt(rowCol[1]) + 1;
      const newFormLayoutSchema = [...formLayoutSchema];
      newFormLayoutSchema[row].droppableZones.splice(destination.index, 0, {
        id: `${row + 1}_${col}`,
        fieldIds: [],
      });
      setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
      return;
    }

    // If row are drag within the row droppable zone
    if (draggableId.includes("row") && result.type === "row") {
      console.log("Row Drag and Drop");
      const sourceIndex = parseInt(source.index);
      const destinationIndex = parseInt(destination.index);
      const newFormLayoutSchema = [...formLayoutSchema];
      const row = newFormLayoutSchema.splice(sourceIndex, 1)[0];
      newFormLayoutSchema.splice(destinationIndex, 0, row);
      setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
      return;
    }

    // If zones are drag within zones
    if (draggableId.includes("col") && result.type.includes("col")) {
      console.log("Column Drag and Drop");
      const sourceRowCol = source.droppableId.split("-")[1].split("_");
      const destinationRowCol = destination.droppableId
        .split("-")[1]
        .split("_");
      const newFormLayoutSchema = [...formLayoutSchema];
      if (parseInt(sourceRowCol[0]) === parseInt(destinationRowCol[0])) {
        const row = draggableId.split("-")[2].split("_")[0] - 1;
        const tempArray =
          newFormLayoutSchema[row].droppableZones[source.index].fieldIds;
        newFormLayoutSchema[row].droppableZones[source.index].fieldIds =
          newFormLayoutSchema[row].droppableZones[destination.index].fieldIds;
        newFormLayoutSchema[row].droppableZones[destination.index].fieldIds =
          tempArray;
      } else {
        const sourceRow = parseInt(sourceRowCol[0]) - 1;
        const destinationRow = parseInt(destinationRowCol[0]) - 1;
        // remove from col from row index
        const removedCol = newFormLayoutSchema[sourceRow].droppableZones.splice(
          source.index,
          1
        )[0];
        // add to col from row index
        console.log("removedCol", removedCol);
        console.log("sourceRowCol", sourceRowCol);
        console.log("destinationRowCol", destinationRowCol);
        console.log("destinationRow", destinationRow);
        console.log("destination.index", destination.index);
        newFormLayoutSchema[destinationRow].droppableZones.splice(
          destination.index,
          0,
          removedCol
        );
      }
      setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
      return;
    }

    // Drag element from side bar into field droppable zone
    if (draggableId.includes("element") && result.type === "field") {
      console.log("Element Drag and Drop");
      console.log("Droppable Id", droppableId);
      const fieldType = draggableId.split("-")[1];
      setFormLayoutId({
        zoneId: droppableId,
        index: destination.index,
      });
      setFormBuilderType(fieldType);
      setShowModalSchema(true);
      return;
    }

    // Drag field to other field
    if (draggableId.includes("field") && result.type === "field") {
      console.log("Field Drag and Drop");
      handleDragAndDrop(formLayoutSchema, source, destination);
      return;
    }

    // Drag unusedfields from sidebar to field droppable zone
    if (draggableId.includes("unused") && result.type === "field") {
      console.log("Unused Field Drag and Drop");
      const fieldId = draggableId.split("-").slice(1).join("-");
      console.log("fieldId", fieldId);

      // Go formfield array and find the field and set is in used to true
      const newFormFields = [...formFields];
      const index = newFormFields.findIndex(
        (field) => field.fieldId === fieldId
      );
      newFormFields[index].isUsed = true;
      setFormFields(newFormFields);
      setSchemaInDroppableZone(destination, fieldId);
      return;
    }
  };

  const reorderSchema = (formLayoutSchema) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row, index) => {
      row.rowId = index + 1;
      row.droppableZones.forEach((zone, zoneIndex) => {
        zone.id = `${index + 1}_${zoneIndex}`;
      });
    });
    return newFormLayoutSchema;
  };

  // Set Schema in droppable zone
  const setSchemaInDroppableZone = (destination, fieldId) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        if (zone.id === destination.droppableId) {
          zone.fieldIds.splice(destination.index, 0, fieldId);
        }
      });
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  // Handle drag and drop logic
  const handleDragAndDrop = (formLayoutSchema, source, destination) => {
    let formFieldId = null;
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        if (zone.id === source.droppableId) {
          formFieldId = zone.fieldIds.splice(source.index, 1)[0];
        }
      });
    });
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        if (zone.id === destination.droppableId) {
          zone.fieldIds.splice(destination.index, 0, formFieldId);
        }
      });
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  // Handle Row Dnd

  // =====================================================
  /**
   * Unused Fields Methods
   * @param {*} fieldId
   * @param {*} isUsed
   */

  // Unused Fields Methods
  const setUnusedFieldIsUsed = (fieldId, isUsed) => {
    const newUnusedFields = [...unusedFields];
    const index = newUnusedFields.findIndex(
      (field) => field.fieldId === fieldId
    );
    newUnusedFields[index].isUsed = isUsed;
    setUnusedFields(newUnusedFields);
  };

  const removeUnusedFieldFromSchema = (fieldId) => {
    // remove formfield ID from layout schema using splice
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((row) => {
      row.droppableZones.forEach((zone) => {
        zone.fieldIds = zone.fieldIds.filter((id) => id !== fieldId);
      });
    });
    setFormLayoutSchema(newFormLayoutSchema);
  };

  /**
   * Handle JSON Methods
   */
  // Save JSON file to local
  const handleSaveJSONData = () => {
    const JSONData = {
      formName,
      formSchema: formFields,
      formLayoutSchema,
    };
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(JSONData, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${formName}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  // View JSON file
  const viewJSON = () => {
    const JSONData = {
      formName: formName,
      formType: formOptions.formType,
      entityType: formOptions.entityType,
      baseFormId: formOptions.baseFormId,
      stepperNumber: formOptions.stepperNumber,
      formFields: stringifyObj(formFields),
      formLayoutSchema: formLayoutSchema,
    };

    setJsonData(JSON.stringify(JSONData, null, 2));
    setShowJsonModal(true);
  };

  // Stringify all object values if they are objects in an array
  const stringifyObj = (array) => {
    // loop through array and stringify all object values if they are objects
    const newArray = array.map((item) => {
      const newItem = { ...item };
      for (const key in newItem) {
        if (typeof newItem[key] === "object") {
          newItem[key] = JSON.stringify(newItem[key]);
        }
      }
      return newItem;
    });
    return newArray;
  };

  // Save JSON file to API
  const handleSaveJsonAPI = async () => {
    console.log("onSave", onSave);
    if (onSave) {
      await onSave(
        formName,
        formOptions,
        formFields,
        formLayoutSchema,
        formState
      );
      return;
    } else {
      const JSONData = {
        formName: formName,
        formType: formOptions.formType,
        formCategory: formOptions.formCategory,
        baseFormId: parseInt(formOptions.baseFormId),
        entityType: formOptions.entityType,
        formStepperNumber: formOptions.stepperNumber,
        formFieldsList: stringifyObj(formFields),
        formSchemaList: formLayoutSchema,
      };

      // Post using fetch
      fetch("http://localhost:9400/forms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSONData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Modal
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
        height="90%"
        backgroundClose
      >
        <Form
          template={JSON.parse(jsonData)}
          userDetails={userDetails}
          country={country}
          editData={null}
          onFormikChange={null}
          onSubmit={handleFormSubmit}
          onFormFieldsChange={null}
          errorMessage={null}
        />
      </Modal>
      <div className="grid-formbuilder">
        {/* <SimpleBar style={{height:"160vh"}}> */}
        <div className="left-sidebar text-center bg-secondary px-4 py-3">
          <FormElementSidebar unusedFields={unusedFields} />
        </div>
        {/* </SimpleBar> */}

        <SimpleBar style={{ height: "800px" }}>
          <div className="middle-sidebar">
            <div className="form-container">
              <FormikProvider value={formik}>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="mb-4 mt-4">{`Form Builder (Total Fields: ${formFields?.length})`}</h1>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: "10px 20px" }}
                    onClick={() => setShowAll((prev) => !prev)}
                  >
                    {showAll ? "Hide Fields" : "Show All Fields"}
                  </button>
                </div>

                <div className="d-flex gap-2 mb-4">
                  <label htmlFor="" className="">
                    Form Name:
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="form-control"
                  />
                </div>

                <div className="d-flex align-items-center gap-4 mb-3">
                  <div className="w-100">
                    <label htmlFor="" className="">
                      Form Type
                    </label>
                    <select
                      value={formOptions.formType}
                      onChange={(e) =>
                        setFormOptions((prev) => ({
                          ...prev,
                          formType: e.target.value,
                        }))
                      }
                      className="form-select w-100"
                    >
                      <option value="">Select Form Type</option>
                      <option value="custom">Custom</option>
                      <option value="base">Base</option>
                    </select>
                  </div>
                  <div className="w-100">
                    <label htmlFor="" className="">
                      Form Category
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={formOptions.formCategory}
                      onChange={(e) =>
                        setFormOptions((prev) => ({
                          ...prev,
                          formCategory: e.target.value,
                        }))
                      }
                      placeholder="Enter form category"
                    />
                  </div>
                </div>
                {formOptions.formType === "custom" && (
                  <div className="d-flex align-items-center gap-4">
                    <div className="flex-grow-1">
                      <BaseFormSelectElement
                        setBaseFormTemplate={setBaseFormTemplate}
                        setFormOptions={setFormOptions}
                        initialBaseFormId={formOptions.baseFormId}
                      />
                    </div>

                    <div className="flex-grow-1">
                      <label htmlFor="" className="form-label">
                        Entity Type
                      </label>
                      <input
                        value={formOptions.entityType}
                        onChange={(e) =>
                          setFormOptions((prev) => ({
                            ...prev,
                            entityType: e.target.value,
                          }))
                        }
                        type="text"
                        className="form-control w-100"
                      />
                    </div>

                    <div className="flex-grow-1">
                      <label htmlFor="" className="form-label">
                        Stepper No
                      </label>
                      <input
                        value={formOptions.stepperNumber}
                        onChange={(e) =>
                          setFormOptions((prev) => ({
                            ...prev,
                            stepperNumber: parseInt(e.target.value),
                          }))
                        }
                        type="number"
                        className="form-control w-100"
                      />
                    </div>
                  </div>
                )}
                <hr />
                <div className="layout-drop-zone">
                  <form onSubmit={formik.handleSubmit} className="drag-zone">
                    <div className="lists-container">
                      {formLayoutSchema.length > 0 ? (
                        formLayoutSchema.map((row, index) => (
                          <DnDWrapper
                            key={index}
                            droppableType="row"
                            draggablePrefix="draggable-row-"
                            draggableId={index}
                            placeholder
                            index={index}
                            dropColor="#eeeeee"
                          >
                            <DroppableList
                              key={row.rowId}
                              row={row}
                              setRowtitle={setRowtitle}
                              formik={formik}
                              handleFormFieldEdit={handleFormFieldEdit}
                              handleFormFieldDelete={handleFormFieldDelete}
                              formFields={formFields}
                              handleDeleteLayoutAndField={
                                handleDeleteLayoutAndField
                              }
                              toggleRowLayoutTitle={toggleRowLayoutTitle}
                              addDropzoneToRowLayout={addDropzoneToRowLayout}
                              deleteColumn={deleteColumn}
                              setUnusedFieldIsUsed={setUnusedFieldIsUsed}
                              deleteTableData={deleteTableData}
                              setFormState={setFormState}
                              userDetails={userDetails}
                              country={country}
                              showAll={showAll}
                              removeUnusedFieldFromSchema={
                                removeUnusedFieldFromSchema
                              }
                              formOptions={formOptions}
                              formStateHook={{ formState, setFormState }}
                              buttonNameHook={{ buttonName, setButtonName }}
                              formFieldsHook={{ formFields, setFormFields }}
                            />
                          </DnDWrapper>
                        ))
                      ) : (
                        <div style={{ position: "relative" }}>
                          {formFields.length === 0 && (
                            <div className="drop-zone-text">DROP ZONE</div>
                          )}
                          <DnDWrapper
                            droppableType="row"
                            draggablePrefix="draggable-row-"
                            draggableId={0}
                            placeholder
                            index={0}
                            dropColor="#eeeeee"
                          >
                            <div
                              className="d-flex justify-content-center align-items-center absolute"
                              style={{ height: "200px" }}
                            >
                              {/* <span>DROP ZONE</span> */}
                            </div>
                          </DnDWrapper>
                        </div>
                      )}
                    </div>
                    {formFields.length > 0 && (
                      <button type="submit" className="btn btn-primary mt-3">
                        {formState === "create" ? "Create" : "Update"}
                      </button>
                    )}
                    {formState === "update" && (
                      <button
                        type="button"
                        className="btn btn-danger mt-3 ms-3"
                        onClick={() => {
                          setFormState("create");
                          formik.resetForm();
                        }}
                      >
                        Cancel
                      </button>
                    )}

                    {formFields.length > 0 && (
                      <button
                        type="button"
                        className="btn btn-primary mt-3 ms-3"
                        onClick={() => {
                          const JSONData = {
                            formName,
                            formSchema: formFields,
                            formLayoutSchema,
                          };
                          setJsonData(JSON.stringify(JSONData));
                          console.log(JSON.stringify(JSONData));
                          setShowModal(true);
                        }}
                      >
                        Preview
                      </button>
                    )}
                    {formFields.length > 0 && (
                      <button
                        className="btn btn-primary mt-3 ms-3"
                        onClick={viewJSON}
                      >
                        View JSON
                      </button>
                    )}
                    {formFields.length > 0 && (
                      <button
                        className="btn btn-primary mt-3 ms-3"
                        onClick={handleSaveJSONData}
                      >
                        Save
                      </button>
                    )}
                    {formFields.length > 0 && (
                      <button
                        className="btn btn-primary mt-3 ms-3"
                        onClick={handleSaveJsonAPI}
                      >
                        Save to API
                      </button>
                    )}
                  </form>
                </div>
              </FormikProvider>
            </div>
          </div>
        </SimpleBar>

        <Modal
          isOpen={showModalSchema}
          closeModal={() => {
            setFormBuilderType(null);
            setFormBuilderUpdateData(null);
            setShowModalSchema(false);
          }}
          height="90%"
          backgroundClose
        >
          {formBuilderType && (
            <FieldBuilder
              type={formBuilderType}
              addFormField={addFormField}
              setFormBuilderType={setFormBuilderType}
              formBuilderUpdateData={formBuilderUpdateData}
              updateFormField={updateFormField}
              setFormBuilderUpdateData={setFormBuilderUpdateData}
              setFormFieldId={setFormFieldId}
              formFields={formFields}
              setShowModalSchema={setShowModalSchema}
              formOptions={formOptions}
            />
          )}
        </Modal>

        <Modal
          isOpen={showJsonModal}
          closeModal={() => {
            setShowJsonModal(false);
          }}
          height="90%"
          backgroundClose
        >
          <div className="json-modal">
            <pre style={{ fontSize: "1.1rem" }}>{jsonData}</pre>
          </div>
        </Modal>
      </div>
      {/* <input
        type="text"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      /> */}
    </DragDropContext>
  );
};

export default FormBuilder;
