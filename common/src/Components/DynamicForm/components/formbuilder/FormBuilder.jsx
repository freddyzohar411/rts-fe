import React, { useState, useEffect } from "react";
import { FormikProvider, useFormik } from "formik";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DroppableList from "./DroppableList";
import { useNavigate } from "react-router-dom";
import * as JsonHelper from "../../../../helpers/json_helper";
import "./FormBuilder.scss";
import "@workspace/common/src/assets/scss/components/simplebar.min.css";

import {
  Button,
  Card,
  CardBody,
  Label,
  Input,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
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
import FileInputElement from "./FileInputElement";
import * as FileHelper from "../../../../helpers/file_helper";

const FormBuilder = ({
  onSubmit,
  userDetails,
  template,
  fields,
  onSave,
  initialFormState,
}) => {
  // ========================= Dev Settings =========================
  const loadJSONFlag = true;
  // ================================================================
  const navigate = useNavigate();
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
  const [jsonFile, setJsonFile] = useState(null);
  const [loadedJSON, setLoadedJSON] = useState(null);

  /**
   * If json file is selected, convert it to json object
   */
  useEffect(() => {
    if (jsonFile) {
      FileHelper.convertJSONFileToJSONObject(jsonFile).then((data) => {
        setLoadedJSON(data);
      });
    }
    if (jsonFile === null) {
      setLoadedJSON(null);
      // Reset Everything
      setFormName("");
      setFormOptions({
        formType: "",
        entityType: "",
        baseFormId: 0,
        stepperNumber: 0,
        formCategory: "",
      });
      setFormFields([]);
      setFormLayoutSchema([]);
    }
  }, [jsonFile]);

  /**
   * Set form data from loaded json if exist
   */
  useEffect(() => {
    if (loadedJSON) {
      console.log(loadedJSON);
      setFormName(loadedJSON.formName);
      setFormOptions({
        formType: loadedJSON.formType,
        entityType: loadedJSON.entityType,
        baseFormId: loadedJSON.baseFormId || 0,
        stepperNumber: parseInt(loadedJSON.stepperNumber),
        formCategory: loadedJSON.formCategory,
      });
      setFormFields(
        JsonHelper.parseArrayObjectValues(loadedJSON.formFieldsList)
      );
      setFormLayoutSchema(loadedJSON.formSchemaList);
    }
  }, [loadedJSON]);

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
  };

  /**
   * Check which field with tableData and  add it to the array
   */
  const setTableData = (formFields, values) => {
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
        title: "Enter Row Title",
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
        title: "Enter Row Title",
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
      title: "Enter Row Title",
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
      if (r?.rowId === row?.rowId) {
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
      if (r?.rowId === row?.rowId) {
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
      (r) => r?.rowId !== row?.rowId
    );
    // setFormLayoutSchema(newFormLayoutSchema);
    setFormLayoutSchema(reorderSchema(newFormLayoutSchema));
  };

  // Toggle Title for row layout
  const toggleRowLayoutTitle = (row) => {
    const newFormLayoutSchema = [...formLayoutSchema];
    newFormLayoutSchema.forEach((r) => {
      if (r?.rowId === row?.rowId) {
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
      if (r?.rowId === row?.rowId) {
        r.droppableZones = [];
        for (let i = 0; i < number; i++) {
          r.droppableZones.push({ id: `${r?.rowId}_${i}`, fieldIds: [] });
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

    // If drag into sidebar, return and do not allowed
    if (destination.droppableId.includes("sidebar")) return;

    // If drag from sidebar to the row droppable zone
    if (draggableId.includes("layout") && result.type === "row") {
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
      handleDragAndDrop(formLayoutSchema, source, destination);
      return;
    }

    // Drag unusedfields from sidebar to field droppable zone
    if (draggableId.includes("unused") && result.type === "field") {
      const fieldId = draggableId.split("-").slice(1).join("-");

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
      // Check if row is there
      if (row) {
        row.rowId = index + 1;
        row.droppableZones.forEach((zone, zoneIndex) => {
          zone.id = `${index + 1}_${zoneIndex}`;
        });
      }
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
      formName: formName,
      formType: formOptions.formType,
      formCategory: formOptions.formCategory,
      baseFormId: formOptions.baseFormId,
      entityType: formOptions.entityType,
      stepperNumber: formOptions.stepperNumber,
      formFieldsList: JsonHelper.stringifyArrayObjectValues(formFields),
      formSchemaList: formLayoutSchema,
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
      formFieldsList: stringifyObj(formFields),
      formSchemaList: formLayoutSchema,
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
        .then((data) => {})
        .catch((error) => {});
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {/* Form Preview */}
      <Modal
        isOpen={showModal}
        toggle={() => setShowModal(!showModal)}
        size="xl"
        scrollable={true}
        centered
      >
        <ModalHeader
          className="bg-primary border-bottom border-custom-primary"
          toggle={() => setShowModal(!showModal)}
        >
          <div className="d-flex flex-column gap-1">
            <span className="fw-bold text-dark">Form Preview</span>
            <span className="fs-6">
              Have a preview of how the customised form will appear to the user.
            </span>
          </div>
        </ModalHeader>

        <ModalBody className="bg-light">
          <SimpleBar style={{ height: "450px", paddingRight: "20px" }}>
            <Card>
              <CardBody className="p-4">
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
              </CardBody>
            </Card>
          </SimpleBar>
        </ModalBody>
        <ModalFooter className="p-1">
          <Button
            onClick={() => {
              setShowModal(!showModal);
            }}
            className="btn btn-custom-primary"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <div className="d-flex flex-row">
        {/* Sidebar */}
        <div
          className="text-center px-4 py-3"
          style={{
            backgroundColor: "#405189",
            width: "310px",
            border: "2px solid #4c66b2",
          }}
        >
          <SimpleBar
            color="danger"
            style={{ height: "100vh", paddingRight: "30px" }}
          >
            <FormElementSidebar
              unusedFields={unusedFields}
              className="border border-start border-primary"
            />
          </SimpleBar>
        </div>
        {/* Main Content */}
        <div className="flex-grow-1">
          <div>
            <FormikProvider value={formik}>
              <div className="bg-secondary p-3 d-flex flex-row justify-content-between align-items-baseline pt-4 mb-3">
                <span
                  className="h5"
                  style={{ color: "#405189" }}
                >{`Form Builder (Total Fields: ${formFields?.length})`}</span>
                {/* Dev hide field button */}
                <div className="d-flex gap-2">
                  {!template && loadJSONFlag && (
                    <FileInputElement
                      width="400px"
                      placeholder="Add JSON"
                      setFile={setJsonFile}
                      fileSelected={jsonFile}
                    />
                  )}
                  <Button
                    type="button"
                    onClick={() => setShowAll((prev) => !prev)}
                    style={{
                      border: "1px solid #405189",
                      color: "#405189",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {showAll ? "Hide Fields" : "Show All Fields"}
                  </Button>
                </div>
              </div>

              <Container fluid>
                <Card>
                  <CardBody>
                    <div className="d-flex flex-column mb-3">
                      <Label
                        className="nowrap"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Form Name
                      </Label>
                      <Input
                        type="text"
                        value={formName}
                        placeholder="Enter Form Name"
                        onChange={(e) => setFormName(e.target.value)}
                        className="form-control"
                      />
                    </div>

                    <div className="d-flex flex-row gap-4">
                      {/* Form Type */}
                      <div className="w-100 mb-3">
                        <Label>Form Type</Label>
                        <Input
                          type="select"
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
                        </Input>
                      </div>
                      {/* Form Category */}
                      <div className="w-100 mb-3">
                        <Label>Form Category</Label>
                        <Input
                          className="form-control"
                          type="text"
                          value={formOptions.formCategory}
                          onChange={(e) =>
                            setFormOptions((prev) => ({
                              ...prev,
                              formCategory: e.target.value,
                            }))
                          }
                          placeholder="Enter Form Category"
                        />
                      </div>
                    </div>

                    {/* Custom Input Fields */}
                    {formOptions.formType === "custom" && (
                      <div className="d-flex flex-row align-items-center gap-4">
                        {/* Select Form Template */}
                        <div className="w-100 mb-3">
                          <BaseFormSelectElement
                            setBaseFormTemplate={setBaseFormTemplate}
                            setFormOptions={setFormOptions}
                            initialBaseFormId={formOptions.baseFormId}
                          />
                        </div>
                        {/* Entity Type */}
                        <div className="w-100 mb-3">
                          <Label className="form-Label">Entity Type</Label>
                          <Input
                            value={formOptions.entityType}
                            placeholder="Enter Entity Type"
                            onChange={(e) =>
                              setFormOptions((prev) => ({
                                ...prev,
                                entityType: e.target.value,
                              }))
                            }
                            type="text"
                            className="form-control"
                          />
                        </div>
                        {/* Stepper No. */}
                        <div className="w-100 mb-3">
                          <Label>Stepper No</Label>
                          <Input
                            value={formOptions.stepperNumber}
                            onChange={(e) =>
                              setFormOptions((prev) => ({
                                ...prev,
                                stepperNumber: parseInt(e.target.value),
                              }))
                            }
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>
                    )}
                    <hr />
                    <div className="border border-dotted border-dark p-3">
                      <form
                        onSubmit={formik.handleSubmit}
                        className="drag-zone"
                      >
                        <div>
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
                                  key={row?.rowId}
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
                                  addDropzoneToRowLayout={
                                    addDropzoneToRowLayout
                                  }
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
                                  formStateHook={{
                                    formState,
                                    setFormState,
                                  }}
                                  buttonNameHook={{
                                    buttonName,
                                    setButtonName,
                                  }}
                                  formFieldsHook={{
                                    formFields,
                                    setFormFields,
                                  }}
                                />
                              </DnDWrapper>
                            ))
                          ) : (
                            // <div className="position-relative d-flex align-items-center justify-content-center" style={{ width: "100%" }}>
                            <div style={{ pointerEvents: "none" }}>
                              <div
                                style={{ position: "relative", width: "100%" }}
                              >
                                {formFields.length === 0 && (
                                  <div
                                    style={{
                                      marginTop: "90px",
                                      position: "absolute",
                                      left: "50%",
                                      transform: "translate(-50%,0%)",
                                    }}
                                  >
                                    <span className="fw-medium h4 fs-3 text-muted">
                                      DROP ZONE
                                    </span>
                                  </div>
                                )}
                              </div>
                              <DnDWrapper
                                droppableType="row"
                                draggablePrefix="draggable-row-"
                                draggableId={0}
                                placeholder
                                index={0}
                                dropColor="#eeeeee"
                                classes={"w-100"}
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
                        {/* Dev Buttons */}
                        {/* {formFields.length > 0 && (
                          <Button
                            type="submit"
                            className="btn btn-custom-primary mt-3"
                          >
                            {formState === "create" ? "Create" : "Update"}
                          </Button>
                        )}
                        {formState === "update" && (
                          <Button
                            type="button"
                            className="btn btn-danger mt-3 ms-3"
                            onClick={() => {
                              setFormState("create");
                              formik.resetForm();
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            type="button"
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={() => {
                              const JSONData = {
                                formName,
                                formSchema: formFields,
                                formLayoutSchema,
                              };
                              setJsonData(JSON.stringify(JSONData));
                              setShowModal(true);
                            }}
                          >
                            Preview
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={viewJSON}
                          >
                            View JSON
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={handleSaveJSONData}
                          >
                            Save
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={handleSaveJsonAPI}
                          >
                            Save to API
                          </Button>
                        )} */}
                      </form>
                    </div>
                    {/* User Buttons */}
                    <div className="d-flex justify-content-between">
                      <Button
                        className="btn btn-custom-secondary mt-3"
                        onClick={() => navigate("/settings/customisation")}
                      >
                        Back
                      </Button>
                      <div>
                        {formFields.length > 0 && loadJSONFlag && (
                          <Button
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={handleSaveJSONData}
                          >
                            Save JSON File
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            className="btn btn-danger mt-3 ms-3"
                            onClick={() => {
                              //Clear form and all json and schema
                              setFormFields([]);
                              setFormLayoutSchema([]);
                            }}
                          >
                            Clear
                          </Button>
                        )}
                        {formFields.length > 0 && (
                          <Button
                            className="btn btn-custom-primary mt-3 ms-3"
                            onClick={handleSaveJsonAPI}
                          >
                            Save
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Container>
            </FormikProvider>
          </div>
        </div>
        {/* Edit Field Modal */}
        <Modal
          isOpen={showModalSchema}
          closeModal={() => {
            setFormBuilderType(null);
            setFormBuilderUpdateData(null);
            setShowModalSchema(false);
          }}
          centered
          scrollable
          size="xl"
        >
          <ModalHeader
            className="bg-primary pb-3"
            toggle={() => setShowModalSchema(!showModalSchema)}
          >
            <div className="d-flex flex-column text-dark">
              <span className="h5 fw-bold">Edit Field</span>
              <span className="fs-6">
                Make changes and configure your chosen field.
              </span>
            </div>
          </ModalHeader>
          <ModalBody className="bg-light">
            <div>
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
            </div>
          </ModalBody>
        </Modal>
        {/* JSON Modal */}
        <Modal
          isOpen={showJsonModal}
          closeModal={() => {
            setShowJsonModal(false);
          }}
          height="90%"
          centered
          scrollable
          size="xl"
        >
          <ModalHeader>
            <span className="modal-title">JSON Data</span>
          </ModalHeader>
          <ModalBody className="bg-light">
            <Card>
              <CardBody>
                <div>
                  <pre style={{ fontSize: "1.1rem" }}>{jsonData}</pre>
                </div>
              </CardBody>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Button
              className="btn btn-custom-primary"
              onClick={() => setShowJsonModal(!showJsonModal)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </DragDropContext>
  );
};

export default FormBuilder;
