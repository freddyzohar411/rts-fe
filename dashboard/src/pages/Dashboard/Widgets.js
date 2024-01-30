import React from "react";
import CountUp from "react-countup";
import { Row, Badge, Card, CardBody, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { recruiterDashboard, salesDashboard } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const Widgets = () => {
  const { Permission, checkAllPermission } = useUserAuth();

  const newJobs = useSelector((state) => state.JobsCount.newJobs);
  const activeJobs = useSelector((state) => state.JobsCount.activeJobs);
  const inactiveJobs = useSelector((state) => state.JobsCount.inactiveJobs);
  const closedJobs = useSelector((state) => state.JobsCount.closedJobs);
  const assignedJobs = useSelector((state) => state.JobsCount.assignedJobs);
  const fodJobs = useSelector((state) => state.JobsCount.fodJobs);
  const allJobs = useSelector((state) => state.JobsCount.allJobs);
  const totalAssignedJobs = useSelector(
    (state) => state.JobsCount.totalAssignedJobs
  );
  const totalFODJobs = useSelector((state) => state.JobsCount.totalFODJobs);

  const isTablet = useMediaQuery({ query: "(max-width: 1224px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const getCount = (itemKey) => {
    let jobCount = 0;
    switch (itemKey) {
      case "new_job":
        jobCount = newJobs ?? 0;
        break;
      case "active_jobs":
        jobCount = activeJobs ?? 0;
        break;
      case "inactive_jobs":
        jobCount = inactiveJobs ?? 0;
        break;
      case "closed_jobs":
        jobCount = closedJobs ?? 0;
        break;
      case "fod":
        jobCount = fodJobs ?? 0;
        break;
      case "assigned_jobs":
        jobCount = assignedJobs ?? 0;
        break;
      case "all_jobs":
        jobCount = allJobs ?? 0;
        break;
      case "total_assigned_jobs":
        jobCount = totalAssignedJobs ?? 0;
        break;
      case "total_fod":
        jobCount = totalFODJobs ?? 0;
        break;
      default:
        jobCount = 0;
        break;
    }
    return jobCount;
  };

  const renderStatusArray = (statusArray) => {
    if (!statusArray || !Array.isArray(statusArray)) {
      return null;
    }

    return (
      <div className={`${isTablet && "mt-2"}`}>
        {statusArray.map(({ status, count }, index) => (
          <div
            key={index}
            className="d-flex flex-row justify-content-between mt-0 mb-1 gap-3 fs-6"
          >
            <span className="fw-medium">{status}</span>
            <Badge
              className="bg-white text-dark border border-1 border-dark d-flex justify-content-center align-items-center"
              style={{
                width: "40px",
              }}
            >
              {count}
            </Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      <Row className="ms-1">
        {checkAllPermission([Permission.ACCOUNT_WRITE]) &&
          salesDashboard.map((item, key) => (
            <Col
              xl={3}
              md={4}
              key={key}
              className="mb-4"
              style={{ height: isTablet ? "300px" : "200px" }}
            >
              <Link to={item.link}>
                <Card className="card-animate d-flex flex-column h-100">
                  <CardBody className="p-4 d-flex flex-column justify-content-between">
                    <div
                      className={`d-flex ${
                        isTablet
                          ? "flex-column-reverse align-items-center text-center gap-3"
                          : "flex-row justify-content-between align-items-start"
                      }`}
                    >
                      <div className="flex-grow-1 overflow-hidden">
                        <p
                          className="text-uppercase fs-5 fw-semibold text-truncate mb-0"
                          style={{ color: "#000000" }}
                        >
                          {item.label}
                        </p>
                        {item.subLabel ? (
                          <p
                            className="text-uppercase fs-5 fw-semibold text-truncate mb-0"
                            style={{ color: "#83A9E2" }}
                          >
                            {item.subLabel}
                          </p>
                        ) : null}
                      </div>
                      <div className="avatar-md flex-shrink-0">
                        <span
                          className={
                            "avatar-title rounded-circle fs-1 bg-" +
                            item.bgcolor +
                            "-subtle"
                          }
                        >
                          <i
                            className={`text-${item.bgcolor} ${item.icon}`}
                          ></i>
                        </span>
                      </div>
                    </div>

                    <div
                      className={`d-flex  ${
                        isTablet
                          ? "flex-column"
                          : "align-items-end justify-content-between"
                      }`}
                    >
                      {item.statusArray && renderStatusArray(item.statusArray)}
                      <div className={`${isTablet && "text-center"}`}>
                        <h4 className={`"fs-1 fw-bold ff-secondary"`}>
                          <span className="counter-value" data-target="559.25">
                            {item?.key !== "offer_status" && (
                              <CountUp
                                start={0}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                separator={item.separator}
                                end={getCount(item?.key)}
                                decimals={item.decimals}
                                duration={4}
                              />
                            )}
                          </span>
                          <span>{item.data}</span>
                        </h4>
                      </div>
                      <div className="">
                        <a
                          href=""
                          className="fs-5 fw-semibold"
                          style={{ color: "#18AB00" }}
                        >
                          View All
                        </a>
                      </div>
                      {item.footer ? <p>{item.footer}</p> : ""}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
      <Row className="ms-1">
        {checkAllPermission([Permission.CANDIDATE_WRITE]) &&
          recruiterDashboard.map((item, key) => (
            <Col
              xl={3}
              md={4}
              key={key}
              className="mb-4"
              style={{ height: isTablet ? "300px" : "200px" }}
            >
              <Link to={item.link}>
                <Card className="card-animate d-flex flex-column h-100">
                  <CardBody className="p-4 d-flex flex-column justify-content-between">
                    <div
                      className={`d-flex ${
                        isTablet
                          ? "flex-column-reverse align-items-center text-center gap-3"
                          : "flex-row justify-content-between align-items-start"
                      }`}
                    >
                      <div className="flex-grow-1 overflow-hidden">
                        <p
                          className="text-uppercase fs-5 fw-semibold text-truncate mb-0"
                          style={{ color: "#000000" }}
                        >
                          {item.label}
                        </p>
                        {item.subLabel ? (
                          <p
                            className="text-uppercase fs-5 fw-semibold text-truncate mb-0"
                            style={{ color: "#83A9E2" }}
                          >
                            {item.subLabel}
                          </p>
                        ) : null}
                      </div>
                      <div className="avatar-md flex-shrink-0">
                        <span
                          className={
                            "avatar-title rounded-circle fs-1 bg-" +
                            item.bgcolor +
                            "-subtle"
                          }
                        >
                          <i
                            className={`text-${item.bgcolor} ${item.icon}`}
                          ></i>
                        </span>
                      </div>
                    </div>

                    <div
                      className={`d-flex  ${
                        isTablet
                          ? "flex-column"
                          : "align-items-end justify-content-between"
                      }`}
                    >
                      {item.statusArray && renderStatusArray(item.statusArray)}
                      <div className={`${isTablet && "text-center"}`}>
                        <h4 className="fs-1 fw-bold ff-secondary">
                          <span className="counter-value" data-target="559.25">
                            {item?.key !== "offer_status" && (
                              <CountUp
                                start={0}
                                prefix={item.prefix}
                                suffix={item.suffix}
                                separator={item.separator}
                                end={getCount(item?.key)}
                                decimals={item.decimals}
                                duration={4}
                              />
                            )}
                          </span>
                          <span>{item.data}</span>
                        </h4>
                      </div>
                      <div>
                        <a
                          href=""
                          className="fs-5 fw-semibold"
                          style={{ color: "#18AB00" }}
                        >
                          View All
                        </a>
                      </div>
                      {item.footer ? <p>{item.footer}</p> : ""}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </React.Fragment>
  );
};

export default Widgets;
