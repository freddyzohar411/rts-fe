import React, { useState } from "react";
import { ButtonGroup, Button } from "reactstrap";
import "./ConditionalOffer.scss";
import ConditionalOfferSideDrawer from "./ConditionalOfferSideDrawer";

const ConditionalOffer = () => {
  const [isPrepareDrawerOpen, setIsPrepareDrawerOpen] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <div>
      <div
        className=" d-flex justify-content-between align-items-center pe-2"
        style={{
          borderBottom: "1px solid #D9E2EC",
        }}
      >
        <div
          className={`px-2 d-flex gap-2 align-items-center prepare-button cursor-pointer ${
            isPrepareDrawerOpen && "active"
          }`}
          style={{
            paddingTop: "8px",
            paddingBottom: "8px",
          }}
          onClick={() => setIsPrepareDrawerOpen((prev) => !prev)}
        >
          <i className=" ri-file-list-2-line fs-5"></i>
          <span className="fw-semibold fs-6">Prepare</span>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <ButtonGroup>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
            >
              <i className="ri-zoom-out-line align-bottom fs-6"></i>
            </Button>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
            >
              <i className="ri-zoom-in-line align-bottom fs-6"></i>
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
            >
              <i className="ri-download-fill align-bottom fs-6"></i>
            </Button>
            <Button
              color="light"
              className="p-2 btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
              style={{ height: "30px" }}
            >
              <i className="bx bx-window align-bottom fs-6"></i>
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/*Drawer and canvas*/}
      <div className="d-flex" style={{ height: "calc(100vh - 115px)" }}>
        {isPrepareDrawerOpen && (
          <div
            className="flex-shrink-0"
            style={{
              width: "30%",

              overflowY: "auto",
              boxShadow: "rgba(100, 100, 111, 0.3) 0px 14px 0px 0px",
            }}
          >
            <ConditionalOfferSideDrawer />
          </div>
        )}
        <div
          className="flex-grow-1"
          style={{
            backgroundColor: "#F7F9FC",
          }}
        >
          hello
        </div>
      </div>
    </div>
  );
};

export default ConditionalOffer;
