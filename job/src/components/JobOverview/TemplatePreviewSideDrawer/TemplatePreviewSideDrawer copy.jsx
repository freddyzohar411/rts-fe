import React, { useState, useEffect, useMemo } from "react";
import { Container, Button } from "reactstrap";
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
}) => {
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
      jobId: jobId,
    });
  const [templateData, setTemplateData] = useState(null);
  const [exportContent, setExportContent] = useState("");
  const [showContent, setShowContent] = useState({
    oldHtml: "",
    newHtml: "",
  });

  //   useEffect(() => {
  //     set;
  //   }, [templateData, allModuleData]);

  useEffect(() => {
    const setSelectedContentAndProcessed = async () => {
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

      setShowContent((prev) => ({
        ...prev,
        oldHtml: templatePreviewInfo?.content,
        ...convertInlineStylesContent,
      }));
    };

    if (templatePreviewInfo?.content && allModuleData) {
      setSelectedContentAndProcessed();
      return;
    }
    // if (content || templateContent) {
    if (templatePreviewInfo?.content && templatePreviewInfo?.content !== "") {
      const removeEditableContent =
        TemplateHelper.removeContentEditableAndStyles(
          templatePreviewInfo?.content
        );

      const convertTableAttributesContent =
        TemplateHelper.convertStyleToAttributesTable(removeEditableContent);

      const convertInlineStylesContent =
        TemplateHelper.convertInlineStylesToClasses(
          convertTableAttributesContent
        );
      /*
      setShowContent((prev) => ({
        ...prev,
        oldHtml: templatePreviewInfo?.content,
        ...convertInlineStylesContent,
      }));
      */

      setShowContent({
        oldHtml: templatePreviewInfo?.content,
        newHtml: "",
        ...convertInlineStylesContent,
      });
    }
  }, [
    templatePreviewInfo?.content,
    allModuleData,
    templatePreviewAction?.type,
  ]);

  const generatePreview = (actionType) => {
    console.log("showContent", showContent);
    switch (actionType) {
      case "VIEW":
        return (
          <TemplateDisplayV3
            // content={templateData?.content ?? null}
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
            height="570px"
          />
        );

      default:
      // return (
      //   <TemplateDisplayV3
      //     // content={templateData?.content ?? null}
      //     content={showContent?.oldHtml ?? null}
      //     isAllLoading={isAllLoading}
      //     // allData={allModuleData}
      //     isView={true}
      //     initialValues
      //     handleOutputContent={setExportContent}
      //   />
    }
  };

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
          <>
            {generatePreview(templatePreviewAction?.type)}
            {/* {templatePreviewAction?.type === "ATTACH_TEMPLATE" && (
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
              />
            )}

            {!templatePreviewAction?.type && (
              <TemplateDisplayV3
                content={templateData?.content ?? null}
                isAllLoading={isAllLoading}
                allData={allModuleData}
                isView={true}
                initialValues
                handleOutputContent={setExportContent}
              />
            )} */}
          </>
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
