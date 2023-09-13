import React, { useState, useEffect } from "react";
import {
  Label,
  Row,
  Col,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  FormFeedback,
  Button,
} from "reactstrap";
import SimpleBar from "simplebar-react";
import { Form, Formik, Field } from "formik";
import {
  initialValues,
  schema,
  populateAccountValues,
} from "./constants-account";
import { useDispatch, useSelector } from "react-redux";
import { fetchCity } from "../../store/city/action";
import { fetchBillingCity } from "../../store/billingcity/action";
import { fetchSubIndustry } from "../../store/industry/action";
import { createAccount } from "../../store/account/action";
import { setAccountId } from "../../store/accountregistration/action";
// import { accountId } from "../../fakeData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { set } from "react-hook-form";
import * as yup from "yup";

export const AccountCreation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );

  console.log("Account creation Account Id", accountId)
  const countryData = useSelector(
    (state) => state.CountryCurrencyReducer.countryCurrency
  );

  const cityData = useSelector((state) => state.CityReducer.city);
  const billingCityData = useSelector(
    (state) => state.BillingCityReducer.billingCity
  );
  const industryData = useSelector((state) => state.IndustryReducer.industry);
  const subIndustryData = useSelector(
    (state) => state.IndustryReducer.subIndustry
  );
  const parentCompanyData = useSelector(
    (state) => state.ParentCompanyReducer.parentCompany
  );

  // UseState
  const [agreementFile, setAgreementFile] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [accountStatus, setAccountStatus] = useState("new");
  const [agreementDocDetail, setAgreementDocDetail] = useState(null);

  //

  const handleFileChange = (e) => {
    // Check if file is selected
    // if (e.target.files[0]) return;

    // // Check if file extension is pdf
    // if (e.target.files[0].name.split(".").pop() !== "pdf"){
    //   return
    // };

    // // Check if file size is less than 5MB
    // if (e.target.files[0].size > 5000000) return;

    // Set file
    setAgreementFile(e.target.files[0]);
  };

  // Check if it is update or new account
  let initialValueUpdate = initialValues;
  let schemaUpdate = schema;
  useEffect(() => {
    // If account id exists, fetch account details
    if (accountId) {
      console.log("Account creation Update Account Id", accountId)
      setAccountStatus("update");
      // Get account detail by fetching
      axios.get(`http://localhost:8100/accounts/${accountId}`).then((res) => {
        const getAccountDetails = res.data;
        dispatch(fetchSubIndustry(res.data.accountInformation.accountIndustry));
        setAccountDetails(getAccountDetails);
      });

      // Here we fetch the agreement document
      axios
        .get(
          `http://localhost:8500/documents?entityId=${accountId}&entityType=account`
        )
        .then((res) => {
          setAgreementDocDetail(res.data);
        });
    }
  }, [accountId]);

  // Update initial values with account details
  useEffect(() => {
    if (countryData && accountDetails) {
      // Get mail Country and city
      const mailCountry = countryData.find(
        (country) =>
          country.name === accountDetails.addressInformation.address.country
      );
      if (mailCountry) {
        dispatch(fetchCity(mailCountry?.id));
      }

      // Get Billing Country and city
      const billCountry = countryData.find(
        (country) =>
          country.name ===
          accountDetails.addressInformation.billingAddress.country
      );
      if (billCountry) {
        dispatch(fetchBillingCity(billCountry?.id));
      }

      // Get Currency
      const curId = accountDetails?.accountInformation.revenueCur;
      if (curId !== 0 && curId !== null && curId !== undefined) {
        const curCountry = countryData.find((country) => country.id === curId);
        setSelectedCurrency({
          currency: `${curCountry?.currency} ${curCountry?.currencySymbol}`,
          currencyId: curCountry?.id,
        });
      }

      // Get Phone number
      const landlineId = accountDetails?.accountInformation.landlineCountry;
      if (landlineId !== 0 && landlineId !== null && landlineId !== undefined) {
        const landlineCountry = countryData.find(
          (country) => country.id === landlineId
        );
        setSelectedLandline({
          landlineCountry: `${
            landlineCountry?.phoneCode.charAt(0) == "+" ? "" : "+"
          } ${landlineCountry?.phoneCode}`,
          landlineCountryId: landlineCountry?.id,
        });
      }
    }
  }, [countryData, accountDetails]);

  if (accountDetails) {
    initialValueUpdate = populateAccountValues(accountDetails);
    const { agreementDoc, ...rest } = schema.fields; // Destructure and omit the field
    schemaUpdate = yup.object().shape(rest); // Create a new schema without the field
  }

  // HandleMailingCountry Change -> Fetch city based on country
  const handleMailCountrySelect = (e) => {
    const countryId = e.target.value;
    dispatch(fetchCity(getCountryId(countryId)));
  };

  // HandleBillingCountry Change -> Fetch city based on country
  const handleBillingCountrySelect = (e) => {
    const countryId = e.target.value;
    dispatch(fetchBillingCity(getCountryId(countryId)));
  };

  // HandleIndustry Change -> Fetch sub industry based on industry
  const handleIndustrySelect = (e) => {
    const industryId = e.target.value;
    dispatch(fetchSubIndustry(industryId));
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

      return country.name;
    }
    return "";
  };

  const handleFormSubmit = async (values) => {
    // Create form data
    const formData = new FormData();
    // Nested accoun infomation inside form data

    // Account Information form data
    formData.append("accountInformation.accountName", values.accName);
    formData.append("accountInformation.salesName", values.salesName);
    formData.append("accountInformation.accountStatus", values.accStatus);
    formData.append("accountInformation.accountRating", values.accRating);
    formData.append("accountInformation.accountIndustry", +values.industry);
    formData.append("accountInformation.subIndustry", +values.subIndustry);
    formData.append("accountInformation.noOfEmployees", +values.noEmployees);
    formData.append("accountInformation.revenueAmt", +values.annualRev);
    formData.append(
      "accountInformation.revenueCur",
      +selectedCurrency.currencyId
    );
    formData.append("accountInformation.parentCompany", +values.parentComp); // Please add this in
    formData.append("accountInformation.website", values.website);
    formData.append("accountInformation.accountSource", values.accSource);
    formData.append(
      "accountInformation.landlineCountry",
      +selectedLandline.landlineCountryId
    );
    formData.append("accountInformation.landlineNumber", +values.landline);
    formData.append("accountInformation.secondaryOwner", values.secOwner);
    formData.append("accountInformation.msa", +values.msa);
    if (values.agreementDoc) {
      formData.append("accountInformation.uploadAgreement", agreementFile);
    }
    // Lead Information form data
    formData.append("leadInformation.salesName", values.leadSalesName);
    formData.append("leadInformation.leadSource", values.leadSource);
    formData.append("leadInformation.accountName", values.leadAccName);

    // Address Information form data
    formData.append("addressInformation.address.line1", values.line1);
    formData.append("addressInformation.address.line2", values.line2);
    formData.append("addressInformation.address.line3", values.line3);
    formData.append("addressInformation.address.city", values.city);
    formData.append(
      "addressInformation.address.country",
      values.country
      // getCountryName(+values.country)
    );
    formData.append("addressInformation.address.postalCode", values.postalCode);

    // Is Billing address same as mail address
    formData.append("addressInformation.isSameAsBillingAddress", disableForm);

    // Billing Address form data
    formData.append(
      "addressInformation.billingAddress.line1",
      values.billingLine1
    );
    formData.append(
      "addressInformation.billingAddress.line2",
      values.billingLine2
    );
    formData.append(
      "addressInformation.billingAddress.line3",
      values.billingLine3
    );
    formData.append(
      "addressInformation.billingAddress.city",
      values.billingCity
    );
    formData.append(
      "addressInformation.billingAddress.country",
      // getCountryName(+values.billingCountry)
      values.billingCountry
    );
    formData.append(
      "addressInformation.billingAddress.postalCode",
      values.billingPostalCode
    );

    // Account remarks form data
    formData.append("accountRemarks", values.accRemarks);

    if (accountStatus === "new") {
      axios
        .post("http://localhost:8100/accounts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(setAccountId(res.data.id));
          navigate("/account/contact-creation");
        });
    }

    if (accountStatus === "update") {
      formData.append("id", +accountId);
      axios
        .put(`http://localhost:8100/accounts/${accountId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/account/contact-creation");
        });
    }
  };

  const [disableForm, setDisableForm] = useState(false);

  // Handle checkbox change
  const handleCheckboxChange = (e, form) => {
    console.log("Country IID", getCountryId(form.values.country));
    if (e.target.checked) {
      form.setFieldValue("billingLine1", form.values.line1);
      form.setFieldValue("billingLine2", form.values.line2);
      form.setFieldValue("billingLine3", form.values.line3);
      form.setFieldValue("billingCountry", form.values.country);
      form.setFieldValue("billingCity", form.values.city);
      dispatch(fetchBillingCity(getCountryId(form.values.country)));
      form.setFieldValue("billingPostalCode", form.values.postalCode);
    } else {
      form.setFieldValue("billingLine1", "");
      form.setFieldValue("billingLine2", "");
      form.setFieldValue("billingLine3", "");
      form.setFieldValue("billingCity", "");
      form.setFieldValue("billingCountry", "");
      form.setFieldValue("billingPostalCode", "");
    }
    setDisableForm(!disableForm);
  };

  // Landline and Filter
  const [landlineDropdown, setLandlineDropdown] = useState(false);
  const [selectedLandline, setSelectedLandline] = useState({
    landlineCountry: "Phone Code",
    landlineCountryId: null,
  });
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

  // Currency & Filter
  const [currencyDropdown, setCurrencyDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState({
    currency: "Currency",
    currencyId: null,
  });
  const [currencySearchTerm, setCurrencySearchTerm] = useState("");
  const toggleCurrencyDropdown = () =>
    setCurrencyDropdown((prevState) => !prevState);

  const filteredCurrencies = currencySearchTerm
    ? countryData.filter((country) => {
        let currency = `${country.currency} ${country.name}`;
        return currency
          .toLowerCase()
          .includes(currencySearchTerm.toLowerCase());
      })
    : countryData;

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur
      validateOnChange={false}
      initialValues={initialValueUpdate}
      validationSchema={schemaUpdate}
      onSubmit={handleFormSubmit}
    >
      {({ errors, touched }) => (
        <React.Fragment>
          <Form>
            <div className="mb-3">
              <div className="mb-2">
                <div>
                  <Label className="h6">Account Information</Label>
                </div>
              </div>
              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="accName">
                      Account Name*
                    </Label>
                    <Field name="accName">
                      {({ field }) => (
                        <Input
                          type="text"
                          placeholder="Enter account name"
                          className="form-control"
                          id="accName"
                          {...field}
                          invalid={!!errors.accName}
                        />
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-sales-name-input"
                    >
                      Sales Name
                    </Label>
                    <Field name="salesName">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-sales-name-input"
                          placeholder="Enter sales name"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="accStatus">
                      Account Status*
                    </Label>
                    <Field name="accStatus">
                      {({ field }) => (
                        <select
                          {...field}
                          className={`form-select ${
                            touched.accStatus && errors.accStatus
                              ? "is-invalid"
                              : ""
                          }`}
                          id="accStatus"
                        >
                          <option>Select</option>
                          <option defaultValue="1">Active</option>
                          <option defaultValue="2">Inactive</option>
                        </select>
                      )}
                    </Field>
                    {touched.accStatus && errors.accStatus && (
                      <FormFeedback type="invalid">
                        {errors.accStatus}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="accRating">
                      Account Rating*
                    </Label>
                    <Field name="accRating">
                      {({ field }) => (
                        <select
                          {...field}
                          className={`form-select ${
                            touched.accRating && errors.accRating
                              ? "is-invalid"
                              : ""
                          }`}
                          id="accRating"
                        >
                          <option>Select</option>
                          <option defaultValue="1">Tier 1</option>
                          <option defaultValue="2">Tier 2</option>
                          <option defaultValue="3">Tier 3</option>
                        </select>
                      )}
                    </Field>
                    {touched.accRating && errors.accRating && (
                      <FormFeedback type="invalid">
                        {errors.accRating}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-industry-input"
                    >
                      Industry
                    </Label>
                    <Field name="industry">
                      {({ field, form }) => (
                        <select
                          className="form-select"
                          id="gen-info-industry-input"
                          {...field}
                          onChange={(e) => {
                            form.handleChange(e);
                            handleIndustrySelect(e);
                          }}
                        >
                          <option>Select</option>
                          {industryData &&
                            industryData.map((industry) => (
                              <option value={industry.id}>
                                {industry.name}
                              </option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-subindustry-input"
                    >
                      Sub Industry
                    </Label>
                    <Field name="subIndustry">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="gen-info-subindustry-input"
                          {...field}
                        >
                          <option>Select</option>
                          {subIndustryData &&
                            subIndustryData.map((subIndustry) => (
                              <option value={subIndustry.id}>
                                {subIndustry.name}
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-employees-num-input"
                    >
                      No. of Employees
                    </Label>
                    <Field name="noEmployees">
                      {({ field }) => (
                        <Input
                          type="number"
                          className="form-control"
                          id="gen-info-employees-num-input"
                          placeholder="Enter number of employees"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-annual-revenue-input"
                    >
                      Annual Revenue
                    </Label>
                    <Dropdown
                      className="input-group"
                      isOpen={currencyDropdown}
                      toggle={toggleCurrencyDropdown}
                    >
                      <DropdownToggle
                        as="button"
                        className="btn btn-primary arrow-none"
                      >
                        <span>
                          {selectedCurrency.currency}
                        </span>
                      </DropdownToggle>
                      <Field name="annualRev">
                        {({ field }) => (
                          <Input
                            type="number"
                            className="form-control"
                            placeholder="Enter annual revenue"
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
                          placeholder="Search currency..."
                          value={currencySearchTerm}
                          style={{ width: "95%" }}
                          onChange={(e) =>
                            setCurrencySearchTerm(e.target.value)
                          }
                        />
                        {filteredCurrencies &&
                          filteredCurrencies.map((country) => (
                            <DropdownItem
                              as="li"
                              onClick={() =>
                                setSelectedCurrency((prev) => ({
                                  ...prev,
                                  currency: `${country.currency} ${country.currencySymbol}`,
                                  currencyId: country.id,
                                }))
                              }
                              className="dropdown-item d-flex"
                            >
                              <div className="flex-grow-1">
                                <div className="d-flex">
                                  <span>
                                    {country.currency} {country.currencySymbol}{" "}
                                    {`(${country.name})`}
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-parent-company-input"
                    >
                      Parent Company
                    </Label>
                    <Field name="parentComp">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="gen-info-parent-company-input"
                          {...field}
                        >
                          <option>Select</option>
                          {parentCompanyData &&
                            parentCompanyData.map((parentCompany) => (
                              <option value={parentCompany.id}>
                                {parentCompany.name}
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-website-input"
                    >
                      Website
                    </Label>
                    <Field name="website">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-website-input"
                          placeholder="Type"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="accSource">
                      Account Source*
                    </Label>
                    <Field name="accSource">
                      {({ field }) => (
                        <select
                          className={`form-select ${
                            touched.accSource && errors.accSource
                              ? "is-invalid"
                              : ""
                          }`}
                          {...field}
                          id="accSource"
                        >
                          <option value="">Select</option>
                          <option value="1">Professional Services</option>
                          <option value="2">Talent Services</option>
                        </select>
                      )}
                    </Field>
                    {touched.accSource && errors.accSource && (
                      <FormFeedback type="invalid">
                        {errors.accSource}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-acc-status-input"
                    >
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
                        <span>
                          {selectedLandline.landlineCountry}
                        </span>
                      </DropdownToggle>
                      <Field name="landline">
                        {({ field }) => (
                          <Input
                            type="number"
                            className="form-control"
                            placeholder="Enter landline number"
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-sec-owner-input"
                    >
                      Secondary Owner
                    </Label>
                    <Field name="secOwner">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-website-input"
                          placeholder="Enter secondary owner"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-acc-source-input"
                    >
                      MSA*
                    </Label>
                    <Field name="msa">
                      {({ field }) => (
                        <select
                          id="msa"
                          {...field}
                          className={`form-select ${
                            touched.msa && errors.msa ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select</option>
                          <option value="0">Yes</option>
                          <option value="1">No</option>
                        </select>
                      )}
                    </Field>
                    {touched.msa && errors.msa && (
                      <FormFeedback type="invalid">{errors.msa}</FormFeedback>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="agreementDoc">
                      Upload Agreement*
                    </Label>
                    <Field name="agreementDoc">
                      {({ field, form }) => (
                        <div className="input-group">
                          <Input
                            type="file"
                            className="form-control"
                            id="agreementDoc"
                            {...field}
                            onChange={(e) => {
                              handleFileChange(e, form);
                              form.handleChange(e);
                            }}
                            invalid={!!errors.agreementDoc}
                          />
                        </div>
                      )}
                    </Field>
                    {touched.agreementDoc && errors.agreementDoc && (
                      <FormFeedback type="invalid">
                        {errors.agreementDoc}
                      </FormFeedback>
                    )}

                    {agreementDocDetail && (
                      <span className="mt-2">
                        {agreementDocDetail.documentName}
                      </span>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <div className="mb-2">
                <div>
                  <Label className="h6">Lead Information</Label>
                </div>
              </div>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="leadSalesName">
                      Sales Name*
                    </Label>
                    <Field name="leadSalesName">
                      {({ field }) => (
                        <select
                          id="leadSalesName"
                          {...field}
                          className={`form-select ${
                            touched.leadSalesName && errors.leadSalesName
                              ? "is-invalid"
                              : ""
                          }`}
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      )}
                    </Field>
                    {touched.leadSalesName && errors.leadSalesName && (
                      <FormFeedback type="invalid">
                        {errors.leadSalesName}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-lead-source-input"
                    >
                      Lead Source
                    </Label>
                    <Field name="leadSource">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="gen-info-lead-source-input"
                          {...field}
                        >
                          <option>Select</option>
                          <option defaultValue="1">Yes</option>
                          <option defaultValue="2">No</option>
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="leadAccName">
                      Account Name*
                    </Label>
                    <Field name="leadAccName">
                      {({ field }) => (
                        <select
                          className={`form-select ${
                            touched.leadAccName && errors.leadAccName
                              ? "is-invalid"
                              : ""
                          }`}
                          {...field}
                          id="leadAccName"
                        >
                          <option value="">Select</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      )}
                    </Field>
                    {touched.leadAccName && errors.leadAccName && (
                      <FormFeedback type="invalid">
                        {errors.leadAccName}
                      </FormFeedback>
                    )}
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <div className="mb-2">
                <div>
                  <Label className="h6">Address Information</Label>
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
                          placeholder="Enter address line 1"
                          {...field}
                          invalid={!!errors.line1}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-line2-input"
                    >
                      Line 2
                    </Label>
                    <Field name="line2">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="line2"
                          placeholder="Enter address line 2"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-line3-input"
                    >
                      Line 3
                    </Label>
                    <Field name="line3">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="line3"
                          placeholder="Enter address line 3"
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-country-input"
                    >
                      Country
                    </Label>
                    <Field name="country">
                      {({ field, form }) => (
                        <select
                          className="form-select"
                          id="gen-info-city-input"
                          aria-label="Example select with button addon"
                          {...field}
                          onChange={(e) => {
                            form.handleChange(e);
                            handleMailCountrySelect(e);
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
                    <Label className="form-label" htmlFor="gen-info-city-input">
                      City
                    </Label>
                    <Field name="city">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="city"
                          aria-label="Example select with button addon"
                          {...field}
                        >
                          <option>Select</option>
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-postal-code-input"
                    >
                      Postal Code
                    </Label>
                    <Field name="postalCode">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-postal-input"
                          placeholder="Enter postal code"
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="mb-3">
              <div className="mb-1">
                <div>
                  <p className="h6">Billing Address</p>
                </div>
              </div>

              <div className="form-check mb-3">
                <Field name="isSameAsAddress">
                  {({ field, form }) => (
                    <Input
                      className="form-check-input"
                      type="checkbox"
                      id="formCheck"
                      checked={disableForm}
                      {...field}
                      onChange={(e) => {
                        handleCheckboxChange(e, form);
                        form.handleChange(e);
                      }}
                    />
                  )}
                </Field>
                <Label className="form-check-label" htmlFor="formCheck">
                  Same as Above
                </Label>
              </div>

              <Row>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-line1-input"
                    >
                      Line 1
                    </Label>
                    <Field name="billingLine1">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-line1-input"
                          placeholder="Enter billing address line 1"
                          disabled={disableForm}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-line2-input"
                    >
                      Line 2
                    </Label>
                    <Field name="billingLine2">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-line2-input"
                          placeholder="Enter billing address line 2"
                          disabled={disableForm}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-line3-input"
                    >
                      Line 3
                    </Label>
                    <Field name="billingLine3">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-line3-input"
                          placeholder="Enter billing address line 3"
                          disabled={disableForm}
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
                    <Label
                      className="form-label"
                      htmlFor="gen-info-country-input"
                    >
                      Country
                    </Label>
                    <Field name="billingCountry">
                      {({ field, form }) => (
                        <select
                          className="form-select"
                          id="gen-info-city-input"
                          disabled={disableForm}
                          {...field}
                          onChange={(e) => {
                            form.handleChange(e);
                            handleBillingCountrySelect(e);
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
                    <Label className="form-label" htmlFor="gen-info-city-input">
                      City
                    </Label>
                    <Field name="billingCity">
                      {({ field }) => (
                        <select
                          className="form-select"
                          id="gen-info-city-input"
                          disabled={disableForm}
                          {...field}
                        >
                          <option>Select</option>
                          {billingCityData &&
                            billingCityData.map((city) => (
                              <option value={city.name}>{city.name}</option>
                            ))}
                        </select>
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label
                      className="form-label"
                      htmlFor="gen-info-postal-code-input"
                    >
                      Postal Code
                    </Label>
                    <Field name="billingPostalCode">
                      {({ field }) => (
                        <Input
                          type="text"
                          className="form-control"
                          id="gen-info-postal-input"
                          placeholder="Enter billing postal code"
                          disabled={disableForm}
                          {...field}
                        />
                      )}
                    </Field>
                  </div>
                </Col>
              </Row>

              <Col xxl={12}>
                <div>
                  <Label
                    htmlFor="gen-info-remarks-input"
                    className="form-label"
                  >
                    Account Remarks
                  </Label>
                  <Field name="accRemarks">
                    {({ field }) => (
                      <textarea
                        className="form-control"
                        placeholder="Enter account remarks"
                        id="gen-info-remarks-input"
                        rows="3"
                        {...field}
                      ></textarea>
                    )}
                  </Field>
                </div>
              </Col>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </Form>
        </React.Fragment>
      )}
    </Formik>
  );
};

export default AccountCreation;
