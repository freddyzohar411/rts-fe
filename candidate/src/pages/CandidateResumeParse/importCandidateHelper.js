export const candidateBasicInfoMap = {
  // Key: Dynamic form
  // Value: parseKey
  firstName: {
    key: "firstName",
    map: "string",
  },
  lastName: {
    key: "lastName",
    map: "string",
  },
  email: {
    key: "email",
    map: "string",
  },
  gender: {
    key: "gender",
    map: "string",
  },
  phone: {
    key: "mobile",
    map: "string",
  },
  phoneCode: {
    key: "mobileExt",
    map: "string",
    render: (data) => {
      if (data) {
        return `+ ${data}`;
      }
      return data;
    },
  },
  languages: {
    key: "spokenLanguages",
    map: "commaSeparatedString",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(",");
      }
      return "";
    },
  },
  currentLocation: {
    key: "currentLocation",
    map: "string",
  },
  profileSummary: {
    key: "profile",
    map: "string",
  },
  candidateNationality: {
    key: "nationality",
    map: "string",
  },
  totalExperience: {
    key: "companiesDetails",
    map: "string",
    render: (data) => {
      if (data?.length > 0) {
        return (calculateUniqueWorkMonths(data) / 12).toFixed(2);
      }
      return 0;
    },
  },
  primarySkills: {
    key: "primarySkills",
    map: "commaSeparatedString",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(",");
      }
      return "";
    },
  },
  secondarySkills: {
    key: "secondarySkills",
    map: "commaSeparatedString",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(",");
      }
      return "";
    },
  },
};

// Key [companiesDetails] is the key from the parsed data
export const candidateWorkExperienceMap = {
  companyName: {
    key: "name",
    map: "string",
  },
  title: {
    key: "jobTitle",
    map: "string",
  },
  startDate: {
    key: "startDate",
    render: (data) => {
      if (!data) {
        return "";
      }
      // Data is in mm/yyyy format
      const [month, year] = data.split("/");
      return new Date(year, month - 1, 1).toISOString();
    }
  },
  endDate: {
    key: "endDate",
    map: "string",
    render: (data) => {
      if (!data) {
        return "";
      }
      // Data is in mm/yyyy format
      const [month, year] = data.split("/");
      return new Date(year, month - 1, 1).toISOString();
    }
  },
  industry: {
    key: "industry",
    map: "string",
  },
  description: {
    key: "responsibilities",
    map: "string",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(". ");
      }
      return "";
    }
  },
};

export const candidateMapping = {
  basicInfo: candidateBasicInfoMap,
  workExperience: candidateWorkExperienceMap,
};


function calculateUniqueWorkMonths(periods) {
  const uniqueMonths = new Set();

  periods.forEach((period) => {
    const [startMonth, startYear] = period?.startDate.split("/");
    const [endMonth, endYear] = period?.endDate.split("/");
    let currentDate = new Date(startYear, startMonth - 1, 1); // Months are 0-indexed in JavaScript Date

    const endDate = new Date(endYear, endMonth - 1, 1);

    while (currentDate < endDate) {
      // Add the month/year string to the Set
      uniqueMonths.add(
        currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1)
      );
      // Move to the next month
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
  });

  // The size of the Set represents the total number of unique months worked
  return uniqueMonths.size;
}
