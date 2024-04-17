import React, { useState } from "react";
import {
  Button,
  Col,
  Row,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { useSelector } from "react-redux";
import { DynamicTable } from "@workspace/common";
import "./DynamicTableWrapper.scss";
import { SelectElement } from "@workspace/common";

const DynamicTableWrapper = ({
  data,
  pageInfo,
  pageRequestSet,
  config,
  search,
  setSearch,
  optGroup,
  setCustomConfigData,
  confirmDelete,
  handleTagAll,
  setCustomQuery,
  fodODTableShowType,
}) => {
  const candidatesData = useSelector(
    (state) => state.CandidateReducer.candidates
  );

  const candidateMeta = useSelector(
    (state) => state.CandidateReducer.candidateMeta
  );

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
            <div className="listjs-table">
              <Row className="d-flex column-gap-1 mb-3">
                <Col>
                  <div className="d-flex flex-row justify-content-between align-items-baseline">
                    <div>
                      <div
                        className="d-flex gap-2 align-items-center"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <Input
                          className="mt-0"
                          type="checkbox"
                          id="checkbox"
                          value="option"
                          defaultChecked={
                            fodODTableShowType?.fodTableShowType?.value ===
                            "Recommendation"
                          }
                          onChange={(e) => {
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
                        <label className="form-check-label" htmlFor="checkbox">
                          Recommend Candidates
                        </label>
                      </div>
                    </div>
                    <div className="d-flex flex-row gap-3 align-items-baseline">
                      {fodODTableShowType?.fodTableShowType?.value ===
                        "Recommendation" && (
                        <Button
                          className="px-2 py-1"
                          title="AI custom query search"
                          onClick={() => setShowQueryModal(true)}
                        >
                          <i className="ri-magic-line"></i>
                        </Button>
                      )}
                      <div className="search-box">
                        {setSearch && (
                          <form onSubmit={pageRequestSet.setSearchTerm}>
                            <Input
                              type="text"
                              placeholder="Search"
                              className="form-control search bg-light border-light"
                              value={search}
                              style={{ width: "350px" }}
                              onChange={(e) => setSearch(e.target.value)}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </form>
                        )}
                      </div>
                      <div>
                        <Button
                          className="btn btn-custom-primary"
                          onClick={() => handleTagAll()}
                        >
                          Tag Selected Candidates
                        </Button>
                      </div>
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
              />
            </div>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default DynamicTableWrapper;
