import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import "./SideDrawer.scss";

const SideDrawer = ({
  showSideDrawer,
  setShowSideDrawer,
  headerLabel,
  isTemplateSelectorOn,
  headerComponents,
  width = "30vw",
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  return (
    <>
      {showSideDrawer && (
        <div
          className={`${
            isFullscreen ? "side-drawer__full-screen" : "side-drawer "
          }`}
          style={{
            width: isFullscreen ? "100%" : width,
            left: isFullscreen ? "0" : `-${width}`,
          }}
        >
          <div
            className="offcanvas-header border-bottom border-bottom-dashed d-flex flex-row gap-4 align-items-center flex-wrap"
            style={{
              height: "80px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center w-100 flex-wrap">
              <span className="fs-5 fw-bold">{headerLabel || "Preview"}</span>
              <div className="d-flex align-items-center gap-2">
                {headerComponents}
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(!isFullscreen);
                  }}
                >
                  {isFullscreen ? (
                    <i className="bx bx-window fs-5"></i>
                  ) : (
                    <i className="bx bx-windows fs-5"></i>
                  )}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() => setShowSideDrawer(false)}
                >
                  <i className="ri-close-fill fs-5"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideDrawer;
