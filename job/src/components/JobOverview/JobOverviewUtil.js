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
  "Created Date",
];

export const trimValue = (value, isMobile) => {
  return isMobile ? truncate(value, 8) : truncate(value, 25);
};

export const overviewValues = (
  data,
  jobTimelineData,
  deliveryTeam,
  isMobile
) => {
  let recruiters = [];
  const recs = data?.fodRecruiters?.split(",") ?? [];

  if (deliveryTeam?.length > 0) {
    deliveryTeam?.forEach((rs) => {
      recruiters?.push(rs?.trim());
    });
  }

  if (recs?.length > 0) {
    recs?.forEach((rs) => {
      recruiters?.push(rs?.trim());
    });
  }

  recruiters =
    recruiters?.filter((val, ind) => ind === recruiters?.indexOf(val)) ?? null;

  const calculateAgeing = () => {
    if (Object.keys(jobTimelineData).length !== 0) {
      const createdAtDate = jobTimelineData?.jobs[0]?.createdAt;
      const currentDate = new Date();
      const newCreatedAtDate = new Date(createdAtDate);
      const ageingValueMS = currentDate - newCreatedAtDate;
      const ageingValueDays = Math.floor(ageingValueMS / (1000 * 60 * 60 * 24));
      const years = Math.floor(ageingValueDays / 365);
      const remainingDays = ageingValueDays % 365;

      if (years > 0) {
        return `${years} Y ${remainingDays} Days`;
      } else {
        return `${ageingValueDays} Days`;
      }
    } else return "N/A";
  };

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
      value: calculateAgeing(),
      trimValue: trimValue(calculateAgeing(), isMobile),
    },
    "Account Owner": {
      value: owner,
      trimValue: trimValue(owner, isMobile),
    },
    Recruiter: {
      value: recruiters?.join(", ") ?? "N/A",
      trimValue: trimValue(recruiters?.join(", "), isMobile),
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
    "Created Date": {
      value: new Date(data?.dateOpen).toLocaleDateString() ?? "N/A",
      trimValue: new Date(data?.dateOpen).toLocaleDateString() ?? "N/A",
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
