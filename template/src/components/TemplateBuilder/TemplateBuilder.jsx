import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { FormikProvider, useFormik } from "formik";
import { Col, Row, Label, Input, Button } from "reactstrap";
import {
  initialValues,
  schema,
  populateForm,
} from "./formikConfig";
import { moduleConstants, moduleFields } from "./constants";
import SelectElement from "./SelectElement";
import EditorElement from "./EditorElement";
import TemplateDisplay from "../TemplateDisplay/TemplateDisplay";
import SelectAPIElement from "./SelectAPIElement";

const TemplateBuilder = forwardRef(
  ({ type, templateEditData, onSubmit, ...props }, ref) => {
    const [typeData, setTypeData] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [injectVariable, setInjectVariable] = useState("");
    const [editorRef, setEditorRef] = useState(null);
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const [formSchema, setFormSchema] = useState(schema);

    const handleFormSubmit = async (values) => {
      await onSubmit(values);
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
                <EditorElement
                  name="content"
                  formik={formik}
                  injectVariable={injectVariable}
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
            {/* // Just for checking */}
            <Row>
              <Col>
                <TemplateDisplay
                  content={formik?.values?.["content"]}
                  mappedVariableData={null}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
);

export default TemplateBuilder;
