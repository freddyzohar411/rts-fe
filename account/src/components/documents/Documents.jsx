import React, { useState, useEffect } from "react";
import {
  Label,
  Col,
  Row,
  Input,
  Button,
  Table,
  FormFeedback,
  Alert,
} from "reactstrap";
import { Form, Field, Formik } from "formik";
import {
  initialValues,
  schema,
  populateDocumentForm,
  getUpdateSchema,
} from "./constants-document";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FileHelper } from "@workspace/common";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function Documents() {
  const navigate = useNavigate();
  const accountId = useSelector(
    (state) => state.AccountRegistrationReducer.accountId
  );
  const ENTITY_TYPE = "account_document";
  const [documents, setDocuments] = useState([]);
  const [newDocument, setNewDocument] = useState(null);
  const [updatedDocument, setUpdatedDocument] = useState(documents);
  const [editDocumentName, setEditDocumentName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileError, setFileError] = useState(null);

  // Update id state
  const [updateId, setUpdateId] = useState(null);
  // Form initial value state
  const [documentFormInitialValues, setDocumentFormInitialValues] =
    useState(initialValues);
  const [documentSchema, setDocumentSchema] = useState(schema);

  // Fetch Document data if exist on first render
  useEffect(() => {
    if (accountId) {
      const response = fetchDocumentsWithEntityIdAndEntityType(accountId).then(
        (response) => {
          setDocuments(response.data);
        }
      );
    }
  }, [accountId]);

  // Handle document form submit
  const handleSubmit = async (values, { resetForm }) => {
    setErrorMessage("");
    const documentData = new FormData();
    documentData.append("title", values.docTitle);
    documentData.append("description", values.docDesc);
    documentData.append("type", values.docType);
    if (values.uploadDoc) {
      console.log("File added", newDocument);
      documentData.append("file", newDocument);
    }
    documentData.append("entityType", ENTITY_TYPE);
    documentData.append("entityId", +accountId);

    // Create a document
    if (updateId) {
      await api.put(
        `http://localhost:8500/documents/${updateId}`,
        documentData
      );
    } else {
      // Save to database with file add header

      await api.create("http://localhost:8500/documents", documentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } );
    }

    // get all documents and populate table
    const response = await fetchDocumentsWithEntityIdAndEntityType(accountId);
    setDocuments(response.data);

    // Reset form
    handleClearForm(resetForm);
  };

  // Handle next button
  const handleNext = () => {
    if (documents.length !== 0) {
      navigate("/account/client-instructions-creation");
    } else {
      setErrorMessage("Please upload a document before you continue.");
      console.log("ERROR");
    }
  };

  // Fetch all documents for the account
  const fetchDocumentsWithEntityIdAndEntityType = async (accountId) => {
    return api.get(
      `http://localhost:8500/documents?entityId=${accountId}&entityType=account_document`
    );
  };

  // Handle file upload
  const handleFileUpload = (e, form) => {
    setFileError(null);

    // Check if file is selected
    if (e.target.files[0] ==  null) return;

    // Check if file is correct format
    if (!FileHelper.checkFileFormatValid(e.target.files[0], ["pdf","docx","doc"])){
      e.target.value = null;
      setFileError("Please upload only pdf, docx, doc file");
      return;
    }

    // Check if file size les than 2MB
    if (!FileHelper.checkFileSizeLimit(e.target.files[0], 2000000)){
      e.target.value = null;
      setFileError("Please upload file less than 2MB");
      return;
    }

    // Set File
    setNewDocument(e.target.files[0]);
  };

  // Handle delete
  const handleDelete = async (documentId) => {
    await api.delete(`http://localhost:8500/documents/${documentId}`);
    const response = await fetchDocumentsWithEntityIdAndEntityType(accountId);
    setDocuments(response.data);
  };

  // Handle Update
  const handleDocumentUpdate = async (document) => {
    // Set update id
    setUpdateId(document.id);

    // Set form initial values
    setDocumentFormInitialValues(populateDocumentForm(document));
    setDocumentSchema(getUpdateSchema());
    setEditDocumentName(document.documentName);
  };

  // Custom clear form
  const handleClearForm = (resetform) => {
    resetform();
    setEditDocumentName(null);
    setDocumentFormInitialValues(initialValues);
    setDocumentSchema(schema);
    setUpdateId(null);
  };

  return (
    <Formik
      enableReinitialize={true}
      validateOnBlur
      validateOnChange={false}
      initialValues={documentFormInitialValues}
      validationSchema={documentSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, resetForm, values }) => (
        <Form>
          <div>
            <div className="mb-5">
              <div className="mb-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Label className="h6">Documents</Label>
                  <div className="d-flex gap-2">
                    <Button type="submit" className="btn btn-primary">
                      {updateId == null ? "Add" : "Save"}
                    </Button>
                    {updateId && (
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        onClick={() => {
                          handleClearForm(resetForm);
                        }}
                      >
                        Cancel
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <Row>
                <Col lg={4}>
                  <Label className="form-label" htmlFor="docType">
                    Document Type
                  </Label>
                  <Field name="docType">
                    {({ field }) => (
                      <select className="form-select" {...field} id="docType">
                        <option>Select</option>
                        <option defaultValue="1">pdf</option>
                        <option defaultValue="2">docs</option>
                        <option defaultValue="3">xlsx</option>
                      </select>
                    )}
                  </Field>
                  <p className="text-muted mt-2">
                    Documents Are Required to Create The Client.
                  </p>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="docTitle">
                      Document Title
                    </Label>
                    <Field name="docTitle">
                      {({ field }) => (
                        <Input
                          id="docTitle"
                          className="form-control"
                          {...field}
                          placeholder="Enter document title"
                        />
                      )}
                    </Field>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="uploadDoc">
                      Upload Document*
                    </Label>
                    <Field name="uploadDoc">
                      {({ field, form }) => (
                        <Input
                          className={`form-control ${
                            touched.uploadDoc && errors.uploadDoc
                              ? "is-invalid"
                              : ""
                          }`}
                          type="file"
                          id="uploadDoc"
                          {...field}
                          onChange={(e) => {
                            handleFileUpload(e, form);
                            form.handleChange(e);
                          }}
                        />
                      )}
                    </Field>
                    {touched.uploadDoc && errors.uploadDoc && (
                      <FormFeedback type="invalid">
                        {errors.uploadDoc}
                      </FormFeedback>
                    )}
                       {fileError && <div class="text-danger"><small>{fileError}</small></div> }
                    {editDocumentName && <span>{editDocumentName}</span>}
                    <div className="text-muted mt-2">
                      <div>Maximum Upload File Size: 2 MB.</div>
                      <div>Only .pdf, .doc and .docx files allowed.</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={8}>
                  <div className="mb-3">
                    <Label htmlFor="docDesc" className="form-label">
                      Description
                    </Label>
                    <Field name="docDesc">
                      {({ field }) => (
                        <textarea
                          className="form-control"
                          placeholder="Enter document description"
                          {...field}
                          id="docDesc"
                          rows="3"
                        ></textarea>
                      )}
                    </Field>
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
                    <th scope="col">Document Type</th>
                    <th scope="col">Document Title</th>
                    <th scope="col">Uploaded Document</th>
                    <th scope="col">Description</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length === 0 ? (
                    <tr>
                      <td colSpan="5">
                        No documents added yet, please add one to view.
                      </td>
                    </tr>
                  ) : (
                    documents.map((document, index) => (
                      <tr key={index}>
                        <td>{document.type}</td>
                        <td>{document.title}</td>
                        <td>{document.documentName}</td>
                        <td>
                          {document.description ? document.description : "-"}
                        </td>
                        <td>
                          <Button
                            className="m-2 btn btn-outline-outline"
                            type="button"
                            outline
                            onClick={() => handleDocumentUpdate(document)}
                          >
                            Edit
                          </Button>

                          <Button
                            className="m-2 btn btn-outline-outline"
                            type="button"
                            outline
                            onClick={() => handleDelete(document.id)}
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
          </div>

          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <div className="d-flex column-gap-2 justify-content-end">
            <Button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                navigate("/account/contact-creation");
              }}
            >
              Back
            </Button>
            <Button className="btn btn-primary" type="button" onClick={handleNext}>
              Next
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default Documents;
