import React, { useState, useRef } from "react";
import { Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import {
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  SelectTemplateNoBorder,
  EmailTemplateSelect,
  TemplateDisplayV4,
} from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { toast } from "react-toastify";

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
    console.log("newValues", newValues);
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

  // Toast errors upn submit
  const toastErrors = () => {
    if (formik.errors) {
      Object.keys(formik.errors).forEach((key) => {
        toast.error(formik.errors[key]);
      });
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <EmailTo formik={formik} />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <EmailCCBCC formik={formik} />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <EmailSubject formik={formik} name="subject" />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row className="d-flex">
        <Col>
          <EmailTemplateSelect
            icon={<i className=" ri-file-list-2-line fs-5"></i>}
          />
          <hr className="mt-2" />
        </Col>
        <Col>
          <EmailTemplateSelect icon={<i className=" ri-table-2 fs-5"></i>} />
          <hr className="mt-2" />
        </Col>
      </Row>
      <Row className="">
        <Col
          style={{
            maxWidth: "50%",
          }}
        >
          <EmailTemplateSelect
            icon={<i className=" ri-file-list-2-line fs-5"></i>}
          />
          <hr className="mt-2" />
        </Col>
      </Row>

      <Row>
        <Col>
          <TemplateDisplayV4
            isAllLoading={false}
            // content={templateData?.content ?? null}
            // allData={allModuleData}
            isView={false}
            // handleOutputContent={setEmailContent}
            autoResize={false}
            height={280}
            // minHeight={100}
            // maxHeight={300}
            onChange={(content) => {
              formik.setFieldValue("content", content);
            }}
            value={formik?.values?.["content"]}
            showLoading={false}
          />
        </Col>
      </Row>

      {/* <hr className="mt-2" /> */}
      <Button
        onClick={() => {
          if (!formik.isValid) {
            toastErrors();
            return;
          }
          formik.handleSubmit();
        }}
      >
        Submit
      </Button>
    </div>
  );
};

export default SubmitToSales;
