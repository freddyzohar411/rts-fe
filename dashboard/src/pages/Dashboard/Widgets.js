import React from "react";
import CountUp from "react-countup";
import { Badge, Card, CardBody, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { recruiterDashboard, salesDashboard } from "@workspace/common";
import { useUserAuth } from "@workspace/login";
import { useSelector } from "react-redux";

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
      <div>
        {statusArray.map(({ status, count }, index) => (
          <div
            key={index}
            className="d-flex flex-row justify-content-between mb-2 gap-5 fs-5"
          >
            <span className="fw-semibold">{status}</span>
            <Badge color="dark">{count}</Badge>
          </div>
        ))}
      </div>
    );
  };

  return (
    <React.Fragment>
      {checkAllPermission([Permission.ACCOUNT_WRITE]) &&
        salesDashboard.map((item, key) => (
          <Col xl={3} md={6} key={key}>
            <Link to={item.link}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={getCount(item?.key)}
                            decimals={item.decimals}
                            duration={4}
                          />
                          {item.statusArray &&
                            renderStatusArray(item.statusArray)}
                          {item.data && item.data}
                        </span>
                      </h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        className={
                          "avatar-title rounded fs-3 bg-" +
                          item.bgcolor +
                          "-subtle"
                        }
                      >
                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}

      {checkAllPermission([Permission.CANDIDATE_WRITE]) &&
        recruiterDashboard.map((item, key) => (
          <Col xl={3} md={6} key={key}>
            <Link to={item.link}>
              <Card className="card-animate">
                <CardBody>
                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1 overflow-hidden">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-end justify-content-between mt-4">
                    <div>
                      <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                        <span className="counter-value" data-target="559.25">
                          <CountUp
                            start={0}
                            prefix={item.prefix}
                            suffix={item.suffix}
                            separator={item.separator}
                            end={getCount(item?.key)}
                            decimals={item.decimals}
                            duration={4}
                          />
                          {item.statusArray &&
                            renderStatusArray(item.statusArray)}
                          {item.data && item.data}
                        </span>
                      </h4>
                    </div>
                    <div className="avatar-sm flex-shrink-0">
                      <span
                        className={
                          "avatar-title rounded fs-3 bg-" +
                          item.bgcolor +
                          "-subtle"
                        }
                      >
                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                      </span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
    </React.Fragment>
  );
};

export default Widgets;
