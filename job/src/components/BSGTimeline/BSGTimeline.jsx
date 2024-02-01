import React, { useState } from "react";
import { Row, Col, Table } from "reactstrap";
import { bsgStatusHeaders, sampleData, steps } from "./BSGTimelineConstants";
import StepComponent from "../JobOverview/StepComponent";
import BSGStepComponent from "./BSGStepComponent";

function BSGTimeline() {
  const [bsgStep, setBsgStep] = useState(null);

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
                <tr className="text-center align-top" key={index}>
                  <td className="py-3">{data.candidateName}</td>
                  <td className="py-3">{data.recruiterName}</td>
                  {steps.map((step, index) => (
                    <td
                      key={index}
                      className="px-0"
                    >
                      <BSGStepComponent index={index} timelineState={bsgStep} />
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
