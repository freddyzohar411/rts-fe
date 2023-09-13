import React, { useState, useEffect } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

function JobListing() {
  const navigate = useNavigate();
  document.title = "Job Listing | RTS";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="listjs-table">
                    <Row className="d-flex column-gap-1 mb-3">
                      <Col>
                        <div className="search-box">
                          <Input
                            type="text"
                            placeholder="Search"
                            className="form-control search bg-light border-light w-70"
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex column-gap-2 justify-content-end">
                          <Button
                            type="button"
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <i className="mdi mdi-download"></i> Mass Imports
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-primary d-flex align-items-center column-gap-2"
                          >
                            <i className="ri-settings-3-fill"></i> Custom View
                          </Button>
                          <Button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => navigate("/job/job-creation")}
                          >
                            Create New Job Opening
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <div className="table-responsive table-hover table-card mt-3 mb-1">
                      <Table
                        className="table align-middle table-nowrap"
                        id="accountListingTable"
                      >
                        <thead className="table-light">
                          <tr>
                            <th scope="col" style={{ width: "50px" }}>
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="checkbox"
                                  value="option"
                                />
                              </div>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            ></th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Entry Date <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Sales Person <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Clients <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Project Manager <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Job ID <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Job Title <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Job Type <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Location <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Head Count <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Status <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Salary Budget <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Visa Status <i className="mdi mdi-sort-descending"></i>
                            </th>
                            <th
                              scope="col"
                              class="text-uppercase"
                              style={{ fontSize: "12px" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="list form-check-all">
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="chk_child"
                                  value="option1"
                                />
                              </div>
                            </th>
                            <td>
                              <div className="d-flex column-gap-2">
                                <Badge color="dark">+1</Badge>
                                <Badge color="dark">+2</Badge>
                                <Badge color="dark">+10</Badge>
                              </div>
                            </td>
                            <td>12 Jan 2023</td>
                            <td>Meaganne Young</td>
                            <td>Luxoft-A DXC Technology Company</td>
                            <td>Mary Cousar</td>
                            <td>I90786</td>
                            <td>NA</td>
                            <td>Java Developer</td>
                            <td>Downtown Singapore</td>
                            <td>NA</td>
                            <td className="status">
                              <Badge color="success" className="text-uppercase">
                                New
                              </Badge>
                            </td>
                            <td>$700,000</td>
                            <td>H- 1B</td>
                            <td>
                              <div className="d-flex gap-2">
                                <div className="copy">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-file-copy-line"></i>
                                  </Button>
                                </div>
                                <div className="edit">
                                  <Button
                                    className="btn btn-primary btn-sm"
                                    type="button"
                                  >
                                    <i className="ri-pencil-line"></i>
                                  </Button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Link
                          className="page-item pagination-prev disabled"
                          to="#"
                        >
                          Previous
                        </Link>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <Link className="page-item pagination-next" to="#">
                          Next
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default JobListing;
