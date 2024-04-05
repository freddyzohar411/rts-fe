import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  FormFeedback,
  Button,
} from "reactstrap";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  fetchAccountsFields,
  createAccountCustomView,
} from "../../store/account/action";
import DualListBox from "react-dual-listbox";
import { initialValues, schema } from "./constants";

function AccountCustomView() {
  document.title = "Create Account Custom View | RTS";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountFields = useSelector(
    (state) => state?.AccountReducer?.accountsFields
  );

  const [selectedOption, setSelectedOption] = useState([]);
  const [dualListBoxError, setDualListBoxError] = useState(false);
  const [options, setOptions] = useState([]);

  const areOptionsEmpty = () => {
    return !(options && options.length > 0);
  };

  useEffect(() => {
    setOptions(accountFields);
  }, [options]);

  useEffect(() => {
    dispatch(fetchAccountsFields());
  }, []);

  const handleSubmit = async (values) => {
    if (selectedOption.length === 0) {
      setDualListBoxError(true);
      return;
    } else {
      setDualListBoxError(false);
      const newCustomView = {
        name: values.name,
        type: "Account",
        columnName: selectedOption,
      };
      dispatch(
        createAccountCustomView({ payload: newCustomView, navigate: navigate })
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
                <BreadcrumbItem>
                  <Link to="/accounts">All Accounts</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>Create Custom View</BreadcrumbItem>
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
                  {({ errors, touched, setFieldError }) => (
                    <Form>
                      <CardBody>
                        <Row>
                          <Col>
                            <h6 className="fw-bold">General Information</h6>
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg={4}>
                            <div>
                              <Label className="fw-semibold">
                                Custom View Name
                              </Label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter Custom View Name"
                                className={`form-control ${
                                  errors.name && touched.name && "is-invalid"
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
                            <div>
                              <Label className="fw-semibold">
                                Custom View Columns
                              </Label>
                              <span>
                                Please select the columns you would like to see
                                in the Account Listing table.
                              </span>

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
                            <Link to="/accounts">
                              <Button type="button" className="btn btn-danger">
                                Cancel
                              </Button>
                            </Link>
                          </Col>
                          <Col md="auto">
                            <Button
                              type="submit"
                              className="btn btn-custom-primary"
                            >
                              Create Custom View
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

export default AccountCustomView;
