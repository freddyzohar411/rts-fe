import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Label,
  Card,
  CardBody,
  FormGroup,
  FormFeedback,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Button,
  Table,
} from "reactstrap";
import { Form, Formik, Field } from "formik";
import { initialValues, schema } from "./constants";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryCurrency } from "../../store/countrycurrency/action";
import { fetchAccountNames } from "../../store/account/action";
import { fetchAccountContacts } from "../../store/actions";
import { createJob } from "../../store/job/action";
import { Axios } from "@workspace/common";
import {
  primarySkills,
  secondarySkills,
  jobTypes,
  jobDurations,
} from "./values";
import { FileHelper } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function JobCreation() {
  const ENTITY_TYPE = "job";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [files, setFiles] = useState([]);
  const [oneFile, setOneFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [filesError, setFilesError] = useState("");

  const countryCurrencyData = useSelector(
    (state) => state.JobCountryCurrencyReducer.countryCurrency
  );
  const accountsData = useSelector((state) => state.JobAccountReducer.accounts);
  const accountContactData = useSelector(
    (state) => state.JobAccountContactsReducer.accountContacts
  );

  // Fetch all the countries and account names
  useEffect(() => {
    dispatch(fetchCountryCurrency());
    dispatch(fetchAccountNames());
  }, []);

  // Handle Account Change, get account contact details
  const handleAccountChange = (e) => {
    dispatch(fetchAccountContacts(parseInt(e.target.value)));
  };

  // Handle form submit
  const handleFormSubmit = async (values) => {
    // Check files array is empty or not
    if (files.length === 0) {
      setFileErrorMessage("Please upload at least one file");
    }

    if (fileError) {
      return;
    }

    // Create a new Job
    const newJob = {
      accountInformation: {
        accountId: +values.accName,
        contactId: +values.accContact,
        salesManager: values.salesManager,
      },
      jobOpeningInformation: {
        jobTitle: values.jobTitle,
        dateOpen: values.dateOpen,
        targetClosingDate: values.targetClosingDate,
        clientJobID: values.clientJobId,
        jobType: values.jobType,
        duration: +values.duration,
        primarySkills: values.primarySkills,
        secondarySkills: values.secondarySkills,
        noOfHeadcounts: values.noHeadcount,
        workType: values.workType,
        jobDescription: values.jobDesc,
        visaStatus: values.visaStatus,
        country: values.country,
        languages: values.languages,
        requiredDocuments: values.reqDocs,
        workLocation: values.workLoc,
        priority: values.priority,
        qualification: values.qualification,
        turnaroundTimeUnit: values.turnaroundTimeInput,
        turnaroundTimeDay: +values.turnaroundTimeDays,
        jobRatingSales: values.jobRatingSales,
        securityClearance: values.securityClearance,
      },
      jobCommercials: {
        salaryBudgetLocal: +values.salaryBudgetLocalInput,
        salaryBudgetRange: values.salaryBudgetLocalRange,
        localCurrency: values.localCurrency,

        budgetType: values.budgetType,

        salaryBudgetSGD: +values.salaryBudgetSGD,
        expectedMarginSGD: +values.expectedMarginSGD,

        expectedMarginMin: +values.expectedMarginMinInput,
        expectedMarginMax: +values.expectedMarginMaxInput,
        expectedMarginCurrency: values.expectedMarginCurrency,

        screening: {
          technicalScreening: values.technicalScreening,
          selectTechnicalScreeningTemplate: values.technicalScreeningTemp,
          selectRecruitmentScreeningTemplate: values.recruitmentScreeningTemp,
        },
      },
      jobRemarks: values.jobRemarks,
    };

    dispatch(
      createJob({
        newJob,
        newDocuments: files,
        navigate: navigate
      })
    );

    // Navigate to job listing
    // navigate("/jobs");
  };

  // Submit Job form
  const submitJobForm = async (newJob) => {
    return api.create("http://localhost:9200/api/job", newJob);
  };

  // Handle file upload
  const handleFileUpload = async (fileData, jobId) => {
    const fileFormData = new FormData();
    fileFormData.append("file", fileData.file);
    fileFormData.append("entityType", ENTITY_TYPE);
    fileFormData.append("entityId", +jobId);

    api.create("http://localhost:8500/documents", fileFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const [countryDropdown, setCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const toggleCountryDropdown = () =>
    setCountryDropdown((prevState) => !prevState);
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const filteredCountries = countrySearchTerm
    ? countryCurrencyData.filter((countries) =>
        countries.toLowerCase().includes(countrySearchTerm.toLowerCase())
      )
    : countryCurrencyData.country;

  // Handle add files to array
  const addFileHandler = (setFieldValue) => {
    const newFile = {
      fileName: oneFile.name,
      file: oneFile,
    };
    setFiles([...files, newFile]);
    setOneFile(null);
    // Reset the file input through formik
    setFieldValue("jobDocs", "");
  };

  // Handle remove files from array
  const removeFileHandler = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFileError(null);

    // Check if file is selected
    if (e.target.files[0] == null) return;

    // Check if file is correct format
    if (
      !FileHelper.checkFileFormatValid(e.target.files[0], [
        "pdf",
        "docx",
        "doc",
      ])
    ) {
      e.target.value = null;
      setFileError("Please upload only pdf, docx, doc file");
      return;
    }

    // Check if file size les than 2MB
    if (!FileHelper.checkFileSizeLimit(e.target.files[0], 2000000)) {
      e.target.value = null;
      setFileError("Please upload file less than 2MB");
      return;
    }

    // Set File
    setOneFile(e.target.files[0]);
  };

  document.title = "Job Creation | RTS";

  return (
    <Formik
      validateOnBlur
      validateOnChange={false}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <React.Fragment>
          <div className="page-content">
            <Container>
              <Card>
                <CardBody className="m-4">
                  <Form>
                    <div className="mb-3">
                      <div>
                        <div className="mb-2">
                          <div>
                            <Label className="h6">Account Information</Label>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="accName">Account Name*</Label>
                            <Field name="accName">
                              {({ field, form }) => (
                                <Input
                                  type="select"
                                  id="accName"
                                  {...field}
                                  className={`form-select ${
                                    touched.accName && errors.accName
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  onChange={(e) => {
                                    form.handleChange(e);
                                    handleAccountChange(e);
                                  }}
                                >
                                  <option value="">Select</option>
                                  {accountsData.map((account) => (
                                    <option value={account.id}>
                                      {account.name}
                                    </option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                            {touched.accName && errors.accName && (
                              <FormFeedback type="invalid">
                                {errors.accName}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="accContact">Account Contact*</Label>
                            <Field name="accContact">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="accContact"
                                  className={`form-select ${
                                    touched.accContact && errors.accContact
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  {...field}
                                >
                                  <option>Select</option>
                                  {accountContactData.map((contact) => (
                                    <option
                                      value={contact.id}
                                    >{`${contact.contactInformation.title} ${contact.contactInformation.firstName} ${contact.contactInformation.lastName}`}</option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                            {touched.accContact && errors.accContact && (
                              <FormFeedback type="invalid">
                                {errors.accContact}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="salesManager">Sales Manager</Label>
                            <Field name="salesManager">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  type="text"
                                  id="salesManager"
                                  {...field}
                                  className="form-control"
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
                          <Label className="h6">Job Opening Information</Label>
                        </div>
                      </div>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="jobTitle">Job Title*</Label>
                            <Field name="jobTitle">
                              {({ field }) => (
                                <Input
                                  type="text"
                                  placeholder="Type"
                                  className={`form-control ${
                                    touched.jobTitle && errors.jobTitle
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="jobTitle"
                                  {...field}
                                />
                              )}
                            </Field>
                            {touched.jobTitle && errors.jobTitle && (
                              <FormFeedback type="invalid">
                                {errors.jobTitle}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="dateOpen">Date Open*</Label>
                            <Field name="dateOpen">
                              {({ field }) => (
                                <Input
                                  type="date"
                                  className={`form-select ${
                                    touched.dateOpen && errors.dateOpen
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="dateOpen"
                                  {...field}
                                />
                              )}
                            </Field>
                            {touched.dateOpen && errors.dateOpen && (
                              <FormFeedback type="invalid">
                                {errors.dateOpen}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="targetClosingDate">
                              Target Closing Date
                            </Label>
                            <Field name="targetClosingDate">
                              {({ field }) => (
                                <Input
                                  type="date"
                                  id="targetClosingDate"
                                  {...field}
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="clientJobId">Client Job ID</Label>
                            <Field name="clientJobId">
                              {({ field }) => (
                                <Input
                                  type="text"
                                  placeholder="Type"
                                  className="form-control"
                                  {...field}
                                  id="clientJobId"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="jobType">Job Type*</Label>
                            <Field name="jobType">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="jobType"
                                  {...field}
                                  className={`form-control ${
                                    touched.jobType && errors.jobType
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select</option>
                                  <option value="Permanent">Permanent</option>
                                  <option value="Contract">Contract</option>
                                </Input>
                              )}
                            </Field>
                            {touched.jobType && errors.jobType && (
                              <FormFeedback type="invalid">
                                {errors.jobType}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="duration">Duration</Label>
                            <Field name="duration">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="duration"
                                  {...field}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  {jobDurations.map((duration, index) => (
                                    <option value={index}>{duration}</option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="primarySkills">
                              Primary Skills*
                            </Label>
                            <Field name="primarySkills">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="primarySkills"
                                  {...field}
                                  className={`form-select ${
                                    touched.primarySkills &&
                                    errors.primarySkills
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select</option>
                                  {primarySkills.map((skill) => (
                                    <option value={skill}>{skill}</option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                            {touched.primarySkills && errors.primarySkills && (
                              <FormFeedback type="invalid">
                                {errors.primarySkills}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="secondarySkills">
                              Secondary Skills*
                            </Label>
                            <Field name="secondarySkills">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="secondarySkills"
                                  {...field}
                                  className={`form-select ${
                                    touched.secondarySkills &&
                                    errors.secondarySkills
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option value="">Select</option>
                                  {secondarySkills.map((skill) => (
                                    <option value={skill}>{skill}</option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                            {touched.secondarySkills &&
                              errors.secondarySkills && (
                                <FormFeedback type="invalid">
                                  {errors.secondarySkills}
                                </FormFeedback>
                              )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="noHeadcount">
                              No of Headcounts*
                            </Label>
                            <Field name="noHeadcount">
                              {({ field }) => (
                                <Input
                                  {...field}
                                  className={`form-control ${
                                    touched.noHeadcount && errors.noHeadcount
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  type="number"
                                  id="noHeadcount"
                                ></Input>
                              )}
                            </Field>
                            {touched.noHeadcount && errors.noHeadcount && (
                              <FormFeedback type="invalid">
                                {errors.noHeadcount}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <FormGroup>
                              <Label htmlFor="workType">Work Type*</Label>
                              <Field
                                name="workType"
                                render={({ field }) => (
                                  <div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        id="remote"
                                        value="Remote"
                                        checked={field.value === "Remote"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="remote"
                                      >
                                        Remote
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        id="onSite"
                                        value="On Site"
                                        checked={field.value === "On Site"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="onSite"
                                      >
                                        On Site
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="workType"
                                        id="hybrid"
                                        value="Hybrid"
                                        checked={field.value === "Hybrid"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        htmlFor="hybrid"
                                      >
                                        Hybrid
                                      </Label>
                                    </div>
                                  </div>
                                )}
                              />
                              {touched.workType && errors.workType && (
                                <FormFeedback type="invalid">
                                  {errors.workType}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="jobDesc">Job Description*</Label>
                            <Field name="jobDesc">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  {...field}
                                  type="text"
                                  id="jobDesc"
                                  className={`form-control ${
                                    touched.jobDesc && errors.jobDesc
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              )}
                            </Field>
                            {touched.jobDesc && errors.jobDesc && (
                              <FormFeedback type="invalid">
                                {errors.jobDesc}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <FormGroup>
                              <Label>Visa Status*</Label>
                              <Field
                                name="visaStatus"
                                render={({ field }) => (
                                  <div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="visaStatus"
                                        id="local"
                                        value="Only Local"
                                        checked={field.value === "Only Local"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="local"
                                      >
                                        Only Local
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="visaStatus"
                                        id="localOrPR"
                                        value="Only Local or PR"
                                        checked={
                                          field.value === "Only Local or PR"
                                        }
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="localOrPR"
                                      >
                                        Only Local or PR
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="visaStatus"
                                        id="others"
                                        value="Others"
                                        checked={field.value === "Others"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="others"
                                      >
                                        Others
                                      </Label>
                                    </div>
                                  </div>
                                )}
                              />
                              {touched.visaStatus && errors.visaStatus && (
                                <FormFeedback type="invalid">
                                  {errors.visaStatus}
                                </FormFeedback>
                              )}
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="country">Country*</Label>
                            <Field name="country">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  className={`form-select ${
                                    touched.country && errors.country
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                  id="country"
                                  {...field}
                                >
                                  <option value="">Select</option>
                                  {countryCurrencyData.map((country) => (
                                    <option value={country.name}>
                                      {country.name}
                                    </option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                            {touched.country && errors.country && (
                              <FormFeedback type="invalid">
                                {errors.country}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="languages">Languages</Label>
                            <Field name="languages">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  type="text"
                                  id="languages"
                                  {...field}
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="reqDocs">Required Documents</Label>
                            <Field name="reqDocs">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="reqDocs"
                                  {...field}
                                  className="form-control"
                                >
                                  <option value="">Select</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="workLoc">Work Location</Label>
                            <Field name="workLoc">
                              {({ field }) => (
                                <Input
                                  placeholder="Search Location with City or Zip Code"
                                  type="text"
                                  {...field}
                                  id="workLoc"
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="priority">Priority</Label>
                            <Field name="priority">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="priority"
                                  {...field}
                                  className="form-select"
                                >
                                  <option value="">Select</option>
                                  <option value="1">Low</option>
                                  <option value="2">Mid</option>
                                  <option value="3">High</option>
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="qualification">Qualification</Label>
                            <Field name="qualification">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  {...field}
                                  type="text"
                                  id="qualification"
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="turnaroundTime">
                              Turnaround Time*
                            </Label>
                            <div className="d-flex column-gap-1">
                              <div className="col-6">
                                <Field name="turnaroundTimeInput">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="number"
                                      placeholder="Type"
                                      className={`form-control ${
                                        touched.turnaroundTimeInput &&
                                        errors.turnaroundTimeInput
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                  )}
                                </Field>
                                {touched.turnaroundTimeInput &&
                                  errors.turnaroundTimeInput && (
                                    <FormFeedback
                                      type="invalid"
                                      className="text-nowrap"
                                    >
                                      {errors.turnaroundTimeInput}
                                    </FormFeedback>
                                  )}
                                {touched.turnaroundTimeDays &&
                                  errors.turnaroundTimeDays && (
                                    <FormFeedback
                                      type="invalid"
                                      className="text-nowrap"
                                    >
                                      {errors.turnaroundTimeDays}
                                    </FormFeedback>
                                  )}
                              </div>
                              <div className="col-6">
                                <Field name="turnaroundTimeDays">
                                  {({ field }) => (
                                    <Input
                                      type="select"
                                      {...field}
                                      id="inDays"
                                      className={`form-select ${
                                        touched.turnaroundTimeDays &&
                                        errors.turnaroundTimeDays
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    >
                                      <option value="0">Days</option>
                                      <option value="1">Weeks</option>
                                      <option value="2">Months</option>
                                      <option value="3">Years</option>
                                    </Input>
                                  )}
                                </Field>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="jobRatingSales">
                              Job Rating - Sales
                            </Label>
                            <Field name="jobRatingSales">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="jobRatingSales"
                                  {...field}
                                  className="form-select"
                                >
                                  <option>Select</option>
                                  <option value="Tier 1">Tier 1</option>
                                  <option value="Tier 2">Tier 2</option>
                                  <option value="Tier 3">Tier 3</option>
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <FormGroup>
                              <Label htmlFor="securityClearance">
                                Security Clearance
                              </Label>
                              <Field
                                name="securityClearance"
                                render={({ field }) => (
                                  <div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="securityClearance"
                                        id="yesSC"
                                        value="0"
                                        checked={field.value === "0"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="yesSC"
                                      >
                                        Yes
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="securityClearance"
                                        id="noSC"
                                        value="1"
                                        checked={field.value === "1"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="noSC"
                                      >
                                        No
                                      </Label>
                                    </div>
                                  </div>
                                )}
                              />
                            </FormGroup>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mb-3">
                      <div>
                        <div className="mb-2">
                          <div>
                            <Label className="h6">Job Commercials</Label>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="salaryBudgetLocal">
                              Salary Budget - Local*
                            </Label>
                            <div className="d-flex column-gap-1">
                              <div className="col-6">
                                <Field name="salaryBudgetLocalInput">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="text"
                                      placeholder="Type"
                                      className={`form-control ${
                                        touched.salaryBudgetLocalInput &&
                                        errors.salaryBudgetLocalInput
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      id="salaryBudgetLocalInput"
                                    />
                                  )}
                                </Field>
                                {touched.salaryBudgetLocalInput &&
                                  errors.salaryBudgetLocalInput && (
                                    <FormFeedback
                                      type="invalid"
                                      className="text-nowrap"
                                    >
                                      {errors.salaryBudgetLocalInput}
                                    </FormFeedback>
                                  )}
                                {touched.salaryBudgetLocalRange &&
                                  errors.salaryBudgetLocalRange && (
                                    <FormFeedback
                                      type="invalid"
                                      className="text-nowrap"
                                    >
                                      {errors.salaryBudgetLocalRange}
                                    </FormFeedback>
                                  )}
                              </div>
                              <div className="col-6">
                                <Field name="salaryBudgetLocalRange">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="select"
                                      id="salaryBudgetLocalRange"
                                      className={`form-select ${
                                        touched.salaryBudgetLocalRange &&
                                        errors.salaryBudgetLocalRange
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    >
                                      <option value="">Range</option>
                                      <option value="1">0 - 2000</option>
                                      <option value="2">2000 - 5000</option>
                                      <option value="3">5000 - 7000</option>
                                      <option value="4">7000 - 10000</option>
                                      <option value="4">&gt; 10000</option>
                                    </Input>
                                  )}
                                </Field>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={2}>
                          <div className="mb-3">
                            <Label htmlFor="localCurrency">
                              Local Currency
                            </Label>
                            <Field name="localCurrency">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="localCurrency"
                                  {...field}
                                  className="form-select"
                                >
                                  <option value="">Currency</option>
                                  {countryCurrencyData.map((country) => (
                                    <option value={country.currency}>
                                      {country.currency}
                                      {` (${country.name})`}
                                    </option>
                                  ))}
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="budgetType">Budget Type*</Label>
                            <Field name="budgetType">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="budgetType"
                                  {...field}
                                  className={`form-select ${
                                    touched.budgetType && errors.budgetType
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                >
                                  <option>Select</option>
                                  <option value="1">Junior</option>
                                  <option value="2">Mid</option>
                                  <option value="3">Senior</option>
                                </Input>
                              )}
                            </Field>
                            {touched.budgetType && errors.budgetType && (
                              <FormFeedback type="invalid">
                                {errors.budgetType}
                              </FormFeedback>
                            )}
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="salaryBudgetSGD">
                              Salary Budget - SGD
                            </Label>
                            <Field name="salaryBudgetSGD">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  type="text"
                                  {...field}
                                  id="salaryBudgetSGD"
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="expectedMargin">
                              Expected Margin
                            </Label>
                            <div className="d-flex ">
                              <div className="col-3">
                                <Field name="expectedMarginMinInput">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Min"
                                      type="text"
                                      id="expectedMargin"
                                      className="form-control"
                                    />
                                  )}
                                </Field>
                              </div>
                              {/* <div className="col-3">
                                <Field name="expectedMarginMinCurrency">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="select"
                                      id="priority"
                                      className="form-select"
                                    >
                                      <option value="">USD</option>
                                      <option value="1">One</option>
                                      <option value="2">Two</option>
                                      <option value="3">Three</option>
                                    </Input>
                                  )}
                                </Field>
                              </div> */}
                              <div className="col-3">
                                <Field name="expectedMarginMaxInput">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      placeholder="Max"
                                      type="text"
                                      id="expectedMargin"
                                      className="form-control"
                                    />
                                  )}
                                </Field>
                              </div>
                              <div className="col-3">
                                <Field name="expectedMarginCurrency">
                                  {({ field }) => (
                                    <Input
                                      {...field}
                                      type="select"
                                      id="priority"
                                      className="form-select"
                                    >
                                      <option value="">Currency</option>
                                      {countryCurrencyData.map((country) => (
                                        <option value={country.currency}>
                                          {country.currency}
                                        </option>
                                      ))}
                                    </Input>
                                  )}
                                </Field>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="c">Expected Margin - SGD</Label>
                            <Field name="expectedMarginSGD">
                              {({ field }) => (
                                <Input
                                  placeholder="Type"
                                  type="text"
                                  {...field}
                                  id="expectedMarginSGD"
                                  className="form-control"
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mb-4">
                      <div>
                        <div className="mb-2">
                          <div>
                            <Label className="h6">Screening</Label>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg={4}>
                          <div className="mb-3">
                            <FormGroup>
                              <Label htmlFor="technicalScreening">
                                Technical Screening
                              </Label>
                              <Field
                                name="technicalScreening"
                                render={({ field }) => (
                                  <div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="technicalScreening"
                                        id="yesTS"
                                        value="0"
                                        checked={field.value === "0"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="yesTS"
                                      >
                                        Yes
                                      </Label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                      <Input
                                        {...field}
                                        className="form-check-input"
                                        type="radio"
                                        name="technicalScreening"
                                        id="noTS"
                                        value="1"
                                        checked={field.value === "1"}
                                      />
                                      <Label
                                        className="form-check-label"
                                        for="noTS"
                                      >
                                        No
                                      </Label>
                                    </div>
                                  </div>
                                )}
                              />
                            </FormGroup>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="technicalScreeningTemp">
                              Select Technical Screening Template?
                            </Label>
                            <Field name="technicalScreeningTemp">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="technicalScreeningTemp"
                                  {...field}
                                  className="form-select"
                                >
                                  <option value="">Template 1</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                        <Col lg={4}>
                          <div className="mb-3">
                            <Label htmlFor="recruitmentScreeningTemp">
                              Select Recruitment Screening Template?
                            </Label>
                            <Field name="recruitmentScreeningTemp">
                              {({ field }) => (
                                <Input
                                  type="select"
                                  id="recruitmentScreeningTemp"
                                  {...field}
                                  className="form-select"
                                >
                                  <option value="">Template 1</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </Input>
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="mb-3">
                      <div>
                        <div className="mb-2">
                          <div>
                            <Label className="h6">Job Remarks</Label>
                          </div>
                        </div>
                      </div>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label htmlFor="jobRemarks">Add your Remark</Label>
                            <Field name="jobRemarks">
                              {({ field }) => (
                                <Input
                                  type="textarea"
                                  placeholder="Type"
                                  id="addRemark"
                                  {...field}
                                  row={5}
                                />
                              )}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <div className="form-check mb-3">
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck"
                        />
                        <Label className="form-check-label" htmlFor="formCheck">
                          Post The Job On Career Portal And Website.
                        </Label>
                      </div>
                      <Row>
                        <Col lg={12}>
                          <div className="mb-3">
                            <Label htmlFor="jobDocs">
                              Upload Job Documents*
                            </Label>
                            <div className="d-flex justify-content-between">
                              <Field name="jobDocs">
                                {({ field, form }) => (
                                  <Input
                                    type="file"
                                    className={`w-50 form-control ${
                                      touched.jobDocs && errors.jobDocs
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                    id="jobDocs"
                                    {...field}
                                    onChange={(e) => {
                                      handleFileChange(e, form);
                                      form.handleChange(e);
                                    }}
                                  />
                                )}
                              </Field>
                              <Button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => addFileHandler(setFieldValue)}
                              >
                                Add
                              </Button>
                            </div>
                            {touched.jobDocs && errors.jobDocs && (
                              <FormFeedback type="invalid">
                                {errors.jobDocs}
                              </FormFeedback>
                            )}
                            {fileError && (
                              <div class="text-danger">
                                <small>{fileError}</small>
                              </div>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className="table-responsive mb-4">
                      <Table className="table-bordered align-middle table-nowrap mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Uploaded Documents</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {files.length > 0 &&
                            files.map((file, index) => (
                              <tr>
                                <td>{file.fileName}</td>
                                <td>
                                  <Button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => removeFileHandler(index)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>

                    {filesError && <Alert color="danger">{filesError}</Alert>}
                    <div className="text-end">
                      <Button
                        type="button"
                        className="btn btn-primary me-3"
                        onClick={() => navigate("/jobs")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" className="btn btn-primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </div>
        </React.Fragment>
      )}
    </Formik>
  );
}

export default JobCreation;
