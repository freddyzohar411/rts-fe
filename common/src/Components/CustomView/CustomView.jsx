import React, { useState } from "react";
import { Formik, Field } from "formik";
import { initialValues, schema } from "./constants";
import { useLocation } from "react-router-dom";
import { createCustomview } from "../../store/accountcustomview/action";
import { useDispatch } from "react-redux";

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

function CustomView(props) {
  document.title = "Custom View | RTS";
  const location = useLocation();
  const dispatch = useDispatch();
  
  //   const { name, age } = state;
  //   console.log(name, age)
  //   const [selectedOptGroup, setSelectedOptGroup] = useState(initialOptions);
  //   const handleChange = (selected) => {
  //     const selectedObjects = selected.map((value) => {
  //       return optGroup.find((option) => option.value === value);
  //     });
  //     setSelectedOptGroup(selectedObjects);
  //   };

  //   const areOptionsEmpty = () => {
  //     return !(optGroup && optGroup.length > 0);
  //   };
  const options = [
    { value: "one", label: "Option One" },
    { value: "two", label: "Option Two" },
  ];

  const [selectedOption, setSelectedOption] = useState([]);

  const handleSubmit = async (values) => {
    const newCustomView = {
      name: values.name,
      type: values.type,
      columnNames: selectedOption
    }
    console.log(newCustomView);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader>Custom View</CardHeader>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  validateOnChange={false}
                  validateOnBlur
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    <>
                      <CardBody>
                        <Row className="mb-3">
                          <Col>
                            <div>
                              <Label>Custom View Name</Label>
                              <Field
                                name="name"
                                type="text"
                                placeholder="Please enter custom view name"
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
                              <Label>Type</Label>
                              <Field
                                as="select"
                                name="type"
                                className={`form-select ${
                                  errors.type && touched.type
                                    ? "is-invalid"
                                    : ""
                                }`}
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
                              <Label>Choose Custom Columns</Label>
                              <DualListBox
                                options={options}
                                selected={selectedOption}
                                onChange={(newValue) =>
                                  setSelectedOption(newValue)
                                }
                              />
                            </div>
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
                            Create
                          </Button>
                        </div>
                      </CardFooter>
                    </>
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
