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

const getAddressString = (address) => {
    let addressFull = "";
    if (address.line1){
        addressFull += (address.line1 + ", ");
    }
    if (address.line2){
        addressFull += address.line2 + ", ";
    }
    if (address.line3){
        addressFull += address.line3 + ", ";
    }
    if (address.city){
        addressFull += address.city + ", ";
    }
    if (address.postalCode){
        addressFull += address.postalCode + ", ";
    }
    if (address.country){
        addressFull += address.country + ", ";
    }

    // Remove the last comma
    return addressFull.substring(0, address.length - 2);
}

/**
 * header: Header of the column
 * name: spring entity field name
 */
export const accountListingOptions = {
  "Account Name": {
    header: "Account Name",
    name: "name",
    render: (data) => data.account.accountInformation.accountName,
    sort: true,
  },
  "Account Number": {
    header: "Account Number",
    name: "accountNumber",
    render: (data) => data.account.accountNumber,
    sort: true,
  },
  "Account Rating": {
    header: "Account Rating",
    name: "accountRating",
    render: (data) => data.account.accountInformation.accountRating,
    sort: true,
  },
  "Account Owner": {
    header: "Account Owner",
    name: "salesName",
    render: (data) => data.account.accountInformation.salesName || "-",
    sort: true,
  },
  "Status": {
    header: "Status",
    name: "status",
    render: (data) => (
      <Badge
        color={
          data.account.accountInformation.accountStatus == "active"
            ? "success"
            : "warning"
        }
        className="text-uppercase"
      >
        {data.account.accountInformation.accountStatus}
      </Badge>
    ),
    sort: true,
  },
  "Service": {
    header: "Service",
    name: "accountSource",
    render: (data) => data.account.accountInformation.accountSource,
    sort: true,
  },
  "Msa": {
    header: "Msa",
    name: "msa",
    render: (data) => data.account.accountInformation.msa,
    sort: true,
  },
  "No of Employees":{
    header: "No of Employees",
    name: "noOfEmployees",
    render: (data) => data.account.accountInformation.noOfEmployees || "-",
    sort: true,
  },
  "Parent Company":{
    header: "Parent Company",
    name: "parentCompanyEntity",
    render: (data) => data.account.accountInformation?.parentCompanyEntity?.name || "-",
    sort: false,
  },
  "Secondary Owner": {
    header: "Secondary Owner",
    name: "secondaryOwner",
    render: (data) => data.account.accountInformation.secondaryOwner || "-",
    sort: true,
  },
  "Website": {
    header: "Website",
    name: "website",
    render: (data) => data.account.accountInformation.website || "-",
    sort: true,
  },
  "Lead Account Name":{
    header: "Lead Account Name",
    name: "accountName",
    render: (data) => data.account.leadInformation.accountName || "-",
    sort: true,
  },
  "Lead Source":{
    header: "Lead Source",
    name: "leadSource",
    render: (data) => data.account.leadInformation.leadSource || "-",
    sort: true,
  },
  "Lead Sales Name":{
    header: "Lead Sales Name",
    name: "leadSalesName",
    render: (data) => data.account.leadInformation.salesName || "-",
    sort: true,
  },
  "Address": {
    header: "Address",
    name: "address",
    render: (data) => getAddressString(data.account.addressInformation.address) || "-",
    sort: false,
  },
};
