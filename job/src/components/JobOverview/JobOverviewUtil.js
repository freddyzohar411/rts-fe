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
  const owner = data?.accountOwner?.split("(")?.[0]?.trim();
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
      value: owner,
      trimValue: trimValue(owner, isMobile),
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

export const getMaxOrder = (data) => {
  const values = Object.values(data?.timeline);
  let maxOrder = 1;
  if (values) {
    let orders = values?.map((item) => item?.order);
    if (orders) {
      orders = orders.sort((a, b) => b - a);
      maxOrder = orders?.[0] ?? 1;
    }
  }
  return maxOrder;
};

export const getStatus = (data, orderNo) => {
  const values = Object.values(data?.timeline);
  let status;
  if (values) {
    let orders = values?.filter((item) => item?.order === orderNo);
    if (orders) {
      status = orders?.[0]?.status ?? null;
    }
  }
  return status;
};
