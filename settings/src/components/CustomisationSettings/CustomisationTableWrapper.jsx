import React from 'react'
import { Button, Card, CardBody, Col, Container, Input, Row } from "reactstrap";
import { DynamicTable } from "@workspace/common";
import { Actions as formActions } from "@workspace/formbuilder";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const CustomisationTableWrapper = ({
    data,
    pageInfo,
    pageRequestSet,
    config,
    search,
    setSearch,
    // optGroup,
    // setCustomConfigData,
}) => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card className="m-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
                      {setSearch && (
                        <Col>
                          <div className="search-box">
                            <form onSubmit={pageRequestSet.setSearchTerm}>
                              <Input
                                type="text"
                                placeholder="Search"
                                className="form-control search bg-light border-light"
                                value={search}
                                style={{ width: "350px" }}
                                onChange={(e) => setSearch(e.target.value)}
                              />
                            </form>
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </Col>
                      )}
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                        <Link to="/form-builder">
                          <Button onClick={() => dispatch(formActions.clearForm())}>New Form</Button>
                        </Link>
                        </div>
                      </Col>
                    </Row>
                    <DynamicTable
                      config={config}
                      data={data}
                      pageRequestSet={pageRequestSet}
                      pageInfo={pageInfo}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CustomisationTableWrapper