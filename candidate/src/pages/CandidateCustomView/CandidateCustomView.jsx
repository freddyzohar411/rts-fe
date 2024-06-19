import React, { useEffect, useState, useRef } from "react";
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
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  fetchCandidatesFields,
  createCandidateCustomView,
  fetchCandidateCustomViewById,
  editCandidateCustomViewById,
} from "../../store/actions";
import DualListBox from "react-dual-listbox";
import { initialValues, schema } from "./constants";
import { CANDIDATE_MANDATORY_OPTIONS } from "../CandidateListing/candidateListingConstants";
import { TableFilter } from "@workspace/common";

function CandidateCustomView() {
  document.title = "Create Candidate Custom View | RTS";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const candidateFields = useSelector(
    (state) => state?.CandidateReducer?.candidatesFields
  );
  const candidateCustomView = useSelector(
    (state) => state?.CandidateReducer?.candidateCustomView
  );

  const editId = useParams().id;

  useEffect(() => {
    if (editId) {
      dispatch(fetchCandidateCustomViewById(editId));
    }
  }, [editId]);

  const [selectedOption, setSelectedOption] = useState([]);
  const [dualListBoxError, setDualListBoxError] = useState(false);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState([]);

  const areOptionsEmpty = () => {
    return !(options && options.length > 0);
  };

  useEffect(() => {
    dispatch(fetchCandidatesFields());
  }, []);

  useEffect(() => {
    if (candidateFields?.length > 0) {
      // Filter out the mandatory options
      const filteredOptions = candidateFields.filter(
        (field) =>
          !CANDIDATE_MANDATORY_OPTIONS.some((option) =>
            field?.value.includes(option.value)
          )
      );
      setOptions(filteredOptions);
    }
  }, [candidateFields]);

  const handleSubmit = async (values, flag) => {
    if (!flag) return;
    try {
      const newCustomView = {
        name: values.name,
        type: "Candidate",
        columnName: values.columnName || [],
        filters: filters,
      };

      if (editId) {
        dispatch(
          editCandidateCustomViewById({
            editId,
            payload: newCustomView,
            navigate: navigate,
          })
        );
      } else {
        dispatch(
          createCandidateCustomView({
            payload: newCustomView,
            navigate: navigate,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (candidateCustomView && editId) {
      console.log("Candidate Custom View", candidateCustomView);
      setInitialValuesState({
        name: candidateCustomView?.name,
        columnName: candidateCustomView?.columnName,
      });
      setSelectedOption(candidateCustomView?.columnName);
      setFilters(candidateCustomView?.filters);
    }
  }, [candidateCustomView]);

  const formik = useFormik({
    initialValues: initialValuesState,
    validationSchema: schema,
    validateOnChange: false,
    validateOnBlur: true,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const flag = filterRef.current?.validate();
      handleSubmit(values, flag);
    },
  });

  console.log("Values", formik.values);
  console.log("Errors", formik.errors);

  // Sort array of object by key
  const sortArrayObj = (arr, key) => {
    return arr?.sort((a, b) => {
      if (a[key] < b[key]) {
        return -1;
      }
      if (a[key] > b[key]) {
        return 1;
      }
      return 0;
    });
  };

  // Sort the account fields by label
  sortArrayObj(candidateFields, "label");

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
                    {/* <span className="fw-medium">
                      Personalise your own custom view of your tables here.
                    </span> */}
                  </div>
                </CardHeader>
                <form onSubmit={formik.handleSubmit}>
                  <CardBody
                    style={{
                      height: "56.5vh",
                    }}
                  >
                    <Row>
                      <Col lg={6}>
                        <Row className="mb-3">
                          <div className="px-2"></div>
                          <Col lg={4}>
                            <div>
                              <Label className="fw-semibold">
                                Custom View Name*
                              </Label>
                              <input
                                name="name"
                                type="text"
                                placeholder="Enter Custom View Name"
                                className={`form-control ${
                                  formik.errors.name &&
                                  formik.touched.name &&
                                  "is-invalid"
                                }`}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                              {formik.errors.name && formik.touched.name && (
                                <FormFeedback typeof="invalid">
                                  {formik.errors.name}
                                </FormFeedback>
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          {/* Filter Element */}
                          <TableFilter
                            fields={candidateFields}
                            filters={filters}
                            setFilters={setFilters}
                            ref={filterRef}
                          />
                        </Row>
                      </Col>
                      <Col lg={6}>
                        <Row>
                          <Col>
                            <div className="mb-3">
                              <div className="d-flex flex-column mb-3">
                                <Label className="fw-semibold">
                                  Custom View Columns
                                </Label>
                                <span>
                                  Please select the columns you would like to
                                  see in the Account Listing table.
                                </span>
                              </div>

                              <DualListBox
                                options={options ?? []}
                                selected={selectedOption}
                                onChange={(newValue) => {
                                  setSelectedOption(newValue);
                                  formik.setFieldValue("columnName", newValue);
                                }}
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
                              {formik.errors.columnName && (
                                <div className="mt-1">
                                  <p className="text-danger">
                                    {formik.errors.columnName}
                                  </p>
                                </div>
                              )}
                            </div>
                          </Col>
                        </Row>
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
                          type="button"
                          className="btn btn-custom-primary"
                          onClick={async () => {
                            const formikErrors = await formik.validateForm();
                            formik.setTouched({ name: true });
                            const hasFormikErrors =
                              Object.keys(formikErrors).length > 0;
                            const flag = filterRef.current?.validate();

                            if (!hasFormikErrors && flag) {
                              handleSubmit(formik.values, flag);
                            }
                            formik.setSubmitting(false);
                          }}
                        >
                          {editId ? "Update Custom View" : "Create Custom View"}
                        </Button>
                      </Col>
                    </Row>
                  </CardFooter>
                </form>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default CandidateCustomView;
