import React, { useState, useEffect } from "react";
import { Label, Col, Row, Input, Button } from "reactstrap";
import { Form, Formik, Field } from "formik";
import {
  initialValues,
  schema,
  populateCommercialInitialValues,
} from "./constants-commercials";
// import { accountId } from "../../fakeData";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Commercial() {
  const navigate = useNavigate();
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );
  const ENTITY_TYPE = "account_commercial";
  const [commercialInitialValuesData, setCommercialInitialValuesData] =
    useState(initialValues);
  const [commercialUpdateData, setCommercialUpdateData] = useState({});

  useEffect(() => {
    if (accountId) {
      // Check if commercial exist
      axios
        .get(`http://localhost:8100/accounts/${accountId}/commercials`)
        .then((res) => {
          setCommercialUpdateData(res.data);
          setCommercialInitialValuesData(
            populateCommercialInitialValues(res.data)
          );
        });
    }
  }, []);

  console.log("Com data", commercialUpdateData);

  const handleSubmit = async (values) => {
    console.log(values);
    const newCommerical = {
      markUp: values.markUp,
      msp: values.msp,
    };

    // Patch the commercial for account
    const res = await axios
      .patch(
        `http://localhost:8100/accounts/${accountId}/commercials`,
        newCommerical
      )
      .then((res) => {
        navigate("/accounts");
      });
  };
  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur
      validateOnChange={false}
      initialValues={commercialInitialValuesData}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <div className="mb-3">
            <div className="mb-2">
              <div>
                <Label className="h6">Commercial</Label>
              </div>
            </div>

            <Row className="d-flex justify-content-between">
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="markUp">
                    Mark Up
                  </Label>
                  <p className="text-muted">
                    Select the type of calculation to define the pay rate
                    automatically while posting the job in Job Postings module.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Field name="markUp">
                    {({ field }) => (
                      <Input
                        type="number"
                        className="form-control"
                        placeholder="Enter markup"
                        {...field}
                      />
                    )}
                  </Field>
                </div>
              </Col>
            </Row>

            <Row className="d-flex justify-content-between">
              <Col lg={6}>
                <div className="mb-3">
                  <Label className="form-label" htmlFor="msp">
                    MSP
                  </Label>
                  <p className="text-muted">
                    The MSP configures here will be added as overhead while
                    creating the placement for the client.
                  </p>
                </div>
              </Col>
              <Col lg={6}>
                <div className="mb-3">
                  <Field name="msp">
                    {({ field }) => (
                      <Input
                        type="number"
                        className="form-control"
                        placeholder="Enter msp"
                        {...field}
                      />
                    )}
                  </Field>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="d-flex column-gap-2 justify-content-end">
          <Button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigate("/account/access-creation");
            }}
          >
            Back
          </Button>
          <Button type="submit" className="btn btn-primary">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default Commercial;
