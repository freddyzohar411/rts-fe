import { capitalizeFirstLetter } from "@workspace/common/src/helpers/string_helper";
import { FileHelper } from "@workspace/common";
import { render } from "react-dom";

export const candidateBasicInfoMap = {
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
      // Convert to string and parse the digits out only 0-9. Not in array
      if (data) {
        const digitString = data.toString().match(/\d+/g).join("");
        return `+ ${digitString}`;
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
  jobTitle: {
    key: "jobTitle",
    map: "string",
  },
  expectedSalary: {
    key: "expectedSalary",
    map: "integer",
    render: (data) => {
      // Parse out the digits only 0-9
      if (data) {
        const digitString = data?.toString().match(/\d+/g).join("");
        return parseInt(digitString);
      }
      return data;
    },
  },
  currentEmployer: {
    key: "companiesDetails",
    map: "string",
    render: (data) => {
      if (data?.length > 0) {
        // end date is in mm/yyyy format
        // Get the latest end date
        const latestEndDate = data.reduce((prev, current) =>
          prev.endDate > current.endDate ? prev : current
        );
        return latestEndDate.name;
      }
      return "";
    },
    currentPositionTitle: {
      key: "companiesDetails",
      map: "string",
      render: (data) => {
        if (data?.length > 0) {
          // end date is in mm/yyyy format
          // Get the latest end date
          const latestEndDate = data.reduce((prev, current) =>
            prev.endDate > current.endDate ? prev : current
          );
          return latestEndDate.jobTitle;
        }
        return "";
      },
    },
  },
};

// Key [companiesDetails] is the key from the parsed data
export const candidateWorkExperienceMap = {
  companyName: {
    key: "name",
    map: "string",
  },
  jobTitle: {
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
      return getDateWithFormat(new Date(year, month - 1, 1));
    },
  },
  endDate: {
    key: "endDate",
    map: "string",
    render: (data) => {
      if (!data) {
        return "";
      }
      // Data is in mm/yyyy format
      // const [month, year] = data.split("/");
      // return getDateWithFormat(new Date(year, month - 1, 1));

      const [month, year] = data.split("/");
      const todayDate = new Date();
      const currentDate = todayDate.toISOString().split("T")[0];
      const [currentYear, currentMonth] = currentDate.split("-");
      if (year === currentYear && month === currentMonth) {
        return "present";
      }
      return getDateWithFormat(new Date(year, month - 1, 1));
    },
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
    },
  },
  currentRole: {
    key: "endDate",
    map: "string",
    render: (data) => {
      // Data is in mm/yyyy format, check if mm and yyyy match todays date if yes return true
      if (!data) {
        return "";
      }
      const [month, year] = data.split("/");
      const todayDate = new Date();
      const currentDate = todayDate.toISOString().split("T")[0];
      const [currentYear, currentMonth] = currentDate.split("-");
      if (year === currentYear && month === currentMonth) {
        return "true";
      }
      return "false";
    },
  },
};

export const candidateLanguageMap = {
  languages: {
    key: "languages",
    map: "none",
    render: (data) => {
      return capitalizeFirstLetter(data);
    },
  },
};

const candidateEducationDetailsMap = {
  name: {
    key: "name",
    map: "string",
  },
  fieldOfStudy: {
    key: "fieldOfStudy",
    map: "string",
  },
  startDate: {
    key: "startDate",
    map: "string",
    render: (data) => {
      if (!data) {
        return "";
      }
      // Data is in mm/yyyy format
      const [month, year] = data.split("/");
      return getDateWithFormatMonth(new Date(year, month - 1, 1));
    },
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
      return getDateWithFormatMonth(new Date(year, month - 1, 1));
    },
  },
  grade: {
    key: "grade",
    map: "string",
  },
  qualification: {
    key: "qualification",
    map: "string",
  },
  description: {
    key: "description",
    map: "string",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(". ");
      }
      return "";
    },
  },
  activities: {
    key: "activities",
    map: "string",
    render: (data) => {
      if (data?.length > 0) {
        return data.join(". ");
      }
      return "";
    },
  },
};

const candidateCertificationsMap = {
  name: {
    key: "name",
    map: "string",
  },
  from: {
    key: "from",
    map: "string",
  },
  date: {
    key: "date",
    map: "string",
    render: (data) => {
      if (!data) {
        return "";
      }
      // Data is in mm/yyyy format
      const [month, year] = data.split("/");
      return getDateWithFormat(new Date(year, month - 1, 1));
    },
  },
};

const candidateDocumentMap = {
  name: {
    key: "name",
    map: "none",
    render: (data) => {
      if (data) {
        return FileHelper.getFilenameNoExtension(data);
      }
    },
  },
  type: {
    key: "type",
    map: "none",
    render: (data) => {
      if (data) {
        return capitalizeFirstLetter(FileHelper.getFileExtension(data));
      }
    },
  },
  file: {
    key: "file",
    map: "none",
    render: (data) => {
      if (data) {
        return data.name;
      }
    },
  },
};

export const candidateMapping = {
  basicInfo: candidateBasicInfoMap,
  workExperience: candidateWorkExperienceMap,
  languages: candidateLanguageMap,
  educationDetails: candidateEducationDetailsMap,
  certifications: candidateCertificationsMap,
  documents: candidateDocumentMap,
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

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateWithFormat(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateWithFormatMonth(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // JavaScript months are 0-based.
  return `${year}-${month}`;
}
