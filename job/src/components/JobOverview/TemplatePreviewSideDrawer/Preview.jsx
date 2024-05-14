import React from "react";
import { PageSettingViewBackend, TemplateDisplayV3 } from "@workspace/common";

const Preview = ({ type, allModuleData, isAllLoading, showContent }) => {
  return (
    <>
      {type === "ATTACH_TEMPLATE" && showContent && (
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

      {type === "VIEW" && showContent && (
        <TemplateDisplayV3
          content={showContent?.oldHtml}
          isAllLoading={isAllLoading}
          allData={allModuleData}
          isView={true}
          initialValues
        //   handleOutputContent={setExportContent}
        />
      )}
    </>
  );
};

export default Preview;
