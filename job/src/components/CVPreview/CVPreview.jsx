import React, { useState } from "react";
import { Row, Col, Button, Container } from "reactstrap";
import {
  TemplateDisplayV3,
  UseTemplateModuleDataHook,
} from "@workspace/common";
import { TemplateHelper } from "@workspace/common";
import { TemplateExportButtons } from "@workspace/common";
import { TemplateAdvanceExportModal } from "@workspace/common";

function CVPreview({ onExitPreview, templateData, candidateId }) {
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
    });
  const [templateDownloadModalShow, setTemplateDownloadModalShow] =
    useState(false);
  const [exportContent, setExportContent] = useState("");

  const handleExitPreview = () => {
    onExitPreview();
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
              <Button onClick={() => setTemplateDownloadModalShow(true)}>
                Download
              </Button>
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
