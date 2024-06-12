import { truncate } from "@workspace/common/src/helpers/string_helper";

export const overviewHeaders = [
  "Account",
  "Job Title",
  "Job Id",
  "Ageing",
  "Account Owner",
  "Recruiter",
  "Man Days",
  "Client Bill Rate",
  "Candidate Salary Budget",
];

export const trimValue = (value, isMobile) => {
  return isMobile ? truncate(value, 8) : truncate(value, 25);
};

export const overviewValues = (data, jobTimelineData, deliveryTeam, isMobile) => {
  const calculateAgeing = () => {
    if (Object.keys(jobTimelineData).length !== 0) {
      const createdAtDate = jobTimelineData?.jobs[0]?.createdAt;
      const currentDate = new Date();
      const newCreatedAtDate = new Date(createdAtDate);
      const ageingValueMS = currentDate - newCreatedAtDate;
      const ageingValueDays = Math.floor(ageingValueMS / (1000 * 60 * 60 * 24));
      return ageingValueDays;
    } else return "N/A";
  }
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
      value: data?.jobId,
      trimValue: trimValue(data?.jobId, isMobile),
    },
    Ageing: {
      value: calculateAgeing() + " Days",
      trimValue: trimValue(calculateAgeing() + " Days", isMobile),
    },
    "Account Owner": {
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
    "Client Bill Rate": {
      value: (data?.currency ?? "") + " " + (data?.billRate ?? "N/A"),
      trimValue: (data?.currency ?? "") + " " + (data?.billRate ?? "N/A"),
      isMobile,
    },
    "Candidate Salary Budget": {
      value: (data?.currency ?? "") + " " + data?.payrate,
      trimValue: (data?.currency ?? "") + " " + (data?.payrate ?? "N/A"),
      isMobile,
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
