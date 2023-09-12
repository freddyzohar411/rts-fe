import React, { useState, useEffect } from 'react';
import { Badge, Button, Card, CardBody, Col, Container, Input, Row, Table } from 'reactstrap';
import { Link } from 'react-router-dom';;

function AccountListing() {
    document.title = "Accounts | RTS";

    const [isSorted, setIsSorted] = useState(false);
    const toggle = () => {
        setIsSorted(!isSorted);
    };

    return (
        <React.Fragment>
            <div className='page-content'>
                <Container fluid>
                    <Row>
                        <Col lg={12}>
                            <Card className='m-3'>
                                <CardBody>
                                    <div className='listjs-table'>
                                        <Row className='d-flex column-gap-1 mb-3'>
                                            <Col>
                                                <div className='search-box'>
                                                    <Input type='text' placeholder='Search' className='form-control search bg-light border-light' />
                                                    <i className='ri-search-line search-icon'></i>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className='d-flex column-gap-2 justify-content-end'>
                                                    <Button type='button' className='btn btn-primary d-flex align-items-center column-gap-2'><span><i className='mdi mdi-download'></i></span> Imports</Button>
                                                    <Button type='button' className='btn btn-primary d-flex align-items-center column-gap-2'><span><i className='ri-settings-3-fill'></i></span> Custom View</Button>
                                                    <Button type='button' className='btn btn-primary'>Create New Account</Button>
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className='table-responsive table-hover table-card mt-3 mb-1'>
                                            <Table className='table align-middle table-nowrap' id='accountListingTable'>
                                                <thead className='table-light'>
                                                    <tr>
                                                        <th scope='col' style={{ width: "50px" }}>
                                                            <div className='form-check'>
                                                                <Input className='form-check-input' type='checkbox' id='checkbox' value='option' />
                                                            </div>
                                                        </th>
                                                        <th scope='col' class="text-uppercase"></th>
                                                        <th scope='col' class="text-uppercase">Service <span onClick={toggle} style={{cursor: 'pointer'}}>{isSorted ? <i className='mdi mdi-sort-descending'></i> : <i className='mdi mdi-sort-ascending'></i>}</span></th>
                                                        <th scope='col' class="text-uppercase">Account Number <i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Account Name <i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Account Owner <i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Created By <i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Parent Account<i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Account Status <i className="mdi mdi-sort-descending"></i></th>
                                                        <th scope='col' class="text-uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="list form-check-all">
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <Input className="form-check-input" type="checkbox" name="chk_child" value="option1" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2101</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Mary Cousar</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <Button className="custom-button btn-sm" type='button'>Edit</Button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option2" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2102</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Jeff Taylor</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option3" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2103</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Robert Lee</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option4" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2104</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Michael Moris</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='danger' className='text-uppercase'>Inactive</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option5" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2105</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Kevin Dawson</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option6" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2106</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Carolyn Jones</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option7" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2107</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Glen Matley</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option8" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#"
                                                            className="fw-medium link-primary">#VZ2108</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Charles Kubik</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='danger' className='text-uppercase'>Inactive</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option9" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2109</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Kevin Dawson</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='danger' className='text-uppercase'>Inactive</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option10" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2110</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Timothy Smith</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option11" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td className="id" style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2111</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Johnny Evans</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td className="status"><Badge color='danger' className='text-uppercase'>Inactive</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="checkbox" name="checkAll" value="option12" />
                                                            </div>
                                                        </th>
                                                        <td>
                                                            <div className='d-flex column-gap-2'>
                                                                <Badge color='dark'>+1</Badge>
                                                                <Badge color='dark'>+2</Badge>
                                                                <Badge color='dark'>+10</Badge>
                                                            </div>
                                                        </td>
                                                        <td>Professional Services</td>
                                                        <td>A5787999</td>
                                                        <td style={{ display: "none" }}><Link to="#" className="fw-medium link-primary">#VZ2112</Link></td>
                                                        <td>Luxoft-A DXC Technology Company</td>
                                                        <td>Kevin Dawson</td>
                                                        <td>Meaganne Young</td>
                                                        <td>NA</td>
                                                        <td><Badge color='success' className='text-uppercase'>Active</Badge></td>
                                                        <td>
                                                            <div className="d-flex gap-2">
                                                                <div className="edit">
                                                                    <button className="btn btn-sm btn-success edit-item-btn"
                                                                        data-bs-toggle="modal" data-bs-target="#showModal">Edit</button>
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                        <div className="d-flex justify-content-end">
                                            <div className="pagination-wrap hstack gap-2">
                                                <Link className="page-item pagination-prev disabled" to="#">
                                                    Previous
                                                </Link>
                                                <ul className="pagination listjs-pagination mb-0"></ul>
                                                <Link className="page-item pagination-next" to="#">
                                                    Next
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default AccountListing
