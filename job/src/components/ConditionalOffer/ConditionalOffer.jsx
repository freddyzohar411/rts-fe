import React from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Container,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import classnames from "classnames";
import ReviewTos from "./ReviewTos";
import { TemplateDisplayV3, TemplateExportButtons } from "@workspace/common";
import { UseTemplateModuleDataHook } from "@workspace/common";
import { TemplateAdvanceExportModal } from "@workspace/common";
import { ExportHelper, TemplateHelper } from "@workspace/common";

function ConditionalOffer({
  templateData,
  closeOffcanvas,
  candidateId,
  jobId,
}) {
  const [activeTab, setActiveTab] = useState("1");
  const [conditionalOfferContent, setConditionalOfferContent] = useState("");
  const [releaseValue, setReleaseValue] = useState("");
  const { allModuleData, isAllLoading } =
    UseTemplateModuleDataHook.useTemplateModuleData({
      candidateId: candidateId,
      jobId: jobId,
    });
  const [templateDownloadModalShow, setTemplateDownloadModalShow] =
    useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  // Handle realease event
  const handleRelease = () => {
    if (releaseValue) {
      // Release conditional offer logic
    } else {
      closeOffcanvas();
    }
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
          fileName: `${allModuleData?.Candidates?.basicInfo?.firstName}_${allModuleData?.Candidates?.basicInfo?.lastName}_ConditionOffer`,
        },
        processedTemplate.styleTag
      );
    }s
  };

  return (
    <React.Fragment>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={`cursor-pointer ${activeTab === "1" ? "active" : ""}`}
              onClick={() => setActiveTab("1")}
            >
              CONDITIONAL OFFER
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`cursor-pointer ${activeTab === "2" ? "active" : ""}`}
              onClick={() => setActiveTab("2")}
            >
              REVIEW TOS
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={`cursor-pointer ${activeTab === "3" ? "active" : ""}`}
              onClick={() => setActiveTab("3")}
            >
              PREVIEW CONDITIONAL OFFER
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Container
              className="p-3 mt-3"
              style={{ height: "100%", minWidth: "100%" }}
            >
              <TemplateDisplayV3
                content={templateData?.content ?? null}
                allData={allModuleData}
                isView={true}
                handleOutputContent={setConditionalOfferContent}
                autoResize={true}
                initialValues
              />
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <div className="mt-4">
              <ReviewTos />
            </div>
          </TabPane>
          <TabPane tabId="3">
            <Container
              className="p-3 mt-3"
              style={{ height: "100%", minWidth: "100%" }}
            >
              <TemplateDisplayV3
                content={conditionalOfferContent ?? null}
                isAllLoading={isAllLoading}
                allData={null}
                isView={true}
                initialValues
              />
            </Container>
          </TabPane>
        </TabContent>
        <div className="d-flex justify-content-end gap-3">
          {activeTab == "3" && (
            // <Button onClick={() => setTemplateDownloadModalShow(true)}>
            //   Download
            // </Button>
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
          )}
          {activeTab == "1" && (
            <Input
              type="number"
              className="mr-2"
              style={{ width: "200px" }}
              placeholder="Time in minutes"
              value={releaseValue}
              onChange={(e) => setReleaseValue(e.target.value)}
            />
          )}
          {(activeTab == "1" || activeTab == "3") && (
            <Button className="btn btn-custom-primary" onClick={handleRelease}>
              Release
            </Button>
          )}
        </div>
      </div>
      <TemplateAdvanceExportModal
        content={conditionalOfferContent}
        isAllLoading={false}
        showInsertModal={templateDownloadModalShow}
        setShowInsertModal={setTemplateDownloadModalShow}
        toExport={true}
        allData={allModuleData}
      />
    </React.Fragment>
  );
}

export default ConditionalOffer;
