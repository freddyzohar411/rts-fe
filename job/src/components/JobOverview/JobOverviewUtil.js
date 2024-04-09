import { truncate } from "@workspace/common/src/helpers/string_helper";

export const overviewHeaders = [
  "Account",
  "Job Title",
  "Job Id",
  "Ageing",
  "Sales",
  "Recruiter",
  "Man Days",
];

export const trimValue = (value, isMobile) => {
  return isMobile ? truncate(value, 8) : truncate(value, 25);
};

export const overviewValues = (data, deliveryTeam, isMobile) => {
  const output = {
    Account: {
      value: data?.accountName,
      trimValue: trimValue(data?.accountName, isMobile),
    },
    "Job Title": {
      value: data?.jobTitle,
      trimValue: trimValue(data?.jobTitle, isMobile),
    },
    "Job Id": {
      value: data?.clientJobId,
      trimValue: trimValue(data?.clientJobId, isMobile),
    },
    Ageing: {
      value: "N/A",
      trimValue: trimValue("N/A", isMobile),
    },
    Sales: {
      value: data?.accountOwner,
      trimValue: trimValue(data?.accountOwner, isMobile),
    },
    Recruiter: {
      value: deliveryTeam?.join(", ") ?? "N/A",
      trimValue: trimValue(deliveryTeam?.join(", "), isMobile),
    },
    "Man Days": {
      value: "N/A",
      trimValue: trimValue("N/A", isMobile),
    },
  };
  return output;
};
