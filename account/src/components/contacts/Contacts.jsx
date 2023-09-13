import React, { useEffect, useState } from "react";
import {
  Label,
  Row,
  Col,
  Input,
  Button,
  FormFeedback,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Alert,
} from "reactstrap";
import { Field, Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  initialValues,
  schema,
  populateContactForm,
} from "./constants-contacts";
import { fetchCity } from "../../store/city/action";
import { fetchSubIndustry } from "../../store/industry/action";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function Contacts() {
  const ENTITY_TYPE = "account_contact";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );

  // Get states from redux store
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );

  // Get department from store
  const departmentData = useSelector(
    (state) => state.DepartmentReducer.department
  );

  const cityData = useSelector((state) => state.CityReducer.city);
  const industryData = useSelector((state) => state.IndustryReducer.industry);
  const subIndustryData = useSelector(
    (state) => state.IndustryReducer.subIndustry
  );

  // Landline and filter
  const [landlineDropdown, setLandlineDropdown] = useState(false);
  const initialLandlineState = {
    landlineCountry: "Phone Code",
    landlineCountryId: 0,
  };
  const [selectedLandline, setSelectedLandline] =
    useState(initialLandlineState);
  const toggleLandlineDropdown = () =>
    setLandlineDropdown((prevState) => !prevState);
  const [landlineSearchTerm, setLandlineSearchTerm] = useState("");
  const filteredLandlines = landlineSearchTerm
    ? countryData.filter((country) => {
        let countryCodeName = `${
          country.phoneCode.charAt(0) == "+" ? "" : "+"
        } ${country.phoneCode} (${country.name})`;
        return countryCodeName
          .toLowerCase()
          .includes(landlineSearchTerm.toLowerCase());
      })
    : countryData;

  // Mobile and filter
  const [landlineDropdown2, setLandlineDropdown2] = useState(false);
  const initialLandlineState2 = {
    mobileCountry: "Phone Code",
    mobileCountryId: 0,
  };
  const [selectedLandline2, setSelectedLandline2] = useState(
    initialLandlineState2
  );
  const [landline2SearchTerm, setLandline2SearchTerm] = useState("");
  const filteredLandlines2 = landline2SearchTerm
    ? countryData.filter((country) => {
        let countryCodeName = `${
          country.phoneCode.charAt(0) == "+" ? "" : "+"
        } ${country.phoneCode} (${country.name})`;
        return countryCodeName
          .toLowerCase()
          .includes(landline2SearchTerm.toLowerCase());
      })
    : countryData;

  const toggleLandlineDropdown2 = () =>
    setLandlineDropdown2((prevState) => !prevState);

  const [contactData, setContactData] = useState([]);

  const [tableData, setTableData] = useState([]);

  const [updateId, setUpdateId] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  // Form initial value state
  const [contactFormInitialValues, setContactFormInitialValues] =
    useState(initialValues);

  // Fetch contact data if exist on first render
  useEffect(() => {
    api.create("http://localhost:8700/contacts-by-entity-and-type", {
        entityType: ENTITY_TYPE,
        entityId: accountId,
      })
      .then((res) => {
        setContactData(res.data);
      });
  }, [accountId]);

  // HandleIndustry Change -> Fetch sub industry based on industry
  const handleIndustrySelect = (e) => {
    const industryName = e.target.value;
    const industryId = industryData.find(
      (industry) => industry.name === industryName
    ).id;
    dispatch(fetchSubIndustry(industryId));
  };

  // HandleMailingCountry Change -> Fetch city based on country
  const handleCountrySelect = (e) => {
    const countryId = e.target.value;
    dispatch(fetchCity(getCountryId(countryId)));
  };

  // Get Country id from name
  const getCountryId = (countryName) => {
    if (countryName !== "") {
      const country = countryData.find(
        (country) => country.name === countryName
      );
      return country.id;
    }
    return 0;
  };

  // Get country name from country data
  const getCountryName = (countryId) => {
    if (countryId !== 0) {
      const country = countryData.find((country) => country.id === countryId);
      console.log("Found country: ", country);
      return country.name;
    }
    return "";
  };

  // Get country phone code from country data
  const getCountryPhoneCode = (countryId) => {
    if (countryId !== 0) {
      const country = countryData.find((country) => country.id === countryId);
      return country.phoneCode;
    }
    return "";
  };

  // Add a contact to database
  const handleSubmit = async (values, { resetForm }) => {
    console.log("Values: ", values);
    setErrorMessage("");
    // Create object to be saved in table
    const newContact = {
      contactInformation: {
        title: values.title,
        firstName: values.firstName,
        lastName: values.lastName,
        designation: values.designation,
        department: values.department,
        industry: values.industry,
        subIndustry: values.subIndustry,
        mobileCountry: selectedLandline2.mobileCountryId,
        mobileNumber: values.mobile || 0,
        landlineCountry: selectedLandline.landlineCountryId,
        landlineNumber: values.landline || 0,
        email: values.email,
      },
      mailingAddress: {
        line1: values.line1,
        line2: values.line2,
        line3: values.line3,
        city: values.city,
        country: values.country,
        postalCode: values.postalCode,
      },
      contactRemarks: values.remarks,
      entityType: ENTITY_TYPE,
      entityId: accountId,
    };

    if (updateId) {
      await api.put(`http://localhost:8700/contacts/${updateId}`, newContact);
    } else {
      // Save to database
      await api.create("http://localhost:8700/contacts", newContact);
    }

    // Set contact data
    const response = await fetchContactData();
    setContactData(response.data);

    // Reset form
    handleClearForm(resetForm);
  };

  // Fetch contact data
  const fetchContactData = () => {
    return api.create("http://localhost:8700/contacts-by-entity-and-type", {
      entityType: ENTITY_TYPE,
      entityId: accountId,
    });
  };

  // Map contact data to table data
  const handleMapContactDataToTableData = (contactData) => {
    return contactData.map((contact) => ({
      id: contact.id,
      title: contact.contactInformation.title,
      firstName: contact.contactInformation.firstName,
      lastName: contact.contactInformation.lastName,
      designation: contact.contactInformation.designation,
      department: contact.contactInformation.department,
      industry: contact.contactInformation.industry,
      subIndustry: contact.contactInformation.subIndustry,
      mobile: contact.contactInformation.mobileNumber,
      landline: contact.contactInformation.landlineNumber,
      email: contact.contactInformation.email,
      line1: contact.mailingAddress.line1,
      line2: contact.mailingAddress.line2,
      line3: contact.mailingAddress.line3,
      city: contact.mailingAddress.city,
      country: contact.mailingAddress.country,
      postalCode: contact.mailingAddress.postalCode,
      remarks: contact.contactRemarks,
      landlineCountry: contact.contactInformation.landlineCountry,
      mobileCountry: contact.contactInformation.mobileCountry,
    }));
  };

  const getSubIndustryFromIndustryName = (industryName) => {
    const industryId = industryData.find(
      (industry) => industry.name === industryName
    ).id;
    dispatch(fetchSubIndustry(industryId));
  };

  // Populate table data when contact data changes
  useEffect(() => {
    setTableData(handleMapContactDataToTableData(contactData));
  }, [contactData]);

  // Delete contact
  const handleContactDelete = async (id) => {
    console.log("To delete: ", id);
    await api.delete(`http://localhost:8700/contacts/${id}`);
    const response = await fetchContactData();
    setContactData(response.data);
  };

  // Update contact
  const handleContactUpdate = (contact) => {
    // Set update id
    setUpdateId(contact.id);

    // Set form initial values
    setContactFormInitialValues(populateContactForm(contact));

    // Set landline and mobile country
    setSelectedLandline({
      landlineCountry: setCorrectPhoneCountryCode(contact.landlineCountry),
      landlineCountryId: contact.landlineCountry,
    });

    setSelectedLandline2({
      mobileCountry: setCorrectPhoneCountryCode(contact.mobileCountry),
      mobileCountryId: contact.mobileCountry,
    });

    // Set sub industry based on industry
    if (contact.industry) {
      getSubIndustryFromIndustryName(contact.industry);
    }

    // Set city based on country
    if (contact.country) {
      dispatch(fetchCity(getCountryId(contact.country)));
    }
  };

  // Set correct phone country code
  const setCorrectPhoneCountryCode = (countryName) => {
    let phoneCode = getCountryPhoneCode(countryName);
    return `${phoneCode.charAt(0) == "+" ? "" : "+"}${phoneCode}`;
  };

  // Custom clear form
  const handleClearForm = (resetform) => {
    resetform();
    setUpdateId(null);
    setContactFormInitialValues(initialValues);
    setSelectedLandline(initialLandlineState);
    setSelectedLandline2(initialLandlineState2);
  };

  // Handle next
  const handleNext = () => {
    if (contactData.length === 0) {
      setErrorMessage("Please add at least one contact.");
      return;
    }
    navigate("/account/document-creation");
  };

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur
      validateOnChange={false}
      initialValues={contactFormInitialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, values, resetForm }) => (
        <div>
          <Form>
            <div className="mb-3">
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="h6">Contact Information</Label>
                  <div className="d-flex gap-3">
                    <Button type="submit" className="btn btn-primary">
                      {updateId == null ? "Add" : "Save"}
                    </Button>
                    {updateId && (
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => handleClearForm(resetForm)}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="title">
                      Title*
                    </Label>
                    <Field name="title">
                      {({ field }) => (
                        <select
                          className={`form-select ${
                            touched.title && errors.title ? "is-invalid" : ""
                          }`}
                          id="title"
                          {...field}
                        >
                          <option value="">Select</option>
                          <option value="Mr">Mr</option>
                          <option value="Miss">Miss</option>
                          <option value="Mrs">Mrs</option>
                        </select>
                      )}
                    </Field>
                    {touched.title && errors.title && (
                      <FormFeedback type="invalid">{errors.title}</FormFeedback>
                    )}
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="firstName">
                      First Name*
                    </Label>
                    <Field name="firstName">
                      {({ field }) => (
                        <Input
                          className={`form-control ${
                            touched.firstName && errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter first name"
                          id="firstName"
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.firstName && errors.firstName && (
                      <FormFeedback type="invalid">
                        {errors.firstName}
                      </FormFeedback>
                    )}
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="lastName">
                      Last Name*
                    </Label>
                    <Field name="lastName">
                      {({ field }) => (
                        <Input
                          className={`form-control ${
                            touched.lastName && errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                          placeholder="Enter last name"
                          id="lastName"
                          {...field}
                        />
                      )}
                    </Field>
                    {touched.lastName && errors.lastName && (
                      <FormFeedback type="invalid">
                        {errors.lastName}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="designation">
                      Designation
                    </Label>
                    <Field name="designation">
                      {({ field }) => (
                        <Input
                          id="designation"
                          className="form-control"
                          placeholder="Enter Designation"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="department">
                      Department
                    </Label>
                    <Field name="department">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="department"
                          {...field}
                        >
                          <option>Select</option>
                          {departmentData &&
                            departmentData.map((department) => (
                              <option value={department.name}>
                                {department.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="industry">
                      Industry
                    </Label>
                    <Field name="industry">
                      {({ field, form }) => (
                        <select
                          className="form-select"
                          id="industry"
                          {...field}
                          onChange={(e) => {
                            form.handleChange(e);
                            handleIndustrySelect(e);
                          }}
                        >
                          <option>Select</option>
                          {industryData &&
                            industryData.map((industry) => (
                              <option value={industry.name}>
                                {industry.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="subIndustry">
                      Sub Industry
                    </Label>
                    <Field name="subIndustry">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="subIndustry"
                          {...field}
                        >
                          <option>Select</option>
                          {subIndustryData &&
                            subIndustryData.map((subIndustry) => (
                              <option value={subIndustry.name}>
                                {subIndustry.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="mobile">
                      Mobile
                    </Label>
                    <Dropdown
                      className="input-group"
                      isOpen={landlineDropdown2}
                      toggle={toggleLandlineDropdown2}
                    >
                      <DropdownToggle
                        as="button"
                        className="btn btn-primary arrow-none"
                      >
                        <span className="text-muted">
                          {selectedLandline2.mobileCountry}
                        </span>
                      </DropdownToggle>
                      <Field name="mobile">
                        {({ field }) => (
                          <Input
                            type="number"
                            id="mobile"
                            className="form-control"
                            placeholder="Enter mobile number"
                            {...field}
                          />
                        )}
                      </Field>
                      <DropdownMenu
                        as="ul"
                        className="list-unstyled w-100 dropdown-menu-list mb-0 overflow-auto"
                        style={{ maxHeight: "240px" }}
                      >
                        <Input
                          type="text"
                          className="form-control search m-auto"
                          placeholder="Search landline..."
                          value={landline2SearchTerm}
                          style={{ width: "95%" }}
                          onChange={(e) =>
                            setLandline2SearchTerm(e.target.value)
                          }
                        />
                        {filteredLandlines2 &&
                          filteredLandlines2.map((country) => (
                            <DropdownItem
                              as="li"
                              onClick={() =>
                                setSelectedLandline2((prev) => ({
                                  ...prev,
                                  mobileCountry: `${
                                    country.phoneCode.charAt(0) == "+"
                                      ? ""
                                      : "+"
                                  } ${country.phoneCode}`,
                                  mobileCountryId: country.id,
                                }))
                              }
                              className="dropdown-item d-flex"
                            >
                              <div className="flex-grow-1">
                                <div className="d-flex">
                                  <span className="text-muted">
                                    {country.phoneCode.charAt(0) == "+"
                                      ? ""
                                      : "+"}
                                    {country.phoneCode} {`(${country.name})`}
                                  </span>
                                </div>
                              </div>
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="landline">
                      Landline
                    </Label>
                    <Dropdown
                      className="input-group"
                      isOpen={landlineDropdown}
                      toggle={toggleLandlineDropdown}
                    >
                      <DropdownToggle
                        as="button"
                        className="btn btn-primary arrow-none"
                      >
                        <span className="text-muted">
                          {selectedLandline.landlineCountry}
                        </span>
                      </DropdownToggle>
                      <Field name="landline">
                        {({ field }) => (
                          <Input
                            type="number"
                            className="form-control"
                            placeholder="Enter landline number"
                            id="landline"
                            {...field}
                          />
                        )}
                      </Field>
                      <DropdownMenu
                        as="ul"
                        className="list-unstyled w-100 dropdown-menu-list mb-0 overflow-auto"
                        style={{ maxHeight: "240px" }}
                      >
                        <Input
                          type="text"
                          className="form-control search m-auto"
                          placeholder="Search landline..."
                          value={landlineSearchTerm}
                          style={{ width: "95%" }}
                          onChange={(e) =>
                            setLandlineSearchTerm(e.target.value)
                          }
                        />
                        {filteredLandlines &&
                          filteredLandlines.map((country) => (
                            <DropdownItem
                              as="li"
                              onClick={() =>
                                setSelectedLandline((prev) => ({
                                  ...prev,
                                  landlineCountry: `${
                                    country.phoneCode.charAt(0) == "+"
                                      ? ""
                                      : "+"
                                  } ${country.phoneCode}`,
                                  landlineCountryId: country.id,
                                }))
                              }
                              className="dropdown-item d-flex"
                            >
                              <div className="flex-grow-1">
                                <div className="d-flex">
                                  <span className="text-muted">
                                    {country.phoneCode.charAt(0) == "+"
                                      ? ""
                                      : "+"}
                                    {country.phoneCode} {`(${country.name})`}
                                  </span>
                                </div>
                              </div>
                            </DropdownItem>
                          ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="email">
                      Email
                    </Label>
                    <Field name="email">
                      {({ field }) => (
                        <Input
                          type="email"
                          className="form-control"
                          id="gen-info-website-input"
                          placeholder="Enter email"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <div className="mb-2">
                <div>
                  <Label className="h6">Mailing Address</Label>
                </div>
              </div>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="line1">
                      Line 1
                    </Label>
                    <Field name="line1">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="line1"
                          placeholder="Mail address line 1"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="line2">
                      Line 2
                    </Label>
                    <Field name="line2">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="line2"
                          placeholder="Mail address line 2"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="line3">
                      Line 3
                    </Label>
                    <Field name="line3">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="line3"
                          placeholder="Mail address line 3"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="country">
                      Country
                    </Label>
                    <Field name="country">
                      {({ field, form }) => (
                        <select
                          className="form-select"
                          id="country"
                          {...field}
                          onChange={(e) => {
                            form.handleChange(e);
                            handleCountrySelect(e);
                          }}
                        >
                          <option>Select</option>
                          {countryData &&
                            countryData.map((country) => (
                              <option value={country.name}>
                                {country.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>

                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="city">
                      City
                    </Label>
                    <Field name="city">
                      {({ field }) => (
                        <select className="form-select" id="city" {...field}>
                          <option value="">Select</option>
                          {cityData &&
                            cityData.map((city) => (
                              <option value={city.name}>{city.name}</option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="postalCode">
                      Postal Code
                    </Label>
                    <Field name="postalCode">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="postalCode"
                          placeholder="Enter postal code"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={12}>
                  <div>
                    <Label htmlFor="remarks" className="form-label">
                      Contact Remarks
                    </Label>
                    <Field name="remarks">
                      {({ field }) => (
                        <textarea
                          className="form-control"
                          placeholder="Enter remarks"
                          id="remarks"
                          rows="3"
                          {...field}
                        ></textarea>
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="table-responsive mb-3">
              <Table
                className="table-bordered align-middle table-nowrap mb-0 "
                style={{ maxHeight: "250px" }}
              >
                <thead className="table-light">
                  <tr>
                    <th scope='col'>Personal Information</th>
                    <th scope='col'>Professional Information</th>
                    <th scope='col'>Address</th>
                    <th scope='col'>Actions</th>
                  </tr>
                  </thead>
                <tbody style={{ maxHeight: "200px", overflowY: "auto" }}>
                  {tableData.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No contact information saved yet.</td>
                    </tr>
                  ) : (
                    tableData.map((row, index) => (
                      <tr key={index}>
                        <th>
                          <span>{row.title}</span> {row.firstName}{" "}
                          {row.lastName}
                        </th>
                        <td>
                          <div>
                            {row.designation}, {row.department}
                          </div>
                          <div>
                            {row.industry}, {row.subIndustry}
                          </div>
                          <div>
                            {row.mobile}, {row.landline}, {row.email}
                          </div>
                        </td>
                        <td>
                          <div>
                            {row.country}, {row.city}, {row.postalCode}
                          </div>
                          <div>{row.line1}</div>
                          <div>{row.line2}</div>
                          <div>{row.line3}</div>
                        </td>
                        <td>
                          <Button
                            className="m-2 btn-outline-outline"
                            type="button"
                            onClick={() => handleContactDelete(row.id)}
                          >
                            Remove
                          </Button>
                          <Button
                            className="m-2 btn-outline-outline"
                            type="button"
                            onClick={() => handleContactUpdate(row)}
                          >
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
            {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <div className="d-flex column-gap-2 justify-content-end">
              <Button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  navigate("/account/account-creation");
                }}
              >
                Back
              </Button>
              <Button className="btn btn-primary" type="button" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default Contacts;
