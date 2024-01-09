import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FormikProvider, useFormik } from "formik";
import { Col, Row, Label, Input, Button } from "reactstrap";
import { initialValues, schema, populateForm } from "./formikConfig";
import { moduleConstants, moduleFields } from "./constants";
import SelectElement from "./SelectElement";
import EditorElement from "./EditorElement";
import TemplateDisplay from "../TemplateDisplay/TemplateDisplay";
import SelectAPIElement from "./SelectAPIElement";
import EditorElement2 from "./EditorElement2";
import * as TemplateActions from "../../store/template/action";
import { useDispatch, useSelector } from "react-redux";

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

    const templateCategories = useSelector(
      (state) => state.TemplateReducer.templateCategories
    );

    const templatesByCategory = useSelector(
      (state) => state.TemplateReducer.templatesByCategory
    );


    // Get all categories
    useEffect(() => {
      dispatch(TemplateActions.fetchTemplateCategories());
    }, []);

    console.log("categorySelected", categorySelected);

    useEffect(() => {
      if (categorySelected == null) {
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
            value: template.id,
          }))
        );
      }
    }, [templatesByCategory]);

    /**
     * Handle form submit event (Formik)
     * @param {*} values
     */
    const handleFormSubmit = async (values) => {
      console.log("values", values);
      return
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
                  // editorRef={editorRef}
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
                  // editorRef={editorRef}
                />
              </Col>
              <Col>
                <Button
                  type="button"
                  className="self-end"
                  disabled={!templateSelected || !categorySelected}
                  onClick={() => {
                    const template = templatesByCategory.filter(
                      (template) => template.id === templateSelected.value
                    )[0];
                    // formik.setFieldValue("content", template.content);
                    editorRef.current.setContent(template.content);
                    // console.log("template To Inject", template);
                    setTemplateSelected("");
                    setCategorySelected("");
                  }}
                >
                  Insert Template
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
                <Label>Module Field</Label>
                <SelectAPIElement
                  value={fieldName}
                  placeholder="Select a field"
                  setSelectedOptionData={setFieldName}
                  module={typeData}
                  editorRef={editorRef}
                />
              </Col>
              <Col>
                <Button
                  type="button"
                  className="self-end"
                  disabled={!typeData || !fieldName}
                  onClick={() => {
                    console.log(
                      "${",
                      `${typeData.value}.${fieldName.value}`,
                      "}"
                    );
                    setInjectVariable(
                      "${" + `${typeData.value}.${fieldName.value}` + "}"
                    );
                    setFieldName("");
                    setTypeData("");
                  }}
                >
                  Add
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Row className="mb-3">
              <Col>
                <span className="h6 fw-bold">Template</span>
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
                    addMedia: "http://localhost:8181/media/add",
                    deleteDraftMedia:
                      "http://localhost:8181/media/delete/user-draft",
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
      </div>
    );
  }
);

export default TemplateBuilder;
