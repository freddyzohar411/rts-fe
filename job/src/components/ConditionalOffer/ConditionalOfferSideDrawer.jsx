import React from "react";
import SideDrawerAccordion from "./SideDrawerAccordion";

const ConditionalOfferSideDrawer = ({ selectedKey, setSelectedKey, data }) => {
  return (
    <div className="p-2">
      {data?.length > 0 ? (
        data?.map((item, index) => (
          <SideDrawerAccordion
            key={index}
            sectionHeader={item?.header}
            sectionData={item?.data}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
          />
        ))
      ) : (
        <div className="fw-semibold">No Headers Found</div>
      )}
    </div>
  );
};

export default ConditionalOfferSideDrawer;
