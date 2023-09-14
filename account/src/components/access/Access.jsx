import React from 'react';
import { Label, Col, Row, Button } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { initialValues, schema } from './constants-access';
import { useNavigate } from 'react-router-dom';

function Access() {
    const navigate = useNavigate();
    const handleSubmit = async (values) => {
        console.log(values);
        navigate("/account/commercial-creation")
    };

    return (
        <Formik
            validateOnBlur
            validateOnChange={false}
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            <Form>
                <div>
                    <div className='mb-3'>
                        <div className="mb-2">
                            <div>
                                <Label className="h6">
                                    Access
                                </Label>
                            </div>
                        </div>

                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label>
                                        Recruiters
                                    </Label>
                                    <p className="text-muted">
                                        (Users that are selected here will be auto populated in "Assigned To" field while posting the job.)
                                    </p>
                                </div>

                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Field name="recruiters">
                                        {({ field }) => (
                                            <select
                                                id="recruiters"
                                                className='form-select'
                                                {...field}>
                                                <option value="">Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        )}
                                    </Field>

                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor='teamLead'>
                                        Team Lead
                                    </Label>
                                    <p className="text-muted">
                                        (Users that are selected here will be auto populated in "Sales Manager" field while posting the job.)
                                    </p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Field name="teamLead">
                                        {({ field }) => (
                                            <select
                                                id="teamLead"
                                                className='form-select'
                                                {...field}>
                                                <option value="">Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        )}
                                    </Field>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor='salesName'>
                                        Sales Name
                                    </Label>
                                    <p className="text-muted">
                                        (Users that are selected here will be auto populated in "Account Manager" field while posting the job.)
                                    </p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Field name='salesName'>
                                        {({ field }) => (
                                            <select
                                                className="form-select"
                                                id="salesName"
                                                {...field}>
                                                <option value="">Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        )}
                                    </Field>
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Label htmlFor='recruitmentManager'>
                                        Recruitment Manager
                                    </Label>
                                    <p className="text-muted">
                                        (Users that are selected here will be auto populated in "Recruitment Manager" field while posting the job.)
                                    </p>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="mb-3">
                                    <Field name="recruitmentManager">
                                        {({ field }) => (
                                            <select
                                                className="form-select"
                                                id="recruitmentManager"
                                                {...field}>
                                                <option value="">Select</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        )}
                                    </Field>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className='d-flex column-gap-2 justify-content-end'>
                    <Button type='button' className='btn btn-primary' onClick={() => {navigate("/account/client-instructions-creation")}}>Back</Button>
                    <Button type='submit' className='btn btn-primary'>Next</Button>
                </div>

            </Form>
        </Formik>

    )

}

export default Access