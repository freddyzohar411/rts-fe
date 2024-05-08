import React, { useState } from "react";

const SideDrawerAccordion = ({
  sectionData,
  sectionHeader,
  selectedKey = 1234567,
  setSelectedKey,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  return (
    <div>
      <div
        className="fs-5 d-flex align-items-center justify-content-between cursor-pointer py-2"
        onClick={() => setIsAccordionOpen((prev) => !prev)}
        style={{
          borderBottom: "1px solid #D9E2EC",
        }}
      >
        <span>{sectionHeader}</span>
        {
          <i
            className={`ri-arrow-${isAccordionOpen ? "up" : "down"}-s-line`}
          ></i>
        }
      </div>
      <div className="mt-2">
        {isAccordionOpen &&
          sectionData.map((subItem, index) => {
            return (
              <div
                key={subItem?.key}
                onClick={() => setSelectedKey(subItem?.key)}
                className="mb-2 px-2 py-1 cursor-pointer d-flex align-items-center gap-2"
                style={{
                  border:
                    subItem?.key == selectedKey
                      ? "2px solid #0A56AE"
                      : "2px solid transparent",
                  borderRadius: "5px",
                }}
              >
                <div
                  className="border d-flex align-items-center justify-content-center"
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "4px",
                    // Light grey border
                    // border: "2px solid #D9E2EC !important",
                    // borderColor: "#D9E2EC",
                  }}
                >
                  <span>{index + 1}</span>
                </div>
                <span className="fw-semibold">{subItem.label}</span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SideDrawerAccordion;
