import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFormik } from "formik";
import {
  Col,
  Row,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import { initialValues, schema, populateForm } from "./formikConfig";
import { moduleConstants } from "./constants";
import { TemplateDisplayV3 } from "@workspace/common";
import * as TemplateActions from "../../store/template/action";
import { useDispatch, useSelector } from "react-redux";
import { addMediaUrl, deleteDraftMediaUrl } from "../../helpers/backend_helper";
import mammoth from "mammoth";
import { moduleActions } from "./moduleAction";
import { categoryConstants } from "./templateBuilderContants";
import SelectElement from "./SelectElement";
import FileInputElement from "./FileInputElement";
import EditorElement2 from "./EditorElement2";

const TemplateBuilder = forwardRef(
  ({ type, templateEditData, onSubmit, ...props }, ref) => {
    const dispatch = useDispatch();
    const [typeData, setTypeData] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [injectVariable, setInjectVariable] = useState("");
    const [editorRef, setEditorRef] = useState(null);
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const [formSchema, setFormSchema] = useState(schema);
    const [deletedMediaURL, setDeletedMediaURL] = useState([]);
    const [categorySelected, setCategorySelected] = useState("");
    const [templateList, setTemplateList] = useState([]);
    const [templateSelected, setTemplateSelected] = useState("");
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [templateContentPreview, setTemplateContentPreview] = useState("");
    const [file, setFile] = useState(null);
    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState("");
    const [fields, setFields] = useState([]);
    const [selectedField, setSelectedField] = useState("");

    const templateCategories = useSelector(
      (state) => state.TemplateReducer.templateCategories
    );

    const templatesByCategory = useSelector(
      (state) => state.TemplateReducer.templatesByCategory
    );

    const sectionData = useSelector((state) => {
      if (typeData?.label === categoryConstants.ACCOUNTS) {
        return state.AccountReducer.accountsFieldsAll;
      }
      if (typeData?.label === categoryConstants.JOBS) {
        return state.JobReducer.jobsFieldsAll;
      }
      if (typeData?.label === categoryConstants.CANDIDATES) {
        return state.CandidateReducer.candidatesFieldsAll;
      }
    });

    // Get field All if type exist
    useEffect(() => {
      if (typeData === "" || typeData === null) {
        setSections([]);
        setFields([]);
        setSelectedSection("");
        setSelectedField("");
      }
      if (typeData) {
        dispatch(moduleActions[typeData.label]());
      }
    }, [typeData]);

    // Check section data
    useEffect(() => {
      if (sectionData) {
        if (
          typeData?.label === categoryConstants.ACCOUNTS ||
          typeData?.label === categoryConstants.JOBS ||
          typeData?.label === categoryConstants.CANDIDATES
        ) {
          setSections(sectionData);
        }
      }
    }, [sectionData]);

    // Check Selected Section
    useEffect(() => {
      if (selectedSection === "" || selectedSection === null) {
        setFields([]);
        setSelectedField("");
      }
      if (selectedSection) {
        setFields(sectionData[selectedSection.value]);
      }
    }, [selectedSection]);

    const convertToHtml = async (file, setTemplateContent) => {
      try {
        const result = await mammoth.convertToHtml({
          arrayBuffer: await file.arrayBuffer(),
        });
        setTemplateContent(result.value);
      } catch (error) {
        console.error("Error converting Word to HTML:", error);
      }
    };

    // Get all categories
    useEffect(() => {
      dispatch(TemplateActions.fetchTemplateCategories());
    }, []);

    useEffect(() => {
      if (categorySelected == null || categorySelected == "") {
        setTemplateList([]);
        setTemplateSelected("");
      }
      if (categorySelected) {
        setTemplateSelected("");
        dispatch(
          TemplateActions.fetchTemplateByCategory(categorySelected.value)
        );
      }
    }, [categorySelected]);

    useEffect(() => {
      if (templatesByCategory) {
        setTemplateList(
          templatesByCategory.map((template) => ({
            label: template.name,
            value: template.name,
          }))
        );
      }
    }, [templatesByCategory]);

    useEffect(() => {
      if (templateSelected) {
        setFile(null);
      }
    }, [templateSelected]);

    /**
     * Handle form submit event (Formik)
     * @param {*} values
     */
    const handleFormSubmit = async (values) => {
      await onSubmit(values, deletedMediaURL);
    };

    /**
     * Initialize Formik (useFormik Hook)
     */
    const formik = useFormik({
      enableReinitialize: true,
      initialValues: formInitialValues,
      validationSchema: formSchema,
      validateOnBlur: true,
      onSubmit: handleFormSubmit,
    });

    useEffect(() => {
      if (type === "edit" && templateEditData) {
        setFormInitialValues(populateForm(templateEditData));
      }
    }, [type, templateEditData]);

    /**
     * Clear Form
     */
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

    useEffect(() => {
      if (!showInsertModal) {
        setTemplateSelected("");
        setCategorySelected("");
        setTemplateContentPreview("");
      }
    }, [showInsertModal]);

    function convertToTitleCase(str) {
      return str.replace(/([A-Z])/g, " $1").replace(/^./, function (s) {
        return s.toUpperCase();
      });
    }

    function convertObjectKeyToArrayOption(obj) {
      const keys = Object.keys(obj);
      const options = keys.map((key) => ({
        label: convertToTitleCase(key),
        value: key,
      }));
      return options;
    }

    // Check for field selected to disable buttons in template builder
    const checkFieldSelected = () => {
      if (typeData) {
        if (selectedSection && fields.length === 0) {
          return true;
        }
        if (selectedSection && selectedField) {
          return true;
        }
      }
      return false;
    };

    const checkTemplateSelected = () => {
      if (categorySelected && templateSelected) {
        return true;
      }
      return false;
    };

    return (
      <div className="d-flex flex-column gap-2">
        <Row className="mb-3">
          <Col>
            <Row className="mb-1">
              <Col>
                <span className="h6 fw-bold">Meta Data</span>
              </Col>
            </Row>
            <Row className="mb-1">
              <Col>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik?.values?.["name"]}
                  placeholder="Enter a Name"
                />
                <div style={{ minHeight: "25px" }}>
                  {formik.errors["name"] && formik.touched.name ? (
                    <div style={{ color: "red", fontSize: "0.9rem" }}>
                      {formik.errors["name"]}
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col>
                <Label htmlFor="category">Category</Label>
                <Input
                  type="text"
                  name="category"
                  className="form-control"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik?.values?.["category"]}
                  placeholder="Enter a category"
                />
                <div style={{ minHeight: "25px" }}>
                  {formik.errors["category"] && formik.touched["category"] ? (
                    <div style={{ color: "red", fontSize: "0.9rem" }}>
                      {formik.errors["category"]}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Label htmlFor="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik?.values?.["description"]}
                  placeholder="Enter a description"
                />
                <div style={{ minHeight: "25px" }}>
                  {formik.errors["description"] ? (
                    <div style={{ color: "red", fontSize: "0.9rem" }}>
                      {formik.errors["description"]}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
            <hr className="" />
            <Row className="mb-1 mt-2">
              <Col>
                <span className="h6 fw-bold">
                  Template and Variable Injection
                </span>
              </Col>
            </Row>
            <Row className="align-items-end mb-3">
              <Col>
                <Label>Category</Label>
                <SelectElement
                  optionsData={templateCategories.map((category) => ({
                    label: category,
                    value: category,
                  }))}
                  setSelectedOptionData={setCategorySelected}
                  placeholder="Select a category"
                  value={categorySelected}
                />
              </Col>
              <Col>
                <Label>Template</Label>
                <SelectElement
                  optionsData={templateList}
                  value={templateSelected}
                  placeholder="Select a field"
                  setSelectedOptionData={setTemplateSelected}
                />
              </Col>
              <Col>
                <Button
                  type="button"
                  className="self-end"
                  disabled={!checkTemplateSelected()}
                  onClick={() => {
                    setInjectVariable(
                      "{{" +
                        `${categorySelected.value}.${templateSelected.value}` +
                        "}}"
                    );
                    setFieldName("");
                    setTypeData("");
                  }}
                >
                  Add Template
                </Button>
              </Col>
            </Row>
            <Row className="align-items-end">
              <Col>
                <Label>Module Type</Label>
                <SelectElement
                  optionsData={moduleConstants}
                  setSelectedOptionData={setTypeData}
                  placeholder="Select a type"
                  value={typeData}
                  editorRef={editorRef}
                />
              </Col>
              <Col>
                <Label>Module Section</Label>
                <SelectElement
                  value={selectedSection}
                  placeholder="Select a section"
                  setSelectedOptionData={setSelectedSection}
                  optionsData={convertObjectKeyToArrayOption(sections)}
                  editorRef={editorRef}
                />
              </Col>
              {!checkTemplateSelected() && (
                <Col>
                  <Label>Module Field</Label>
                  <SelectElement
                    value={selectedField}
                    placeholder="Select a field"
                    setSelectedOptionData={setSelectedField}
                    optionsData={fields}
                    editorRef={editorRef}
                  />
                </Col>
              )}
              <Col>
                <Button
                  type="button"
                  className="self-end"
                  disabled={!checkFieldSelected()}
                  onClick={() => {
                    setInjectVariable(
                      "${" +
                        `${typeData.value}.${selectedSection.value}.${selectedField.value}` +
                        "}"
                    );
                    setFieldName("");
                    setTypeData("");
                  }}
                >
                  Add Variable
                </Button>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Button
                  type="button"
                  className="self-end"
                  disabled={
                    !typeData || !selectedSection || !checkTemplateSelected()
                  }
                  onClick={() => {
                    setInjectVariable(
                      "{{" +
                        `${categorySelected.value}.${templateSelected.value}:${typeData.value}.${selectedSection.value}` +
                        "}}"
                    );
                    setFieldName("");
                    setTypeData("");
                  }}
                >
                  Add template + Variable
                </Button>
              </Col>
            </Row>
            <hr className="mt-4" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Row className="mb-3">
              <Col>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="h6 fw-bold">Template</span>
                  <Button
                    className="btn-custom-primary"
                    style={{ padding: "5px 10px 5px 10px" }}
                    onClick={() => {
                      setTemplateSelected("");
                      setCategorySelected("");
                      setShowInsertModal(true);
                    }}
                  >
                    + Insert Template
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <EditorElement2
                  name="content"
                  formik={formik}
                  injectVariable={injectVariable}
                  setDeletedMediaURL={setDeletedMediaURL}
                  API={{
                    addMedia: addMediaUrl,
                    deleteDraftMedia: deleteDraftMediaUrl,
                  }}
                  setEditorRef={setEditorRef}
                />
                <div style={{ minHeight: "25px" }}>
                  {formik.errors["content"] && formik.touched["content"] ? (
                    <div style={{ color: "red", fontSize: "0.9rem" }}>
                      {formik.errors["content"]}
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          isOpen={showInsertModal}
          closeModal={() => {
            setShowInsertModal(false);
          }}
          centered
          scrollable
          size="xl"
        >
          <ModalHeader
            className="bg-primary pb-3"
            toggle={() => setShowInsertModal(!showInsertModal)}
          >
            <div className="d-flex flex-column text-dark">
              <span className="h5 fw-bold">Insert Template</span>
            </div>
          </ModalHeader>
          <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
            <div>
              <Row className="align-items-end mb-5">
                <Col>
                  <Label>Category</Label>
                  <SelectElement
                    optionsData={templateCategories.map((category) => ({
                      label: category,
                      value: category,
                    }))}
                    setSelectedOptionData={setCategorySelected}
                    placeholder="Select a category"
                    value={categorySelected}
                  />
                </Col>
                <Col>
                  <Label>Template</Label>
                  <SelectElement
                    optionsData={templateList}
                    value={templateSelected}
                    placeholder="Select a field"
                    setSelectedOptionData={setTemplateSelected}
                    module={typeData}
                  />
                </Col>
                <Col>
                  <FileInputElement
                    setFile={setFile}
                    placeholder="Select a docx template"
                    fileSelected={file}
                    disabled={templateSelected}
                  />
                </Col>
                <Col>
                  <Button
                    type="button"
                    className="self-end btn-custom-primary"
                    disabled={(!templateSelected || !categorySelected) && !file}
                    onClick={async () => {
                      if (file) {
                        await convertToHtml(file, setTemplateContentPreview);
                      } else {
                        const template = templatesByCategory.filter(
                          (template) =>
                            template.name == templateSelected.value &&
                            template.category === categorySelected.value
                        )[0];
                        setTemplateContentPreview(template.content);
                        setTemplateSelected("");
                        setCategorySelected("");
                      }
                    }}
                  >
                    Preview
                  </Button>
                </Col>
              </Row>
              <Container
                className="border pt-3 rounded"
                style={{
                  width: "850px",
                  height: "800px",
                  borderColor: "#8AAED6",
                  overflow: "auto",
                }}
              >
                <TemplateDisplayV3
                  content={templateContentPreview}
                  isView={true}
                  processContent={false}
                />
              </Container>
              <hr />
              <div className="d-flex justify-content-end gap-3">
                <Button
                  className="btn-danger"
                  onClick={() => setShowInsertModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="btn-custom-primary"
                  onClick={() => {
                    editorRef.current.setContent(templateContentPreview);
                    setShowInsertModal(false);
                  }}
                >
                  Insert
                </Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
);

export default TemplateBuilder;
