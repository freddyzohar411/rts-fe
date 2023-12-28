import React from "react";
import {
  Container,
  Col,
  Row,
  Input,
  Card,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as TemplateActions from "../../store/template/action";
import TemplateListingAccordion from "./TemplateListingAccordion";

function TemplateListingWrapper({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
}) {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem><Link to="/settings">Settings</Link></BreadcrumbItem>
                <BreadcrumbItem active>
                  Template Customisation Settings
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <div className="d-flex flex-row justify-content-between">
                        <div className="search-box">
                          <form onSubmit={pageRequestSet.setSearchTerm}>
                            <Input
                              type="text"
                              className="form-control border-secondary"
                              placeholder="Search..."
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              style={{ width: "500px" }}
                            />
                          </form>
                          <i className="bx bx-search-alt search-icon"></i>
                        </div>
                        <Link to="/settings/templates/create">
                          <Button
                            onClick={() => dispatch(TemplateActions.clearTemplate())}
                            type="button"
                            className="btn btn-custom-primary"
                          >
                            New Template
                          </Button>
                        </Link>
                      </div>
                    </Col>
                  </Row>
                  <TemplateListingAccordion
                    config={config}
                    data={data}
                    pageRequestSet={pageRequestSet}
                    pageInfo={pageInfo}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default TemplateListingWrapper;