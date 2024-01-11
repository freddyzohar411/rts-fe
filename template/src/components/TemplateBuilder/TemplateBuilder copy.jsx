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
import SelectElement from "./SelectElement";
import { TemplateDisplay } from "@workspace/common"
import SelectAPIElement from "./SelectAPIElement";
import EditorElement2 from "./EditorElement2";
import * as TemplateActions from "../../store/template/action";
import { useDispatch, useSelector } from "react-redux";
import { addMediaUrl, deleteDraftMediaUrl } from "../../helpers/backend_helper";

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
            {/* <Row className="align-items-end mb-3">
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
                    editorRef.current.setContent(template.content);
                    setTemplateSelected("");
                    setCategorySelected("");
                  }}
                >
                  Insert Template
                </Button>
              </Col>
            </Row> */}
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
                <div className="d-flex align-items-center justify-content-between">
                  <span className="h6 fw-bold">Template</span>
                  <Button
                    className="btn-custom-primary"
                    style={{ padding: "5px 10px 5px 10px" }}
                    onClick={() => setShowInsertModal(true)}
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
                  <Button
                    type="button"
                    className="self-end btn-custom-primary"
                    disabled={!templateSelected || !categorySelected}
                    onClick={() => {
                      const template = templatesByCategory.filter(
                        (template) => template.id === templateSelected.value
                      )[0];
                      setTemplateContentPreview(template.content);
                      setTemplateSelected("");
                      setCategorySelected("");
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
                }}
              >
                <TemplateDisplay
                  content={templateContentPreview}
                  isView={true}
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
