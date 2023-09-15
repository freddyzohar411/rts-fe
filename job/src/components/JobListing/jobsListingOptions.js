import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Table,
} from "reactstrap";

// Get the address string from the address object
const getAddressString = (address) => {
  let addressFull = "";
  if (address.line1) {
    addressFull += address.line1;
  }
  if (address.line2) {
    addressFull += address.line2 + ", ";
  }
  if (address.line3) {
    addressFull += address.line3 + ", ";
  }
  if (address.city) {
    addressFull += address.city + ", ";
  }
  if (address.postalCode) {
    addressFull += address.postalCode + ", ";
  }
  if (address.country) {
    addressFull += address.country + ", ";
  }

  // Remove the last comma
  return addressFull.substring(0, addressFull.length - 2);
};

/**
 * header: Header of the column
 * name: spring entity field name
 */
export const jobsListingOptions = {
  "Entry Date": {
    header: "Entry Date",
    name: "openDate",
    render: (data) => data.job.openDate,
    sort: true,
  },
  "Sales Person": {
    header: "Sales Person",
    name: "salesName",
    render: (data) =>
      `${data.contact.contactInformation.firstName} ${data.contact.contactInformation.lastName}`,
    sort: false,
  },
  Clients: {
    header: "Clients",
    name: "accountName",
    render: (data) => data.account.accountName,
    sort: false,
  },
  "Project Manager": {
    header: "Project Manager",
    name: "salesManager",
    render: (data) => data.job.salesManager || "-",
    sort: false,
  },
  Status: {
    header: "Status",
    name: "jobStatus",
    render: (data) => (
      <Badge
        color={data.job.jobStatus == "active" ? "success" : "warning"}
        className="text-uppercase"
      >
        {data.job.jobStatus}
      </Badge>
    ),
    sort: true,
  },
  "Job Id": {
    header: "Job Id",
    name: "clientJobId",
    render: (data) => data.job.clientJobId || "-",
    sort: true,
  },
  "Job Title": {
    header: "Job Title",
    name: "title",
    render: (data) => data.job.title || "-",
    sort: true,
  },
  "Job Type": {
    header: "Job Type",
    name: "jobType",
    render: (data) => data.job.jobType || "-",
    sort: true,
  },
  Location: {
    header: "Location",
    name: "workLocation",
    render: (data) => data.job.workLocation || "-",
    sort: true,
  },
  "Head Count": {
    header: "Head Count",
    name: "noOfHeadcount",
    render: (data) => data.job.noOfHeadcount || "-",
    sort: true,
  },
  "Salary Budget": {
    header: "Salary Budget",
    name: "salaryBudget",
    render: (data) => data.job.salaryBudget || "-",
    sort: true,
  },
  "Visa Status": {
    header: "Visa Status",
    name: "visaStatus",
    render: (data) => data.job.visaStatus || "-",
    sort: true,
  },
};
