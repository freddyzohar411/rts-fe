import React from "react";
import { Nav, NavItem, NavLink, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const CustomNav = ({ navContents, slug, children }) => {
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <Nav pills className="bg-white">
                {navContents.map((navContent, index) => {
                  return (
                    <NavItem key={index}>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        active={slug === navContent.slug ? true : false}
                      >
                        <Link className="text-dark" to={navContent.url}>
                          {navContent.link}
                        </Link>
                      </NavLink>
                    </NavItem>
                  );
                })}
              </Nav>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardBody> {children}</CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomNav;
