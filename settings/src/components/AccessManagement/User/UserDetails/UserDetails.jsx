import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, deleteUser } from "../../../../store/users/action";
import { Axios } from "@workspace/common";
const { APIClient } = Axios;
const api = new APIClient();

function UserDetails() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  // Fetch User Details
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId]);

  const user = useSelector((state) => state.UserReducer.user);

  // Document Title
  useEffect(() => {
    if (user) {
      document.title = `${user?.firstName} ${user?.lastName} | RTS`;
    }
  }, [user]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row>
            <Col>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/settings/access/">Settings</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>User Details</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <CardHeader className="bg-header">
                  <div className="d-flex flex-column">
                    <span className="fs-5 fw-bold">User Details</span>
                    <span>View user details.</span>
                  </div>
                </CardHeader>
                <CardBody>
                  <Row className="mb-3">
                    <Col>
                      <span className="fw-semibold">General Information</span>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Name</span>
                        <span>
                          {user?.firstName} {user?.lastName}
                        </span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Username</span>
                        <span>{user?.username}</span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Employee ID</span>
                        <span>{user?.employeeId}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Email Address</span>
                        <span>{user?.email}</span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Contact Number</span>
                        <span>{user?.mobile}</span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Manager</span>
                        <span>
                          {user?.manager
                            ? `${user?.manager?.firstName} (${user?.manager?.mobile})`
                            : "-"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <Link to="/settings/access">
                    <Button className="btn btn-custom-primary">Back</Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default UserDetails;
