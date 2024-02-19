import React from "react";
import { Card, Row, Col, Nav, NavItem, NavLink, List } from "reactstrap";
import { Link } from "react-router-dom";

function MainSettings() {
  document.title = "Settings | RTS";
  
  return (
    <React.Fragment>
      <div className="page-content">
        <Row className="ms-2 mt-2">
          <Col md={3}>
            <Card className=" d-flex flex-column" style={{ height: "500px" }}>
              <div className="text-center">
                <i
                  className="ri-settings-5-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>General</h6>
              </div>
              <List
                type="unstyled"
                className="d-flex flex-column gap-3 ms-5 mt-4"
              >
                
                <li>
                  <Link className="text-dark" to="/settings/customisation">
                    Customise Form
                  </Link>
                </li>
                <li>
                  <Link className="text-dark" to="/settings/templates">
                    Templates
                  </Link>
                </li>
              </List>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="d-flex flex-column" style={{ height: "500px" }}>
              <div className="text-center">
                <i
                  className="ri-shield-user-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>Users and Control</h6>
              </div>
              <List
                type="unstyled"
                className="d-flex flex-column gap-3 ms-5 mt-4"
              >
                <li>
                  <Link className="text-dark" to="/settings/access">
                    Access Management
                  </Link>
                </li>
              </List>
            </Card>
          </Col>

          <Col md={3} hidden>
            <Card className="d-flex flex-column" style={{ height: "500px" }}>
              <div className="text-center">
                <i
                  className="ri-shape-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>Customisation</h6>
              </div>

              <Nav vertical pills className="mt-3 ms-4">
                <span className="text-muted">Coming soon..</span>
              </Nav>
            </Card>
          </Col>

          <Col md={3} hidden>
            <Card className="d-flex flex-column" style={{ height: "500px" }}>
              <div className="text-center">
                <i
                  className="ri-article-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>Resume Management</h6>
              </div>

              <Nav vertical pills className="mt-3 ms-4">
                <span className="text-muted">Coming soon..</span>
              </Nav>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default MainSettings;
