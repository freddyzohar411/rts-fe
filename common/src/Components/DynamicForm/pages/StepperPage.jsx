import React, { useState, useEffect } from "react";
import Form from "../components/formdisplay/Form";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useContext } from "react";
import Modal from "../components/modal/Modal";
import CountrySelectField from "../fieldbuilders/CountrySelectField";

const StepperPage = () => {
  const minStep = 1;
  const maxStep = 5;
  const [activeStep, setActiveStep] = useState(1);
  const [formSubmittedData, setFormSubmittedData] = useState({});
  const [CountryModal, setCountryModal] = useState(true);
  const [country, setCountry] = useState("");
  const [template, setTemplate] = useState(null);
  const { templateName } = useParams();
  const { userDetails } = useContext(UserContext);

  const formList = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
  };

  const handleSteps = (type) => {
    if (type === "next" && activeStep < maxStep) {
      setActiveStep((prev) => prev + 1);
    }
    if (type === "prev" && activeStep > minStep) {
      setActiveStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (activeStep) {
      console.log("templateName", formList[activeStep]);

      fetch(`http://localhost:9400/forms/${formList[activeStep]}`)
        .then((data) => data.json())
        .then((data) => {
          console.log("data", data.data);
          const newTemplate = {
            formName: data.data?.formName,
            formType: data.data?.formType,
            baseFormId: data.data?.baseFormId || 0,
            entityType: data.data?.entityType,
            stepperNumber: parseInt(data.data?.stepperNumber),
            formSchema: data.data.formFieldsList,
            formLayoutSchema: data.data.formSchemaList,
          };
          setTemplate(newTemplate);
        });
    } else {
      setTemplate(null);
    }
  }, [activeStep]);

  return (
    <div>
      <div> {activeStep}</div>
      <Form
        template={template}
        userDetails={userDetails}
        country={country}
        editData={formSubmittedData}
      />
      <button className="btn btn-success" onClick={() => handleSteps("prev")}>
        Prev
      </button>
      <button className="btn btn-success" onClick={() => handleSteps("next")}>
        Next
      </button>
    </div>
  );
};

export default StepperPage;
