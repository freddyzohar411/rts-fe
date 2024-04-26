import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import { useFormik } from "formik";
import {
  EmailTo,
  EmailCCBCC,
  EmailSubject,
  SelectTemplateNoBorder,
  EmailTemplateSelect,
  TemplateDisplayV4,
  UseTemplateModuleDataHook,
} from "@workspace/common";
import { initialValues, schema } from "./formikConfig";
import { toast } from "react-toastify";
import { TemplateHelper } from "@workspace/common";

const SubmitToSales = ({ candidateId, jobId }) => {
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formSchema, setFormSchema] = useState(schema);
  const [emailTemplateData, setEmailTemplateData] = useState(null);
  const [tableTemplateData, setTableTemplateData] = useState(null);
  const { allModuleData } = UseTemplateModuleDataHook.useTemplateModuleData({
    candidateId: candidateId,
    jobId: jobId,
  });

  // console.log("emailTemplateData", emailTemplateData?.content);

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

  useEffect(() => {
    const setContentInFormik = async () => {
      const processedContent = await TemplateHelper.runEffects(
        emailTemplateData.content,
        null,
        allModuleData,
        true
      );
      formik.setFieldValue("content", processedContent);
    };

    if (emailTemplateData) {
      setContentInFormik();
    }
  }, [emailTemplateData, allModuleData]);

  const setTableDataWithEffect = async (data) => {
    const processedContent = await TemplateHelper.runEffects(
      data.content,
      null,
      allModuleData,
      true
    );
    setTableTemplateData({ ...data, content: processedContent });
  };

  useEffect(() => {
    if (tableTemplateData) {
      setTableTemplateData(null);
    }
  }, [tableTemplateData]);

  console.log("tableTemplateData", tableTemplateData?.content);

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
          {/* Main Template Select */}
          <EmailTemplateSelect
            icon={<i className=" ri-file-list-2-line fs-5"></i>}
            category="Email Templates"
            setTemplateData={setEmailTemplateData}
          />
          <hr className="mt-2" />
        </Col>
        <Col>
          <EmailTemplateSelect
            icon={<i className=" ri-table-2 fs-5"></i>}
            setTemplateData={setTableDataWithEffect}
            value={tableTemplateData}
            category="Table Templates"
          />
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
            injectData={tableTemplateData?.content ?? null}
            isAllLoading={false}
            content={emailTemplateData?.content ?? null}
            // allData={allModuleData}
            allData={"null"}
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
