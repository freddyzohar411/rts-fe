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

function ConditionalOffer() {
  const [activeTab, setActiveTab] = useState("1");

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
            <div>Conditional Offer</div>
          </TabPane>
          <TabPane tabId="2">
            <ReviewTos />
          </TabPane>
          <TabPane tabId="3">
            <div>Preview Conditional Offer</div>
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
}

export default ConditionalOffer;
