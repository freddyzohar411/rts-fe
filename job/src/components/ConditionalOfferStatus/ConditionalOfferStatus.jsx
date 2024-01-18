import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CONDITIONAL_OFFER_STATUS } from "./constants";
import { fetchJobForm } from "../../store/actions";
import { useUserAuth } from "@workspace/login";
import { Row, Col, Button, Input } from "reactstrap";
import { Form } from "@workspace/common";

function ConditionalOfferStatus() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const linkState = location.state;
  const { getAllUserGroups, Permission, checkAllPermission } = useUserAuth();

  const [view, setView] = useState(
    linkState?.view !== null && linkState?.view !== undefined
      ? linkState?.view
      : false
  );

  const toggleFormViewState = () => {
    setView(!view);
  };

  const formikRef = useRef(null);
  const form = useSelector((state) => state.JobFormReducer.form);
  const [formTemplate, setFormTemplate] = useState(null);

  useEffect(() => {
    dispatch(fetchJobForm(CONDITIONAL_OFFER_STATUS));
  }, []);

  useEffect(() => {
    if (form) {
      setFormTemplate(JSON.parse(JSON.stringify(form)));
    }
  }, [form]);
  return (
    <React.Fragment>
      <div>
        <Row>
          <Col>
            <Form
              template={formTemplate}
              userDetails={getAllUserGroups()}
              country={null}
              editData={null}
              onSubmit={null}
              onFormFieldsChange={null}
              errorMessage={null}
              view={view}
              ref={formikRef}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="p-2">
              <div>
                <span className="text-muted">Time to Take Action*</span>
              </div>
              <div className="d-flex flex-row gap-3">
                <Input
                  type="text"
                  placeholder="30 Min"
                  className="form-control w-25"
                />
                <Link to="">
                  <Button className="btn btn-custom-primary">
                    Preview Pre-Offer Verification
                  </Button>
                </Link>
                <Button className="btn btn-custom-primary">Update</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

export default ConditionalOfferStatus;
