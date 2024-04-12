import React, { useState } from "react";
import { Button, Col, Row, Alert, Spinner } from "reactstrap";
import { createUsers } from "../../../../store/users/action";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function FinaliseMassUsers({ newUsers }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state?.UserReducer?.error);

  const handleUsersCreation = () => {
    setIsLoading(true);
    dispatch(createUsers({ newUsers: newUsers, navigate: navigate }))
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <hr />
      <div className="mb-5">
        <Row className="mb-3">
          <Col>
            {error && (
              <Alert color="danger" isOpen={true}>
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
                {isLoading ? (
                  <Spinner color="primary" />
                ) : (
                  <>
                    {error && (
                      <i className="ri-error-warning-line text-danger fs-1"></i>
                    )}
                  </>
                )}

                <span className="fw-semibold">
                  Ready to import your new users?
                </span>
                <span>
                  {newUsers?.length} users extracted and ready to be imported.
                </span>
              </div>

              <Button
                className="btn btn-custom-primary w-25"
                onClick={handleUsersCreation}
              >
                <span className="me-2">Import Users</span>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default FinaliseMassUsers;
