import React from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import ReviewTos from "./ReviewTos";
import { TemplateDisplayV3 } from "@workspace/common";

function ConditionalOffer({ templateData }) {
  const [activeTab, setActiveTab] = useState("1");
  const [conditionalOfferContent, setConditionalOfferContent] = useState("");

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
            <Container className="p-3 mt-3" style={{  height: "100%", minWidth:"100%" }}>
              <TemplateDisplayV3
                content={templateData?.content ?? null}
                allData={null}
                isView={true}
                handleOutputContent={setConditionalOfferContent}
              />
            </Container>
          </TabPane>
          <TabPane tabId="2">
            <ReviewTos />
          </TabPane>
          <TabPane tabId="3">
            <Container className="p-3 mt-3" style={{  height: "100%", minWidth:"100%" }}>
              <TemplateDisplayV3
                content={conditionalOfferContent ?? null}
                allData={null}
                isView={true}
              />
            </Container>
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
}

export default ConditionalOffer;
