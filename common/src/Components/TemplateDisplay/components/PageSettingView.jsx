import React, { useRef, useState, useEffect } from "react";
import "./PageSettingView.scss";
import ReactHtmlParser from "react-html-parser";
import * as ExportHelper from "../../../helpers/export_helper";

const PageSettingView = ({ pageSize = "a4", settings, content }) => {
  const iframeRef = useRef(null);
  const [paginationInfo, setPaginationInfo] = useState({
    numberOfPages: 0,
    breakPoints: [],
  });

  const {
    unit,
    pageType,
    pageOrientation,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
  } = settings;

  const generateMarginStyle = () => {
    let conversion = 96;

    if (unit === "mm") {
      conversion = 3.7795275591;
    }

    return {
      paddingTop: `${margin.top * conversion}px`,
      paddingRight: `${margin.right * conversion}px`,
      paddingBottom: `${margin.bottom * conversion}px`,
      paddingLeft: `${margin.left * conversion}px`,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      if (iframeRef.current) {
        const pdfBlob = await ExportHelper.convertHtmlToPdfBlob(content, {
          ...settings,
        });
        // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
        const blobUrl = URL.createObjectURL(pdfBlob);

        // Set the Blob URL as the source for the iframe
        iframeRef.current.src = blobUrl;
      }
    };

    fetchData();

    return () => {
      // Clean up the Blob URL when the component unmounts
      if (iframeRef.current) {
        URL.revokeObjectURL(iframeRef.current.src);
      }
    };
  }, [
    content,
    settings.marginBottom,
    settings.marginLeft,
    settings.marginRight,
    settings.marginTop,
    settings.pageOrientation,
    settings.pageType,
    settings.unit,
  ]);

  return (
    <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="635px" />
  );
};

export default PageSettingView;
