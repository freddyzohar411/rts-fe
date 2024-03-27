import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { initialValues, schema } from "./constants";
import { createCustomview } from "../../store/accountcustomview/action";
import { fetchAccountsFields } from "@workspace/account/src/store/account/action";
import { fetchJobListsFields } from "../../../../job/src/store/jobList/action";
import { fetchCandidatesFields } from "../../../../candidate/src/store/candidate/action";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Row,
  Button,
  Label,
  FormFeedback,
} from "reactstrap";
import DualListBox from "react-dual-listbox";

function CustomView() {
  document.title = "Custom View | RTS";
  const dispatch = useDispatch();

  const accountsFields = useSelector(
    (state) => state?.AccountReducer?.accountsFields
  );
  const candidatesFields = useSelector(
    (state) => state?.CandidateReducer?.candidatesFields
  );
  const jobsFields = useSelector((state) => state.JobListReducer.jobsFields);

  useEffect(() => {
    dispatch(fetchAccountsFields());
    dispatch(fetchCandidatesFields());
    dispatch(fetchJobListsFields());
  }, []);

  const [selectedOption, setSelectedOption] = useState([]);
  const [getOptions, setGetOptions] = useState([]);
  const [dualListBoxError, setDualListBoxError] = useState(false);

  const areOptionsEmpty = () => {
    return !(getOptions && getOptions.length > 0);
  };

  const handleSubmit = async (values) => {
    if (selectedOption.length === 0) {
      console.log("error");
      setDualListBoxError(true);
      return;
    } else {
      console.log("no error");
      setDualListBoxError(false);
      const newCustomView = {
        name: values.name,
        type: values.type,
        columnNames: selectedOption,
      };
      console.log(newCustomView);
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
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
                  {({ errors, touched, setFieldValue }) => (
                    <Form>
                      <CardBody>
                        <Row>
                          <Col>
                            <h6 className="fw-bold">General Information</h6>
                          </Col>
                        </Row>
                        <Row className="mb-4">
                          <Col>
                            <div>
                              <Label className="fw-semibold">
                                Custom View Name
                              </Label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Enter Custom View Name"
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
                          <Col>
                            <div>
                              <Label className="fw-semibold">
                                Custom View Type
                              </Label>
                              <Field
                                as="select"
                                name="type"
                                className={`form-select ${
                                  errors.type && touched.type
                                    ? "is-invalid"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  if (e.target.value === "Account") {
                                    setGetOptions(accountsFields);
                                  } else if (e.target.value === "Candidate") {
                                    setGetOptions(candidatesFields);
                                  } else if (e.target.value === "Job") {
                                    setGetOptions(jobsFields);
                                  }
                                  setFieldValue("type", e.target.value);
                                }}
                              >
                                <option value="">Select Type</option>
                                <option value="Account">Account</option>
                                <option value="Job">Job</option>
                                <option value="Candidate">Candidate</option>
                              </Field>
                              {errors.type && touched.type && (
                                <FormFeedback typeof="invalid">
                                  {errors.type}
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
                              <p>
                                Please pick a custom view type to view the
                                available columns.
                              </p>
                              <DualListBox
                                options={getOptions ?? []}
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
                            </div>
                            {dualListBoxError && (
                              <div className="mt-2">
                                <span className="text-danger">
                                Please select at least one column.
                              </span>
                              </div>
                              
                            )}
                          </Col>
                        </Row>
                      </CardBody>
                      <CardFooter>
                        <div className="d-flex flex-row justify-content-between">
                          <Button type="button" className="btn btn-danger">
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="btn btn-custom-primary"
                          >
                            Create Custom View
                          </Button>
                        </div>
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

export default CustomView;
