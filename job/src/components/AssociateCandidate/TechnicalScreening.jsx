import React, { useState } from "react";
import { Card, CardBody, Row, Col, Input, Button, Label } from "reactstrap";
function TechnicalScreening() {
  const emailData = [
    { email: "deepti@aven-sys.com", name: "Deepti" },
    { email: "ganesh@aven-sys.com", name: "Ganesh" },
    { email: "matthew@aven-sys.com", name: "Matthew" },
    { email: "vinnod@aven-sys.com", name: "Vinnod" },
    { email: "shuhui@aven-sys.com", name: "Shu Hui" },
    { email: "tony@aven-sys.com", name: "Tony" },
  ];

  const namesData = [
    { name: "Anna", subNames: ["John", "Ben"] },
    { name: "Sally", subNames: ["Alice", "Ken"] },
  ];

  // Placeholder Recruiter Name List
  const [nestedVisible, setNestedVisible] = useState([]);

  const toggleNested = (index) => {
    setNestedVisible((prev) => {
      const updatedVisibility = [...prev];
      updatedVisibility[index] = !updatedVisibility[index];
      return updatedVisibility;
    });
  };

  return (
    <React.Fragment>
      <div className="p-4">
        {/* Internal Screening */}
        <Row>
          <Col>
            <Row className="mb-3">
              <Col>
                <span className="h5">Internal Screening</span>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Card className="border border-secondary">
                  <CardBody>
                    <Row className="mb-3">
                      <Col>
                        <div className="search-box">
                          <Input
                            type="text"
                            placeholder="Search.."
                            className="form-control border-secondary"
                          />
                          <i className="ri-search-eye-line search-icon"></i>
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <ul className="list-unstyled">
                          {namesData.map((item, index) => (
                            <li key={index}>
                              <div
                                className="d-flex flex-row justify-content-between mb-1"
                                onClick={() => toggleNested(index)}
                                style={{ cursor: "pointer" }}
                              >
                                <span>{item.name}</span>
                                <span>{nestedVisible[index] ? "-" : "+"}</span>
                              </div>
                              {nestedVisible[index] && (
                                <ul
                                  style={{
                                    listStyleType: "circle",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  {item.subNames.map((subName, subIndex) => (
                                    <li
                                      key={subIndex}
                                      className="d-flex flew-row justify-content-between"
                                    >
                                      {subName}
                                      <Label check className="mb-0 ms-2">
                                        <Input type="checkbox" />
                                      </Label>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <Button className="btn btn-custom-primary btn-sm px-4">
                            Send
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          {/* External Screening */}
          <Col>
            <Row className="mb-3">
              <Col>
                <span className="h5">External Screening</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="border border-secondary">
                  <CardBody>
                    <Row className="mb-3">
                      <Col>
                        <div className="d-flex flex-column gap-1">
                          <span>Send the link for technical screening.</span>
                          <div>
                            <Input
                              placeholder="Enter Email"
                              type="email"
                              className="form-control border-secondary"
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {emailData.map((email, index) => (
                          <ul className="list-unstyled" key={index}>
                            <li>
                              <div className="d-flex flex-row align-items-center gap-3">
                                <div className="avatar-xs flex-shrink-0">
                                  <span className="avatar-title rounded-circle bg-info text-white fw-semibold">
                                    {email.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <span>{email.name}</span>{" "}
                                  <span className="text-muted">
                                    ({email.email})
                                  </span>
                                </div>
                              </div>{" "}
                            </li>
                          </ul>
                        ))}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="d-flex justify-content-end">
                          <Button className="btn btn-custom-primary btn-sm px-4">
                            Send
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default TechnicalScreening;
