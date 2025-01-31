import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import {
  createTemplate,
  fetchTemplate,
  updateTemplate,
} from "../../store/template/action";
import { TemplateBuilder } from "../../components";
import { TemplateDisplayV3 } from "@workspace/common";
import axios from "axios";
import { deleteMediaUrls } from "../../helpers/backend_helper";
import { DeleteCustomModal } from "@workspace/common";
import FileInputElement from "./FileInputElement";
import { FileHelper } from "@workspace/common";

const TemplateBuilderPage = () => {
  // ========================= Dev Settings =========================
  const loadJSONFlag = true;
  // ================================================================
  const { templateId } = useParams();
  const type = templateId ? "edit" : "create";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [showModalSchema, setShowModalSchema] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [jsonFile, setJsonFile] = useState(null);
  const [loadedJSON, setLoadedJSON] = useState(null);

  useEffect(() => {
    if (jsonFile) {
      FileHelper.convertJSONFileToJSONObject(jsonFile).then((data) => {
        setLoadedJSON(data);
      });
    }
    if (jsonFile == null) {
      setLoadedJSON(null);
    }
  }, [jsonFile]);

  const templateEditData = useSelector(
    (state) => state.TemplateReducer.template
  );

  /**
   * Form submit handler to be passed to the builder as a callback
   * @param {*} values
   * @param {*} deletedMediaURL
   */
  const handleFormSubmit = async (values, deletedMediaURL) => {
    if (type === "create") {
      dispatch(
        createTemplate({
          newTemplate: values,
          navigate: navigate,
          path: "/settings/templates",
        })
      );
    }

    if (type === "edit" && templateEditData) {
      dispatch(
        updateTemplate({
          templateId,
          updatedTemplate: values,
          navigate: navigate,
          path: "/settings/templates",
        })
      );

      axios.delete(deleteMediaUrls(), {
        data: deletedMediaURL,
      });
    }
  };

  /**
   * Fetch template data if templateId is present
   */
  useEffect(() => {
    if (templateId) {
      dispatch(fetchTemplate(templateId));
    }
  }, [templateId]);

  // Confirm Reset Template
  const confirmResetTemplate = () => {
    formikRef.current.clearForm();
    setIsResetModalOpen(false);
  };

  const handleSaveJSONData = () => {
    const { id, ...ObjData } = formikRef.current.formik.values;
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(ObjData, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${ObjData?.name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <DeleteCustomModal
          isOpen={isResetModalOpen}
          setIsOpen={setIsResetModalOpen}
          confirmDelete={confirmResetTemplate}
          header="Reset Template"
          deleteText={"Are you sure you would like to reset the template?"}
        />
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/settings/templates">Templates</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>
                  {type === "create" ? "Create" : "Edit"}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header d-flex justify-content-between">
                  <div className="d-flex flex-column">
                    <span className="fw-bold fs-5 text-dark">
                      Template Builder
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      Begin by creating a new template
                    </span>
                  </div>
                  <div>
                    {loadJSONFlag && type == "create" && (
                      <FileInputElement
                        width="350px"
                        placeholder="Add JSON"
                        setFile={setJsonFile}
                        fileSelected={jsonFile}
                      />
                    )}
                  </div>
                </CardHeader>
                <CardBody>
                  <TemplateBuilder
                    loadedJSON={loadedJSON}
                    type={type}
                    templateEditData={templateEditData}
                    ref={formikRef}
                    onSubmit={handleFormSubmit}
                    setEditorContent={setEditorContent}
                  />
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to="/settings/templates">
                      <Button type="button" className="btn btn-custom-primary">
                        Back
                      </Button>
                    </Link>
                    <div className="d-flex flex-row gap-2">
                      <Button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => handleSaveJSONData()}
                      >
                        Save JSON
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => setShowModalSchema(true)}
                      >
                        Preview
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => setIsResetModalOpen(true)}
                      >
                        Reset
                      </Button>
                      <Button
                        type="submit"
                        className="btn btn-custom-primary"
                        onClick={() => formikRef.current.formik.submitForm()}
                      >
                        {type === "create" ? "Save" : "Update"}
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

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
                <span className="h5 fw-bold">Template Preview</span>
              </div>
            </ModalHeader>
            <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
              <div>
                <TemplateDisplayV3
                  content={formikRef?.current?.formik.values["content"]}
                  isView={true}
                  processContent={false}
                />
              </div>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TemplateBuilderPage;
