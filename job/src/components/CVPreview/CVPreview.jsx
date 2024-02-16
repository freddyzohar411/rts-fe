import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Container,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import {
  TemplateDisplayV3,
  UseTemplateModuleDataHook,
  TemplateHelper,
  ExportHelper,
  TemplateAdvanceExportModal,
} from "@workspace/common";

function CVPreview({ onExitPreview, templateData, candidateId }) {
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
    });
  const [templateDownloadModalShow, setTemplateDownloadModalShow] =
    useState(false);
  const [exportContent, setExportContent] = useState("");
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleExitPreview = () => {
    onExitPreview();
  };

  const downloadHandler = async (content, type) => {
    if (!content) return;
    const processedTemplate =
      await TemplateHelper.setSelectedContentAndProcessed(
        content,
        allModuleData
      );

    if (type === "pdf") {
      await ExportHelper.exportBackendHtml2Pdf(
        processedTemplate.html,
        {
          unit: "in",
          pageType: "A4",
          pageOrientation: "portrait",
          marginTop: 0,
          marginBottom: 0,
          marginLeft: 0,
          marginRight: 0,
          exportType: "pdf",
          fileName: `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}_CV`,
        },
        processedTemplate.styleTag
      );
    }
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
            {templateData?.content ? (
              <Container
                className="p-3 mt-3 border border-1 border-dark"
                style={{ height: "100%", minWidth: "80%" }}
              >
                <TemplateDisplayV3
                  content={templateData?.content ?? null}
                  isAllLoading={isAllLoading}
                  allData={allModuleData}
                  isView={true}
                  initialValues
                  handleOutputContent={setExportContent}
                />
              </Container>
            ) : (
              <h1>Loading...</h1>
            )}
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <div className="d-flex flex-row gap-2 justify-content-end">
              <UncontrolledDropdown className="btn-group">
                <Button
                  type="submit"
                  className="btn btn-custom-primary"
                  onClick={async () => {
                    // Download pdf here
                    setDownloadLoading(true);
                    await downloadHandler(templateData?.content, "pdf");
                    setDownloadLoading(false);
                  }}
                >
                  {downloadLoading ? "Downloading..." : "Download"}
                </Button>
                <DropdownToggle
                  tag="button"
                  type="button"
                  className="btn btn-custom-primary"
                  split
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  {/* Start here */}
                  <li>
                    <DropdownItem
                      onClick={() => {
                        setTemplateDownloadModalShow(true);
                      }}
                    >
                      Advanced Options
                    </DropdownItem>
                  </li>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Button
                className="btn btn-danger"
                type="button"
                onClick={handleExitPreview}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
        <TemplateAdvanceExportModal
          content={exportContent}
          showInsertModal={templateDownloadModalShow}
          setShowInsertModal={setTemplateDownloadModalShow}
          toExport={true}
          allData={allModuleData}
        />
      </div>
    </React.Fragment>
  );
}

export default CVPreview;
