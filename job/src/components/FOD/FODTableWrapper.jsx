import React from "react";
import { Row, Col, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { DynamicTable } from "@workspace/common";
import { useUserAuth } from "@workspace/login";

const FODTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  confirmDelete,
}) => {
  const { Permission, checkAllPermission } = useUserAuth();

  return (
    <div>
      <Row>
        <Col>
          <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row gap-3">
              <div className="search-box" style={{ width: "500px" }}>
                <Input
                  className="form-control border-secondary"
                  type="text"
                  placeholder="Search.."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i className="ri-search-eye-line search-icon"></i>
              </div>
              <div>
                <Input type="select" className="form-select border-secondary">
                  <option value="">Select View</option>
                  <option value="New Job Openings">New Job Openings</option>
                  <option value="Active Job Openings">
                    Active Job Openings
                  </option>
                  <option value="Inactive Job Openings">
                    Inactive Job Openings
                  </option>
                  <option value="Closed Job Openings">
                    Closed Job Openings
                  </option>
                  <option value="Focus of the Day">Focus of the Day</option>
                  <option value="Assigned Job Openings">
                    Assigned Job Openings
                  </option>
                </Input>
              </div>
            </div>
            <div className="d-flex gap-3">
              <Button className="btn btn-custom-primary">
                <i className="ri-filter-2-fill"></i>
              </Button>
              <Button className="btn btn-custom-primary">
                <i className="ri-layout-column-fill"></i>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <DynamicTable
            config={config}
            data={data}
            pageRequestSet={pageRequestSet}
            pageInfo={pageInfo}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FODTableWrapper;
