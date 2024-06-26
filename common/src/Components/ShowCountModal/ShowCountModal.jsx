import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useSelector } from "react-redux";
import "./ShowCountModal.scss";
import { Table } from "reactstrap";

const ShowCountModal = ({ isOpen, closeModal, jobData }) => {
  const jobTimelineCountMeta = useSelector(
    (state) => state.JobStageReducer.jobTimelineCountMeta
  );
  const jobTimelineCount = useSelector(
    (state) => state.JobStageReducer.jobTimelineCount
  );

  const associated =
    jobTimelineCount?.find((it) => it?.name === "Associate")?.count ?? 0;
  const submittedToSales =
    jobTimelineCount?.find((it) => it?.name === "Submit to Sales")?.count ?? 0;
  const submittedToClient =
    jobTimelineCount?.find((it) => it?.name === "Submit to Client")?.count ?? 0;
  const interviewScheduled =
    jobTimelineCount?.find((it) => it?.name === "Scheduled")?.count ?? 0;
  const interviewHappened =
    jobTimelineCount?.find((it) => it?.name === "Completed")?.count ?? 0;
  const offerReleased =
    jobTimelineCount?.find((it) => it?.name === "Conditional Offer Sent")
      ?.count ?? 0;
  const offerAccepted =
    jobTimelineCount?.find(
      (it) => it?.name === "Conditional Offer Accepted/Declined"
    )?.count ?? 0;

  return (
    <Modal
      isOpen={isOpen}
      closeModal={closeModal}
      centered
      backdropClassName="modal"
    >
      <ModalHeader toggle={closeModal}>
        <h5>{`${jobData?.jobSubmissionData?.jobId ?? "N/A"} - ${
          jobData?.jobSubmissionData?.jobTitle ?? "N/A"
        }`}</h5>
      </ModalHeader>
      <ModalBody>
        {jobTimelineCountMeta?.isLoading ? (
          "Please Wait.."
        ) : (
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">1.</td>
                <td>Associated</td>
                <td>{associated}</td>
              </tr>
              <tr>
                <td scope="row">2.</td>
                <td>Submitted To Sales</td>
                <td>{submittedToSales}</td>
              </tr>
              <tr>
                <td scope="row">3.</td>
                <td>Submitted To Client</td>
                <td>{submittedToClient}</td>
              </tr>
              <tr>
                <td scope="row">4.</td>
                <td>Interview Scheduled </td>
                <td>{interviewScheduled}</td>
              </tr>
              <tr>
                <td scope="row">5.</td>
                <td> Interview Happened</td>
                <td>{interviewHappened}</td>
              </tr>
              <tr>
                <td scope="row">6.</td>
                <td> Offer Released</td>
                <td>{offerReleased}</td>
              </tr>
              <tr>
                <td scope="row">7.</td>
                <td> Offer Accepted</td>
                <td>{offerAccepted}</td>
              </tr>
            </tbody>
          </Table>
        )}
      </ModalBody>
    </Modal>
  );
};

export default ShowCountModal;
