import React from "react";
import { Row, Col, Table } from "reactstrap";
import { bsgStatusHeaders, sampleData, steps } from "./BSGTimelineConstants";
import StepComponent from "../JobOverview/StepComponent";

function BSGTimeline() {
  return (
    <React.Fragment>
      <div className="overflow-auto">
        <Table
          className="table table-striped align-middle"
          style={{ tableLayout: "fixed", wordWrap: "break-word" }}
        >
          <thead className="table-light">
            <tr>
              {bsgStatusHeaders.map((header, index) => {
                return (
                  <th
                    className="text-center align-middle cursor-pointer"
                    key={index}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sampleData.map((data, index) => {
              return (
                <tr className="text-center align-top p-0" key={index}>
                  <td>{data.candidateName}</td>
                  <td>{data.recruiterName}</td>
                  {steps.map((step, index) => (
                    <td key={index} className="p-0">
                      <StepComponent />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
}

export default BSGTimeline;
