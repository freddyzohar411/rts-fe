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
  ModalFooter,
} from "reactstrap";
import {
  createTemplate,
  fetchTemplate,
  updateTemplate,
} from "../../store/template/action";
import { TemplateBuilder } from "../../components";
import TemplateDisplay from "../../components/TemplateDisplay/TemplateDisplay";
import axios from "axios";

const TemplateBuilderPage = () => {
  const { templateId } = useParams();
  const type = templateId ? "edit" : "create";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);
  const [showModalSchema, setShowModalSchema] = useState(false);
  const [editorContent, setEditorContent] = useState("");

  const templateEditData = useSelector(
    (state) => state.TemplateReducer.template
  );
  console.log("templateEditData", templateEditData);
  const handleFormSubmit = async (values, deletedImagesURL) => {
    console.log(values);
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

      console.log("deletedImagesURL", deletedImagesURL);
      axios.delete(`http://localhost:8181/images/delete`, {
        data: deletedImagesURL,
      });
    }
  };

  useEffect(() => {
    if (templateId) {
      dispatch(fetchTemplate(templateId));
    }
  }, [templateId]);

  return (
    <React.Fragment>
      <div className="page-content">
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
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fw-bold fs-5 text-dark">
                      Template Builder
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      Begin by creating a new template
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <TemplateBuilder
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
                        onClick={() => setShowModalSchema(true)}
                      >
                        Preview
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-custom-primary"
                        onClick={() => formikRef.current.formik.resetForm()}
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
                <TemplateDisplay
                  content={formikRef?.current?.formik.values["content"]}
                  isView={true}
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
