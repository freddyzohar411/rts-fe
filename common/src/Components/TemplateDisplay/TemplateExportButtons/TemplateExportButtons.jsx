import React from "react";
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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import * as ExportHelper from "../../../helpers/export_helper";
import GeneralModal from "../../GeneralModal/GeneralModal";
import { generateOptions } from "../pdfOption";

const TemplateExportButtons = ({ content }) => {
  const [selectNameModalOpen, setSelectNameModalOpen] = React.useState(false);
  const [templateName, setTemplateName] = React.useState("");
  const [exportType, setExportType] = React.useState("");

  return (
    <>
      <UncontrolledDropdown direction="up">
        <DropdownToggle caret color="primary" className="btn btn-custom-primary">
          Download
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => {
              setExportType("pdfMultiPage");
              setSelectNameModalOpen(true);
            }}
          >
            Pdf
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setExportType("docx");
              setSelectNameModalOpen(true);
            }}
          >
            Docx
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setExportType("html");
              setSelectNameModalOpen(true);
            }}
          >
            Html
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
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
              if (exportType === "docx") {
                await ExportHelper.generateDocxCustom(content, {
                  filename: templateName,
                });
              }
              if (exportType === "pdfMultiPage") {
                ExportHelper.generatePDFCustomMulti(
                  content,
                  generateOptions({
                    filename: templateName,
                  })
                );
              }

              setTemplateName("");
              setSelectNameModalOpen(false);
            }}
          >
            Export
          </Button>
        </div>
      </GeneralModal>
    </>
  );
};

export default TemplateExportButtons;
