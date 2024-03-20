import React, { useState } from "react";
import { Button, Col, Spinner, Row, Alert } from "reactstrap";
import { createUsers } from "../../../../store/users/action";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";

function FinaliseMassUsers({ newUsers }) {
  console.log("Finalise Mass Users - Imported Users: ", newUsers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log("isLoading -- Mass Import", isLoading);

  const handleUsersCreation = () => {
    setIsLoading(true);
    dispatch(createUsers({ newUsers, navigate: navigate }))
      .catch((error) => {
        console.error("Error creating users:", error);
        setShowAlert(true);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <React.Fragment>
      <hr />
      <div className="mb-5">
        <Row className="mb-3">
          <Col>
            {showAlert && (
              <Alert
                color="danger"
                isOpen={showAlert}
                toggle={() => setShowAlert(!showAlert)}
              >
                <div className="d-flex flex-column gap-1">
                  <span className="fw-semibold">
                    Attention: Duplicate Entries Detected!
                  </span>
                  <span>
                    Some entries in the imported data already exist in the
                    system. Please review the data and resolve any duplicates
                    before proceeding.
                  </span>
                </div>
              </Alert>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="d-flex flex-column align-items-center justify-content-center gap-5 text-center">
              <div className="d-flex flex-column">
                <span className="fw-semibold">
                  Ready to import your new users?
                </span>
                <span>
                  {newUsers?.length} users extracted and ready to be imported.
                </span>
              </div>

              {isLoading && (
                <div className="d-flex flex-column align-items-center justify-content-center gap-3">
                  <Spinner />
                  <p>Creating user accounts..</p>
                </div>
              )}

              <Button
                className="btn btn-custom-primary w-25"
                onClick={() => handleUsersCreation()}
                disabled={isLoading}
              >
                <span className="me-2">Import Users</span>
                {isLoading && <Spinner size="sm" color="light" />}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default FinaliseMassUsers;
