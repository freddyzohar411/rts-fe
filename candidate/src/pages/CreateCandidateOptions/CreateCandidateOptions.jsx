import React from "react";
import { Card, Row, Col, Nav, NavItem, NavLink, List } from "reactstrap";
import { Link } from "react-router-dom";

function CreateCandidateOptions() {
  document.title = "Settings | RTS";

  return (
    <React.Fragment>
      <div className="page-content">
        <Row
          className="ms-2 mt-2 d-flex align-items-center justify-space-between"
          style={{ height: "75vh" }}
        >
          <Col>
            <Link to="/candidates/create">
              <Card
                className=" d-flex flex-column justify-content-center"
                style={{ height: "300px" }}
              >
                <div className="text-center">
                  <i
                    className="ri-settings-5-line text-primary"
                    style={{ fontSize: "70px" }}
                  ></i>
                  <h6>Create Candidate</h6>
                </div>
              </Card>
            </Link>
          </Col>

          <Col>
            <Link to="/candidates/create">
              <Card
                className=" d-flex flex-column justify-content-center"
                style={{ height: "300px" }}
              >
                <div className="text-center">
                  <i
                    className="ri-settings-5-line text-primary"
                    style={{ fontSize: "70px" }}
                  ></i>
                  <h6>Parse Resume</h6>
                </div>
              </Card>
            </Link>
          </Col>
          {/* <Col>
            <Card
              className=" d-flex flex-column justify-content-center"
              style={{ height: "300px" }}
            >
              <div className="text-center">
                <i
                  className="ri-settings-5-line text-primary"
                  style={{ fontSize: "70px" }}
                ></i>
                <h6>Import Bulk Resume</h6>
              </div>
            </Card>
          </Col> */}
        </Row>
      </div>
    </React.Fragment>
  );
}

export default CreateCandidateOptions;
