import React, { useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import { EmailTo, EmailCCBCC } from "@workspace/common";
import { initialValues, schema } from "./formikConfig";

const SubmitToSales = () => {
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formSchema, setFormSchema] = useState(schema);

  /**
   * Handle form submit event (Formik)
   * @param {*} values
   */
  const handleFormSubmit = async (values) => {
    const newValues = { ...values };
    newValues.to = newValues.to.map((item) => item.value);
    newValues.cc = newValues.cc.map((item) => item.value);
    newValues.bcc = newValues.bcc.map((item) => item.value);
    const newFormData =
      ObjectHelper.convertObjectToFormDataWithArray(newValues);
    // dispatch(
    //   Actions.sendEmail({
    //     newFormData,
    //     config: {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     },
    //   })
    // );
  };

  /**
   * Initialize Formik (useFormik Hook)
   */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInitialValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: handleFormSubmit,
  });

  return (
    <div>
      <Row>
        <Col>
          <EmailTo formik={formik} />
        </Col>
      </Row>
      <hr className="mt-2" />
      <Row>
 
        <Col>
          <EmailCCBCC formik={formik} />
        </Col>
      </Row>
      <hr className="mt-2" />
    </div>
  );
};

export default SubmitToSales;
