import React from "react";
import SideDrawerAccordion from "./SideDrawerAccordion";

const ConditionalOfferSideDrawer = ({ selectedKey, setSelectedKey, data }) => {
  return (
    <div className="p-2">
      {data?.map((item, index) => (
        <SideDrawerAccordion
          key={index}
          sectionHeader={item?.header}
          sectionData={item?.data}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
      ))}
    </div>
  );
};

export default ConditionalOfferSideDrawer;
