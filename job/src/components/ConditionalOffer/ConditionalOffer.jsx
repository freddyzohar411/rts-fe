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
} from "reactstrap";
import classnames from "classnames";
import ReviewTos from "./ReviewTos";
import { TemplateDisplayV3 } from "@workspace/common";

function ConditionalOffer({ templateData, closeOffcanvas }) {
  const [activeTab, setActiveTab] = useState("1");
  const [conditionalOfferContent, setConditionalOfferContent] = useState("");
  const [releaseValue, setReleaseValue] = useState("");

  // Handle realease event
  const handleRelease = () => {
    if (releaseValue) {
      // Release conditional offer logic
    } else {
      closeOffcanvas();
    }
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
                allData={null}
                isView={false}
                handleOutputContent={setConditionalOfferContent}
                autoResize={true}
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
                allData={null}
                isView={true}
              />
            </Container>
          </TabPane>
        </TabContent>
        <div className="d-flex justify-content-end gap-3">
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
          <Button className="btn btn-custom-primary" onClick={handleRelease}>
            Release
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ConditionalOffer;
