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
  Label,
  Input,
} from "reactstrap";
import { fetchTemplate } from "../../store/template/action";
import { TemplateDisplay } from "@workspace/common";
import SelectElement from "../../components/TemplateBuilder/SelectElement";
import * as TemplateActions from "../../store/template/action";
import useModuleData from "../../hooks/ModuleDataHook";
import { generateOptions } from "./pdfOption";
import { ExportHelper } from "@workspace/common";

const TemplateBuilderPage = () => {
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.TemplateReducer);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterTemplates, setFilterTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isView, setIsView] = useState(true);
  const [newContent, setNewContent] = useState("");
  const templateData = useSelector((state) => state.TemplateReducer.template);
  const {
    allModuleData,
    setAccountId,
    setJobId,
    setCandidateId,
    setAllIdsHandler,
  } = useModuleData();

  useEffect(() => {
    dispatch(
      TemplateActions.fetchTemplates({
        page: 0,
        pageSize: 99,
        sortBy: null,
        sortDirection: "asc",
        searchTerm: null,
      })
    );
    return () => {
      dispatch(TemplateActions.clearTemplate());
    };
  }, []);

  // Set unique categories
  useEffect(() => {
    const categories = templates?.templates?.reduce((acc, template) => {
      const category = template.category;
      if (!acc.find((item) => item.value === category)) {
        acc.push({ label: category, value: category });
      }
      return acc;
    }, []);
    setCategories(categories);
  }, [templates]);

  // Select template names based on category
  useEffect(() => {
    // Set Label and value , value as id
    if (!selectedCategory) return;
    setSelectedTemplate(null);
    const templatesFiltered = templates?.templates?.reduce((acc, template) => {
      if (template.category === selectedCategory?.value) {
        acc.push({ label: template.name, value: template.id });
      }
      return acc;
    }, []);
    setFilterTemplates(templatesFiltered);
  }, [selectedCategory]);

  const handleSetHandler = () => {
    dispatch(fetchTemplate(selectedTemplate?.value));
  };

  const getNewContent = (content) => {
    setNewContent(content);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/general">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Link to="/settings/templates">Templates</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Demo</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fw-bold fs-5 text-dark">
                      Template Demo
                    </span>
                    <span className="fw-medium fs-6 text-dark">
                      {/* Begin by creating a new template */}
                    </span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <Row className="mb-1">
                        <Col>
                          <span className="h6 fw-bold">Meta Data</span>
                        </Col>
                      </Row>
                      <Row className="mb-1">
                        <Col>
                          <Label htmlFor="accountId">Account Id</Label>
                          <Input
                            type="number"
                            name="accountId"
                            className="form-control"
                            placeholder="Enter a account id"
                            onChange={(e) => setAccountId(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <Label htmlFor="jobId">Job Id</Label>
                          <Input
                            type="number"
                            name="category"
                            className="form-control"
                            placeholder="Enter a job id"
                            onChange={(e) => setJobId(e.target.value)}
                          />
                        </Col>
                        <Col>
                          <Label htmlFor="candidateId">Candidate Id</Label>
                          <Input
                            type="number"
                            name="candidateId"
                            className="form-control"
                            placeholder="Enter a candidate id"
                            onChange={(e) => setCandidateId(e.target.value)}
                          />
                        </Col>
                      </Row>
                      <Row className="align-items-end">
                        <Col>
                          <Label>Category</Label>
                          <SelectElement
                            optionsData={categories}
                            setSelectedOptionData={setSelectedCategory}
                            placeholder="Select a type"
                            value={selectedCategory}
                          />
                        </Col>
                        <Col>
                          <Label>Templates</Label>
                          <SelectElement
                            optionsData={filterTemplates}
                            value={selectedTemplate}
                            placeholder="Select a field"
                            setSelectedOptionData={setSelectedTemplate}
                          />
                        </Col>
                        <Col>
                          <Button
                            type="button"
                            className="self-end"
                            onClick={() => {
                              console.log("selectedTemplate", selectedTemplate);
                              setAllIdsHandler();
                              handleSetHandler();
                            }}
                            disabled={!selectedTemplate}
                          >
                            Set
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            type="button"
                            className="self-end"
                            onClick={() => {
                              setIsView(!isView);
                            }}
                          >
                            Toggle
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <Row className="">
                    <Container
                      className="border pt-3"
                      style={{
                        width: "850px",
                        height: "1000px",
                        borderColor: "#000000",
                      }}
                    >
                      <TemplateDisplay
                        content={templateData?.content}
                        allData={allModuleData}
                        isView={isView}
                        getNewContent={getNewContent}
                      />
                    </Container>
                  </Row>
                  <Row className="mb-3 mt-3 center d-flex justify-content-center">
                    <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() =>
                        ExportHelper.generatePDFCustom(
                          newContent,
                          generateOptions({
                            filename: "test",
                          })
                        )
                      }
                      disabled={!templateData?.content}
                    >
                      Download as PDF
                    </Button>
                    <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() =>
                        // exportDocx(newContent)
                        ExportHelper.generateDocxCustom(newContent, {
                          filename: "test",
                        })
                      }
                      disabled={!templateData?.content}
                    >
                      Download as Docx
                    </Button>
                  </Row>
                </CardBody>
                <CardFooter>
                  <div className="d-flex flex-row justify-content-between">
                    <Link to="/settings/templates">
                      <Button type="button" className="btn btn-custom-primary">
                        Back
                      </Button>
                    </Link>
                    <div className="d-flex flex-row gap-2">
                      <Button type="button" className="btn btn-custom-primary">
                        Submit
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
