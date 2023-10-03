import React from "react";
import { Card, Row, Col, Nav, NavItem, NavLink } from "reactstrap";
import { useNavigate } from "react-router-dom";

function MainSettings() {
  const navigate = useNavigate();
  document.title = "Settings | RTS";
  return (
    <React.Fragment>
      <div className="page-content">
        <Row className="align-items-start justify-content-center mt-2">
          <Col md={3}>
            <Card className=" d-flex flex-column" style={{ height: "500px" }}>
              <div className="text-center">
                <i
                  className="ri-settings-5-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>General</h6>
              </div>

              <Nav vertical pills className="mt-3 ms-4">
                <NavItem>
                  <NavLink href="#">Personal Settings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/settings/customisation">Customise Form</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Calendar Settings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">New Email Settings</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Notification Settings</NavLink>
                </NavItem>
              </Nav>
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
              <Nav vertical pills className="mt-3 ms-4">
                <NavItem>
                  <NavLink href="#">Users</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Security Control</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#">Territory Management</NavLink>
                </NavItem>
              </Nav>
            </Card>
          </Col>

          <Col md={3}>
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

          <Col md={3}>
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
