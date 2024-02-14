import React, { useRef, useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import "./PageSettingView.scss";
import * as ExportHelper from "../../../helpers/export_helper";

const PageSettingViewBackend = ({ settings, content }) => {
  const iframeRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Content", content);

  useEffect(() => {
    let isMounted = true; // Flag to track mounting status
    const fetchData = async () => {
      if (!iframeRef.current || !content.html) {
        return;
      }
      if (iframeRef.current && content.html) {
        try {
          setIsLoading(true);
          const pdfBlob = await ExportHelper.exportBackendHtml2PdfBlobExtCss(
            content.html,
            {
              ...settings,
            },
            content.styleTag
          );

          if (!isMounted) {
            return;
          }
          // Assuming you have a Blob object named 'pdfBlob' representing your PDF data
          const blobUrl = URL.createObjectURL(pdfBlob);

          // Set the Blob URL as the source for the iframe
          if (iframeRef.current) iframeRef.current.src = blobUrl;
          // iframeRef.current.src = blobUrl;
        } catch (error) {
          console.error("Error in fetching data", error);
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
    };

    if (content) {
      fetchData();
    }

    console.log("Is Loading", isLoading);
    return () => {
      isMounted = false; // Update flag on component unmount
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

  // if (isLoading) {
  //   return (
  //     <div
  //       style={{ height: "635px" }}
  //       className="d-flex justify-content-center align-items-center"
  //     >
  //       <h2>Loading...</h2>
  //     </div>
  //   );
  // }

  return (
    <>
      {content?.html ? (
        <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="635px" className={isLoading ? "d-none" : "d-block" } />
      ) : (
        <div
          style={{ height: "635px" }}
          className="d-flex justify-content-center align-items-center"
        >
          <h2>Please select template to load</h2>
        </div>
      )}
      {
        isLoading && (
          <div
            style={{ height: "635px" }}
            className="d-flex justify-content-center align-items-center"
          >
            {/* <h2>Loading...</h2> */}
            <Spinner style={{ width: '100px', height: '100px', color: "black"}}/>
          </div>
        )
      }
    </>
  //   <>
  //   <div
  //     style={{ height: "635px" }}
  //     className={`d-flex justify-content-center align-items-center ${!content || isLoading ? 'loading' : ''}`}
  //   >
  //     {isLoading ? (
  //       <h2>Loading...</h2>
  //     ) : content ? (
  //       <iframe ref={iframeRef} title="PDF Viewer" width="80%" height="635px" style={{ display: 'block' }} />
  //     ) : (
  //       <h2>Please select a template to load</h2>
  //     )}
  //   </div>
  // </>
  );
};

export default PageSettingViewBackend;
