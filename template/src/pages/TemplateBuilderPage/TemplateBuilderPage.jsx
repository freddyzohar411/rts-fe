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
} from "reactstrap";
import {
  createTemplate,
  fetchTemplate,
  updateTemplate,
} from "../../store/template/action";
import { TemplateBuilder } from "../../components";

const TemplateBuilderPage = () => {
  const { templateId } = useParams();
  const type = templateId ? "edit" : "create";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef(null);

  const templateEditData = useSelector(
    (state) => state.TemplateReducer.template
  );
  console.log("templateEditData", templateEditData);
  const handleFormSubmit = async (values) => {
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
                  <Link to="/settings/access">Templates</Link>
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
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TemplateBuilderPage;
