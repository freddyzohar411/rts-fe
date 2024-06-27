import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "reactstrap";
import { DynamicTable, TooltipWrapper } from "@workspace/common";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import CandidateStaticFilter from "./CandidateStaticFilter";

function DynamicTableWrapper(
  data,
  pageInfo,
  pageRequest,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  header,
  activeRow,
  setActiveRow,
  setTableConfig
) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  console.log("isFilterOpen", isFilterOpen)

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col lg={12}>
            <div
              className="listjs-table d-flex flex-column"
              style={{
                height: "calc(100vh - 160px)",
              }}
            >
              <Row className="d-flex mb-1">
                <Col>
                  <div className="d-flex column-gap  gap-1 justify-content-end align-items-center">
                    <TableItemDisplay pageInfo={data.pageInfo} />
                    <div
                      style={{
                        width: "2px",
                        height: "20px",
                        backgroundColor: "#adb5bd",
                        marginLeft: "12px",
                      }}
                    ></div>
                    <TableRowsPerPageWithNav
                      pageInfo={data.pageInfo}
                      pageRequestSet={data.pageRequestSet}
                    />

                    <ButtonGroup>
                      <TooltipWrapper tooltipText="Export Excel">
                        <Button className="bg-white main-border-style">
                          <span className="mdi mdi-download align-bottom me-1"></span>
                        </Button>
                      </TooltipWrapper>
                      <TooltipWrapper tooltipText="Filter">
                        <Button
                          className="bg-white main-border-style"
                          onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                          <span className="mdi mdi-filter-variant align-bottom me-1"></span>
                        </Button>
                      </TooltipWrapper>
                    </ButtonGroup>
                  </div>
                </Col>
              </Row>
              <DynamicTable
                config={data.config}
                data={data.data}
                pageRequestSet={data.pageRequestSet}
                pageInfo={data.pageInfo}
                // isLoading={candidateMeta?.isLoading ?? true}
                freezeHeader={true}
                activeRow={data.activeRow}
                setTableConfig={data.setTableConfig}
                pageRequest={data.pageRequest}
                tableHeight="100%"
              />
            </div>
          </Col>
        </Row>
        <CandidateStaticFilter
          isFilterOpen={isFilterOpen}
          setIsFilterOpen={setIsFilterOpen}
        />
      </div>
    </React.Fragment>
  );
}

export default DynamicTableWrapper;
