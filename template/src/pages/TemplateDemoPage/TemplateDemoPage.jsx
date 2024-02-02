import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { TemplateDisplayV3 } from "@workspace/common";
import SelectElement from "../../components/TemplateBuilder/SelectElement";
import * as TemplateActions from "../../store/template/action";
import { generateOptions } from "./pdfOption";
import { ExportHelper } from "@workspace/common";
import { GeneralModal } from "@workspace/common";
import { UseTemplateModuleDataHook } from "@workspace/common"; // Use this hook to get module data
import { TemplatePagePreviewModal } from "@workspace/common"; // Use this modal to preview template
import { TemplateAdvanceExportModal } from "@workspace/common"; // Use this modal to export template
import juice from "juice";

const TemplateBuilderPage = () => {
  const dispatch = useDispatch();
  const { templates } = useSelector((state) => state.TemplateReducer);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterTemplates, setFilterTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isView, setIsView] = useState(true);
  const [newContent, setNewContent] = useState("");
  const [selectNameModalOpen, setSelectNameModalOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [exportType, setExportType] = useState("pdf");
  const [showExportModal, setShowExportModal] = useState(false);

  // // ======================= Test ==========================
  // console.log("juice", juice)
  // const originalHtml = "<!DOCTYPE html>\r\n<html>\r\n<head>\r\n\t<meta http-equiv=\"content-type\" content=\"text/html; charset=utf-8\"/>\r\n\t<title></title>\r\n\t<meta name=\"generator\" content=\"LibreOffice 7.6.4.1 (Windows)\"/>\r\n\t<meta name=\"created\" content=\"2022-03-02T06:35:00\"/>\r\n\t<meta name=\"changedby\" content=\"Kalaiselvan Anbazhagan\"/>\r\n\t<meta name=\"changed\" content=\"2022-03-02T06:35:00\"/>\r\n\t<meta name=\"AppVersion\" content=\"16.0000\"/>\r\n\t<meta name=\"Company\" content=\"Daimler AG\"/>\r\n\t<style type=\"text/css\">\r\n\t\t@page { size: 8.5in 11in; margin-left: 0.6in; margin-right: 0.6in; margin-bottom: 0.6in }\r\n\t\tp { line-height: 115%; text-align: left; orphans: 0; widows: 0; margin-right: 0.21in; margin-bottom: 0.1in; direction: ltr; background: transparent }\r\n\t\th1 { color: #2079c7; line-height: 100%; text-align: left; orphans: 0; widows: 0; margin-right: 0.21in; margin-top: 0.42in; margin-bottom: 0in; direction: ltr; background: transparent }\r\n\t\th1.western { font-family: \"Open Sans\", serif; font-weight: bold }\r\n\t\th1.cjk { font-family: \"Open Sans\"; font-weight: bold }\r\n\t\th1.ctl { font-family: \"Open Sans\" }\r\n\t\th2 { color: #000000; line-height: 100%; text-align: left; page-break-inside: avoid; orphans: 0; widows: 0; margin-right: 0.21in; margin-top: 0.22in; margin-bottom: 0in; direction: ltr; background: transparent; page-break-after: avoid }\r\n\t\th2.western { font-size: 11pt; font-weight: bold }\r\n\t\th2.cjk { font-size: 11pt; font-weight: bold }\r\n\t\th2.ctl { font-size: 11pt }\r\n\t\th3 { line-height: 100%; text-align: left; page-break-inside: avoid; orphans: 0; widows: 0; margin-right: 0.21in; margin-top: 0.07in; margin-bottom: 0.07in; direction: ltr; background: transparent; page-break-after: avoid }\r\n\t\th3.western { font-family: \"Open Sans\", serif; font-size: 8pt }\r\n\t\th3.cjk { font-family: \"Open Sans\"; font-size: 8pt }\r\n\t\th3.ctl { font-family: \"Open Sans\"; font-size: 8pt }\r\n\t</style>\r\n</head>\r\n<body lang=\"en-US\" link=\"#000080\" vlink=\"#800000\" dir=\"ltr\">\r\n<div title=\"header\"><p style=\"line-height: 100%; margin-bottom: 0.36in\">\r\n\t<img src=\"tempfile_6_html_deb40fc4.png\" name=\"Picture 2\" align=\"left\" width=\"157\" height=\"52\" border=\"0\"/>\n<br/>\n\r\n\t</p>\r\n</div><p style=\"line-height: 100%; margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n<br/>\n\r\n</p>\r\n<table width=\"698\" cellpadding=\"10\" cellspacing=\"0\">\r\n\t<col width=\"458\"/>\r\n\t<col width=\"200\"/>\r\n\t<tr valign=\"top\">\r\n\t\t<td width=\"458\" height=\"75\" style=\"background: transparent; border: none; padding: 0in\"><p align=\"center\" style=\"margin-bottom: 0.08in; border: none; padding: 0in\">\r\n\t\t\t<font color=\"#000000\">          <font size=\"7\" style=\"font-size: 36pt\"><b>Nicholas\r\n\t\t\tKoh</b></font></font></p>\r\n\t\t\t<p style=\"border: none; padding: 0in\"><a name=\"_ymi089liagec\"></a><br/>\n\r\n\t\t\t</p>\r\n\t\t</td>\r\n\t\t<td width=\"200\" style=\"background: transparent; border: none; padding: 0in\"><p style=\"border: none; padding: 0in\">\r\n\t\t\t<br/>\n\r\n\t\t\t</p>\r\n\t\t</td>\r\n\t</tr>\r\n\t<tr valign=\"top\">\r\n\t\t<td width=\"458\" height=\"764\" style=\"background: transparent; border: none; padding: 0in\"><h1 class=\"western\" style=\"border: none; padding: 0in\">\r\n\t\t\tEXPERIENCE</h1>\r\n\t\t\t<h2 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_rfgvkg2ifhfd\"></a>\r\n\t\t\tDaimler AG, <span style=\"font-weight: normal\">Singapore — </span><i><span style=\"font-weight: normal\">Data\r\n\t\t\tAnalyst</span></i></h2>\r\n\t\t\t<h3 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_n64fgzu3lwuy\"></a>\r\n\t\t\tMay 2021 - PRESENT</h3>\r\n\t\t\t<ul>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tCreate KPI Dashboards for Regional/Market use via Power BI by:</p>\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\t\tExtracting required data from data lake via SQL \r\n\t\t\t\t\t</p></li>\r\n\t\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\t\tProcessing and modelling of data via Databricks (Pyspark,\r\n\t\t\t\t\tPython) and importing these datasets to Power BI</p></li>\r\n\t\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\t\tCreation of measures in Power BI to meet business requirements</p></li>\r\n\t\t\t\t</ul>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Support\r\n\t\t\t\tmarket validation of dashboard figures and investigate causes of\r\n\t\t\t\tinaccuracies</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Fixing\r\n\t\t\t\tbugs or errors in the dashboards reported by business users</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Communicate\r\n\t\t\t\twith stakeholders:</p>\r\n\t\t\t\t<ul>\r\n\t\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">To\r\n\t\t\t\t\tunderstand which business KPI’s are useful for management to\r\n\t\t\t\t\tunderstand the status of the business,</p></li>\r\n\t\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">To\r\n\t\t\t\t\tdetermine which data fields are required to create BI reports</p></li>\r\n\t\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">To\r\n\t\t\t\t\trequest for required data to be onboarded to data lake</p></li>\r\n\t\t\t\t</ul>\r\n\t\t\t</ul>\r\n\t\t\t<h2 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_wj0puh61kxsr\"></a>\r\n\t\t\tMillennium Hotels &amp; Resorts, <span style=\"font-weight: normal\">Singapore\r\n\t\t\t— </span><i><span style=\"font-weight: normal\">Assistant Manager,\r\n\t\t\tProjects &amp; CRM Analytics</span></i></h2>\r\n\t\t\t<h3 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_8hk593fs3sag\"></a>\r\n\t\t\tFeb 2020 - May 2021</h3>\r\n\t\t\t<ul>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tLeading and developing the CRM strategy for Millennium Hotels &amp;\r\n\t\t\t\tResorts with the objective of building brand loyalty, incremental\r\n\t\t\t\trevenue and customer engagement.</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Project\r\n\t\t\t\tmanagement for all Loyalty Programme enhancements and features\r\n\t\t\t\tsuch as member migration between programmes and launching of new\r\n\t\t\t\tinitiatives.</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Management\r\n\t\t\t\tand analysis of customer data via SQL for ETL and database\r\n\t\t\t\tstorage as well as ad hoc queries. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Preparing\r\n\t\t\t\tmonthly/ad hoc member performance reports and dashboards with\r\n\t\t\t\tExcel or Power BI. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Ensuring\r\n\t\t\t\tthat the CRM platform structure works seamlessly and captures all\r\n\t\t\t\trequired information at key points in the customer lifecycle and\r\n\t\t\t\tmaximizing commercial opportunities. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Providing\r\n\t\t\t\toverall support to the Data Analytics Team. \r\n\t\t\t\t</p></li>\r\n\t\t\t</ul>\r\n\t\t\t<h2 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_1hxcpsc1hco2\"></a>\r\n\t\t\tMillennium Hotels &amp; Resorts, <span style=\"font-weight: normal\">Singapore</span>\r\n\t\t\t<span style=\"font-weight: normal\">— </span><i><span style=\"font-weight: normal\">Web\r\n\t\t\tOperations Executive</span></i></h2>\r\n\t\t\t<h3 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_ybypdmed418m\"></a>\r\n\t\t\tMay 2017 - Feb 2020</h3>\r\n\t\t\t<ul>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tManaged digital platform operations and supported internal users,\r\n\t\t\t\tincluding troubleshooting issues as well as small-scale projects\r\n\t\t\t\tsuch as feature enhancements. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Created\r\n\t\t\t\tcampaign and promotional pages for the various marketing teams as\r\n\t\t\t\twell as the global loyalty team. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Managed\r\n\t\t\t\tover 500 domain names for brand recognition. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Executed\r\n\t\t\t\tUser Acceptance Testing for all deployments. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Regularly\r\n\t\t\t\tengaged with global staff to improve user experience on the\r\n\t\t\t\twebsite. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Conducted\r\n\t\t\t\tusability tests to discover customer pain points on the website. \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Created\r\n\t\t\t\t chatbots for the Facebook pages of 2 hotels.  \r\n\t\t\t\t</p></li>\r\n\t\t\t\t<li><p style=\"margin-bottom: 0in; border: none; padding: 0in\">Updated\r\n\t\t\t\tand monitored team budget.</p></li>\r\n\t\t\t</ul>\r\n\t\t\t<h1 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_yk8luflkpwij\"></a>\r\n\t\t\tEDUCATION</h1>\r\n\t\t\t<h2 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_6wymnhinx9q5\"></a>\r\n\t\t\tSingapore Institute of Technology, <span style=\"font-weight: normal\">Singapore\r\n\t\t\t<br/>\n</span><font size=\"2\" style=\"font-size: 10pt\"><i><span style=\"font-weight: normal\">B.Eng\r\n\t\t\t(Hons) Mechatronics </span></i></font>\r\n\t\t\t</h2>\r\n\t\t\t<h3 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_7vtcyzeczjot\"></a>\r\n\t\t\tSep 2014 - Jun 2016</h3>\r\n\t\t\t<p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\tHonours of the Second Class, Division I</p>\r\n\t\t\t<h2 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_czfiadnsgnzp\"></a>\r\n\t\t\tSingapore Polytechnic, <span style=\"font-weight: normal\">Singapore\r\n\t\t\t<br/>\n</span><font size=\"2\" style=\"font-size: 10pt\"><i><span style=\"font-weight: normal\">Diploma\r\n\t\t\tin Aeronautical Engineering</span></i></font></h2>\r\n\t\t\t<h3 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_miiyt1y6sl7g\"></a>\r\n\t\t\tSep 2009 - Sep 2012</h3>\r\n\t\t\t<p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\twith Diploma Plus in Mathematics and Science</p>\r\n\t\t\t<p style=\"margin-top: 0.08in; border: none; padding: 0in\"><br/>\n\r\n\t\t\t</p>\r\n\t\t</td>\r\n\t\t<td width=\"200\" style=\"background: transparent; border: none; padding: 0in\"><h1 class=\"western\" style=\"border: none; padding: 0in\">\r\n\t\t\tSKILLS</h1>\r\n\t\t\t<ul>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tPython</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tSQL</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tDatabricks (Spark)</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tPower BI</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tMicrosoft Office</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tSitecore CMS</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tWindsurfer CRS</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\tRainbow CRM</p></li>\r\n\t\t\t\t<li><p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t\t</p></li>\r\n\t\t\t</ul>\r\n\t\t\t<h1 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_tuxh7mwdaxox\"></a>\r\n\t\t\tNATIONAL SERVICE</h1>\r\n\t\t\t<p style=\"margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\t<b>HQ 6 Division, G8 Branch - </b><i>Assistant Staff Officer </i>\r\n\t\t\t</p>\r\n\t\t\t<p style=\"margin-right: 0in; margin-top: 0.03in; margin-bottom: 0in\">\r\n\t\t\t<font color=\"#384347\"><font face=\"Arial, serif\"><font size=\"1\" style=\"font-size: 8pt\">Managed\r\n\t\t\tthe manpower, operational and logistical aspects of In-Camp\r\n\t\t\tTrainings for servicemen.</font></font></font></p>\r\n\t\t\t<h1 class=\"western\" style=\"border: none; padding: 0in\"><a name=\"_cxxkes25b26\"></a>\r\n\t\t\tLANGUAGES</h1>\r\n\t\t\t<p style=\"margin-top: 0.22in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\tEnglish \r\n\t\t\t</p>\r\n\t\t\t<p style=\"margin-top: 0.22in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\tMandarin \r\n\t\t\t</p>\r\n\t\t\t<p style=\"margin-top: 0.22in; margin-bottom: 0in; border: none; padding: 0in\">\r\n\t\t\tThai \r\n\t\t\t</p>\r\n\t\t\t<p style=\"margin-top: 0.22in; border: none; padding: 0in\">Korean</p>\r\n\t\t</td>\r\n\t</tr>\r\n</table>\r\n<p style=\"line-height: 130%; margin-top: 0.08in; margin-bottom: 0in; border: none; padding: 0in\">\r\n<br/>\n\r\n</p>\r\n</body>\r\n</html>"
  // console.log("originalHtml", originalHtml)
  // const [inlinedHtml, setInlinedHtml] = useState('');
  // useEffect(() => {
  //   setInlinedHtml(juice(originalHtml))
  // }, []);
  // console.log("inlinedHtml", inlinedHtml)
  // // ========================================================

  // Test 2


  const templateData = useSelector((state) => state.TemplateReducer.template);
  const {
    allModuleData,
    setAccountId,
    setJobId,
    setCandidateId,
    setAllIdsHandler,
  } = UseTemplateModuleDataHook.useTemplateModuleData();

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
                      className="border pt-3 pb-3"
                      style={{
                        width: "1250px",
                        height: "1000px",
                        borderColor: "#000000",
                        overflow: "auto",
                      }}
                    >
                      <TemplateDisplayV3
                        content={templateData?.content}
                        allData={allModuleData}
                        isView={isView}
                        handleOutputContent={getNewContent}
                        recursive={true}
                        minHeight={950}
                        initialValues
                      />
                    </Container>
                  </Row>
                  <Row className="mb-3 mt-3 center d-flex justify-content-center">
                    {/* <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() => {
                        setExportType("pdf");
                        setSelectNameModalOpen(true);
                      }}
                      disabled={!templateData?.content}
                    >
                      Download as PDF
                    </Button> */}
                    {/* <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() => {
                        setExportType("docx");
                        setSelectNameModalOpen(true);
                      }}
                      disabled={!templateData?.content}
                    >
                      Download as Docx
                    </Button>
                    <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() => {
                        setExportType("pdfMultiPage");
                        setSelectNameModalOpen(true);
                      }}
                      disabled={!templateData?.content}
                    >
                      Download as PDF
                    </Button>
                    <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() => {
                        setExportType("html");
                        setSelectNameModalOpen(true);
                      }}
                      disabled={!templateData?.content}
                    >
                      Download html file
                    </Button> */}
                    <Button
                      className="w-25 mx-2 btn-custom-primary"
                      onClick={() => setShowExportModal(true)}
                    >
                      Export
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
        <GeneralModal
          isOpen={selectNameModalOpen}
          setIsOpen={setSelectNameModalOpen}
          size="md"
          height="100%"
        >
          <div className="d-flex flex-column">
            <span className="fw-bold fs-5 text-dark">Template Name</span>
            <span className="fw-medium fs-6 text-dark">
              Please enter a template name
            </span>
            <Input
              value={templateName}
              type="text"
              className="mb-3"
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <Button
              className="form-control btn-custom-primary"
              onClick={async () => {
                if (exportType === "pdf") {
                  ExportHelper.generatePDFCustom(
                    newContent,
                    generateOptions({
                      filename: templateName,
                    })
                  );
                }
                if (exportType === "docx") {
                  await ExportHelper.generateDocxCustom(newContent, {
                    filename: templateName,
                  });
                }
                if (exportType === "pdfMultiPage") {
                  ExportHelper.generatePDFCustomMulti(
                    newContent,
                    generateOptions({
                      filename: templateName,
                    })
                  );
                }
                if (exportType === "html") {
                  ExportHelper.generateHtml(newContent, {
                    filename: templateName,
                  });
                }
                setTemplateName("");
                setSelectNameModalOpen(false);
              }}
            >
              Export
            </Button>
          </div>
        </GeneralModal>
        <TemplateAdvanceExportModal
          content={newContent ?? ""}
          showInsertModal={showExportModal}
          setShowInsertModal={setShowExportModal}
          toExport={true}
          allData={allModuleData}
        />
      </div>
    </React.Fragment>
  );
};

export default TemplateBuilderPage;
