import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
} from "reactstrap";
import { useSelector } from "react-redux";
import { DynamicTable } from "@workspace/common";
import "./DynamicTableWrapper.scss";
import TableItemDisplay from "@workspace/common/src/Components/DynamicTable/TableItemDisplay";
import TableRowsPerPageWithNav from "@workspace/common/src/Components/DynamicTable/TableRowsPerPageWithNav";
import { TooltipWrapper } from "@workspace/common";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  handleTagAll,
  setCustomQuery,
  fodODTableShowType,
  setSelected,
  pageRequest,
}) => {
  const isRecommendationLoading = useSelector(
    (state) => state.CandidateReducer.candidateRecommendationLoading
  );

  const [showQueryModal, setShowQueryModal] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <React.Fragment>
      <Modal
        isOpen={showQueryModal}
        closeModal={() => {
          setShowQueryModal(false);
        }}
        centered
        scrollable
        size="lg"
      >
        <ModalHeader
          className="bg-primary pb-3"
          toggle={() => setShowQueryModal(false)}
        >
          <div className="d-flex flex-column text-dark">
            <span className="h5 fw-bold">Custom Query</span>
            <div className="text-muted" style={{ fontSize: "0.8rem" }}>
              Provide your custom query to search candidates
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="bg-light" style={{ minHeight: "500px" }}>
          <div className="text-center p-4">
            <div>
              <Input
                style={{
                  width: "100%",
                  height: "400px",
                  resize: "none",
                  overflowY: "scroll",
                }}
                type="textarea"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="mt-3 d-flex justify-content-between">
              <Button
                className="btn btn-secondary"
                onClick={() => {
                  setQuery("");
                }}
              >
                Clear
              </Button>
              <Button
                className="btn btn-custom-primary"
                onClick={() => {
                  setCustomQuery(query);
                  setShowQueryModal(false);
                }}
              >
                Custom Search
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <div>
        <Row>
          <Col lg={12}>
            <div
              className="listjs-table"
              style={{
                height: "calc(100vh - 225px)",
              }}
            >
              <Row>
                <div>
                  <div
                    className="d-flex gap-2 align-items-center"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <Input
                      className="mt-0"
                      type="checkbox"
                      id="recommendation"
                      value="option"
                      // defaultChecked={
                      //   fodODTableShowType?.fodTableShowType?.value ===
                      //   "Recommendation"
                      // }
                      defaultChecked={false}
                      onChange={(e) => {
                        setSelected([]);
                        if (e.target.checked) {
                          fodODTableShowType?.setFODTableShowType({
                            label: "Recommendation",
                            value: "Recommendation",
                          });
                        } else {
                          fodODTableShowType?.setFODTableShowType({
                            label: "All",
                            value: "All",
                          });
                        }
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="recommendation"
                    >
                      Recommend Candidates
                    </label>
                  </div>
                </div>
              </Row>
              <Row className="d-flex column-gap-1 mb-3 mt-2">
                <Col>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-row gap-3 align-items-center">
                      <div className="search-box">
                        {setSearch && (
                          <form onSubmit={pageRequestSet.setSearchTerm}>
                            <Input
                              type="text"
                              placeholder="Search"
                              className="form-control search bg-light border-light"
                              value={search}
                              style={{ width: "350px", height: "40px" }}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </form>
                        )}
                      </div>
                      <Button
                        color="light"
                        className="btn btn-white bg-gradient border-2 border-light-grey fw-bold d-flex flex-row align-items-center"
                        title="AI custom query search"
                        onClick={() => setShowQueryModal(true)}
                        style={{ height: "40px" }}
                      >
                        <i className="ri-magic-line align-bottom fs-5"></i>
                      </Button>
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-center">
                      <TableItemDisplay pageInfo={pageInfo} />
                      <div
                        style={{
                          width: "2px",
                          height: "20px",
                          backgroundColor: "#adb5bd",
                          marginLeft: "12px",
                        }}
                      ></div>
                      <TableRowsPerPageWithNav
                        pageInfo={pageInfo}
                        pageRequestSet={pageRequestSet}
                        defaultValue={20}
                      />
                      <TooltipWrapper tooltipText="Tag Candidates">
                        <Button
                          className="btn btn-custom-primary"
                          onClick={() => handleTagAll()}
                          style={{
                            backgroundColor: "#0A65CC",
                            height: "40px",
                          }}
                        >
                          <i className="ri-user-add-fill fs-5"></i>
                        </Button>
                      </TooltipWrapper>
                    </div>
                  </div>
                </Col>
              </Row>
              <DynamicTable
                config={config}
                data={data}
                pageRequestSet={pageRequestSet}
                pageInfo={pageInfo}
                isLoading={isRecommendationLoading}
                freezeHeader={true}
                tableHeight="100%"
                pageRequest={pageRequest}
              />
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
