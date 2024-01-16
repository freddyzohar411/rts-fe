import React from "react";
import { useState } from "react";
import {
  Row,
  Col,
  Container,
  Button,
  Input,
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
            <div className="d-flex flex-column gap-5 mt-4">
              <span className="h6 ">Conditional Offer</span>
              <div className="d-flex flex-row gap-2 justify-content-end align-items-end">
                <div className="d-flex flex-column gap-1">
                  <span>Time to Take Action*</span>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="30 Min"
                  />
                </div>
                <Button className="btn btn-custom-primary">Release</Button>
              </div>
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="mt-4">
              <ReviewTos />
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="d-flex flex-column gap-5 mt-4">
              <span className="h6">Preview Conditional Offer</span>
              <div className="d-flex justify-content-end">
                <Button className="btn btn-custom-primary">Release</Button>
              </div>
            </div>
          </TabPane>
        </TabContent>
      </div>
    </React.Fragment>
  );
}

export default ConditionalOffer;
