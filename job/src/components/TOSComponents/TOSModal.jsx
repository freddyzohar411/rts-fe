import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";
import { Form } from "@workspace/common";
import { fetchJobForm, tagForm } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useUserAuth } from "@workspace/login";
import {
  JOB_STAGE_IDS,
  JOB_STAGE_STATUS,
} from "../JobListing/JobListingConstants";
import { useNavigate, useLocation } from "react-router-dom";

const TOSModal = forwardRef(
  ({ jobId, candidateId, setOffcanvasForm }, parentRef) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const formikRef = useRef(null);
    const { getAllUserGroups } = useUserAuth();
    const [editData, setEditData] = useState({});
    const form = useSelector((state) => state.JobFormReducer.form);
    const [formTemplate, setFormTemplate] = useState(null);

    const linkState = location.state;
    const [view, setView] = useState(
      linkState?.view !== null && linkState?.view !== undefined
        ? linkState?.view
        : false
    );
    const handleSubmitForm = async (values) => {};
    return (
      <React.Fragment>
        <Modal>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div>
              <Form
                form={formTemplate}
                ref={formikRef}
                onSubmit={handleFormSubmit}
                initialValues={editData}
                enableReinitialize={true}
              />
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
);

export default TOSModal;
