import React, { useRef, useState, useEffect } from "react";
import "./PageSettingView.scss";
import * as ExportHelper from "../../../helpers/export_helper";

const PageSettingViewBackend = ({ settings, content }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (iframeRef.current && content.html) {
        const pdfBlob = await ExportHelper.exportBackendHtml2PdfBlobExtCss(
          content.html,
          {
            ...settings,
          },
          content.styleTag
        );
        // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Set the Blob URL as the source for the iframe
        iframeRef.current.src = blobUrl;
      }
    };

    if (content) {
      fetchData();
    }

    return () => {
      // Clean up the Blob URL when the component unmounts
      if (iframeRef.current) {
        URL.revokeObjectURL(iframeRef.current.src);
      }
    };
  }, [
    content.html,
    settings.marginBottom,
    settings.marginLeft,
    settings.marginRight,
    settings.marginTop,
    settings.pageOrientation,
    settings.pageType,
    settings.unit,
  ]);

  return (
    <>
      {content ? (
        <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="635px" />
      ) : (
        <div
          style={{ height: "635px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <h2>Please select template to load</h2>
        </div>
      )}
    </>
  );
};

export default PageSettingViewBackend;