import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import CountrySelectField from "../fieldbuilders/CountrySelectField";
import Form from "../components/formdisplay/Form";
import Modal from "../components/modal/Modal";


const FormDisplayPageAPI = () => {
  const [formSubmittedData, setFormSubmittedData] = useState(null);
  const [CountryModal, setCountryModal] = useState(true);
  const [country, setCountry] = useState("");
  const [template, setTemplate] = useState(null);
  const { templateId } = useParams();
  const { userDetails } = useContext(UserContext);

  /**
   * This useEffect is to call api to get the template json file
   */
  useEffect(() => {
    if (templateId) {
      console.log("templateId", templateId);
      fetch(`http://localhost:9400/forms/${templateId}`)
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
  }, [templateId]);
  return (
    <div className="container mt-4 mb-5">
      <Modal
        isOpen={CountryModal}
        closeModal={() => setCountryModal(false)}
        height="30%"
      >
        <div>
          <h1>Select Country</h1>
          <CountrySelectField
            setData={setCountry}
            field={{
              name: "country",
              placeholder: "Select Country",
            }}
          />
          <button
            className="btn btn-success mt-3"
            disabled={country ? false : true}
            onClick={() => setCountryModal(false)}
          >
            Select
          </button>
        </div>
      </Modal>
      <Form
        template={template}
        userDetails={userDetails}
        country={country}
        editData={formSubmittedData}
      />
    </div>
  );
};

export default FormDisplayPageAPI;
