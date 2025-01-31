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
              <Nav pills>
                {navContents.map((navContent, index) => {
                  return (
                    <NavItem key={index}>
                      <Link to={navContent.url}>
                        <NavLink
                          style={{ cursor: "pointer" }}
                          active={slug === navContent.slug ? true : false}
                        >
                          {navContent.link}
                        </NavLink>
                      </Link>
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
            <CardBody>
              <div className="mt-0">{children}</div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CustomNav;
