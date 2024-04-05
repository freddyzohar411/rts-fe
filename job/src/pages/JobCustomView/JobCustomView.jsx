import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Label,
  FormFeedback,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { schema, initialValues } from "./constants";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createJobCustomView } from "../../store/job/action";
import { fetchJobListsFields } from "../../store/actions";
import { Formik, Field, Form } from "formik";
import DualListBox from "react-dual-listbox";

function JobCustomView() {
  document.title = "Create Job Custom View | RTS";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobFields = useSelector((state) => state?.JobListReducer?.jobsFields);

  useEffect(() => {
    dispatch(fetchJobListsFields());
  }, []);

  const [selectedOption, setSelectedOption] = useState([]);
  const [dualListBoxError, setDualListBoxError] = useState(false);
  const [options, setOptions] = useState([]);

  const areOptionsEmpty = () => {
    return !(options && options.length > 0);
  };

  useEffect(() => {
    setOptions(jobFields);
  }, [options]);

  const handleSubmit = async (values) => {
    if (selectedOption.length === 0) {
      setDualListBoxError(true);
      return;
    } else {
      setDualListBoxError(false);
      const newCustomView = {
        name: values.name,
        type: "Job",
        columnName: selectedOption,
      };
      dispatch(
        createJobCustomView({ payload: newCustomView, navigate: navigate })
      );
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>Jobs</BreadcrumbItem>
                <BreadcrumbItem active>Custom View</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <div className="d-flex flex-column ">
                    <h6 className="fw-bold">Custom View</h6>
                    <span className="fw-medium">
                      Personalise your own custom view of your tables here.
                    </span>
                  </div>
                </CardHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <CardBody>
                        <Row>
                          <Col>
                            <div className="mb-3 w-50">
                              <Label className="fw-semibold">
                                Custom View Name
                              </Label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter Name"
                                className={`form-control ${
                                  errors.name && touched.name
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {errors.name && touched.name && (
                                <FormFeedback typeof="invalid">
                                  {errors.name}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="mb-3">
                              <div className="d-flex flex-column mb-3">
                                <Label className="fw-semibold">
                                  Custom View Columns
                                </Label>
                                <span>
                                  Please select the columns you would like to
                                  see in the Job Listing table.
                                </span>
                              </div>

                              <DualListBox
                                options={options ?? []}
                                selected={selectedOption}
                                onChange={(newValue) =>
                                  setSelectedOption(newValue)
                                }
                                showOrderButtons
                                preserveSelectOrder
                                icons={{
                                  moveLeft: [
                                    <span
                                      className={`mdi mdi-chevron-left ${
                                        areOptionsEmpty() ? "disabled-icon" : ""
                                      }`}
                                      key="key"
                                    />,
                                  ],
                                  moveAllLeft: [
                                    <span
                                      className={`mdi mdi-chevron-double-left ${
                                        areOptionsEmpty() ? "disabled-icon" : ""
                                      }`}
                                      key="key"
                                    />,
                                  ],
                                  moveRight: (
                                    <span
                                      className={`mdi mdi-chevron-right ${
                                        areOptionsEmpty() ? "disabled-icon" : ""
                                      }`}
                                      key="key"
                                    />
                                  ),
                                  moveAllRight: [
                                    <span
                                      className={`mdi mdi-chevron-double-right ${
                                        areOptionsEmpty()
                                          ? "disabled-icon cursor-none"
                                          : ""
                                      }`}
                                      key="key"
                                    />,
                                  ],
                                  moveDown: (
                                    <span className="mdi mdi-chevron-down" />
                                  ),
                                  moveUp: (
                                    <span className="mdi mdi-chevron-up" />
                                  ),
                                  moveTop: (
                                    <span className="mdi mdi-chevron-double-up" />
                                  ),
                                  moveBottom: (
                                    <span className="mdi mdi-chevron-double-down" />
                                  ),
                                }}
                              />
                              {dualListBoxError && (
                                <div className="mt-2">
                                  <p className="text-danger">
                                    Please select at least one column name.
                                  </p>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <Row className="justify-content-between">
                          <Col md="auto">
                            <Link to="/jobs">
                              <Button className="btn btn-danger">Cancel</Button>
                            </Link>
                          </Col>
                          <Col md="auto">
                            <Button className="btn btn-custom-primary">
                              Create
                            </Button>
                          </Col>
                        </Row>
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default JobCustomView;
