import React, { useEffect, useState } from "react";
import { ButtonGroup, Button, Container, Spinner } from "reactstrap";
import "./ConditionalOffer.scss";
import ConditionalOfferSideDrawer from "./ConditionalOfferSideDrawer";
import {
  TemplateDisplayV3,
  TemplateSelectByCategoryElement,
  TemplateHelper,
  UseTemplateModuleDataHook,
  ExportHelper,
} from "@workspace/common";


const ConditionalOffer = ({ candidateId, jobId }) => {
  const [isPrepareDrawerOpen, setIsPrepareDrawerOpen] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [conditionalOfferContent, setConditionalOfferContent] = useState("");
  const [SideDrawerContent, setSideDrawerContent] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [transformScale, setTransformScale] = useState(1);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
      jobId: jobId,
    });

  function getSideDrawerData(content) {
    // Parse the HTML string into a DOM object
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Query for elements that have all three required data attributes
    const selector = "[data-key][data-label][data-section]";
    const elements = doc.querySelectorAll(selector);

    // Map the elements to an array of objects with the attribute values
    const dataObjects = Array.from(elements).map((element) => ({
      key: element.getAttribute("data-key"),
      label: element.getAttribute("data-label"),
      section: element.getAttribute("data-section"),
    }));

    // Group the header and create an array of object with header(string) and data[]
    const groupedData = dataObjects.reduce((acc, obj) => {
      const { section, label, key } = obj;
      const existingSection = acc.find((item) => item.header === section);
      if (existingSection) {
        existingSection.data.push({ label, key });
      } else {
        acc.push({ header: section, data: [{ label, key }] });
      }
      return acc;
    }, []);
    return groupedData;
  }

  useEffect(() => {
    if (selectedTemplate?.content) {
      setSideDrawerContent(getSideDrawerData(selectedTemplate.content));
      setSelectedKey(null);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    // If there is a selectekey, then manipulate the dom find for data-key with the value of selectedKey
    // If html element editablecontent is false or null, then set the editable content to true,
    // else set the editable content to false
    // First Find all and set all with data-key to false
    const allElements = document.querySelectorAll("[data-key]");
    // Set all contenteditable to false
    // Remove all styles and background color and border
    allElements.forEach((element) => {
      element.setAttribute("contenteditable", "false");
      element.style.border = "none";
      element.style.backgroundColor = "transparent";
    });

    if (selectedKey) {
      const element = document.querySelector(`[data-key="${selectedKey}"]`);
      if (element) {
        if (
          element.getAttribute("contenteditable") === "false" ||
          !element.getAttribute("contenteditable")
        ) {
          element.setAttribute("contenteditable", "true");
          element.style.border = "2px solid #D6CE0B";
          element.style.backgroundColor = "rgb(214, 206, 11, 0.2)";
        } else {
          element.setAttribute("contenteditable", "false");
        }
      }
      // Scroll to the selected element
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedKey]);

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
          marginTop: 0.25,
          marginBottom: 0.25,
          marginLeft: 0.25,
          marginRight: 0.25,
          exportType: "pdf",
          // fileName: `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}_ConditionOffer`,
          fileName: `Condition Offer`,

        },
        processedTemplate.styleTag
      );
    }
  };

  console.log("conditionalOfferContent", conditionalOfferContent);

  return (
    <div className={`${isFullScreen && "condition-offer__full-screen"}`}>
      <div
        className=" d-flex justify-content-between align-items-center pe-2"
        style={{
          borderBottom: "1px solid #D9E2EC",
        }}
      >
        <div
          className={`px-2 d-flex gap-2 align-items-center prepare-button cursor-pointer ${
            isPrepareDrawerOpen && "active"
          }`}
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          onClick={() => setIsPrepareDrawerOpen((prev) => !prev)}
        >
          <i className=" ri-file-list-2-line fs-5"></i>
          <span className="fw-semibold fs-6">Prepare</span>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <TemplateSelectByCategoryElement
            categoryName="Conditional Offer"
            placeholder="Select a template"
            onChange={(value) => {
              setSelectedTemplate(value);
            }}
            defaultFirstValue
            width="300px"
            end
          />
          <ButtonGroup>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
              onClick={() => setTransformScale((prev) => prev - 0.1)}
            >
              <i className="ri-zoom-out-line align-bottom fs-6"></i>
            </Button>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
              onClick={() => setTransformScale((prev) => prev + 0.1)}
            >
              <i className="ri-zoom-in-line align-bottom fs-6"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
              onClick={async () => {
                // Download pdf here
                setDownloadLoading(true);
                await downloadHandler(conditionalOfferContent, "pdf");
                setDownloadLoading(false);
              }}
              disabled={!conditionalOfferContent}
            >
              {downloadLoading ? (
                <Spinner size="sm"></Spinner>
              ) : (
                <i className="ri-download-fill align-bottom fs-6"></i>
              )}
            </Button>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
              onClick={() => setIsFullScreen((prev) => !prev)}
            >
              <i className="bx bx-window align-bottom fs-6"></i>
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/*Drawer and canvas*/}
      <div
        className="d-flex"
        style={{
          height: isFullScreen ? "calc(100vh - 40px)" : "calc(100vh - 115px)",
        }}
      >
        {isPrepareDrawerOpen && (
          <div
            className="flex-shrink-0"
            style={{
              width: "30%",

              overflowY: "auto",
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 14px 0px 0px",
            }}
          >
            <ConditionalOfferSideDrawer
              data={SideDrawerContent}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
            />
          </div>
        )}
        <div
          className="flex-grow-1"
          style={{
            backgroundColor: "#F7F9FC",
          }}
        >
          <Container
            className="p-3 my-3"
            style={{
              width: "90%",
              borderRadius: "10px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              overflow: "auto",
              height: "95%",
            }}
          >
            <TemplateDisplayV3
              content={selectedTemplate?.content ?? null}
              allData={null}
              isView={true}
              handleOutputContent={setConditionalOfferContent}
              autoResize={true}
              initialValues
              initializeDataAttributesElement={true}
              transformScale={transformScale}
            />
          </Container>
        </div>
      </div>
    </div>
  );
};

export default ConditionalOffer;
