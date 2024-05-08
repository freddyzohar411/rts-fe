import React from "react";
import SideDrawerAccordion from "./SideDrawerAccordion";

const ConditionalOfferSideDrawer = ({ selectedKey, setSelectedKey }) => {
  const data = [
    {
      header: "Basic Information",
      data: [
        {
          label: "Name",
          key: "1234567",
        },
        {
          label: "Email",
          key: "0987654",
        },
      ],
    },
    {
      header: "Section 1",
      data: [
        {
          label: "Name2",
          key: "eeeeff",
        },
        {
          label: "Email2",
          key: "09876deded54",
        },
      ],
    },
  ];
  return (
    <div className="p-2">
      {data.map((item, index) => (
        <SideDrawerAccordion
          key={index}
          sectionHeader={item?.header}
          sectionData={item?.data}
        />
      ))}
    </div>
  );
};

export default ConditionalOfferSideDrawer;
