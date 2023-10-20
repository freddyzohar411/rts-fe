import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";

function ViewRole() {
  document.title = "Role | RTS";
  const location = useLocation();
  const selectedRoleData = location.state
    ? location.state.selectedRoleData
    : null;

    return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access/">Role</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>View Role</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column gap-1">
                    <span className="h5 fw-bold">Role</span>
                    <span className="text-muted">
                      View the role details, permissions and user groups
                      assigned to this role.
                    </span>
                  </div>
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default ViewRole;
