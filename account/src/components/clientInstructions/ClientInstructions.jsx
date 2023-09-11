import React, { useState, useEffect, useRef } from "react";
import {
  Label,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Table,
} from "reactstrap";
import { Field, Form, Formik } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { accountId } from "../../fakeData";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  guideLinesInitialValues,
  guideLinesSchema,
  populateGuideLinesInitialValues,
  instructionInitialValues,
  instructionSchema,
} from "./constants-clientInstructions";

function ClientInstructions() {
  const navigate = useNavigate();
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );
  const ENTITY_TYPE = "account_instruction";
  const nextBtnRef = useRef(null);
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState(null);
  const [guideLinesInitialValuesData, setGuideLineInitialvaluesData] = useState(
    guideLinesInitialValues
  );
  const [instructionUpdateData, setInstructionUpdateData] = useState({});
  const [instructionStatus, setInstructionStatus] = useState("new");
  const [documentUpdateId, setDocumentUpdateId] = useState(null);

  // const checkClientInstructions = async () => {
  //   return await axios.get(
  //     `http://localhost:8800/instructions?accountId=${accountId}`
  //   );
  // };

  // Check if accound id exist and if client instructions exist
  useEffect(() => {
    if (accountId) {
      // Check if client instructions exist
      axios
        .get(`http://localhost:8800/instructions?accountId=${accountId}`)
        .then((res) => {
          setInstructionUpdateData(res.data);
          setGuideLineInitialvaluesData(
            populateGuideLinesInitialValues(res.data)
          );
          setInstructionStatus("update");
        })
        .catch((err) => {
          // if (err.response.status === 404) {
            setGuideLineInitialvaluesData(guideLinesInitialValues);
            setInstructionStatus("new");
          // }
        });

      // Fetch all documents for the account
      fetchDocumentsWithEntityIdAndEntityType(accountId)
        .then((response) => {
          setDocuments(response.data);
        }).catch((err) => {})
        
    }
  }, [accountId]);

  const handleGuideLineSubmit = async (values) => {
    console.log("Guidelines Value", values);

    const newGuideline = {
      guidelines: values.submissionGuidelines,
      accountId: accountId,
    };

    if (instructionStatus === "update") {
      console.log("Update");
      // Update the existing guideline
      const response = await axios.put(
        `http://localhost:8800/instructions/${instructionUpdateData.id}`,
        newGuideline
      );
    } else {
      // Create a new guideline
      const response = await axios.post(
        "http://localhost:8800/instructions",
        newGuideline
      );
    }

    navigate("/account/access-creation");
  };

  // Handle instruction file upload submit
  const handleInstructionSubmit = async (values) => {
    console.log("Instruction Value", values);
    const documentData = new FormData();
    if (values.clientInstrDocs) {
      documentData.append("file", newDocument);
    }
    documentData.append("entityType", ENTITY_TYPE);
    documentData.append("entityId", +accountId);

    if (documentUpdateId) {
      await axios.put(
        `http://localhost:8500/documents/${updateId}`,
        documentData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } else {
      // Save to database
      await axios.post("http://localhost:8500/documents", documentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }

    // get all documents and populate table
    const response = await fetchDocumentsWithEntityIdAndEntityType(accountId);
    setDocuments(response.data);
  };

  // Fetch all documents for the account
  const fetchDocumentsWithEntityIdAndEntityType = async (accountId) => {
    return axios.get(
      `http://localhost:8500/documents?entityId=${accountId}&entityType=account_instruction`
    );
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setNewDocument(file);
  };

  // Handle remove file
  const handleRemovefile = async (id) => {
    await axios.delete(`http://localhost:8500/documents/${id}`);
    const response = await fetchDocumentsWithEntityIdAndEntityType(accountId);
    setDocuments(response.data);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        validateOnBlur
        validateOnChange={false}
        initialValues={guideLinesInitialValuesData}
        validationSchema={guideLinesSchema}
        onSubmit={handleGuideLineSubmit}
      >
        <Form>
          <div>
            <div className="mb-3">
              <div className="mb-2">
                <div>
                  <Label className="h6">Client Instructions</Label>
                </div>
              </div>
              <Row>
                <Col lg={12}>
                  <div className="mb-3">
                    <Label htmlFor="submissionGuidelines">
                      Submission Guidelines
                    </Label>
                    <Field name="submissionGuidelines">
                      {({ field, form }) => (
                        <CKEditor
                          id="submissionGuidelines"
                          editor={ClassicEditor}
                          data={field.value}
                          onReady={(editor) => {}}
                          onChange={(event, editor) => {
                            form.setFieldValue(
                              "submissionGuidelines",
                              editor.getData()
                            );
                          }}
                        />
                      )}
                    </Field>
                    <button
                      ref={nextBtnRef}
                      type="submit"
                      style={{ display: "none" }}
                    ></button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Form>
      </Formik>

      <Formik
        validateOnBlur
        validateOnChange={false}
        initialValues={instructionInitialValues}
        validationSchema={instructionSchema}
        onSubmit={handleInstructionSubmit}
      >
        <Form>
          <div className="mb-5">
            <Row>
              <Col lg={8}>
                <div className="mb-3">
                  <Field name="clientInstrDocs">
                    {({ field, form }) => (
                      <Input
                        type="file"
                        id="clientInstrDocs"
                        {...field}
                        onChange={(e) => {
                          handleFileUpload(e, form);
                          form.handleChange(e);
                        }}
                      />
                    )}
                  </Field>
                </div>
              </Col>
              <Col lg={4}>
                <div className="mb-3">
                  <Button className="btn btn-primary float-end" type="submit">
                    Add
                  </Button>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div className="mb-3">
                  <Label htmlFor="clientInstrDocs">
                    Client Instructions Documents
                  </Label>
                  <p className="text-muted">
                    (Please upload any client specific documents in this
                    section.)
                  </p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="table-responsive mb-3">
            <Table
              className="table-bordered align-middle table-nowrap mb-0"
              style={{ height: "200px", overflow: "scroll" }}
            >
              <thead className="table-light">
                <tr>
                  <th scope="col">Documents</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.length === 0 ? (
                  <tr>
                    <td colSpan={5}>
                      No documents added yet, please add one to view.
                    </td>
                  </tr>
                ) : (
                  documents.map((document, index) => (
                    <tr key={index}>
                      <td>{document.documentName}</td>
                      <td>
                        <Button
                          type="button"
                          className="btn btn-outline-outline"
                          onClick={() => handleRemovefile(document.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Form>
      </Formik>

      <div className="d-flex column-gap-2 justify-content-end">
        <Button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            navigate("/account/document-creation");
          }}
        >
          Back
        </Button>
        <Button
          className="btn btn-primary"
          type="submit"
          onClick={() => nextBtnRef.current.click()}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default ClientInstructions;
