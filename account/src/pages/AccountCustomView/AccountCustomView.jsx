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
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useParams } from "react-router-dom";
import {
  fetchAccountsFields,
  createAccountCustomView,
  fetchAccountCustomViewById,
  editAccountCustomViewById,
} from "../../store/account/action";
import { fetchAccountForm } from "../../store/accountForm/action";
import DualListBox from "react-dual-listbox";
import { initialValues, schema } from "./constants";
import { ACCOUNT_MANDATORY_OPTIONS } from "../AccountListing/accountListingConstants";
import { TableFilter, ArrayHelper } from "@workspace/common";
import "./AccountCustomView.scss";

function AccountCustomView() {
  document.title = "Create Account Custom View | RTS";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filterRef = useRef(null);
  const [initialValuesState, setInitialValuesState] = useState(initialValues);
  const accountFields = useSelector(
    (state) => state?.AccountReducer?.accountsFields
  );
  const accountCustomView = useSelector(
    (state) => state?.AccountReducer?.accountCustomView
  );

  const accountCustomViewMeta = useSelector(
    (state) => state?.AccountReducer?.accountCustomViewMeta
  );

  // Dispatch and get account_account form
  const form = useSelector((state) => state.AccountFormReducer.form);
  useEffect(() => {
    dispatch(fetchAccountForm("Account_account"));
  }, []);

  const editId = useParams().id;

  useEffect(() => {
    if (editId) {
      dispatch(fetchAccountCustomViewById(editId));
    }
  }, [editId]);

  const [selectedOption, setSelectedOption] = useState([]);
  const [options, setOptions] = useState([]);
  const [filters, setFilters] = useState([]);

  const areOptionsEmpty = () => {
    return !(options && options.length > 0);
  };

  useEffect(() => {
    dispatch(fetchAccountsFields());
  }, []);

  useEffect(() => {
    if (accountFields?.length > 0) {
      // Filter out the mandatory options
      const filteredOptions = accountFields.filter(
        (field) =>
          !ACCOUNT_MANDATORY_OPTIONS.some((option) =>
            field?.value.includes(option.value)
          )
      );
      setOptions(filteredOptions);
    }
  }, [accountFields]);

  const handleSubmit = async (values, flag) => {
    if (!flag) return;
    try {
      const newCustomView = {
        name: values.name,
        type: "Account",
        columnName: values.columnName || [],
        filters: filters,
      };

      if (editId) {
        dispatch(
          editAccountCustomViewById({
            editId,
            payload: newCustomView,
            navigate: navigate,
          })
        );
      } else {
        dispatch(
          createAccountCustomView({
            payload: newCustomView,
            navigate: navigate,
          })
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (accountCustomView && editId) {
      setInitialValuesState({
        name: accountCustomView?.name,
        columnName: accountCustomView?.columnName,
      });
      setSelectedOption(accountCustomView?.columnName);
      setFilters(accountCustomView?.filters);
    }
  }, [accountCustomView]);

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

  // Sort the account fields by label
  ArrayHelper.sortArrayObj(accountFields, "label");

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
                  </div>
                </CardHeader>
                <form onSubmit={formik.handleSubmit}>
                  <CardBody>
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
                            fields={accountFields?.filter(
                              (field) => field?.sortValue != null
                            )}
                            filters={filters}
                            setFilters={setFilters}
                            ref={filterRef}
                            formSchema={form?.formSchema}
                          />
                        </Row>
                      </Col>
                      <Col lg={6}>
                        <Row>
                          <Col>
                            <div className="mb-3 custom-dual-box">
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
                          {accountCustomViewMeta?.isLoading ? (
                            <Spinner size="sm" color="light" />
                          ) : editId ? (
                            "Update Custom View"
                          ) : (
                            "Create Custom View"
                          )}
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

export default AccountCustomView;
