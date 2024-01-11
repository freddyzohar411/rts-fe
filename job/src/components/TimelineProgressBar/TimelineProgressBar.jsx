import React from "react";
import { Progress } from "reactstrap";

const TimelineProgressBar = ({ percentage }) => {
  return (
    <div>
      <Progress value={percentage} />
    </div>
    // <div style={{ position: "relative", width: "50px", height: "50px" }}>
    //   <Progress
    //     value={percentage}
    //     color="primary"
    //     style={{ borderRadius: "50%", position: "absolute", zIndex: 1 }}
    //   />
    //   <div
    //     style={{
    //       position: "absolute",
    //       zIndex: 2,
    //       top: "50%",
    //       left: "50%",
    //       transform: "translate(-50%, -50%)",
    //       width: "40px",
    //       height: "40px",
    //       borderRadius: "50%",
    //       backgroundColor: "#fff",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       fontSize: "14px",
    //       fontWeight: "bold",
    //     }}
    //   >
    //     {percentage}%
    //   </div>
    // </div>
  );
};
export default TimelineProgressBar;
