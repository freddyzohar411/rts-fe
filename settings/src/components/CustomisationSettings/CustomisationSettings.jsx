import React, { useEffect } from "react";
import {
  Button,
  Col,
  Row,
  Container,
  Table,
  Card,
  CardBody,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Actions as formActions } from "@workspace/formbuilder";
import { UserDetailsHelper } from "@workspace/common";
import { DateHelper } from "@workspace/common";


function CustomisationSettings() {
  const dispatch = useDispatch();
  const { forms } = useSelector((state) => state.FormReducer);

  console.log("Forms: ", forms);

  // Get the list of forms from the API on first render
  useEffect(() => {
    dispatch(formActions.clearForm())
    dispatch(formActions.fetchForms());
  }, []);

  const data = [
    {
      id: "120923",
      formName: "account_create",
      module: "account",
      formType: "Associated For Sharepoint Tester",
      templateName: "createAccount",
      lastModifiedBy: "Recruit Avensys",
      lastModifiedTime: "23/09/2023 09:11 AM",
    },
    {
      id: "120924",
      formName: "contact_create",
      module: "contact",
      formType: "Associated For Sharepoint Tester",
      templateName: "Template 1 - createContact_SG",
      lastModifiedBy: "Recruit Avensys",
      lastModifiedTime: "23/09/2023 09:11 AM",
    },
    {
      id: "120925",
      formName: "job_create",
      module: "job",
      formType: "Associated For Sharepoint Tester",
      templateName: "Template 2 - createContact_MY",
      lastModifiedBy: "Recruit Avensys",
      lastModifiedTime: "23/09/2023 09:11 AM",
    },
    {
      id: "120926",
      formName: "candidate_create",
      module: "candidate",
      formType: "Associated For Sharepoint Tester",
      templateName: "createCandidate",
      lastModifiedBy: "Recruit Avensys",
      lastModifiedTime: "23/09/2023 09:11 AM",
    },
  ];

  document.title = "Form Customisation Form | RTS";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col lg={12}>
              <h5 className="m-3">Form Customisation Settings</h5>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Card className="mx-3">
                <CardBody>
                  <div className="listjs-table">
                    <Row>
                      <Col className="d-flex flex-row justify-content-between">
                        <div className="search-box">
                          <form>
                            <Input
                              type="text"
                              placeholder="Search"
                              className="form-control search bg-light border-light"
                              style={{ width: "350px" }}
                            />
                          </form>

                          <i className="ri-search-line search-icon"></i>
                        </div>
                        <Link to="/form-builder">
                          <Button onClick={() => dispatch(formActions.clearForm())}>New Form</Button>
                        </Link>
                      </Col>
                    </Row>

                    <div className="table-responsive mt-3 mb-1">
                      <Table
                        className="table table-hover table-bordered border-light align-middle table-nowrap rounded-3"
                        id="customFormTable"
                      >
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                              style={{ width: "60px" }}
                            >
                              Form Id
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Form Name{" "}
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Module{" "}
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Base Template Name
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Form Type{" "}
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Last Modified By{" "}
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                            >
                              <span>
                                Last Modified Time{" "}
                                <i className="bx bxs-sort-alt text-dark"></i>
                              </span>
                            </th>
                            <th
                              scope="col"
                              className="align-middle text-uppercase"
                              style={{ width: "60px" }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {forms.map((item, index) => (
                            <tr key={index}>
                              <td className="fw-medium align-middle">
                                {item.formId}
                              </td>
                              <td className="align-middle">{item.formName}</td>
                              <td className=" align-middle">
                                {item.entityType || "-"}{" "}
                              </td>
                              <td className="align-middle">
                                {item.baseFormName || "-"}
                              </td>
                              <td className="align-middle">{item.formType}</td>
                              <td className="align-middle">
                                {item.modifiedBy}
                              </td>
                              <td className="align-middle">
                                { DateHelper.formatDateStandard(item.modifiedAt)}
                              </td>
                              <td className="d-flex align-middle gap-2">
                                <Link to={`/form-builder/${item.formId}`}>
                                  <Button
                                    type="button"
                                    className="btn btn-primary"
                                  >
                                    <i className="ri-edit-2-line"></i>
                                  </Button>
                                </Link>

                                <Button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() =>
                                    dispatch(formActions.deleteForm(item.formId))
                                  }
                                >
                                  <i className="ri-delete-bin-2-line text-light"></i>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="d-flex justify-content-end">
                      <div className="pagination-wrap hstack gap-2">
                        <Input
                          type="select"
                          className="form-select"
                          style={{ height: "34px", marginRight: "10px" }}
                        >
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                        </Input>
                        <btn
                          className={`cursor-pointer page-item pagination-prev`}
                        >
                          Previous
                        </btn>
                        <ul className="pagination listjs-pagination mb-0"></ul>
                        <btn
                          className={`cursor-pointer page-item pagination-next`}
                        >
                          Next
                        </btn>
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

export default CustomisationSettings;
