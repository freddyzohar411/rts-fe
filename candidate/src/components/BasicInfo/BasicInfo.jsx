import { FormSelection, FormInput } from "@workspace/common";
import { useFormikContext, getIn } from "formik";
import { Label, Row, Col, Input, Container } from "reactstrap";

const BasicInfo = ({ handleNext }) => {
  const { errors, touched } = useFormikContext();

  const sortbyname = [
    { label: "Alabama", value: "AL" },
    { label: "Madrid", value: "MA" },
    { label: "Toronto", value: "TO" },
    { label: "London", value: "LO" },
    { label: "Wyoming", value: "WY" },
  ];

  return (
    <Container fluid>
      <div className="mb-2">
        <Label className="h5">Basic Info</Label>
      </div>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.firstName"
            type="text"
            label="First Name*"
            htmlFor="First Name"
            error={getIn(errors, "basicInfo.firstName")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.lastName"
            type="text"
            className="form-control"
            id="lastName"
            label="Last Name*"
            htmlFor="Last Name"
            error={getIn(errors, "basicInfo.lastName")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.gender"
            type="text"
            className="form-control"
            id="gender"
            label="Gender*"
            htmlFor="Gender"
            error={getIn(errors, "basicInfo.gender")}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.email"
            type="text"
            className="form-control"
            label="Email*"
            htmlFor="Email"
            error={getIn(errors, "basicInfo.email")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.phone"
            type="text"
            className="form-control"
            label="Phone*"
            htmlFor="Phone"
            error={getIn(errors, "basicInfo.phone")}
          />
        </Col>
        <Col lg={4}>
          <FormSelection
            name="basicInfo.candidateNationality"
            label="Candidate Nationality*"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            error={getIn(errors, "basicInfo.candidateNationality")}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.currentLocation"
            type="text"
            className="form-control"
            label="Current location*"
            htmlFor="Current location"
            error={getIn(errors, "basicInfo.currentLocation")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.visaStatus"
            type="text"
            className="form-control"
            label="VISA Status*"
            htmlFor="VISA Status"
            error={getIn(errors, "basicInfo.visaStatus")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.languageKnown"
            type="text"
            className="form-control"
            label="Language known"
            htmlFor="Language known"
          />
        </Col>
      </Row>
      <Row>
        <Col lg={4}>
          <FormSelection
            label="Candidate Owner"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="basicInfo.candidateOwner"
          />
        </Col>
      </Row>
      <div className="mb-2 mt-4">
        <Label className="h5">Professional Info</Label>
      </div>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.totalExperience"
            type="text"
            className="form-control"
            label="Total Experience*"
            htmlFor="Total Experience"
            error={getIn(errors, "basicInfo.totalExperience")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.relevantExperience"
            type="text"
            className="form-control"
            label="Relevant Experience*"
            htmlFor="Relevant Experience"
            error={getIn(errors, "basicInfo.relevantExperience")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.currentEmployer"
            type="text"
            className="form-control"
            label="Current Employer*"
            htmlFor="Current Employer"
            error={getIn(errors, "basicInfo.currentEmployer")}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.currentPositionTitle"
            type="text"
            className="form-control"
            label="Current Position Title*"
            htmlFor="Current Position Title"
            error={getIn(errors, "basicInfo.currentPositionTitle")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.candidateCurrentSalary"
            type="text"
            className="form-control"
            label="Candidate Current Salary*"
            htmlFor="Candidate Current Salary"
            error={getIn(errors, "basicInfo.candidateCurrentSalary")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.candidateExpectedSalary"
            type="text"
            className="form-control"
            label="Candidate Expected Salary*"
            htmlFor="Candidate Expected Salary"
            error={getIn(errors, "basicInfo.candidateExpectedSalary")}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormInput
            name="basicInfo.reasonforChange"
            type="text"
            className="form-control"
            label="Reason for Change*"
            htmlFor="Reason for Change"
            error={getIn(errors, "basicInfo.reasonforChange")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.noticeperiod"
            type="text"
            className="form-control"
            label="Notice period*"
            htmlFor="Notice period"
            error={getIn(errors, "basicInfo.noticeperiod")}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.profileSummary"
            type="text"
            className="form-control"
            label="Profile Summary*"
            htmlFor="Profile Summary"
            error={getIn(errors, "basicInfo.profileSummary")}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormSelection
            label="Primary Skills*"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="basicInfo.primarySkills"
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.secondarySkills"
            type="text"
            className="form-control"
            label="Secondary Skills"
            htmlFor="Secondary Skills"
            invalid={!!errors.accName}
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.additionalInfo"
            type="text"
            className="form-control"
            label="Additional Info"
            htmlFor="Additional Info"
            invalid={!!errors.accName}
          />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col lg={4}>
          <FormSelection
            label="Candidate Status*"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="basicInfo.candidateStatus"
          />
        </Col>
        <Col lg={4}>
          <FormSelection
            label="Source*"
            options={sortbyname}
            className="js-example-basic-single mb-0"
            name="basicInfo.source"
          />
        </Col>
        <Col lg={4}>
          <FormInput
            name="basicInfo.referrerName"
            type="text"
            className="form-control"
            label="Referrer's Name (if applicable)"
            htmlFor="Referrer's Name"
            invalid={!!errors.accName}
          />
        </Col>
        <Col lg={4}>
          <div className="form-check mt-4 ">
            <Input
              className="form-check-input"
              type="checkbox"
              id="formCheck2"
              defaultChecked
            />
            <Label className="form-check-label " htmlFor="formCheck2">
              Email Out Put
            </Label>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BasicInfo;
