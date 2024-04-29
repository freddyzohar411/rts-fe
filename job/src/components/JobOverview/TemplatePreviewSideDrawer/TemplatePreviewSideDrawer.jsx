import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import { SideDrawer } from "@workspace/common";
import {
  TemplateSelectByCategoryElement,
  TemplateDisplayV3,
  UseTemplateModuleDataHook,
} from "@workspace/common";

const TemplatePreviewSideDrawer = ({
  showSideDrawer,
  setShowSideDrawer,
  templatePreviewInfo,
  candidateId,
  jobId,
  templatePreviewAction = null,
}) => {
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
      jobId: jobId,
    });
  const [templateData, setTemplateData] = useState(null);
  const [exportContent, setExportContent] = useState("");

  
  return (
    <SideDrawer
      width="40vw"
      showSideDrawer={showSideDrawer}
      setShowSideDrawer={setShowSideDrawer}
      headerComponents={
        <div>
          <TemplateSelectByCategoryElement
            categoryName={templatePreviewInfo?.category}
            placeholder="Select a template"
            onChange={(value) => {
              setTemplateData(value);
            }}
            width="250px"
            end
            value={templatePreviewInfo}
          />
        </div>
      }
    >
      <div
        className="flex-grow-1"
        style={{
          overflowY: "auto",
        }}
      >
        <Container
          className="p-3 my-3"
          style={{
            width: "90%",
            borderRadius: "10px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
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
      </div>

      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "65px",
          flexShrink: 0,
          flexGrow: 0,
        }}
      >
        <Button
          type="button"
          className="btn btn-success w-75"
          onClick={() => templatePreviewAction?.action(exportContent)}
        >
          {templatePreviewAction?.label || "Submit"}
        </Button>
      </div>
    </SideDrawer>
  );
};

export default TemplatePreviewSideDrawer;
