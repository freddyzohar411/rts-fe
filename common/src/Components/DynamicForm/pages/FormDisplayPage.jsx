import React, { useContext, useEffect, useState } from "react";
import Form from "../components/formdisplay/Form";
import Modal from "../components/modal/Modal";
import { UserContext } from "../context/UserProvider";
import { useParams } from "react-router-dom";
import CountrySelectField from "../fieldbuilders/CountrySelectField";

const FormDisplayPage = () => {
  const [formSubmittedData, setFormSubmittedData] = useState({});
  const [CountryModal, setCountryModal] = useState(true);
  const [country, setCountry] = useState("");
  const [template, setTemplate] = useState(null);
  const { templateName } = useParams();
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    if (templateName) {
      console.log("templateName2", templateName);
      import(`../data/${templateName}.json`).then((data) => {
        setTemplate(data.default);
      });
    } else {
      setTemplate(null);
    }

    if (templateName) {
      import(`../datasubmitted/${templateName}.json`).then((data) => {
        setFormSubmittedData(data.default);
      }).catch((err) => {
        setFormSubmittedData({});
      })
    } else {
      setFormSubmittedData({});
    }
  }, [templateName]);

  console.log("template", template);
  console.log("formSubmittedData", formSubmittedData)

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
      <Form template={template} userDetails={userDetails} country={country} editData={formSubmittedData} />
    </div>
  );
};

export default FormDisplayPage;
