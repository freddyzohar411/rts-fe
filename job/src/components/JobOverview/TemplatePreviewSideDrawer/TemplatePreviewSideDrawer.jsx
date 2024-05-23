import React, { useState, useEffect, useMemo } from "react";
import { Container, Button, Spinner } from "reactstrap";
import { SideDrawer } from "@workspace/common";
import {
  TemplateSelectByCategoryElement,
  TemplateDisplayV3,
  UseTemplateModuleDataHook,
  ExportHelper,
  TemplateHelper,
  FileHelper,
  PageSettingViewBackend,
} from "@workspace/common";

const TemplatePreviewSideDrawer = ({
  showSideDrawer,
  setShowSideDrawer,
  templatePreviewInfo,
  candidateId,
  jobId,
  templatePreviewAction = null,
  jobTimeLineData,
}) => {
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: jobTimeLineData?.candidate?.id,
      jobId: jobTimeLineData?.job?.id,
    });
  const [templateData, setTemplateData] = useState(null);
  const [exportContent, setExportContent] = useState("");
  const [showContent, setShowContent] = useState({
    oldHtml: "",
    newHtml: "",
  });
  const [previewJsx, setPreviewJsx] = useState(null);
  const [isAttachmentLoading, setIsAttachmentLoading] = useState(false);

  useEffect(() => {
    const setSelectedContentAndProcessed = async () => {
      if (templateData?.content) {
        const processedContent = await TemplateHelper.runEffects(
          templateData.content,
          null,
          allModuleData,
          true
        );
        const removeEditableContent =
          TemplateHelper.removeContentEditableAndStyles(processedContent);
        const convertTableAttributesContent =
          TemplateHelper.convertStyleToAttributesTable(removeEditableContent);
        const convertInlineStylesContent =
          TemplateHelper.convertInlineStylesToClasses(
            convertTableAttributesContent
          );

        setShowContent({
          oldHtml: templateData.content,
          newHtml: convertInlineStylesContent.newHtml,
          ...convertInlineStylesContent,
        });
      }
    };

    setSelectedContentAndProcessed();
  }, [templateData?.content, allModuleData]);

  useEffect(() => {
    const setSelectedContentAndProcessed = async () => {
      if (templatePreviewInfo?.content) {
        const processedContent = await TemplateHelper.runEffects(
          templatePreviewInfo?.content,
          null,
          allModuleData,
          true
        );
        const removeEditableContent =
          TemplateHelper.removeContentEditableAndStyles(processedContent);
        const convertTableAttributesContent =
          TemplateHelper.convertStyleToAttributesTable(removeEditableContent);
        const convertInlineStylesContent =
          TemplateHelper.convertInlineStylesToClasses(
            convertTableAttributesContent
          );

        setShowContent({
          oldHtml: templatePreviewInfo?.content,
          newHtml: convertInlineStylesContent.newHtml,
          ...convertInlineStylesContent,
        });
      }
    };

    setSelectedContentAndProcessed();
  }, [
    allModuleData,
    templatePreviewAction?.type,
    templatePreviewInfo?.content,
  ]);

  const generatePreview = (actionType) => {
    switch (actionType) {
      case "VIEW":
        return (
          <TemplateDisplayV3
            content={showContent?.oldHtml ?? null}
            isAllLoading={isAllLoading}
            allData={allModuleData}
            isView={true}
            initialValues
            handleOutputContent={setExportContent}
          />
        );
      case "ATTACH_TEMPLATE":
        return (
          <PageSettingViewBackend
            content={showContent}
            settings={{
              unit: "in",
              pageType: "A4",
              pageOrientation: "portrait",
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
            width="100%"
            height="560px"
          />
        );

      default:
    }
  };

  const generateActionButton = (actionType) => {
    switch (actionType) {
      case "ATTACH_TEMPLATE":
        return (
          <span className="d-flex align-items-center gap-2 justify-content-center">
            <i className=" ri-attachment-line fs-5"></i>
            <span>{templatePreviewAction?.label}</span>
          </span>
        );
      default:
        return (
          <>
            <span>Submit</span>
          </>
        );
    }
  };

  useEffect(() => {
    if (showContent) {
      setPreviewJsx(generatePreview(templatePreviewAction?.type));
    }
  }, [showContent, templatePreviewAction?.type]);

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
            overflow: "auto",
          }}
        >
          <>{previewJsx}</>
        </Container>
      </div>

      {templatePreviewAction?.action && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "65px",
            flexShrink: 0,
            flexGrow: 0,
            marginBottom: "10px",
          }}
        >
          <Button
            type="button"
            className="btn btn-success w-75"
            onClick={async () => {
              setIsAttachmentLoading(true);
              await templatePreviewAction?.action(templateData);
              setIsAttachmentLoading(false);
            }}
          >
            {isAttachmentLoading ? (
              <Spinner size="sm"></Spinner>
            ) : (
              generateActionButton(templatePreviewAction?.type)
            )}
          </Button>
        </div>
      )}
    </SideDrawer>
  );
};

export default TemplatePreviewSideDrawer;
