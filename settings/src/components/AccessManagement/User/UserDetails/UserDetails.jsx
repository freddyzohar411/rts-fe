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
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUser, deleteUser } from "../../../../store/users/action";
import { Axios } from "@workspace/common";
import DualListBox from "react-dual-listbox";
import { fetchGroups } from "../../../../store/group/action";
const { APIClient } = Axios;
const api = new APIClient();

function UserDetails() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formattedGroups, setFormattedGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);

  // Fetch User Details
  useEffect(() => {
    if (userId) {
      dispatch(fetchUser(userId));
    }
  }, [userId]);

  useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  const user = useSelector((state) => state.UserReducer.user);
  const allGroups = useSelector((state) => state?.GroupReducer?.groups);

  // Document Title
  useEffect(() => {
    if (user) {
      document.title = `${user?.firstName} ${user?.lastName} Details | RTS`;
      const existingUsers = user?.userGroup?.map((user) => user?.id);
      setSelectedGroups(existingUsers);
    }
  }, [user]);

  useEffect(() => {
    if (allGroups?.length) {
      const groupsData = allGroups?.map((group) => ({
        value: group?.id,
        label: group?.userGroupName,
      }));
      setFormattedGroups(groupsData);
    }
  }, [allGroups]);

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
                  <Row>
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
                        <span className="fw-semibold">Designation</span>
                        <span>{user?.designation}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Country</span>
                        <span>{user?.country}</span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Location</span>
                        <span>{user?.location}</span>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3 d-flex flex-column gap-1">
                        <span className="fw-semibold">Status</span>
                        <span>{user?.status}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
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
                  <Row className="mb-2">
                    <div className="d-flex flex-row justify-content-around fw-semibold">
                      <span>All Groups</span>
                      <span>Assigned Groups</span>
                    </div>
                  </Row>
                  <Row className="mb-3">
                    <Col>
                      <DualListBox
                        options={formattedGroups}
                        selected={selectedGroups}
                        onChange={(e) => setSelectedGroups(e)}
                        canFilter={true}
                        disabled={true}
                        icons={{
                          moveLeft: (
                            <span className="mdi mdi-chevron-left" key="key" />
                          ),
                          moveAllLeft: [
                            <span
                              className="mdi mdi-chevron-double-left"
                              key="key"
                            />,
                          ],
                          moveRight: (
                            <span className="mdi mdi-chevron-right" key="key" />
                          ),
                          moveAllRight: [
                            <span
                              className="mdi mdi-chevron-double-right"
                              key="key"
                            />,
                          ],
                          moveDown: (
                            <span className="mdi mdi-chevron-down" key="key" />
                          ),
                          moveUp: (
                            <span className="mdi mdi-chevron-up" key="key" />
                          ),
                          moveTop: (
                            <span
                              className="mdi mdi-chevron-double-up"
                              key="key"
                            />
                          ),
                          moveBottom: (
                            <span
                              className="mdi mdi-chevron-double-down"
                              key="key"
                            />
                          ),
                        }}
                      />
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
